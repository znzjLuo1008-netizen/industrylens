// 同义词 & 扩展词典（搜索匹配增强）
var SYNONYMS = {
  'ai': ['人工智能','agi','chatgpt','大模型','llm','gpt','机器学习','深度学习','aigc'],
  '人工智能': ['ai','大模型','agi','机器学习','深度学习','aigc','llm'],
  '新能源车': ['新能源汽车','电动车','bev','phev','erev'],
  '新能源汽车': ['新能源车','电动车','bev','phev','erev'],
  '自动驾驶': ['智能驾驶','adas','fsd','robotaxi','无人驾驶'],
  '智能驾驶': ['自动驾驶','adas','fsd','robotaxi','无人驾驶'],
  '具身智能': ['人形机器人','具身ai','humanoid','机器人大脑'],
  '人形机器人': ['具身智能','humanoid','人形','双足机器人'],
  '电商': ['电子商务','跨境电商','社交电商','直播电商'],
  '芯片': ['半导体','集成电路','ic','处理器','gpu','晶圆','fab'],
  '半导体': ['芯片','集成电路','ic','晶圆','封测','fab'],
  '医美': ['医疗美容','玻尿酸','肉毒素','水光针','抗衰'],
  '云计算': ['saas','iaas','公有云','私有云'],
  'saas': ['云计算','企业软件','订阅制'],
  '比特币': ['加密货币','crypto','btc','bitcoin'],
  '区块链': ['加密货币','web3','比特币','btc','以太坊','eth','defi','nft','dao','crypto','稳定币','智能合约','公链'],
  'web3': ['区块链','nft','defi','加密货币','crypto'],
  '光伏': ['太阳能','硅料','硅片','电池片','组件','逆变器'],
  '储能': ['电池储能','储能系统','bms','pcs'],
  '氢能': ['氢燃料电池','绿氢','蓝氢','电解水制氢','加氢站'],
  '锂电': ['锂电池','动力电池','磷酸铁锂','三元锂'],
  '动力电池': ['锂电池','锂电','磷酸铁锂','三元锂','电池包','电芯'],
  '大模型': ['ai','gpt','llm','chatgpt','人工智能','agi','deepseek','kimi'],
  '脑机接口': ['脑机','bci','neuralink','脑电','神经接口'],
  '低空经济': ['低空','evtol','飞行汽车','无人机物流'],
  '合成生物': ['synbio','基因编辑','crispr','工程菌'],
  '元宇宙': ['metaverse','vr','ar','mr','xr','虚拟现实'],
  '宠物': ['宠物经济','猫粮','狗粮','宠物医疗','宠物食品']
};

// 拼音首字母映射（覆盖主要热词）
var PINYIN_MAP = {
  'znjs': '智能驾驶','xnyc': '新能源车','xny': '新能源','bdt': '半导体',
  'rgzn': '人工智能','dmx': '大模型','jsr': '具身智能','rxjqr': '人形机器人',
  'ywy': '元宇宙','swyy': '生物医药','ym': '医美',
  'qkl': '区块链','lx': '锂电','gd': '光伏',
  'cn': '储能','qn': '氢能','njj': '脑机接口','hcsw': '合成生物',
  'lkjj': '低空经济','cw': '宠物'
};

/**
 * 升级版行业匹配：分层置信度
 *
 * ★ 核心原则：只有"高置信度精确匹配"才用本地数据，其他一律走 AI 生成。
 *
 * 置信度分层：
 * - tier 1 (精确匹配，返回 industryId): kw 完全等于行业名 / kw 完全等于某个 tag
 * - tier 2 (同义词直达，返回 industryId): kw 通过同义词词典明确指向一个行业名（如"自动驾驶"→"智能驾驶"）
 * - tier 3 (不匹配，返回 null): 所有模糊包含、反向扩展、部分匹配 → 交给 AI 生成
 *
 * 这样"汽车"不会被匹到"智能驾驶"（"汽车"≠"智能驾驶"且无精确同义词直达）→ null → 走 AI
 * "智能驾驶"/"自动驾驶"/"znjs" → tier 1/2 → 命中本地 znjs 行业
 */
function matchIndustry(kw) {
  var raw = (kw || '').toLowerCase().trim();
  if (!raw) return null;
  if (typeof INDUSTRY_MAP === 'undefined') return null;

  // 拼音首字母直达（tier 1 等效）
  if (PINYIN_MAP[raw]) {
    raw = PINYIN_MAP[raw].toLowerCase();
  }

  // ===== Tier 1: 精确匹配（完全相等） =====
  var exactHit = null;
  Object.keys(INDUSTRY_MAP).forEach(function(id) {
    if (exactHit) return;
    var name = (INDUSTRY_MAP[id].name || '').toLowerCase();
    if (name === raw) { exactHit = id; return; }
    var tags = INDUSTRY_MAP[id].tags || [];
    for (var i = 0; i < tags.length; i++) {
      if (String(tags[i]).toLowerCase() === raw) { exactHit = id; return; }
    }
  });
  if (exactHit) return exactHit;

  // ===== Tier 2: 同义词直达（kw 的同义词集合中，任何一个与某行业名/tag 精确相等） =====
  // 注意：只允许正向扩展（kw 作为 key 查 SYNONYMS），不做反向，避免泛词被污染
  var synHit = null;
  var synonyms = SYNONYMS[raw] || [];
  if (synonyms.length > 0) {
    for (var j = 0; j < synonyms.length; j++) {
      var syn = synonyms[j].toLowerCase();
      Object.keys(INDUSTRY_MAP).forEach(function(id) {
        if (synHit) return;
        var name = (INDUSTRY_MAP[id].name || '').toLowerCase();
        if (name === syn) { synHit = id; return; }
        var tags = INDUSTRY_MAP[id].tags || [];
        for (var k = 0; k < tags.length; k++) {
          if (String(tags[k]).toLowerCase() === syn) { synHit = id; return; }
        }
      });
      if (synHit) break;
    }
  }
  if (synHit) return synHit;

  // ===== Tier 3: 其他一律交给 AI =====
  return null;
}

// 文本高亮：在段落中把搜索词/行业名加 <mark>
function highlightText(text, keywords) {
  if (!text || !keywords || !keywords.length) return text;
  var result = text;
  // 按长度降序，避免短词抢先匹配
  var sortedKws = keywords.filter(function(k){return k && k.length>=2}).sort(function(a,b){return b.length-a.length});
  sortedKws.forEach(function(kw) {
    var escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var re = new RegExp('(' + escaped + ')', 'gi');
    result = result.replace(re, '<mark>$1</mark>');
  });
  return result;
}
