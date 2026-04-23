/**
 * IndustryLens · 行业标杆三强数据库
 * 每个行业 Top 3 公司（生态位 + 护城河 + 生命周期 + 收入结构）
 * 设计原则：去投资化、专业研报视角、白话翻译
 */
window.COMPANIES_DB = {

  /* ========== 顶流 10 个行业：深度数据 ========== */

  auto: [
    {
      name: '特斯拉', enName: 'Tesla', domain: 'tesla.com', tags: ['整车+FSD闭环', '北美霸主'], ecoNiche: '终端应用',
      moatPro: '第一性原理工程+FSD端到端大模型+超充网络垄断，三位一体的自动驾驶基础设施。',
      moatEz: '既造车、又造脑子、还修了全世界的加油站，别人造一辆车，他造了一个生态。',
      lifecycle: 2, lifeLabel: '成长期',
      revenue: [
        {label:'整车销售', pct:84, color:'#00AAB8'},
        {label:'能源+储能', pct:9, color:'#B8E4E3'},
        {label:'FSD/服务', pct:7, color:'#E6F4F1'}
      ]
    },
    {
      name: '比亚迪', enName: 'BYD', domain: 'byd.com', tags: ['全产业链', '电池+整车'], ecoNiche: '全产业链',
      moatPro: '电池→电机→电控→整车的全产业链垂直整合，刀片电池+DM-i混动双技术路线。',
      moatEz: '造车像做菜——电池自己种、锅自己打、灶自己砌，别人买菜的时候他已经上桌了。',
      lifecycle: 2, lifeLabel: '成长期',
      revenue: [
        {label:'新能源汽车', pct:80, color:'#00AAB8'},
        {label:'动力电池外供', pct:14, color:'#B8E4E3'},
        {label:'电子+手机代工', pct:6, color:'#E6F4F1'}
      ]
    },
    {
      name: '理想汽车', enName: 'Li Auto', domain: 'lixiang.com', tags: ['家庭场景', '增程路线'], ecoNiche: '细分领跑',
      moatPro: '增程式避开补能焦虑+精准锁定奶爸家庭用户+销售运营强执行力，ROI最高的造车新势力。',
      moatEz: '不跟你卷纯电，专卖给带娃的爸爸——冰箱彩电大沙发，一家五口出门像搬家也不慌。',
      lifecycle: 2, lifeLabel: '成长期',
      revenue: [
        {label:'整车销售', pct:96, color:'#00AAB8'},
        {label:'服务+其他', pct:4, color:'#B8E4E3'}
      ]
    }
  ],

  nev: [
    {
      name: '比亚迪', enName: 'BYD', domain: 'byd.com', tags: ['销量冠军', '全球Top1'], ecoNiche: '全产业链',
      moatPro: '电池+电机+电控+半导体全栈自研，年销超400万辆的规模摊薄效应+DM-i混动专利壁垒。',
      moatEz: '别人造车要找 10 个供应商，他一个人能开 10 家店——成本天然比别人低 20%。',
      lifecycle: 2, lifeLabel: '成长期',
      revenue: [
        {label:'新能源汽车', pct:80, color:'#00AAB8'},
        {label:'动力电池外供', pct:14, color:'#B8E4E3'},
        {label:'电子+代工', pct:6, color:'#E6F4F1'}
      ]
    },
    {
      name: '特斯拉', enName: 'Tesla', domain: 'tesla.com', tags: ['品牌溢价', '科技属性'], ecoNiche: '终端应用',
      moatPro: '第一性原理降本+自建超充网络+FSD订阅闭环，定义行业价格天花板与技术节奏。',
      moatEz: '车卖完他还能按月收软件费，别人卖一次就完了，他是"车界的 iPhone"。',
      lifecycle: 2, lifeLabel: '成长期',
      revenue: [
        {label:'整车销售', pct:84, color:'#00AAB8'},
        {label:'能源+储能', pct:9, color:'#B8E4E3'},
        {label:'FSD/服务', pct:7, color:'#E6F4F1'}
      ]
    },
    {
      name: '小米汽车', enName: 'Xiaomi EV', domain: 'xiaomiev.com', tags: ['生态导流', '后起之秀'], ecoNiche: '跨界颠覆',
      moatPro: '手机+家电+汽车"人车家全生态"闭环+小米供应链议价权，首款SU7年交付突破13万台。',
      moatEz: '买他的车送 10 亿手机用户的社区+生态，别人造车像开店，小米造车像开连锁。',
      lifecycle: 1, lifeLabel: '初创期',
      revenue: [
        {label:'汽车整车', pct:92, color:'#00AAB8'},
        {label:'智能生态', pct:8, color:'#B8E4E3'}
      ]
    }
  ],

  ai: [
    {
      name: 'OpenAI', enName: 'OpenAI', domain: 'openai.com', tags: ['大模型鼻祖', 'ChatGPT'], ecoNiche: '基础设施',
      moatPro: 'GPT系列模型定义了行业范式+10亿MAU的数据飞轮+微软Azure独家算力+顶尖研究员网络。',
      moatEz: '全世界 10 亿人每天帮他训练脑子，别人再聪明也追不上——这就是先发优势的复利。',
      lifecycle: 2, lifeLabel: '成长期',
      revenue: [
        {label:'API调用', pct:35, color:'#00AAB8'},
        {label:'ChatGPT订阅', pct:55, color:'#B8E4E3'},
        {label:'企业版', pct:10, color:'#E6F4F1'}
      ]
    },
    {
      name: 'Anthropic', enName: 'Anthropic', domain: 'anthropic.com', tags: ['安全派', 'Claude'], ecoNiche: '基础设施',
      moatPro: 'RLAIF/Constitutional AI等安全对齐技术领先+Amazon+Google双金主+代码生成能力行业Top1。',
      moatEz: '走"不作恶"路线的AI，企业用他不怕翻车——是大模型里的"德系车"。',
      lifecycle: 2, lifeLabel: '成长期',
      revenue: [
        {label:'API调用', pct:70, color:'#00AAB8'},
        {label:'Claude订阅', pct:25, color:'#B8E4E3'},
        {label:'企业合作', pct:5, color:'#E6F4F1'}
      ]
    },
    {
      name: '字节跳动', enName: 'ByteDance', domain: 'bytedance.com', tags: ['C端入口', '豆包/Doubao'], ecoNiche: '终端应用',
      moatPro: '抖音+TikTok 30亿MAU的超级流量入口+豆包大模型全免费激进打法+推荐算法十年积累。',
      moatEz: '别家AI要教用户用，他直接塞进抖音——用户还没反应过来，就已经在用他的AI了。',
      lifecycle: 2, lifeLabel: '成长期',
      revenue: [
        {label:'广告', pct:75, color:'#00AAB8'},
        {label:'电商+本地', pct:18, color:'#B8E4E3'},
        {label:'AI+其他', pct:7, color:'#E6F4F1'}
      ]
    }
  ],

  ai_chip: [
    {
      name: 'NVIDIA', enName: 'NVIDIA', domain: 'nvidia.com', tags: ['AI算力垄断', 'CUDA生态'], ecoNiche: '基础设施',
      moatPro: 'CUDA软件生态20年积累+数据中心GPU 90%市占率+NVLink/InfiniBand互联+供应链议价权。',
      moatEz: 'AI时代"卖铲子的"，全世界所有淘金的人都得找他买铲子，还只认他家的铲子。',
      lifecycle: 2, lifeLabel: '成长期',
      revenue: [
        {label:'数据中心', pct:88, color:'#00AAB8'},
        {label:'游戏显卡', pct:9, color:'#B8E4E3'},
        {label:'汽车+专业', pct:3, color:'#E6F4F1'}
      ]
    },
    {
      name: 'AMD', enName: 'AMD', domain: 'amd.com', tags: ['二号玩家', 'MI系列'], ecoNiche: '基础设施',
      moatPro: 'MI300X对标H100 + ROCm软件生态追赶 + 赛灵思FPGA+Xilinx协同 + CPU服务器份额反超Intel。',
      moatEz: '英伟达太贵了，大厂又不想被绑死，AMD 就是那个"备胎"——但备胎也能月销百亿美金。',
      lifecycle: 3, lifeLabel: '成熟期',
      revenue: [
        {label:'数据中心', pct:50, color:'#00AAB8'},
        {label:'客户端CPU', pct:26, color:'#B8E4E3'},
        {label:'游戏+嵌入', pct:24, color:'#E6F4F1'}
      ]
    },
    {
      name: '寒武纪', enName: 'Cambricon', domain: 'cambricon.com', tags: ['国产替代', '思元系列'], ecoNiche: '细分领跑',
      moatPro: 'AI芯片第一股+思元590对标H100国产替代核心+中科院背景+字节/阿里订单放量。',
      moatEz: '英伟达被禁了，国内大厂只能找他——被美国制裁"倒逼"出来的中国AI芯片一哥。',
      lifecycle: 2, lifeLabel: '成长期',
      revenue: [
        {label:'云端芯片', pct:82, color:'#00AAB8'},
        {label:'智能计算集群', pct:15, color:'#B8E4E3'},
        {label:'边缘+IP授权', pct:3, color:'#E6F4F1'}
      ]
    }
  ],

  ecommerce: [
    {
      name: '拼多多', enName: 'PDD', domain: 'pinduoduo.com', tags: ['Temu出海', '社交裂变'], ecoNiche: '终端应用',
      moatPro: '全托管+社交裂变打法+下沉市场14亿用户+极致供应链管理，Temu年GMV突破500亿美金。',
      moatEz: '别人卷价格他卷底价，别人卷物流他卷"包邮到家"——电商界的"拆家达人"。',
      lifecycle: 2, lifeLabel: '成长期',
      revenue: [
        {label:'在线营销服务', pct:55, color:'#00AAB8'},
        {label:'交易服务(Temu)', pct:43, color:'#B8E4E3'},
        {label:'商品销售', pct:2, color:'#E6F4F1'}
      ]
    },
    {
      name: '阿里巴巴', enName: 'Alibaba', domain: 'alibaba.com', tags: ['淘天+云', '基础设施'], ecoNiche: '基础设施',
      moatPro: '淘天10亿用户心智+菜鸟物流网络+阿里云亚太第一+蚂蚁金融基础设施，中国最完整的电商生态。',
      moatEz: '你买个东西从下单到送达全是他家的——平台、物流、支付、云服务"一鱼多吃"。',
      lifecycle: 3, lifeLabel: '成熟期',
      revenue: [
        {label:'淘天集团', pct:43, color:'#00AAB8'},
        {label:'云业务', pct:11, color:'#B8E4E3'},
        {label:'国际+菜鸟+本地', pct:46, color:'#E6F4F1'}
      ]
    },
    {
      name: '京东', enName: 'JD.com', domain: 'jd.com', tags: ['自营供应链', '次日达'], ecoNiche: '全产业链',
      moatPro: '自建物流网络(京东物流超30万员工)+自营供应链正品保障+3C家电品类心智壁垒。',
      moatEz: '别人卖货他先买下来再卖——贵一点但东西真、送得快，是"电商界的老实人"。',
      lifecycle: 3, lifeLabel: '成熟期',
      revenue: [
        {label:'自营商品', pct:85, color:'#00AAB8'},
        {label:'平台+广告', pct:10, color:'#B8E4E3'},
        {label:'物流+其他', pct:5, color:'#E6F4F1'}
      ]
    }
  ],

  medAesth: [
    {
      name: '爱美客', enName: 'Imeik', domain: 'imeik.com', tags: ['玻尿酸一哥', '90%毛利'], ecoNiche: '基础设施',
      moatPro: '嗨体/濡白天使等核心产品NMPA三类医疗器械证稀缺+毛利率95%+研发管线20+，医美上游王者。',
      moatEz: '医美行业的"茅台"——你去任何一家医美机构打的针，有一半是他家产的。',
      lifecycle: 2, lifeLabel: '成长期',
      revenue: [
        {label:'溶液类(嗨体)', pct:50, color:'#00AAB8'},
        {label:'凝胶类(濡白)', pct:45, color:'#B8E4E3'},
        {label:'其他', pct:5, color:'#E6F4F1'}
      ]
    },
    {
      name: '华熙生物', enName: 'Bloomage', domain: 'bloomagebiotech.com', tags: ['原料龙头', 'C端润百颜'], ecoNiche: '全产业链',
      moatPro: '全球玻尿酸原料产能40%+润百颜/夸迪等C端品牌矩阵+发酵技术平台，原料→医疗器械→化妆品全链路。',
      moatEz: '全世界一半的玻尿酸是他家种的——从原料、到打针、到擦脸，他都有份。',
      lifecycle: 3, lifeLabel: '成熟期',
      revenue: [
        {label:'功能性护肤', pct:60, color:'#00AAB8'},
        {label:'医疗终端', pct:20, color:'#B8E4E3'},
        {label:'原料业务', pct:20, color:'#E6F4F1'}
      ]
    },
    {
      name: '新氧', enName: 'SoYoung', domain: 'soyoung.com', tags: ['C端流量入口', '医美大众点评'], ecoNiche: '终端应用',
      moatPro: '医美领域内容+社区+电商闭环+日记案例库沉淀+机构SaaS工具，中国医美用户决策第一入口。',
      moatEz: '想去割双眼皮先上新氧看作业——他做的是医美界的"大众点评"。',
      lifecycle: 3, lifeLabel: '成熟期',
      revenue: [
        {label:'信息服务(预约)', pct:65, color:'#00AAB8'},
        {label:'预约返佣', pct:25, color:'#B8E4E3'},
        {label:'设备+SaaS', pct:10, color:'#E6F4F1'}
      ]
    }
  ],

  gaming: [
    {
      name: '腾讯游戏', enName: 'Tencent Games', domain: 'tencent.com', tags: ['全球Top1', '长线运营'], ecoNiche: '基础设施',
      moatPro: 'Supercell/Riot/Epic全球顶级工作室控股+王者荣耀/和平精英10亿DAU+微信QQ分发垄断。',
      moatEz: '全世界一半的爆款游戏他要么自己做、要么投资了——游戏圈的"地主家"。',
      lifecycle: 3, lifeLabel: '成熟期',
      revenue: [
        {label:'游戏业务', pct:32, color:'#00AAB8'},
        {label:'广告+金融', pct:28, color:'#B8E4E3'},
        {label:'社交+云+其他', pct:40, color:'#E6F4F1'}
      ]
    },
    {
      name: '米哈游', enName: 'miHoYo', domain: 'mihoyo.com', tags: ['二次元天花板', '原神出海'], ecoNiche: '细分领跑',
      moatPro: '《原神》《崩坏:星穹铁道》年流水双百亿+自研引擎+二次元用户超高粘性+日本/韩国海外第一梯队。',
      moatEz: '"技术宅拯救世界"不是口号——一家私企年利润超过很多A股上市公司。',
      lifecycle: 2, lifeLabel: '成长期',
      revenue: [
        {label:'原神', pct:55, color:'#00AAB8'},
        {label:'星穹铁道', pct:30, color:'#B8E4E3'},
        {label:'绝区零+其他', pct:15, color:'#E6F4F1'}
      ]
    },
    {
      name: '网易游戏', enName: 'NetEase Games', domain: '163.com', tags: ['研发见长', '《蛋仔派对》'], ecoNiche: '全产业链',
      moatPro: '自研MMORPG技术积累20年+暴雪代理(重启)+蛋仔派对休闲赛道统治+永劫无间/逆水寒多品类布局。',
      moatEz: '腾讯靠买，网易靠练——自己养工作室、自己抠细节，是游戏圈的"工匠品牌"。',
      lifecycle: 3, lifeLabel: '成熟期',
      revenue: [
        {label:'在线游戏', pct:77, color:'#00AAB8'},
        {label:'创新业务', pct:15, color:'#B8E4E3'},
        {label:'有道+云音乐', pct:8, color:'#E6F4F1'}
      ]
    }
  ],

  robotics: [
    {
      name: '发那科', enName: 'FANUC', domain: 'fanuc.com', tags: ['工业机器人四大家族', '日本龙头'], ecoNiche: '基础设施',
      moatPro: '伺服电机+数控系统自研垂直整合+全球工业机器人出货量Top1+汽车/3C产线装机量第一。',
      moatEz: '全世界汽车厂的流水线上，一半的机械臂是黄色的——那就是发那科的颜色。',
      lifecycle: 3, lifeLabel: '成熟期',
      revenue: [
        {label:'FA(工厂自动化)', pct:40, color:'#00AAB8'},
        {label:'机器人', pct:35, color:'#B8E4E3'},
        {label:'机床+其他', pct:25, color:'#E6F4F1'}
      ]
    },
    {
      name: '特斯拉Optimus', enName: 'Tesla Bot', domain: 'tesla.com', tags: ['人形机器人', '2026量产'], ecoNiche: '终端应用',
      moatPro: 'FSD端到端大模型+Dojo自研算力+车企供应链复用+马斯克叙事带动整个赛道估值。',
      moatEz: '马斯克说"每个人都会有个机器人管家"——全世界都在等他把这事干成。',
      lifecycle: 1, lifeLabel: '初创期',
      revenue: [
        {label:'研发阶段', pct:100, color:'#00AAB8'}
      ]
    },
    {
      name: '宇树科技', enName: 'Unitree', domain: 'unitree.com', tags: ['国产人形黑马', 'G1/H1'], ecoNiche: '细分领跑',
      moatPro: '四足机器人全球销量第一+人形机器人G1售价仅9.9万起+运动控制算法行业领先+春晚出圈。',
      moatEz: '春晚上那些跳舞的机器人是他家做的——中国版"波士顿动力"，还更便宜。',
      lifecycle: 1, lifeLabel: '初创期',
      revenue: [
        {label:'四足机器人', pct:70, color:'#00AAB8'},
        {label:'人形机器人', pct:25, color:'#B8E4E3'},
        {label:'教育+科研', pct:5, color:'#E6F4F1'}
      ]
    }
  ],

  saas: [
    {
      name: 'Salesforce', enName: 'Salesforce', domain: 'salesforce.com', tags: ['CRM之王', '云原生鼻祖'], ecoNiche: '基础设施',
      moatPro: 'CRM全球市占率23%+AppExchange生态+Einstein AI+收购Slack/Tableau/MuleSoft构建企业云全家桶。',
      moatEz: 'B端软件的"Windows"——企业一旦用他家的CRM，想换都换不掉。',
      lifecycle: 3, lifeLabel: '成熟期',
      revenue: [
        {label:'订阅与支持', pct:94, color:'#00AAB8'},
        {label:'专业服务', pct:6, color:'#B8E4E3'}
      ]
    },
    {
      name: '钉钉', enName: 'DingTalk', domain: 'dingtalk.com', tags: ['中国第一', '办公协同'], ecoNiche: '终端应用',
      moatPro: '阿里生态+7亿用户+考勤/审批/日志全覆盖+低代码开放平台宜搭，中国企业协同SaaS用户数第一。',
      moatEz: '打工人的"爱恨集合体"——一边吐槽它、一边离不开它。',
      lifecycle: 2, lifeLabel: '成长期',
      revenue: [
        {label:'SaaS订阅', pct:55, color:'#00AAB8'},
        {label:'专属版(企业)', pct:35, color:'#B8E4E3'},
        {label:'生态+API', pct:10, color:'#E6F4F1'}
      ]
    },
    {
      name: '飞书', enName: 'Lark', domain: 'feishu.cn', tags: ['新世代SaaS', '字节出品'], ecoNiche: '细分领跑',
      moatPro: '字节内部践行产物+IM/文档/表格/视频/OKR一体化+OpenAPI开放生态+北美Lark对标Slack。',
      moatEz: '字节跳动内部用的工具外溢出来——别人用钉钉觉得累，他家主打"让工作轻量点"。',
      lifecycle: 2, lifeLabel: '成长期',
      revenue: [
        {label:'订阅服务', pct:80, color:'#00AAB8'},
        {label:'定制实施', pct:15, color:'#B8E4E3'},
        {label:'生态合作', pct:5, color:'#E6F4F1'}
      ]
    }
  ],

  bio: [
    {
      name: '恒瑞医药', enName: 'Hengrui', domain: 'hengrui.com', tags: ['国内创新药一哥', 'PD-1领先'], ecoNiche: '全产业链',
      moatPro: '国内研发管线最多(250+)+卡瑞利珠PD-1销售额Top+仿创结合转型创新药领头羊+BD出海加速。',
      moatEz: '中国制药界的"华为"——研发投入最狠、管线最深，A股创新药龙头。',
      lifecycle: 3, lifeLabel: '成熟期',
      revenue: [
        {label:'创新药', pct:52, color:'#00AAB8'},
        {label:'仿制药', pct:43, color:'#B8E4E3'},
        {label:'原料药+其他', pct:5, color:'#E6F4F1'}
      ]
    },
    {
      name: '百济神州', enName: 'BeiGene', domain: 'beigene.com', tags: ['全球化BD', '泽布替尼出海'], ecoNiche: '终端应用',
      moatPro: '泽布替尼全球销售破百亿人民币+美股/港股/A股三地上市+全球临床中心布局+替雷利珠对标K药。',
      moatEz: '中国第一个把创新药卖到美国主流市场的——"中国医药出海的苹果手机"。',
      lifecycle: 2, lifeLabel: '成长期',
      revenue: [
        {label:'自研创新药', pct:70, color:'#00AAB8'},
        {label:'合作授权', pct:20, color:'#B8E4E3'},
        {label:'其他', pct:10, color:'#E6F4F1'}
      ]
    },
    {
      name: '药明康德', enName: 'WuXi AppTec', domain: 'wuxiapptec.com', tags: ['CXO龙头', '一站式平台'], ecoNiche: '基础设施',
      moatPro: 'CRO+CDMO+CGT全产业链布局+全球Top20药企客户全覆盖+美国/欧洲/中国三地产能+端到端服务。',
      moatEz: '全世界药企研发的"代工厂"——默克辉瑞的药，很多都是药明帮他们做的。',
      lifecycle: 3, lifeLabel: '成熟期',
      revenue: [
        {label:'化学业务(D+M)', pct:65, color:'#00AAB8'},
        {label:'测试业务', pct:18, color:'#B8E4E3'},
        {label:'生物+CGT+其他', pct:17, color:'#E6F4F1'}
      ]
    }
  ],

  semi: [
    {
      name: '台积电', enName: 'TSMC', domain: 'tsmc.com', tags: ['晶圆代工之王', '3nm量产'], ecoNiche: '基础设施',
      moatPro: '先进制程全球份额90%+苹果/NVIDIA/AMD独家代工+N3/N2技术节点领先+EUV/CoWoS产能稀缺。',
      moatEz: '全世界最牛的芯片都在他这里流片——没有台积电，苹果、英伟达都造不出芯片。',
      lifecycle: 3, lifeLabel: '成熟期',
      revenue: [
        {label:'高性能计算', pct:51, color:'#00AAB8'},
        {label:'智能手机', pct:33, color:'#B8E4E3'},
        {label:'汽车+IoT+其他', pct:16, color:'#E6F4F1'}
      ]
    },
    {
      name: 'ASML', enName: 'ASML', domain: 'asml.com', tags: ['光刻机垄断', 'EUV独家'], ecoNiche: '基础设施',
      moatPro: 'EUV光刻机全球唯一供应商+NXE/NXT系列价格3-5亿美金+技术壁垒40年积累+蔡司光学+台积电联盟。',
      moatEz: '全世界只有他一家能造出造芯片的"超级机器"——被美国卡脖子的真正瓶颈就是他。',
      lifecycle: 3, lifeLabel: '成熟期',
      revenue: [
        {label:'EUV光刻机', pct:45, color:'#00AAB8'},
        {label:'DUV+其他', pct:35, color:'#B8E4E3'},
        {label:'服务+升级', pct:20, color:'#E6F4F1'}
      ]
    },
    {
      name: '中芯国际', enName: 'SMIC', domain: 'smics.com', tags: ['国产替代', '14nm量产'], ecoNiche: '全产业链',
      moatPro: '中国大陆晶圆代工第一+14nm量产+7nm特殊工艺突破+国家大基金重仓+制裁下国产替代关键。',
      moatEz: '中国的"台积电追赶者"——虽然差几代，但是华为、海思的救命稻草。',
      lifecycle: 2, lifeLabel: '成长期',
      revenue: [
        {label:'晶圆代工', pct:93, color:'#00AAB8'},
        {label:'光罩+测试', pct:5, color:'#B8E4E3'},
        {label:'其他服务', pct:2, color:'#E6F4F1'}
      ]
    }
  ]

  /* 其余 90 个行业：默认使用通用模板，由 getCompaniesForIndustry() 返回占位 */
};

/**
 * 通用兜底：对于没有专属Top3数据的行业，返回基于行业名的通用展示
 */
window.getCompaniesForIndustry = function(indId, indName) {
  if (window.COMPANIES_DB[indId]) {
    return window.COMPANIES_DB[indId];
  }
  return null; // null 则不展示，保持页面干净
};
