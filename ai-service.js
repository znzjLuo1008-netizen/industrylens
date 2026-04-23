/**
 * ai-service.js — DeepSeek 集成（流式 + 本地缓存 + 结构化输出）
 *
 * 架构：
 *   1) 本地命中 KEYWORDS_DB → 秒开（不走这里）
 *   2) 本地未命中 → 查 localStorage 缓存（30天有效）→ 命中秒开
 *   3) 仍未命中 → 流式调用 DeepSeek → 边生成边渲染 + 写缓存
 *
 * API Key 来源优先级：
 *   1) window.__DS_KEY__（config.local.js 注入，开发用）
 *   2) localStorage['ds_key']（用户设置面板填入）
 *   3) 提示用户输入
 *
 * 未来切换到后端代理只需改 ENDPOINT & 去掉 Authorization header
 */
(function (global) {
  'use strict';

  var CFG = {
    ENDPOINT: 'https://api.deepseek.com/v1/chat/completions',
    MODEL: 'deepseek-chat',
    CACHE_KEY_PREFIX: 'il_cache_',
    CACHE_TTL: 30 * 24 * 60 * 60 * 1000, // 30天
    TARGET_KW_COUNT: 30,                  // 标准粒度（30词+3公司，约10-15秒）
    USE_PROXY: false                       // 未来切到 Vercel 时改 true
  };

  /* ========== API Key 管理 ==========
   * 优先级：
   *   1) window.__DS_KEY__（config.local.js 注入，开发用）
   *   2) 内嵌默认 Key（公网部署时兜底）
   *   3) localStorage['ds_key']（用户设置面板填入）
   */
  var DEFAULT_KEY = 'sk-d0b9a6d67b66465993c3bc7d6b54873d';
  function getKey() {
    if (global.__DS_KEY__) return global.__DS_KEY__;
    try { return localStorage.getItem('ds_key') || DEFAULT_KEY; } catch (e) { return DEFAULT_KEY; }
  }
  function setKey(k) {
    try { localStorage.setItem('ds_key', (k || '').trim()); } catch (e) {}
  }
  function clearKey() {
    try { localStorage.removeItem('ds_key'); } catch (e) {}
  }
  function hasKey() { return !!getKey(); }

  /* ========== 缓存 ========== */
  function cacheGet(kw) {
    try {
      var raw = localStorage.getItem(CFG.CACHE_KEY_PREFIX + kw);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (!obj || !obj.t || Date.now() - obj.t > CFG.CACHE_TTL) return null;
      return obj.data;
    } catch (e) { return null; }
  }
  function cacheSet(kw, data) {
    try {
      localStorage.setItem(CFG.CACHE_KEY_PREFIX + kw, JSON.stringify({ t: Date.now(), data: data }));
    } catch (e) {}
  }
  function cacheClear() {
    try {
      var keys = [];
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(CFG.CACHE_KEY_PREFIX) === 0) keys.push(k);
      }
      keys.forEach(function (k) { localStorage.removeItem(k); });
      return keys.length;
    } catch (e) { return 0; }
  }

  /* ========== Prompt 构造（核心） ========== */
  function buildPrompt(kw) {
    return {
      system:
        '你是顶级的行业研究分析师，擅长把招股书、财报、行业白皮书里的专业术语提炼成"老板能秒懂"的大白话。\n' +
        '你的任务：针对用户输入的行业或关键词，输出一个 30 词行业关键词百科 + 3 家标杆公司拆解，严格按 JSON 格式。\n\n' +
        '【重要规范】\n' +
        '1. 所有释义必须基于真实行业事实，禁止编造。可引用真实公司名、真实市占率、真实营收、真实技术参数。\n' +
        '2. 关键词 "pro"（专业释义）：80-140 字，招股书级专业度，含具体数据/公司/标准。\n' +
        '3. 关键词 "ez"（大白话）：20-50 字，用类比、比喻，老板/小白能秒懂。\n' +
        '4. cat 分类：core（核心概念）/ finance（财务指标）/ tech（技术术语）/ biz（商业模型），四种均衡分布。\n' +
        '5. 关键词排序：前 10 个必须是该行业最核心、使用频率最高的。\n' +
        '6. 公司 "moatPro"：金融术语描述护城河（迁移成本/网络效应/专利壁垒/规模经济/品牌心智）。\n' +
        '7. 公司 "moatEz"：用类比法解释为什么厉害（如"就像全村的路都是他修的"）。\n' +
        '8. lifecycle：0=初创期 1=成长期 2=成熟期 3=转型期；lifeLabel 对应中文。\n' +
        '9. revenue：数组长度 2-4，pct 之和=100。color 从 ["#00AAB8","#B8E4E3","#E6F4F1","#7FD3D6"] 选。\n' +
        '10. ecoNiche：生态位简称（基础设施/终端应用/全产业链/细分领跑/跨界颠覆 等）。\n' +
        '11. 只输出 JSON，不要任何前后缀 markdown、解释、```json。\n' +
        '12. **输入校验铁律**：如果用户输入明显不是「行业/技术/公司/产品品类/产业政策」，而是以下类型之一：\n' +
        '    - 纯国家/地区名（意大利、法国、日本、北京、上海等，注意不含"制造/科技/经济"等后缀）\n' +
        '    - 人名（马斯克、张三、李嘉诚等）\n' +
        '    - 通用抽象词（幸福、未来、梦想、爱情等）\n' +
        '    - 单个字符或无意义字符串（a、啊、xxx、123 等）\n' +
        '    - 节日/时间词（春节、2024年等）\n' +
        '    必须直接返回以下 JSON，禁止编造任何行业：\n' +
        '    {"invalid": true, "reason": "简短说明为什么不是行业词", "suggest": ["推荐的相近行业1","行业2","行业3"]}\n' +
        '    例：输入"意大利" → {"invalid":true,"reason":"「意大利」是国家名，不是行业或技术词。","suggest":["奢侈品","葡萄酒","意大利面"]}\n' +
        '    **例外白名单**：以下类型视为合法行业词，必须正常生成百科，不得返回 invalid：\n' +
        '    - 产业政策/国家战略（中国制造、中国制造2025、一带一路、双碳、新质生产力、专精特新）→ 围绕该政策涉及的核心产业拆解\n' +
        '    - 宏观产业概念（先进制造、高端装备、战略新兴产业、硬科技）→ 拆成具体细分产业链\n' +
        '    - 历史/文化行业（书法、茶道、京剧、武术）→ 围绕其市场化/产业化形态\n\n' +
        '【JSON Schema】\n' +
        '{\n' +
        '  "industry": {"name": "string", "desc": "一句话行业定位(40字内)"},\n' +
        '  "keywords": [\n' +
        '    {"rank": 1, "cat": "core|finance|tech|biz", "term": "关键词", "pro": "专业释义", "ez": "大白话"}\n' +
        '    … 共 30 条\n' +
        '  ],\n' +
        '  "companies": [\n' +
        '    {\n' +
        '      "name": "中文名", "enName": "English", "domain": "abc.com",\n' +
        '      "ecoNiche": "生态位", "tags": ["标签1","标签2"],\n' +
        '      "moatPro": "金融术语护城河", "moatEz": "类比大白话",\n' +
        '      "lifecycle": 2, "lifeLabel": "成熟期",\n' +
        '      "revenue": [{"label":"业务1","pct":60,"color":"#00AAB8"},{"label":"业务2","pct":40,"color":"#B8E4E3"}]\n' +
        '    } … 共 3 条\n' +
        '  ]\n' +
        '}',
      user:
        '请为以下行业/关键词生成 30 词核心百科 + 3 家标杆公司：\n\n' +
        '输入词：「' + kw + '」\n\n' +
        '要求：\n' +
        '- **首先判断输入合法性**：若是国家/人名/地名/抽象词/无意义字符，直接返回 {"invalid":true,"reason":"...","suggest":[...]}，不要编造行业；\n' +
        '- 若输入是已知行业（如"医美"），直接围绕该行业；\n' +
        '- 若输入是公司名（如"宁德时代"），请围绕该公司所在细分行业；\n' +
        '- 若输入是技术词（如"Chiplet"），请围绕该技术所在产业链；\n' +
        '- 若输入过于宽泛（如"科技"），自行选定最具代表性的细分赛道；\n' +
        '- 公司必须是真实存在、行业头部的 3 家（按市占率/市值/影响力排序）。\n\n' +
        '直接输出 JSON，不要任何其他内容。'
    };
  }

  /* ========== 流式调用 DeepSeek ==========
   * onProgress(stats): {receivedChars, kwCount, companyCount, stage, partial}
   * onDone(data): 完整 JSON
   * onError(err)
   */
  function generate(kw, opts) {
    opts = opts || {};
    var key = getKey();
    if (!key) { opts.onError && opts.onError(new Error('NO_KEY')); return; }

    // 1) 先查缓存
    var cached = cacheGet(kw);
    if (cached) {
      setTimeout(function () {
        opts.onCache && opts.onCache(cached);
        opts.onDone && opts.onDone(cached);
      }, 0);
      return;
    }

    var prompt = buildPrompt(kw);
    var body = {
      model: CFG.MODEL,
      messages: [
        { role: 'system', content: prompt.system },
        { role: 'user', content: prompt.user }
      ],
      stream: true,
      temperature: 0.4,
      max_tokens: 8192,
      response_format: { type: 'json_object' }
    };

    var controller = new AbortController();
    if (opts.signal) {
      // 支持外部取消
      opts.signal.addEventListener && opts.signal.addEventListener('abort', function(){
        controller.abort();
      });
    }

    fetch(CFG.ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + key
      },
      body: JSON.stringify(body),
      signal: controller.signal
    }).then(function (res) {
      if (!res.ok) {
        return res.text().then(function(t){
          throw new Error('HTTP ' + res.status + ': ' + t.slice(0,200));
        });
      }
      var reader = res.body.getReader();
      var decoder = new TextDecoder('utf-8');
      var accumulator = ''; // 完整 assistant content
      var buffer = '';      // SSE 未处理 chunk buffer

      function pump() {
        return reader.read().then(function (chunk) {
          if (chunk.done) {
            // 流结束，解析最终 JSON
            try {
              var clean = accumulator.trim();
              // 容错：有些模型会返回 ```json ... ``` 包裹
              clean = clean.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
              var data = JSON.parse(clean);
              cacheSet(kw, data);
              opts.onDone && opts.onDone(data);
            } catch (e) {
              opts.onError && opts.onError(new Error('JSON 解析失败: ' + e.message + '\n内容片段: ' + accumulator.slice(0,400)));
            }
            return;
          }
          buffer += decoder.decode(chunk.value, { stream: true });
          // 按行处理 SSE
          var lines = buffer.split('\n');
          buffer = lines.pop(); // 最后一行可能不完整
          lines.forEach(function (line) {
            line = line.trim();
            if (!line || line.indexOf('data:') !== 0) return;
            var dataStr = line.slice(5).trim();
            if (dataStr === '[DONE]') return;
            try {
              var obj = JSON.parse(dataStr);
              var delta = obj.choices && obj.choices[0] && obj.choices[0].delta && obj.choices[0].delta.content;
              if (delta) {
                accumulator += delta;
                // 尝试预览进度
                emitProgress(accumulator, opts.onProgress);
              }
            } catch (e) { /* 忽略单个 chunk 解析失败 */ }
          });
          return pump();
        });
      }
      return pump();
    }).catch(function (err) {
      if (err.name === 'AbortError') return;
      opts.onError && opts.onError(err);
    });

    return { cancel: function () { controller.abort(); } };
  }

  /* ========== 增量进度估算 ==========
   * 大模型流式输出 JSON 时，我们根据已输出的 term 字段数量估算进度。
   */
  function emitProgress(partial, cb) {
    if (!cb) return;
    // 粗略统计：term":"xxx" 出现次数 = 已生成关键词数
    var termMatches = partial.match(/"term"\s*:\s*"/g);
    var kwCount = termMatches ? termMatches.length : 0;
    // 公司数：name 出现在 "companies" 之后
    var compIdx = partial.indexOf('"companies"');
    var compCount = 0;
    if (compIdx > -1) {
      var tail = partial.slice(compIdx);
      var nameMatches = tail.match(/"name"\s*:\s*"/g);
      compCount = nameMatches ? nameMatches.length : 0;
    }
    var stage = kwCount < CFG.TARGET_KW_COUNT ? 'keywords' : (compCount < 3 ? 'companies' : 'finalizing');
    var pct = Math.min(95, Math.round((kwCount / CFG.TARGET_KW_COUNT) * 85 + (compCount / 3) * 10));
    cb({
      receivedChars: partial.length,
      kwCount: kwCount,
      companyCount: compCount,
      stage: stage,
      pct: pct
    });
  }

  /* ========== 导出 ========== */
  global.AIService = {
    CFG: CFG,
    getKey: getKey,
    setKey: setKey,
    clearKey: clearKey,
    hasKey: hasKey,
    cacheGet: cacheGet,
    cacheSet: cacheSet,
    cacheClear: cacheClear,
    generate: generate
  };
})(window);
