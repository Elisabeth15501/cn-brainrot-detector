
/* 烂梗词典：t=烂梗，p=日常得体说法，e=文雅说法（书面/书卷气），n=吐槽注解
   amb=true 表示高歧义词（本义≠网络义，需看语境），ex 为豁免正则数组：
   命中位置前后窗口内匹配到任一模式，即视为「本义用法」，不计入烂梗。 */
const DICT = [
  {t:"绝绝子",p:"很好 / 出色",e:"极佳 / 出类拔萃",n:"好东西说烂了，换个字试试？"},
  {t:"栓Q",p:"谢谢",e:"承蒙厚爱 / 感念",n:"Thank you 的塑料音译，真诚度 -50%"},
  {t:"家人们",p:"各位 / 大家",e:"诸位 / 同道",n:"你和观众不是一家人，别硬认亲"},
  {t:"家人们谁懂啊",p:"大家谁理解我",e:"此中况味，知者几何",n:"把「家人」去掉就通顺了"},
  {t:"emo",p:"情绪低落",e:"怅然若失 / 心绪低回",n:"情绪化缩写，正经说「难过」不丢人"},
  {t:"破防",p:"深受触动 / 崩溃",e:"心防溃散 / 情难自持",n:"游戏术语乱用，说「被戳中」更清楚",
   amb:true, ex:[/破防(?:机制|值|伤害|状态|效果|技能|装备|护甲|属性|加成|免疫|boss|BOSS)/,/打破防御|破除防御/]},
  {t:"City不City",p:"洋气 / 都市感",e:"摩登 / 都会风致",n:"老外口音梗，说「时尚」就够"},
  {t:"尊嘟假嘟",p:"真的假的",e:"信否 / 果真如此",n:"卖萌版疑问，正常问就行"},
  {t:"六边形战士",p:"全能选手",e:"文武兼资 / 众长咸备",n:"形容全面，说「全能」不丢份"},
  {t:"显眼包",p:"爱出风头的人",e:"锋芒外露者",n:"想吐槽直接说「爱表现」"},
  {t:"遥遥领先",p:"大幅领先",e:"一骑绝尘",n:"被玩成梗了，说「领先很多」更稳"},
  {t:"多巴胺",p:"让人愉悦的",e:"赏心悦目 / 怡情悦性",n:"颜色鲜艳就说「鲜艳」，别什么都多巴胺",
   amb:true, ex:[/多巴胺(?:分泌|受体|神经元|水平|浓度|药物|阻断|缺乏|综合征|注射|亢进|系统)/]},
  {t:"天花板",p:"顶尖水平",e:"登峰造极 / 炉火纯青",n:"顶多说「最强」，别凡事都天花板",
   amb:true, ex:[/天花板(?:吊顶|漏水|渗水|装修|灯|裂缝|塌|掉|刷|装|拆|改造|白|灰|上面|下面|高度|位置|湿|脏|掉皮)/]},
  {t:"yyds",p:"永远的最佳",e:"千古无双 / 一时之冠",n:"永远的神缩写，写「最佳」看得懂"},
  {t:"上头",p:"入迷",e:"沉醉 / 不能自已",n:"说「着迷」更书面",
   amb:true, ex:[/上头(?:说|有|来|派|叫|让|命令|规定|指示|文件|意见|意思|要求|批准|同意|发话|问责)/,
    /上头的(?:命令|规定|指示|文件|意见|意思|要求)/,
    /找上头|问上头|向上头|给上头|跟上头|听上头|瞒着上头|请示上头|汇报上头|归上头管/,
    /喝酒.{0,3}上头|酒后上头|酒.{0,3}上头|不上头|喝了.{0,2}上头/,
    /及笄.{0,2}上头|上头礼/]},
  {t:"拿捏",p:"掌控 / 搞定",e:"运筹自如 / 游刃有余",n:"说「搞定」更直接",
   amb:true, ex:[/拿捏(?:分寸|尺度|火候|轻重|到位|得当|准|好)/]},
  {t:"躺平",p:"不作为",e:"随遇而安 / 退守本心",n:"社会现象词，描述时可用「放弃努力」",
   amb:true, ex:[/躺平(?:在|着|休息|睡觉|床上|沙发|地上|一会|一下|好好|安心|不想动)/]},
  {t:"内卷",p:"过度竞争",e:"竞逐无已 / 逐末忘本",n:"说「恶性竞争」更准确",
   amb:true, ex:[/内卷(?:化|效应|现象|理论|式)/]},
  {t:"社死",p:"当众出丑",e:"颜面尽失 / 无地自容",n:"社交死亡，说「丢脸」就行"},
  {t:"普信",p:"普通却自信",e:"才疏而志满",n:"略带贬义，慎用"},
  {t:"芭比Q了",p:"糟了 / 完蛋",e:"事不可为 / 大势已去",n:"barbecue 音译，说「完了」更清楚"},
  {t:"泰裤辣",p:"太酷了",e:"风神俊逸 / 卓尔不群",n:"塑料音译，直接说「太酷」"},
  {t:"冤种",p:"倒霉蛋 / 冤大头",e:"遇人不淑 / 徒呼奈何",n:"说「吃亏的人」更得体"},
  {t:"我滴个豆",p:"我的天",e:"嗟乎 / 不胜惊异",n:"语气词，说「天哪」更自然"},
  {t:"啊对对对",p:"敷衍附和",e:"唯唯诺诺 / 姑妄听之",n:"阴阳怪气附和，直说「好吧」也行"},
  {t:"典中典",p:"典型得可笑",e:"荒谬之尤",n:"「经典」的嘲讽写法，少用"},
  {t:"小丑竟是我自己",p:"尴尬地发现自己是笑话",e:"反成笑柄 / 弄巧成拙",n:"自嘲可以，但有点长"},
  {t:"针不戳",p:"真不错",e:"诚为佳作 / 实属上乘",n:"塑料音译，说「真不错」"},
  {t:"集美",p:"姐妹",e:"闺中密友 / 金兰之契",n:"谐音梗，叫「姐妹」更正常"},
  {t:"干饭人",p:"吃饭的人",e:"就食 / 谋食之人",n:"说「吃饭」就好"},
  {t:"打工人",p:"上班族",e:"谋生者 / 职事之人",n:"可用，但已泛滥"},
  {t:"尾款人",p:"付尾款的人",e:"偿其值者",n:"特定语境可用"},
  {t:"CPU你",p:"忽悠你 / 精神控制你",e:"惑乱其心 / 巧言令色",n:"说「忽悠」更明白"},
  {t:"暴风吸入",p:"狼吞虎咽",e:"风卷残云 / 大快朵颐",n:"形容吃，说「大口吃」"},
  {t:"沉浸式",p:"专注地",e:"凝神专注 / 物我两忘",n:"什么都说沉浸式，说「认真」就行",
   amb:true, ex:[/沉浸式(?:消费|体验|文旅|旅游|展览|展演|演出|演艺|空间|项目|场景|街区|夜游|剧场|音乐|文化|经济|课堂|戏剧|游戏|装置)/]},
  {t:"氛围感",p:"营造的气氛",e:"意境 / 气象",n:"说「气氛」更准"},
  {t:"治愈",p:"令人舒缓",e:"慰藉身心 / 涤荡尘劳",n:"可用，但被用烂了",
   amb:true, ex:[/治愈(?:率|出院|患者|疾病|病症|伤口|病情|成功|无效|药|方案|疗程)/,/被治愈|已治愈|得以治愈|可治愈|不可治愈/]},
  {t:"宝藏",p:"难得的好物",e:"遗珠 / 世外珍奇",n:"说「好东西」更直接",
   amb:true, ex:[/宝藏(?:文物|遗址|发掘|出土|地图|埋藏|所在|传说|猎人|归|属|价值|之谜|秘)/]},
  {t:"神仙",p:"极好的",e:"出神入化 / 臻于至善",n:"说「出色」更稳",
   amb:true, ex:[/神仙(?:思想|传说|方士|之术|谱|体系|殿|境|居|府|故事)/,/做神仙|当神仙|成神仙|不愿作神仙|修仙|得道|长生不老|愿作.{0,6}神仙/]},
  {t:"封神",p:"达到巅峰",e:"登临绝顶 / 冠绝一时",n:"夸张，说「极佳」",
   amb:true, ex:[/封神(?:演义|榜|之战|宇宙|故事|传说|台)/,/姜子牙封神|封神台上/]},
  {t:"杀疯了",p:"表现极出色",e:"所向披靡 / 锋芒毕露",n:"夸张，说「发挥很好」"},
  {t:"香爆了",p:"非常喜欢",e:"倾心不已 / 爱不释手",n:"说「很喜欢」"},
  {t:"香迷糊了",p:"非常喜欢",e:"神魂俱醉 / 心折于此",n:"说「很喜欢」"},
  {t:"基因觉醒",p:"突然热爱",e:"夙好复苏 / 天性使然",n:"说「突然喜欢上」"},
  {t:"血脉觉醒",p:"突然热爱",e:"本性回归 / 本心苏醒",n:"说「突然喜欢上」"},
  {t:"听劝",p:"接受建议",e:"从善如流 / 虚怀纳言",n:"可用"},
  {t:"绝了",p:"太棒了 / 太离谱",e:"叹为观止 / 匪夷所思",n:"看语境，说「厉害」或「离谱」",
   amb:true, ex:[/绝了(?:后|根|种|户|宗)/,/做[得]?太绝了|干[得]?太绝了|太绝了|气绝了|昏绝了/,/断绝了/]},
  {t:"上价值",p:"拔高意义",e:"升华主旨 / 寄意深远",n:"说「升华主题」"},
  {t:"破局",p:"突破",e:"另辟蹊径 / 别开生面",n:"说「突破」更清楚"},
  {t:"拿捏得死死的",p:"完全掌控",e:"稳操胜券 / 了如指掌",n:"说「牢牢掌控」"},
  {t:"赢麻了",p:"大获全胜",e:"大获全功 / 独占鳌头",n:"说「大胜」"},
  {t:"神金",p:"离谱 / 神经",e:"荒诞不经 / 悖乎常理",n:"方言梗，说「离谱」"},
  {t:"很唐",p:"很离谱 / 很滑稽",e:"荒诞不经 / 令人捧腹",n:"源自唐氏综合征的贬义梗，官方已点名整治，别拿疾病开玩笑"},
  {t:"真唐",p:"真离谱 / 真滑稽",e:"不堪卒睹 / 令人咋舌",n:"同上，低俗歧视性烂梗，慎用"},
  {t:"唐",p:"离谱 / 呆",e:"痴钝 / 荒诞无稽",n:"唐氏综合征污名化+谐音「躺」的烂梗；唐朝/唐装/唐诗/姓唐等正经语境不算",
   amb:true, only:[/唐(?:死了|完了|顺飞)/,/唐氏(?!综合征|筛查|儿)/,/唐了(?!朝)/,
    /(?:这么|那么|有点|特别|真的|好|超|巨)唐(?!朝|装|诗|宋|代)/]},
  {t:"老6",p:"阴险的人 / 老油条",e:"城府深沉 / 诡谲之徒",n:"说「狡猾」"},
  /* —— 官媒（央视/新华社/人民日报/文汇/北京日报等）点名过的烂梗 —— */
  {t:"鸡你太美",p:"只因你太美（原歌词）",e:"清扬婉转 / 曲尽其妙",n:"蔡徐坤「只因你太美」被空耳恶搞，央视点名批评"},
  {t:"报giao",p:"报告",e:"禀报 / 陈请",n:"giao哥口癖梗「老师，报giao」，央视点名"},
  {t:"红温",p:"急了 / 崩溃",e:"怒形于色 / 情难自抑",n:"游戏残血红条引申「急眼破防」，央视点名",
   amb:true, ex:[/红温(?:状态|机制|条|被动|技能|效果|系统|值|层数|特效)/]},
  {t:"丸辣",p:"完了",e:"大势已去 / 事不可为",n:"「完了」谐音变体，正义网/新华社点名"},
  {t:"细狗",p:"瘦弱的人 / 怂货",e:"羸弱之辈 / 怯懦之徒",n:"本指细犬，现嘲讽身材瘦弱或怂，正义网点名",
   amb:true, ex:[/细狗(?:撵兔|陕西|赛犬|猎犬|犬种|品种|跑得快)/]},
  {t:"DDDD",p:"懂的都懂",e:"心照不宣 / 不言而喻",n:"「懂得都懂」首字母缩写，新华社点名"},
  {t:"XSWL",p:"笑死我了",e:"令人捧腹 / 忍俊不禁",n:"「笑死我了」缩写，新华社点名"},
  {t:"大香蕉",p:"（无意义句尾词）",e:"（无意义）",n:"恶搞视频配乐梗，句尾加「大香蕉」+苍蝇搓手，北京日报点名",
   amb:true, ex:[/根大香蕉|个大香蕉|买(?:了)?大香蕉|吃(?:了)?大香蕉|大香蕉(?:牛奶|味|皮|树|园|种植|把|一斤|水果|蛋糕|面包|布丁|奶昔|汁|片|熟|便宜|贵)/]},
  {t:"泥嚎",p:"你好",e:"幸会 / 久仰",n:"「你好」卖萌谐音，北京日报点名"},
  {t:"河南拔智齿",p:"很难不支持",e:"深以为然 / 不敢苟同",n:"「很难不支持」谐音梗，北京日报点名"},
  {t:"修勾",p:"小狗",e:"幼犬 / 犬子（戏）",n:"「小狗」谐音卖萌，新华社点名"},
  {t:"奥利给",p:"加油 / 给力",e:"砥砺奋进 / 鼓舞人心",n:"快手「奥力给」口号被玩烂，文汇报点名"},
  {t:"我真的会谢",p:"我真的很无语",e:"百口莫辩 / 无可奈何",n:"thank you 反讽「谢你（个鬼）」，南方都市报点名"},
  {t:"嘎了",p:"完了 / 没了",e:"溘然长逝（慎）",n:"东北方言「死了/完了」被玩成负面梗，南方都市报点名"},
  {t:"我没K",p:"（无意义歌词）",e:"（无意义）",n:"网络神曲《我没K》空耳梗，南方都市报点名"},
  {t:"夺笋",p:"真损 / 太损了",e:"刁钻刻薄 / 损人利己",n:"「多损啊」谐音，新华网点名"},
  {t:"雨女无瓜",p:"与你无关",e:"与君无涉 / 事不关己",n:"《巴啦啦小魔仙》游乐王子口音梗，文汇报点名"},
  {t:"有猫饼",p:"有毛病",e:"行有乖戾 / 失之偏颇",n:"「有毛病」谐音，文汇报点名"},
  {t:"报一丝",p:"不好意思",e:"多有冒犯 / 深表歉意",n:"「不好意思」谐音，文汇报点名"},
  {t:"基操勿6",p:"基本操作别惊叹",e:"寻常手段 / 不足为奇",n:"「基本操作，勿扣6」，南方都市报点名"},
  {t:"你个双肩包",p:"你个神经病",e:"君实癫狂 / 病入膏肓",n:"「你个神经病」谐音，新华社2025点名"},
  {t:"摆烂",p:"放任不管",e:"自暴自弃 / 破罐破摔",n:"消极态度词，被列负面烂梗，文汇报点名"},
  {t:"食不食油饼",p:"是不是有病",e:"岂非病乎 / 妄言乖张",n:"「是不是有病」谐音，文汇报点名"},
  {t:"十动然拒",p:"十分感动然后拒绝",e:"感念于心，然敬谢不敏",n:"仿成语生造词，文汇报点名批评"},
  {t:"蓝色妖姬切尔西",p:"（无意义调侃）",e:"（无意义）",n:"玫瑰名+靴子名的无意义拼接梗，文汇报点名"},
  {t:"卷单",p:"下单",e:"惠购 / 从速下单",n:"「下单」变体说法，文汇报点名"},
  {t:"神马",p:"什么",e:"何者 / 何事",n:"「什么」谐音（神马都是浮云），文汇报点名"},
  {t:"2333",p:"（大笑）",e:"（大笑）",n:"数字表情表大笑，文汇报点名"},
  {t:"PUA",p:"精神控制 / 打压操控",e:"诛心之术 / 精神操控",n:"原指搭讪术，现泛指情感操控，官方整治滥用",
   amb:true, ex:[/反PUA|防PUA|PUA(?:课程|教学|理论|研究|心理|搭讪|流派|训练营|书籍|咨询)/]},
  /* —— 单字贬义词的带后缀变体（避免单字误伤，只收短语） —— */
  {t:"茶里茶气",p:"装清纯 / 假无辜",e:"矫揉造作 / 外饰纯良",n:"「绿茶」变体，形容装无辜，属贬义化用词"},
  {t:"佛媛",p:"假装礼佛的网红",e:"佯作皈依 / 借佛敛名",n:"「媛」贬义化典型，官媒点名（借佛媛引流）"},
  {t:"运动媛",p:"借运动作秀的网红",e:"借健身之名 / 行博眼之实",n:"「媛」贬义化，官媒点名"},
  {t:"绿茶",p:"装清纯的人（贬）",e:"外饰清纯 / 内怀机巧",n:"「绿茶婊」简称，注意喝茶语境不算",
   amb:true, ex:[/喝(?:了)?(?:一?杯)?绿茶|泡(?:了)?(?:一?杯)?绿茶|绿茶(?:饮品|功效|养生|茶|泡|喝|一杯|龙井|碧螺春|茶叶|种植|产地|氨基酸|抗氧化|减肥|推荐|品牌|🍵)/]},
  {t:"细思极恐",p:"越想越怕",e:"寻绎生惧 / 念之悚然",n:"可用但泛滥"},
  {t:"不明觉厉",p:"不懂但觉得厉害",e:"虽未解其妙，然知其卓然",n:"说「虽不懂但很厉害」"},
  {t:"喜大普奔",p:"喜闻乐见",e:"普天同庆 / 众皆欣然",n:"说「大家很高兴」"},
  {t:"人艰不拆",p:"人生艰难别拆穿",e:"体恤维艰 / 留人以颜",n:"说「别揭穿」"},
  {t:"互联网嘴替",p:"说出了我想说的",e:"言中肺腑 / 代鸣其声",n:"可用，但已烂大街"},
  {t:"全网最",p:"（夸张前缀）",e:"冠绝寰宇（讽）",n:"「全网最」基本是虚数，慎用"},
  {t:"狠狠",p:"非常",e:"至极 / 深切",n:"「狠狠心动」说「非常心动」更顺"},
  {t:"焊死",p:"固定 / 锁定",e:"锚定不移 / 牢不可破",n:"「焊死在屏幕上」说「离不开」"},
  {t:"救命",p:"天哪 / 受不了",e:"呜呼 / 情急之呼",n:"不是真求救，说「天哪」",
   amb:true, ex:[/救命恩人|救命要紧|救命稻草|喊救命|救命之恩|治病救命|救命良药|救命之计/,
    /主[，,、]?救命|(?:神|天父|菩萨|上帝|耶稣|圣母|观音|佛祖|天主)[啊呀]?救命/,
    /救命[！!]?(?:啊)?[^。！!]{0,5}?(?:落水|着火|溺水|抢劫|地震|车祸|急救|快跑|快逃|救人)/]},
  {t:"我承认我酸了",p:"我羡慕了",e:"见贤思齐 / 心向往之",n:"酸溜溜的，说「羡慕」更直接"},
  {t:"绝杀",p:"决定性一击",e:"定鼎一着 / 一锤定音",n:"什么都说绝杀，说「关键一击」",
   amb:true, ex:[/绝杀(?:球|三分|一球|进球|时刻|命中|压哨|技|大招|制胜)/]},
  {t:"暴击",p:"沉重打击 / 强烈触动",e:"摧心折志 / 怆然于怀",n:"游戏词滥用，说「触动」",
   amb:true, ex:[/暴击(?:率|伤害|加成|值|几率|倍率|属性|免疫|伤害值)/,/打出暴击|触发暴击/]},
  {t:"破茧",p:"蜕变",e:"羽化新生 / 焕然苏醒",n:"说「蜕变」更清楚",
   amb:true, ex:[/破茧(?:成蝶|化蝶|而出|重生)/]},
  {t:"上分",p:"提升 / 进步",e:"日就月将 / 竿头日进",n:"说「进步」更明白"},
  {t:"内娱",p:"国内娱乐圈",e:"梨园新声 / 当世优伶",n:"小圈子黑话，外人不懂"},
  {t:"氛围感拉满",p:"气氛很足",e:"气象淋漓 / 意境盎然",n:"「拉满」用多了，说「很足」"},
  {t:"质感拉满",p:"质感很强",e:"肌理丰盈 / 格调俨然",n:"同上"},
  /* —— 2024-2025 新烂梗（含官媒/主流语言规范点名） —— */
  {t:"班味",p:"上班疲惫的气质",e:"劳形惫神之态",n:"上过班后的丧气，说「累了」「疲倦」更清楚",
   amb:true, ex:[/班味(?:散|退|消|去|除|减|淡)/,/无班味|没班味|去班味|洗班味|祛除班味/]},
  {t:"草台班子",p:"凑合拼凑的群体",e:"乌合之众 / 群龙无首",n:"世界是个巨大的草台班子，说「凑合」即可"},
  {t:"硬控",p:"被强烈吸引无法自拔",e:"神魂摄夺 / 难以自持",n:"游戏术语泛化，说「被吸引住了」"},
  {t:"偷感",p:"小心翼翼怕被注意",e:"谨小慎微 / 畏首畏尾",n:"做事拘谨，说「小心翼翼」即可"},
  {t:"那咋了",p:"不以为意 / 无所谓",e:"何足挂齿 / 不足为道",n:"怼人式敷衍，说「无所谓」或「没关系」"},
  {t:"水灵灵",p:"鲜活生动 / 出人意料",e:"生机盎然 / 出乎意料",n:"干啥都加个水灵灵，说具体形容词更准",
   amb:true, ex:[/水灵灵(?:的植物|鲜花|蔬菜|瓜果|菜园|花盆|植物|花朵|枝叶|叶子|长势|浇水|灌溉|养护|生长|品种)/]},
  {t:"包的",p:"肯定的 / 没问题",e:"毋庸置疑 / 必无疑虑",n:"包赢的/包搞砸的，说「肯定的」更清晰"},
  {t:"松弛感",p:"从容不迫的心态",e:"泰然自若 / 怡然自得",n:"2024 年度流行语，过度使用即成烂梗，说「从容」「不焦虑」即可"},
  {t:"已读乱回",p:"看到消息乱回一通",e:"答非所问 / 言不及义",n:"敷衍式回复，说「随便回了一句」"},
  {t:"搞抽象",p:"言行怪异 / 离谱",e:"乖张怪诞 / 悖乎常理",n:"说「奇怪」或「荒唐」更清楚"},
  {t:"脆皮大学生",p:"体质差、易生病的学生",e:"体弱书生 / 弱不禁风",n:"自嘲体质差，说「身体不好」即可"},
  {t:"鼠鼠文学",p:"底层自嘲式倾诉",e:"自轻自贱 / 妄自菲薄",n:"把自己比作老鼠，低俗自嘲，说「我很惨」即可"},
  {t:"发疯文学",p:"极端夸张的情绪宣泄文字",e:"歇斯底里 / 语无伦次",n:"官方批评其污染语言环境，说「情绪失控」即可"},
  {t:"自闭",p:"消极倾颓 / 不想说话",e:"郁郁寡欢 / 灰心丧气",n:"把「自闭症」当贬义词玩梗，污名化残障人士，慎用",
   amb:true, ex:[/临床自闭|自闭症(?:患者|诊断|筛查|干预|康复|治疗|儿童|患儿|家长|确诊|孤独症)/,/开始自闭|自闭中|自闭了一整天|我自闭了|他自闭了/,/自闭[！!]?[^。]{0,10}?(?:真的|确实|严重|确诊|患病|孩子|儿童|患儿)/]},
  {t:"耍自闭",p:"刻意卖惨 / 故作消极为",e:"矫揉造作 / 故作姿态",n:"拿残障疾病（自闭症）当玩笑，低俗歧视性烂梗"},
  /* —— "福"字谐音变体 —— */
  {t:"沾你福",p:"复制好友福卡（集五福活动黑话）",e:"幸会 / 同沾福气",n:"集五福正面社交黑话， Jennifer 谐音，不算烂梗"},
  {t:"大福",p:"（谐音代骂）",e:"（无意义）",n:"「福」= 脏话代用，为绕审核而生，正文字面是吉祥字"},
  {t:"傻福",p:"（谐音代骂）",e:"（无意义）",n:"同上，「福」替代脏字，规避平台审核"},
  {t:"烧杯",p:"（谐音代骂）",e:"（无意义）",n:"化学仪器名被用作脏话谐音，规避审核的黑话"},
  /* —— 2026 年新烂梗（抽象音梗、谐音代骂、过度泛化） —— */
  {t:"比比拉布",p:"（无意义拟声）",e:"（无意义）",n:"英文 What is he talking about 空耳，纯噪音梗，无实际语义"},
  {t:"我的刀盾",p:"（无意义空耳）",e:"（无意义）",n:"英文 What the dog doing 空耳，与「比比拉布」配套出现的噪音梗"},
  {t:"歪比巴卜",p:"（无意义鬼畜）",e:"（无意义）",n:"植物大战僵尸疯狂戴夫语音空耳，2026 年死灰复燃的抽象音梗",
   amb:true, ex:[/歪比巴卜.*(?:植物|僵尸|戴夫|疯狂)/,/疯狂戴夫.*歪比巴卜/]},
  {t:"咕咕嘎嘎",p:"（无意义婴儿语）",e:"（无意义）",n:"英语 goo goo ga ga 音译，可爱但无意义的鬼畜流行语"},
  {t:"雀食",p:"确实",e:"诚然 / 实在",n:"「确实」方言谐音（雀 = 确），过度使用即成烂梗",
   amb:true, ex:[/雀食(?:是指|意为|意思|来源|出处|拼音|翻译|英文|日语|韩语)/,/麻雀.*雀食|鸟食|雀食.*昆虫|雀食.*种子/]},
  {t:"雀食蟀",p:"确实帅",e:"相貌堂堂 / 一表人材",n:"「雀食」+「蟀」=「确实帅」，夸人专用变体"},
  {t:"雀食牛",p:"确实牛",e:"才高八斗 / 出类拔萃",n:"「雀食」+「牛」=「确实牛」，夸人厉害变体"},
  {t:"麻了个bee",p:"太无语了",e:"瞠目结舌 / 哑口无言",n:"中英双语谐音梗，「bee」=蜜蜂，替代脏话，规避审核"},
  {t:"质疑理解成为",p:"态度转变三阶段",e:"感同身受 / 身临其境",n:"「质疑→理解→成为」三段式心理演变梗，过度使用即成模板"},
  {t:"i人",p:"内向型人格",e:"静默内敛者",n:"MBTI i 型人格标签泛化，说「内向」即可",
   amb:true, ex:[/i人[！!]?(?:测试|结果|类型|性格|特征|分析|报告|测评|问卷|量表)/,/非i人|不i人|伪i人|假i人/,/i人e人.*(?:测试|对比|区别|差异|区别)/]},
  {t:"e人",p:"外向型人格",e:"开朗健谈者",n:"MBTI e 型人格标签泛化，说「外向」即可",
   amb:true, ex:[/e人[！!]?(?:测试|结果|类型|性格|特征|分析|报告|测评|问卷|量表)/,/非e人|不e人|伪e人|假e人/,/i人e人.*(?:测试|对比|区别|差异|区别)/]},
  {t:"脆化",p:"直白碎碎念风格",e:"直抒胸臆 / 坦诚相待",n:"源自 Threads 平台发文风格，形容直接不加修饰的吐槽体，过度使用即成烂梗"},
  {t:"活人感",p:"真实有情绪不装",e:"真率自然 / 质朴无华",n:"形容人不刻意伪装，2026 年新社交标签，过度使用也成烂梗",
   amb:true, ex:[/活人感[！!]?(?:测试|检测|分数|评分|指数|报告|分析)/,/有活人感|没活人感|缺乏活人感/,/AI感.*活人感|真人.*活人感/]},
  /* —— 老牧师梗（胖大帅二创 + 后室二次传播） —— */
  {t:"老牧师",p:"（抽象梗）",e:"（无意义）",n:"B站UP主「胖大帅」二创配音 + 熊猫人表情包魔改，后室社区二次传播成「实体18-J」；宗教语境不算",
   amb:true, ex:[/老牧师(?:[，,、\s]|\.{0,2})[你我他她它]\w{0,2}(?:讲道|布道|祈祷|忏悔|主持|弥撒|礼拜|传教|施洗|祝福|诵经|读经|做弥撒)/,/老牧师[者？]?(?:之|指|是|为|在|与|和|及)/,/教堂.*老牧师|老牧师.*教堂|去教堂找老牧师|老牧师在|神父.*老牧师|老牧师.*传福音|老牧师.*主持|老牧师.*弥撒/]},
  {t:"崩神",p:"（抽象状态）",e:"（无意义）",n:"老牧师梗专属术语，指「绷住」的状态（忍住不笑），正文字面无意义"},
  {t:"破绷",p:"（抽象状态）",e:"（无意义）",n:"老牧师梗专属术语，指「绷不住」的状态（笑场），正文字面无意义"},
  {t:"艾斯贼",p:"（抽象梗）",e:"（无意义）",n:"老牧师梗专属词，后室社区衍生，正文字面无意义"},
  {t:"我无疑是",p:"（抽象句式）",e:"（无意义）",n:"老牧师梗经典句式「我无疑是愤怒的/兴奋的/开心的」，用于无意义情绪宣泄",
   amb:true, ex:[/我无疑是不?.{0,5}?(?:事实|真相|现实|确实|真的|的确|毫无疑问|毋庸置疑)/,/我无疑不是|我无疑不曾|我无疑不会|我无疑不能/]},
  /* —— 残障/精神疾病污名化梗 —— */
  {t:"玉玉症",p:"心情低落",e:"郁郁寡欢 / 心绪沉郁",n:"「抑郁症」谐音梗，把精神疾病当玩笑，官方点名批评，请对真正的患者保持尊重",
   amb:true, ex:[/玉玉(?:膏|霜|贴|石|佩|环|雕|琢|器|盏|杯|碗|盘|壶|瓶|箱|盒|匣|柜|案|几|桌|床|榻|屏风|帘|幔|帷|帐|灯|烛|香|炉|鼎|钟|鼓|琴|瑟|箫|笛|笙|筝|琵琶|阮|月琴|三弦|胡琴|二胡|京胡|高胡|板胡|坠胡|马头琴|呼麦)/]},
  {t:"玉玉",p:"心情低落",e:"郁郁寡欢 / 心绪沉郁",n:"「玉玉症」简称，同「抑郁症」谐音梗，同上",
   amb:true, ex:[/玉玉(?:膏|霜|贴|石|佩|环|雕|琢|器|盏|杯|碗|盘|壶|瓶|箱|盒|匣|柜|案|几|桌|床|榻|屏风|帘|幔|帷|帐|灯|烛|香|炉|鼎|钟|鼓|琴|瑟|箫|笛|笙|筝|琵琶|阮|月琴|三弦|胡琴|二胡|京胡|高胡|板胡|坠胡|马头琴|呼麦|色|美|润|滑|凉|软|糯)/]},
  {t:"gay",p:"同性恋",e:"（无意义）",n:"烂梗用法直接拿性取向当笑料：「你 gay 不 gay」「好 gay」「你就是 gay」，单列以区分贬义烂梗"},
  {t:"叙利亚战损风",p:"（无意义美化苦难）",e:"（无意义）",n:"将叙利亚战乱的灾难戏谑为装修风格，把他人苦难当梗，人民日报等官媒点名批评"},
  {t:"以后只能捡破烂扫大街",p:"（无意义诅咒）",e:"（无意义）",n:"对劳动人民的羞辱性烂梗，源自「不行就……」的威胁式调侃，轻率否定平凡职业的尊严"},
  {t:"欧皇",p:"运气好的人",e:"天眷之人 / 幸运之幸",n:"「欧」=欧洲人，「皇」指运气爆棚，与「非酋」相对；本身无害，但连用时含种族歧视色彩",
   amb:true, ex:[/欧皇附体|欧气爆发|运气.*欧皇|幸运儿|今日欧皇|化身欧皇/]},
  {t:"非洲酋长",p:"运气差的人（歧视性烂梗）",e:"（无意义）",n:"「非洲」与「酋长」的组合，将非洲人与坏运气绑定，属种族歧视性烂梗，请避免使用"},
  {t:"非酋",p:"运气差的人（歧视性烂梗）",e:"（无意义）",n:"「非酋」=非洲酋长缩写，用「非」（黑色）代指非洲，带有种族歧视色彩，2024 年起被多次点名批评"},
  /* —— 传统文化/词语歧义化梗 —— */
  {t:"国粹",p:"国骂 / 脏话",e:"（无意义）",n:"「国粹」本指中国传统文化的精华（如京剧、中医），现被部分网友用作「国骂」的委婉代称（如「爆国粹」），贬损传统文化词汇",
   amb:true, ex:[/国粹[者？]?(?:之|指|是|意为|为|即)|(?:四大)?国粹[，,、]?(?:京剧|中医|书法|武术|棋|画|戏|剧|茶|酒)|京剧|中医|书法|武术|国梅|国药|国画|国戏/]},
  {t:"圣母",p:"（贬义化用法）",e:"（原义：慈悲之母）",n:"原为宗教词，现网络语境多用于讽刺无原则地包容他人（「圣母婊」），污名化了善良与同理心，官方批评其滥用",
   amb:true, ex:[/天主(?:圣母|圣子|圣神|耶稣|圣经|教会|教堂|弥撒|神职|祈祷|信仰|教义|洗礼|坚振|告解|圣体)/,/圣母(?:玛利亚|像|画|诞|瞻礼|无玷)/,/佛(?:菩萨|教|僧|尼|庙|寺|经|典|法|音|号|缘|系)/,/拜圣母|祭圣母|瞻仰圣母|圣母怜子|圣母抱子/]},
  {t:"娘",p:"（贬损男性气质）",e:"（无意义）",n:"「娘」本意为母亲，现被部分网友用作对男性气质的贬损称呼（「娘炮」「娘娘腔」），将女性特质当作嘲笑武器，官媒批评此类用语加剧性别对立",
   amb:true, ex:[/娘[亲爹母子奶奶外公外婆祖父祖母爷爷父亲母亲爸爸妈妈]/,/娘娘(?:宫|庙|太后|妃|驾|寿|征|番|传|曲|腔|店|超市|面包|蛋糕|酥|糕|饼|卷|冰淇淋|茶|奶|啡|糖|霜|脂|粉|油|烛|皂|洗|护|露|水|乳液)/,/老娘|娘们|娘家|娘舅|娘亲|慈母|孟母|岳母|丈母娘|后妈|继母|养娘|丫鬟|婢娘|使女|女仆|保姆|月嫂|护工|助产|接生|催生|保胎|安胎|孕产|妇产|儿科|产科|婴幼|育婴|早教|托儿|幼儿园|小学|中学|大学|学院|教授|讲师|老师|教师|园丁|桃李|春风|化雨|润物|无声|蜡烛|春蚕|丝尽|泪干|成灰|始已/]},
  {t:"耄耋",p:"（谐音烂梗）",e:"（原义：八九十岁高龄）",n:"传统汉语词读 mào dié，本指高龄老人；现被谐音用作「猫爹」等宠物圈烂梗（如「圆头耄耋」），传统文化词汇被随意戏谑化",
   amb:true, only:[/圆头耄耋/]},
  /* —— 名字/地名歧义化梗 —— */
  {t:"嘉豪",p:"（烂梗标签化名字）",e:"（无意义）",n:"原名寓意美好豪迈，2026 年被烂梗化为「中二爱装、实力不多却爱表现」的校园标签，中国经济网点名批评其演变为校园霸凌工具"},
  {t:"嘉欣",p:"（烂梗标签化名字）",e:"（无意义）",n:"嘉豪的女性版本，同样被烂梗化为「中二做作、渴望被关注」的女生气质标签，名字被污名化后伤害无辜姓名者"},
  {t:"南通",p:"男同（谐音烂梗）",e:"（地名：江苏南通市）",n:"江苏省地名，因「南通」谐音「男同」被用作烂梗，地名被污名化后对当地居民造成困扰，新华社等官媒批评此类地名烂梗",
   amb:true, ex:[/南通[市州县 district 区/路/街/江/海/门]/,/我是南通人|南通人|南通话|南通某|南通籍|南通出生|江苏省南通市/]},
  {t:"无语猫",p:"（猫meme表情包）",e:"（无意义）",n:"配合「比比拉布」「我的刀盾」等抽象音梗的猫咪表情包，无实际语义"},
  {t:"巴巴博一",p:"（无意义拟声）",e:"（无意义）",n:"「比比拉布」系列配套抽象音梗，源自英文空耳，无实际语义"}
];

/* 把一条烂梗的日常说法(p)与文雅说法(e)拆成候选词池 */
function wordPool(d){
  const arr = [];
  (d.p||"").split(" / ").forEach(x=>{ const w=x.trim(); if(w) arr.push(w); });
  (d.e||"").split(" / ").forEach(x=>{ const w=x.trim(); if(w) arr.push(w); });
  return arr;
}

/* 仿专业作家的收尾句式（含 {word} 占位符，多风格随机） */
const WRITER_LINES = [
  "其实说到底，无非「{word}」四个字。话到这份上，也就不必再绕了。",
  "一切热闹终会退去，水面上浮着的，仍是那个最素净的词——「{word}」。",
  "人们总爱把一句话说过头。可剥开那些壳，里子就一句：「{word}」。",
  "你的字里行间，反复落下的，是「{word}」——像秋雨打在瓦上，一声，又一声。",
  "天下烂梗多半是借来的热闹，还回去时，只剩本真的「{word}」。",
  "语言有时是拐杖。等你愿意放下它，才会看见自己真正想说的是「{word}」。",
  "被你一遍遍念起的「{word}」，不过是寻常人心事里最轻的一声叹息。",
  "若把那些花哨的壳悉数褪去，剩在纸上的，大约只剩一句「{word}」。"
];
function genWriterLine(pool){
  if(!pool || pool.length===0) return "";
  const word = pool[Math.floor(Math.random()*pool.length)];
  const tpl = WRITER_LINES[Math.floor(Math.random()*WRITER_LINES.length)];
  return tpl.replace("{word}", word);
}

/* 报告状态，供「换一句」重新生成作家句 */
let RSTATE = null;
function buildReport(){
  if(!RSTATE) return;
  let report = "【烂梗体检报告】\n";
  report += "共检测 "+RSTATE.chars+" 字，命中 "+RSTATE.total+" 个烂梗（"+RSTATE.kinds+" 种），烂梗占比 "+RSTATE.percent+"%。\n";
  if(RSTATE.top.length>0){
    const top = RSTATE.top.slice(0,3).map(h=>h.t+(h.amb?"(语境词)":"")+"×"+h.count).join("、");
    report += "最高频："+top+"。\n";
  }
  report += "段位："+RSTATE.tierName+"。\n";
  if(RSTATE.topWords.length>0){
    report += "\n—— 若是作家写来，大概是这样：\n"+genWriterLine(RSTATE.topWords)+"\n";
  }
  report += "\n—— 纯娱乐，你的文案一个字都没改 :)";
  document.getElementById("report").value = report;
}

/* 圆角矩形路径 */
function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r);
  ctx.closePath();
}
/* 文本自动换行绘制，返回结束 y */
function wrapText(ctx, text, x, y, maxW, lh){
  let line="", yy=y;
  for(const ch of text){
    const test=line+ch;
    if(ctx.measureText(test).width>maxW && line){ ctx.fillText(line,x,yy); line=ch; yy+=lh; }
    else { line=test; }
  }
  if(line) ctx.fillText(line,x,yy);
  return yy;
}
const FONT = (w,size)=> w+" "+size+'px -apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif';

/* 把体检结果画成小红书风格竖图（纯前端 Canvas，无外部依赖） */
function drawReportCanvas(){
  if(!RSTATE){ showToast("先检测一下嘛～"); return; }
  const dpr=2, W=750, H=1280;
  const cv=document.getElementById("shareCanvas");
  cv.width=W*dpr; cv.height=H*dpr;
  const ctx=cv.getContext("2d");
  ctx.scale(dpr,dpr);
  const tierColors={t0:"#2a2a30",t1:"#1faa6b",t2:"#f0a020",t3:"#e0802e",t4:"#e0463e"};
  const tc=tierColors[RSTATE.tierCls]||"#2a2a30";

  // 背景 + 顶部红条
  ctx.fillStyle="#ffffff"; ctx.fillRect(0,0,W,H);
  ctx.fillStyle="#ff2442"; ctx.fillRect(0,0,W,168);
  ctx.textAlign="center"; ctx.fillStyle="#ffffff";
  ctx.font=FONT("800",44); ctx.fillText("烂梗体检报告",W/2,80);
  ctx.font=FONT("400",21); ctx.fillStyle="rgba(255,255,255,.92)";
  ctx.fillText("测测你的小红书有几分网感 · 纯娱乐",W/2,124);

  // 烂梗占比 + 段位
  ctx.textAlign="left"; ctx.fillStyle="#6b6b76"; ctx.font=FONT("500",18);
  ctx.fillText("烂梗占比",50,218);
  ctx.fillStyle="#1f1f24"; ctx.font=FONT("800",92);
  ctx.fillText(String(RSTATE.percent),48,312);
  const numW=ctx.measureText(String(RSTATE.percent)).width;
  ctx.font=FONT("600",26); ctx.fillText("%",48+numW+6,302);
  const pw=250,ph=64,px=440,py=246;
  roundRect(ctx,px,py,pw,ph,32); ctx.fillStyle=tc; ctx.fill();
  ctx.fillStyle="#fff"; ctx.textAlign="center"; ctx.font=FONT("700",28);
  ctx.fillText(RSTATE.tierName,px+pw/2,py+43);
  ctx.textAlign="left";

  // 三个统计
  const stats=[["烂梗总次数",RSTATE.total],["涉及种类",RSTATE.kinds],["检测字数",RSTATE.chars]];
  const cw=210,ch=108,gap=15,sx=40,sy=356;
  stats.forEach((s,i)=>{
    const x=sx+i*(cw+gap);
    roundRect(ctx,x,sy,cw,ch,16); ctx.fillStyle="#faf7f8"; ctx.fill();
    ctx.strokeStyle="#ececf0"; ctx.lineWidth=1; ctx.stroke();
    ctx.fillStyle="#1f1f24"; ctx.textAlign="center"; ctx.font=FONT("800",38);
    ctx.fillText(String(s[1]),x+cw/2,sy+54);
    ctx.fillStyle="#6b6b76"; ctx.font=FONT("500",17);
    ctx.fillText(s[0],x+cw/2,sy+84);
  });
  ctx.textAlign="left";

  // 命中清单
  let y=520;
  if(RSTATE.top.length>0){
    ctx.fillStyle="#1f1f24"; ctx.font=FONT("700",22);
    ctx.fillText("命中的烂梗（按出现次数）",50,y);
    y+=34;
    RSTATE.top.slice(0,7).forEach(h=>{
      y+=18;
      const bw=46,bh=34,bx=50,by=y-22;
      roundRect(ctx,bx,by,bw,bh,8); ctx.fillStyle="#ff2442"; ctx.fill();
      ctx.fillStyle="#fff"; ctx.textAlign="center"; ctx.font=FONT("700",18);
      ctx.fillText(String(h.count),bx+bw/2,by+23);
      ctx.textAlign="left"; ctx.fillStyle="#1f1f24"; ctx.font=FONT("700",26);
      ctx.fillText(h.t,112,y);
      if(h.amb){
        const tw = ctx.measureText(h.t).width;
        ctx.fillStyle="#e0802e"; ctx.font=FONT("600",13);
        ctx.fillText("语境词",112+tw+8,y-7);
        ctx.fillStyle="#1f1f24"; ctx.font=FONT("700",26);
      }
      ctx.fillStyle="#1faa6b"; ctx.font=FONT("600",16);
      ctx.fillText("日常："+h.p,112,y+22);
      ctx.fillStyle="#5b5bd6"; ctx.font=FONT("600",16);
      ctx.fillText("文雅："+h.e,112,y+42);
      y+=56;
    });
  } else {
    y=560;
  }

  // 作家句
  let wy=y+26;
  ctx.fillStyle="#6b6b76"; ctx.font=FONT("500",16);
  ctx.fillText("若是作家写来，大概是这样：",50,wy);
  wy+=28;
  const wl=genWriterLine(RSTATE.topWords);
  ctx.fillStyle="#1f1f24"; ctx.font=FONT("400",21);
  wrapText(ctx,wl,50,wy,650,30);

  // 底部水印
  ctx.fillStyle="#6b6b76"; ctx.font=FONT("400",15); ctx.textAlign="center";
  ctx.fillText("全部本地计算 · 文案未改动 · 烂梗侦测器",W/2,H-28);
}

/* 给拉丁词做不区分大小写匹配；中文词直接全局匹配 */
function countTerm(text, term){
  if(/^[a-zA-Z]+$/.test(term)){
    const re = new RegExp(term, "gi");
    const m = text.match(re);
    return m ? m.length : 0;
  }
  return text.split(term).length - 1;
}

/* 返回 term 在 text 中的所有出现位置（index） */
function findPos(text, term){
  const out = [];
  if(/^[a-zA-Z]+$/.test(term)){
    const re = new RegExp(term, "gi");
    let m;
    while((m = re.exec(text))){ out.push(m.index); }
    return out;
  }
  let idx = 0;
  while(true){
    const i = text.indexOf(term, idx);
    if(i < 0) break;
    out.push(i);
    idx = i + term.length;
  }
  return out;
}

/* 有效命中数：
   1) only（正向模式）：在全文上直接匹配模式，命中次数即烂梗数——
      用于「唐」这类单字超级高歧义词（唐朝/唐诗/唐装…全是正经用法）。
   2) amb 豁免模式：在全文上匹配豁免模式，匹配次数为本义用法数，从总次数中扣除。
   3) 普通词：直接返回原始次数。
   注意：only/ex 模式都包含目标词本身，全文匹配不会跨词误计，
   且避免逐词窗口重叠导致的重复计数。 */
function countEffective(text, d){
  const base = countTerm(text, d.t);
  if(base === 0) return 0;
  const gMatch = (pats)=>{
    let n = 0;
    for(const pat of pats){
      const src = pat.source;
      const flags = pat.flags.includes("g") ? pat.flags : pat.flags + "g";
      const mm = text.match(new RegExp(src, flags));
      if(mm) n += mm.length;
    }
    return n;
  };
  if(d.only && d.only.length) return gMatch(d.only);
  if(!d.amb || !d.ex || d.ex.length === 0) return base;
  return Math.max(0, base - gMatch(d.ex));
}

/* 收集一个词条的所有有效命中区间 [start,end)（用于计算真实字符占比）：
   1) only：用 only 正则全文匹配，每个匹配整体算一个区间；
   2) 普通/amb：用 findPos 找词条位置，排除落在豁免区间内的命中。 */
function collectSpans(text, d){
  const spans = [];
  const gExec = (pat)=>{
    const re = new RegExp(pat.source, pat.flags.includes("g") ? pat.flags : pat.flags + "g");
    let m;
    while((m = re.exec(text))){
      if(m[0].length > 0){ spans.push([m.index, m.index + m[0].length]); }
      if(m.index === re.lastIndex) re.lastIndex++;
    }
  };
  if(d.only && d.only.length){
    d.only.forEach(gExec);
    return spans;
  }
  const base = findPos(text, d.t);
  if(base.length === 0) return spans;
  const len = d.t.length;
  const exSpans = [];
  if(d.amb && d.ex){
    for(const pat of d.ex){
      const re = new RegExp(pat.source, pat.flags.includes("g") ? pat.flags : pat.flags + "g");
      let m;
      while((m = re.exec(text))){
        if(m[0].length > 0) exSpans.push([m.index, m.index + m[0].length]);
        if(m.index === re.lastIndex) re.lastIndex++;
      }
    }
  }
  for(const p of base){
    const inEx = exSpans.some(([s,e]) => p >= s && p < e);
    if(!inEx) spans.push([p, p + len]);
  }
  return spans;
}

/* 把若干区间排序合并（重叠/相邻合并），返回合并后的区间 */
function mergeSpans(spans){
  if(spans.length === 0) return [];
  const sorted = [...spans].sort((a,b)=> a[0]-b[0]);
  const out = [[...sorted[0]]];
  for(let i=1;i<sorted.length;i++){
    const last = out[out.length-1];
    if(sorted[i][0] <= last[1]){ last[1] = Math.max(last[1], sorted[i][1]); }
    else { out.push([...sorted[i]]); }
  }
  return out;
}

/* 计算文本中烂梗覆盖的字符数（排除空白，与 chars 的口径一致） */
function coveredChars(text, spans){
  let n = 0;
  for(const [s,e] of spans){
    for(let i=s;i<e;i++){
      if(!/\s/.test(text[i])) n++;
    }
  }
  return n;
}

function detect(){
  const text = document.getElementById("input").value;
  const chars = text.replace(/\s/g,"").length;
  if(chars === 0){
    showToast("先粘点文案进来嘛～");
    return;
  }
  const hits = [];
  let total = 0;
  const spans = [];
  for(const d of DICT){
    const c = countEffective(text, d);
    if(c > 0){
      hits.push({...d, count:c});
      total += c;
      spans.push(...collectSpans(text, d));
    }
  }
  hits.sort((a,b)=> b.count - a.count);

  // 烂梗占比 = 烂梗覆盖的字符数 / 总字数（真实占比，上限 100%）
  const covered = coveredChars(text, mergeSpans(spans));
  const percent = chars > 0 ? Math.round(covered / chars * 100) : 0;

  // 段位
  let tierCls="t0", tierName="纯净人类", tierDesc="稀有保护动物，你的文案干净得不像网红。";
  if(total >= 1){
    if(total <= 2){ tierCls="t1"; tierName="轻度网感选手"; tierDesc="偶尔冲个浪，整体还挺正常。"; }
    else if(total <= 6){ tierCls="t2"; tierName="资深冲浪运动员"; tierDesc="你很懂梗，但小心被梗带着走。"; }
    else if(total <= 12){ tierCls="t3"; tierName="烂梗浓度超标警告"; tierDesc="你的文案已经开始冒「塑料味」了。"; }
    else { tierCls="t4"; tierName="互联网原生变异体"; tierDesc="鉴定完毕：你是梗本身。"; }
  }

  // 渲染
  document.getElementById("gauge").style.setProperty("--p", Math.min(100, percent));
  document.getElementById("concNum").innerHTML = percent + "<small>%</small>";
  const tierEl = document.getElementById("tier");
  tierEl.className = "tier " + tierCls;
  tierEl.textContent = tierName;
  document.getElementById("tierDesc").textContent = tierDesc;

  document.getElementById("statTotal").textContent = total;
  document.getElementById("statKinds").textContent = hits.length;
  document.getElementById("statChars").textContent = chars;

  const list = document.getElementById("list");
  if(hits.length === 0){
    list.innerHTML = '<div class="empty">没检测到烂梗，干干净净，继续保持 👍</div>';
  } else {
    list.innerHTML = hits.map(h =>
      '<div class="item"><div class="badge">'+h.count+'</div>'+
      '<div class="item-main"><div class="item-term">'+esc(h.t)+
      (h.amb?'<span class="amb-tag">语境词</span>':'')+'</div>'+
      '<div class="item-fixes">'+
        '<span class="fix fix-daily"><b>日常</b>'+esc(h.p)+'</span>'+
        '<span class="fix fix-elegant"><b>文雅</b>'+esc(h.e)+'</span>'+
      '</div>'+
      '<div class="item-note">'+esc(h.n)+'</div></div></div>'
    ).join("");
  }

  // 分享报告（含作家风收尾句）
  RSTATE = {
    chars: chars, total: total, kinds: hits.length, percent: percent,
    tierName: tierName, tierCls: tierCls, top: hits,
    topWords: hits.length>0 ? wordPool(hits[0]) : []
  };
  buildReport();

  // 新检测时收起上一次生成的分享图，避免旧图残留
  document.getElementById("imgCard").classList.remove("show");

  document.getElementById("result").classList.add("show");
  document.getElementById("result").scrollIntoView({behavior:"smooth", block:"start"});
}

function esc(s){return s.replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}

function showToast(msg){
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"), 1600);
}

document.getElementById("detectBtn").addEventListener("click", detect);
document.getElementById("clearBtn").addEventListener("click", ()=>{
  document.getElementById("input").value="";
  document.getElementById("result").classList.remove("show");
});
document.getElementById("sampleBtn").addEventListener("click", ()=>{
  document.getElementById("input").value =
    "家人们谁懂啊，这家店真的绝绝子，氛围感直接拉满，本打工人表示泰裤辣，已经上头了，yyds！"+
    "栓Q所有推荐，狠狠心动了，沉浸式为它写篇笔记，宝藏小店焊死在我的收藏里，救命太香了，封神级别的好吃！";
  detect();
});
document.getElementById("copyBtn").addEventListener("click", ()=>{
  // 容器禁剪贴板写入：改为全选 + 引导长按复制
  const r = document.getElementById("report");
  r.focus();
  r.select();
  if(r.setSelectionRange){ r.setSelectionRange(0, r.value.length); }
  showToast("报告已全选，长按即可复制");
});
document.getElementById("rewordBtn").addEventListener("click", ()=>{
  if(RSTATE){ buildReport(); showToast("已换一句"); }
  else { showToast("先检测一下嘛～"); }
});
document.getElementById("imgBtn").addEventListener("click", ()=>{
  drawReportCanvas();
  document.getElementById("imgCard").classList.add("show");
  document.getElementById("imgCard").scrollIntoView({behavior:"smooth", block:"center"});
});
document.getElementById("saveBtn").addEventListener("click", async ()=>{
  const cv = document.getElementById("shareCanvas");
  if(!cv.width){ showToast("请先生成分享图"); return; }
  const mt = window.xhs && window.xhs.miniTool;
  if(mt && mt.writeTempFile && mt.saveImageToPhotosAlbum){
    // 容器内：base64 转临时文件 → 保存到系统相册（JSBridge）
    try{
      const { filePath } = await mt.writeTempFile({ data: cv.toDataURL("image/png") });
      await mt.saveImageToPhotosAlbum({ filePath });
      showToast("已保存到相册");
    }catch(e){
      showToast("保存失败，可长按图片保存");
    }
  } else {
    // 容器外（本地预览）：文件下载被禁，引导长按图片保存
    showToast("长按上方图片即可保存到相册");
  }
});
