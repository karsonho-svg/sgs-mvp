const deck = [
       {
        id: "spade_shandian",
        name: "閃電",
        type: "錦囊牌",
        subtype: "延時類",
        effect: "出牌阶段，对你使用。将【闪电】置入你的判定区。若判定结果为♠2-9，则目标角色受到3点雷电伤害。若判定不为此结果，将之置入其下家的判定区",
        suit: "♠",
        rank: "A",
        extra: {
          delayed: true,
          judgeRange: "♠2-9",
          damage: 3,
          damageType: "雷電"
        },
      },
      { id: "spade_juedou", 
        name: "決鬥", 
        type: "錦囊牌",
        subtype: "普通類",
        effect: "出牌阶段，对一名其他角色使用。由该角色开始，你与其轮流打出一张【杀】，然后首先未打出【杀】的角色受到另一名角色造成的1点伤害", 
        suit: "♠", 
        rank: "A", 
        extra: {
          duel: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "gudingdao", 
        name: "古錠刀", 
        type: "裝備牌",
        subtype: "武器牌", 
        effect: "锁定技，当你使用【杀】对目标角色造成伤害时，若该角色没有手牌，则此伤害+1", 
        suit: "♠", 
        rank: "A", 
        extra: 
        {
          locked: true,
          range: 2,
          bonusDamageIfTargetNoHand: 1      
        },
      },
      { id: "spade_baguazhen", 
        name: "八卦陣", 
        type: "裝備牌", 
        subtype: "防具牌",
        effect: "当你需要使用或打出【闪】时，你可以进行判定。若判定结果为红色，则你视为使用或打出一张【闪】", 
        suit: "♠", 
        rank: "2", 
        extra: 
        {
            locked: false,
            enableJudgement: true,
            judgeRange: "♥♦"
        },
      },
      { id: "cixiongshuanggujian",  
        name: "雌雄雙股劍", 
        type: "裝備牌", 
        subtype: "武器牌",
        effect: "当你使用【杀】指定与你性别不同的一个目标后，你可以令其选择一项：1. 弃置一张手牌；2. 令你摸一张牌", 
        suit: "♠", 
        rank: "2", 
        extra: 
        {
            locked: false,
            targetIsOppositeGender: true,
            optionalEffect: true
        },
      },
      { id: "hanbingjian", 
        name: "寒冰劍", 
        type: "裝備牌",
        subtype: "武器牌", 
        effect: "当你使用【杀】对目标角色造成伤害时，若该角色有牌，则你可以防止此伤害，然后你依次弃置其两张牌。", 
        suit: "♠", 
        rank: "2",
        
        extra: 
        {
          locked: false,
          range: 2,
          canPreventDamage: true,
          discardTwoIfPrevent: true
        },
      },
      { id: "spade_tengjia", 
        name: "藤甲", 
        type: "裝備牌", 
        subtype: "防具牌",
        effect: "锁定技，【南蛮入侵】、【万箭齐发】和普通【杀】对你无效；当你受到火焰伤害时，此伤害+1", 
        suit: "♠", 
        rank: "2", 
        extra: 
        {
          locked: true,
          immuneNormalSha: true,
          immuneNanman: true,
          immuneWanjian: true,
          fireDamageIncrease: 1      
        },
      },
      { id: "spade3_guohechaiqiao", 
        name: "過河拆橋", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对一名区域里有牌的其他角色使用。你弃置其区域里的一张牌", 
        suit: "♠", 
        rank: "3", 
        extra: 
        {
          distanceLimit: false,
          discardOneCard: true    
        },
      },
      { id: "spade3_shunshouqianyang", 
        name: "順手牽羊", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对距离为1的一名区域里有牌的其他角色使用。你获得其区域里的一张牌", 
        suit: "♠", 
        rank: "3", 
        extra: 
        {
          distanceLimit: 1,
          stealOneCard: true   
        },
      },
      { id: "spade3_jiu", 
        name: "酒", 
        type: "基本牌", 
        effect: "出牌阶段令你本回合使用的下一张【杀】伤害+1或令处于濒死状态的你回復1点体力", 
        suit: "♠", 
        rank: "3", 
        extra: 
        {
          shaDamagePlus: 1,
          healWhenPreDie: 1

        },
      },
      { id: "spade4_guohechaiqiao", 
        name: "過河拆橋", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对一名区域里有牌的其他角色使用。你弃置其区域里的一张牌", 
        suit: "♠", 
        rank: "4", 
        extra: 
        {
          distanceLimit: false,
          discardOneCard: true    
        },
      },
      { id: "spade4_shunshouqianyang", 
        name: "順手牽羊", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对距离为1的一名区域里有牌的其他角色使用。你获得其区域里的一张牌", 
        suit: "♠", 
        rank: "4", 
        extra: 
        {
          distanceLimit: 1,
          stealOneCard: true     
        },
      },
      { id: "spade4_leisha", 
        name: "雷【殺】", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点雷电伤害", 
        suit: "♠", 
        rank: "4", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "雷電"
        },
      },
      { id: "qinglongyanyuedao", 
        name: "青龍偃月刀", 
        type: "裝備牌", 
        subtype: "武器牌",
        effect: "当你使用的【杀】被目标角色使用的【闪】抵消后，你可以再次对其使用一张【杀】", 
        suit: "♠", 
        rank: "5", 

        extra: 
        {
          locked: false, 
          range: 3,
          repeatShaOnDodge: true
        },
      },
      { id: "jueying", 
        name: "絕影", 
        type: "裝備牌", 
        subtype: "坐騎牌",
        subsubtype: "+1坐騎",
        effect: "锁定技，其他角色计算与你的距离+1", 
        suit: "♠", 
        rank: "5", 
        extra: 
        {
          locked: true,
          othersToMeDistanceLimitPlus: 1
        },
      },
      { id: "spade5_leisha", 
        name: "雷【殺】", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点雷电伤害", 
        suit: "♠", 
        rank: "5", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "雷電"
        },
      },
      { id: "spade_lebusishu", 
        name: "樂不思蜀", 
        type: "錦囊牌", 
        subtype: "延時類",
        effect: "出牌阶段，对一名其他角色使用。将【乐不思蜀】置入该角色的判定区，若判定结果不为♥，则其跳过出牌阶段", 
        suit: "♠", 
        rank: "6", 
        extra: 
        {
          delayed: true,
          distanceLimit: false,
          skipPlayIfNotHeart: true,
          judgeRange: "♥"
        },
      },
      { id: "qinggangjian", 
        name: "青釭劍", 
        type: "裝備牌", 
        subtype: "武器牌",
        effect: "锁定技，当你使用【杀】指定一个目标后，你令其防具无效", 
        suit: "♠", 
        rank: "6", 
        
        extra: 
        {
          locked: true, 
          range: 2,
          ignoreTargetArmor: true
        },
      },
      { id: "spade6_leisha", 
        name: "雷【殺】", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点雷电伤害", 
        suit: "♠", 
        rank: "6", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "雷電"
        },
      },
      { id: "spade7_nanmanruqin", 
        name: "南蠻入侵", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对所有其他角色使用。每名目标角色需打出一张【杀】，否则受到你造成的1点伤害", 
        suit: "♠", 
        rank: "7", 
        extra: 
        {
          targetsAllOthers: true,
          mustPlayShaOrTakeDamage: true,
          damage: 1,
          damageType: "普通"
        },
      },
      
      { id: "spade7_sha", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♠", 
        rank: "7", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "spade7_leisha", 
        name: "雷【殺】", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点雷电伤害", 
        suit: "♠", 
        rank: "7", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "雷電"
        },
      },
      { id: "spade8_sha_1", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♠", 
        rank: "8", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "spade8_sha_2", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♠", 
        rank: "8", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
       { id: "spade8_leisha", 
        name: "雷【殺】", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点雷电伤害", 
        suit: "♠", 
        rank: "8", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "雷電"
        },
      },
      { id: "spade9_sha_1", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♠", 
        rank: "9",
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "spade9_sha_2", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♠", 
        rank: "9", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "spade9_jiu", 
        name: "酒", 
        type: "基本牌", 
        effect: "出牌阶段令你本回合使用的下一张【杀】伤害+1或令处于濒死状态的你回復1点体力", 
        suit: "♠", 
        rank: "9", 
        extra: 
        {
          shaDamagePlus: 1,
          healWhenPreDie: 1
        
        },
      },
      { id: "spade10_sha_1", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♠", 
        rank: "10", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "spade10_sha_2", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♠", 
        rank: "10", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
       { id: "spade_bingliangcunduan", 
        name: "兵糧寸斷", 
        type: "錦囊牌", 
        subtype: "延時類",
        effect: "出牌阶段，对距离为1的一名其他角色使用。将【兵粮寸断】置入该角色的判定区，若判定结果不为♣，则其跳过摸牌阶段", 
        suit: "♠", 
        rank: "10", 
        extra: 
        {
          delayed: true,
          distanceLimit: 1,
          skipDrawIfNotClub: true,
          judgeRange: "♣"
        },
      },
      { id: "spadeJ_wuxiekeji", 
        name: "無懈可擊", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "当一张锦囊牌对一名角色生效前或一张【无懈可击】生效前，对此牌使用。抵消此牌对该角色或该【无懈可击】的效果", 
        suit: "♠", 
        rank: "J", 
        extra: 
        {
          canNegateTrick: true
        },
      },
      { id: "spadeJ_shunshouqianyang", 
        name: "順手牽羊", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对距离为1的一名区域里有牌的其他角色使用。你获得其区域里的一张牌", 
        suit: "♠", 
        rank: "J", 
        extra: 
        {
          distanceLimit: 1,
          stealOneCard: true    
        },
      },
      { id: "spadeJ_tiesuolianhuan", 
        name: "鐵索連環", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对一至两名角色使用。目标角色横置或重置。（被横置的角色处于「连环状态」）重铸：出牌阶段，你可以将此牌置入弃牌堆，然后摸一张牌", 
        suit: "♠", 
        rank: "J", 
        extra: 
        {
          selectOneOrTwoTargets: true,
          linkedState: true, 
          recast: true,
          drawAfterRecast: true
        },
      },
      { id: "zhangbashemao", 
        name: "丈八蛇矛", 
        type: "裝備牌", 
        subtype: "武器牌",
        effect: "你可以将两张手牌当【杀】使用或打出", 
        suit: "♠", 
        rank: "Q", 
        extra: 
        {
          locked: false,
          range: 3,
          canUseTwoCardsAsSha: true
        },
      },
      { id: "spadeQ_guohechaiqiao", 
        name: "過河拆橋", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对一名区域里有牌的其他角色使用。你弃置其区域里的一张牌", 
        suit: "♠", 
        rank: "Q", 
        extra: 
        {
          distanceLimit: false,
          discardOneCard: true   
        },
      },
      { id: "spadeQ_tiesuolianhuan", 
        name: "鐵索連環", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对一至两名角色使用。目标角色横置或重置。（被横置的角色处于「连环状态」）重铸：出牌阶段，你可以将此牌置入弃牌堆，然后摸一张牌", 
        suit: "♠", 
        rank: "Q", 
        extra: 
        {
          selectOneOrTwoTargets: true,
          linkedState: true, 
          recast: true,
          drawAfterRecast: true
        },
      },
      { id: "dawan", 
        name: "大宛", 
        type: "裝備牌", 
        subtype: "坐騎牌",
        subsubtype: "-1坐騎",
        effect: "锁定技，其他角色计算与你的距离-1", 
        suit: "♠", 
        rank: "K", 
        extra: 
        {
          locked: true,
          toOthersDistanceLimit: -1
        },
      },
      { id: "spadeK_nanmanruqin", 
        name: "南蠻入侵", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对所有其他角色使用。每名目标角色需打出一张【杀】，否则受到你造成的1点伤害", 
        suit: "♠", 
        rank: "K", 
        extra: 
        {
          targetsAllOthers: true,
          mustPlayShaOrTakeDamage: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "spadeK_wuxiekeji", 
        name: "無懈可擊", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "当一张锦囊牌对一名角色生效前或一张【无懈可击】生效前，对此牌使用。抵消此牌对该角色或该【无懈可击】的效果", 
        suit: "♠", 
        rank: "K", 
        extra: 
        {
          canNegateTrick: true
        },
      },

      {
        id: "heartA_taoyuanjieyi",
        name: "桃園結義",
        type: "錦囊牌",
        subtype: "普通類",
        effect: "出牌阶段，对所有角色使用。每名目标角色回復1点体力",
        suit: "♥",
        rank: "A",
        extra: {
          healAll: 1
        }
      },
      {
        id: "heartA_wanjianqifa",
        name: "萬箭齊發",
        type: "錦囊牌",
        subtype: "普通類",
        effect: "出牌阶段，对所有其他角色使用。每名目标角色需打出一张【闪】，否则受到你造成的1点伤害",
        suit: "♥",
        rank: "A",
        extra: {
          targetsAllOthers: true,
          mustPlayShanOrTakeDamage: true,
          damage: 1,
          damageType: "普通"
        }
      },
      { id: "heartA_wuxiekeji", 
        name: "無懈可擊", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "当一张锦囊牌对一名角色生效前或一张【无懈可击】生效前，对此牌使用。抵消此牌对该角色或该【无懈可击】的效果", 
        suit: "♥", 
        rank: "A", 
        extra: 
        {
          canNegateTrick: true
        },
      },
      { id: "heart2_shan_1", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♥", 
        rank: "2", 
        extra: 
        {
          dodgeSha: true
        },
      },
      { id: "heart2_shan_2", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♥", 
        rank: "2", 
        extra: 
        {
          dodgeSha: true
        },
      },
      {
        id: "heart2_huogong",
        name: "火攻",
        type: "錦囊牌",
        subtype: "普通類",
        effect: "出牌阶段，对一名有手牌的角色使用。该角色展示一张手牌，然后若你弃置与之花色相同的一张手牌，则你对其造成1点火焰伤害",
        suit: "♥",
        rank: "2",
        extra: {
          mustHaveHandCard: true,
          showCard: true,            
          discardSameColor: true,     
          damage: 1,                 
          damageType: "火焰"     
        }
      },
      {
        id: "heart3_tao",
        name: "桃",
        type: "基本牌",
        effect: "出牌阶段回復已受伤的你1点体力或令一名处于濒死状态的角色回復1点体力",
        suit: "♥",
        rank: "3",
        extra: {
          heal: 1 
        }
      },
      {
        id: "heart3_wugufengdeng",
        name: "五穀豐登",
        type: "錦囊牌",
        subtype: "普通類",
        effect: "出牌阶段，对所有角色使用。你亮出牌堆顶等同于目标角色数的牌。每名目标角色获得其中的一张",
        suit: "♥",
        rank: "3",
        extra: {
          targetsAll: true,
          revealCards: true,
          chooseFromRevealed: true
        }
      },
      {
        id: "heart3_huogong",
        name: "火攻",
        type: "錦囊牌",
        subtype: "普通類",
        effect: "出牌阶段，对一名有手牌的角色使用。该角色展示一张手牌，然后若你弃置与之花色相同的一张手牌，则你对其造成1点火焰伤害",
        suit: "♥",
        rank: "3",
        extra: {
          mustHaveHandCard: true,
          showCard: true,            
          discardSameColor: true,     
          damage: 1,                 
          damageType: "火焰"     
        }
      },
      {
        id: "heart4_tao",
        name: "桃",
        type: "基本牌",
        effect: "出牌阶段回復已受伤的你1点体力或令一名处于濒死状态的角色回復1点体力",
        suit: "♥",
        rank: "4",
        extra: {
          heal: 1
        }
      },
      {
        id: "heart4_wugufengdeng",
        name: "五穀豐登",
        type: "錦囊牌",
        subtype: "普通類",
        effect: "出牌阶段，对所有角色使用。你亮出牌堆顶等同于目标角色数的牌。每名目标角色获得其中的一张",
        suit: "♥",
        rank: "4",
        extra: {
          targetsAll: true,
          revealCards: true,
          chooseFromRevealed: true
        }
      },
      { id: "heart4_huosha", 
        name: "火【殺】", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点火焰伤害", 
        suit: "♥", 
        rank: "4", 
        extra: 
        {
          damage: 1,
          damageType: "火焰"
        },
      },
      { id: "qilingong", 
        name: "麒麟弓", 
        type: "裝備牌",
        subtype: "武器牌", 
        effect: "当你使用【杀】对目标角色造成伤害时，你可以弃置其装备区里的一张坐骑牌", 
        suit: "♥", 
        rank: "5", 
        extra: 
        {
          locked: false,
          range: 5,
          discardTargetMount: true
        },
      },
      { id: "chitu", 
        name: "赤兔", 
        type: "裝備牌", 
        subtype: "坐騎牌",
        subsubtype: "-1坐騎",
        effect: "锁定技，其他角色计算与你的距离-1", 
        suit: "♥", 
        rank: "5", 
        extra: 
        {
          locked: true,
          toOthersDistanceLimit: -1 
        },
      },
      {
        id: "heart5_tao_1",
        name: "桃",
        type: "基本牌",
        effect: "出牌阶段回復已受伤的你1点体力或令一名处于濒死状态的角色回復1点体力",
        suit: "♥",
        rank: "5",
        extra: {
          heal: 1    
        }
      },
      {
        id: "heart6_tao_1",
        name: "桃",
        type: "基本牌",
        effect: "出牌阶段回復已受伤的你1点体力或令一名处于濒死状态的角色回復1点体力",
        suit: "♥",
        rank: "6",
        extra: {
          heal: 1   
        }
      },
      { id: "heart_lebusishu", 
        name: "樂不思蜀", 
        type: "錦囊牌", 
        subtype: "延時類",
        effect: "出牌阶段，对一名其他角色使用。将【乐不思蜀】置入该角色的判定区，若判定结果不为♥，则其跳过出牌阶段", 
        suit: "♥", 
        rank: "6", 
        extra: 
        {
          delayed: true,
          distanceLimit: false,
          skipPlayIfNotHeart: true,
          judgeRange: "♥"
        },
      },
      {
        id: "heart6_tao_2",
        name: "桃",
        type: "基本牌",
        effect: "出牌阶段回復已受伤的你1点体力或令一名处于濒死状态的角色回復1点体力",
        suit: "♥",
        rank: "6",
        extra: {
          heal: 1    
        }
      },
      {
        id: "heart7_tao",
        name: "桃",
        type: "基本牌",
        effect: "出牌阶段回復已受伤的你1点体力或令一名处于濒死状态的角色回復1点体力",
        suit: "♥",
        rank: "7",
        extra: {
          heal: 1   
        }
      },
      {
        id: "heart7_wuzhongshengyou",
        name: "無中生有",
        type: "錦囊牌",
        subtype: "普通類",
        effect: "出牌阶段，对你使用。你摸两张牌",
        suit: "♥",
        rank: "7",
        extra: {
          drawCards: 2  
        }
      },
      { id: "heart7_huosha", 
        name: "火【殺】", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点火焰伤害", 
        suit: "♥", 
        rank: "7", 
        extra: 
        {
          damage: 1,
          damageType: "火焰"
        },
      },
      {
        id: "heart8_tao",
        name: "桃",
        type: "基本牌",
        effect: "出牌阶段回復已受伤的你1点体力或令一名处于濒死状态的角色回復1点体力",
        suit: "♥",
        rank: "8",
        extra: {
          heal: 1   
        }
      },
      {
        id: "heart8_wuzhongshengyou",
        name: "無中生有",
        type: "錦囊牌",
        subtype: "普通類",
        effect: "出牌阶段，对你使用。你摸两张牌",
        suit: "♥",
        rank: "8",
        extra: {
          drawCards: 2  
        }
      },
      { id: "heart8_shan", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♥", 
        rank: "8", 
        extra: 
        {
          dodgeSha: true
        },
      },
      {
        id: "heart9_tao",
        name: "桃",
        type: "基本牌",
        effect: "出牌阶段回復已受伤的你1点体力或令一名处于濒死状态的角色回復1点体力",
        suit: "♥",
        rank: "9",
        extra: {
          heal: 1  
        }
      },
      {
        id: "heart9_wuzhongshengyou",
        name: "無中生有",
        type: "錦囊牌",
        subtype: "普通類",
        effect: "出牌阶段，对你使用。你摸两张牌",
        suit: "♥",
        rank: "9",
        extra: {
          drawCards: 2   
        }
      },
      { id: "heart9_shan", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♥", 
        rank: "9", 
        extra: 
        {
          dodgeSha: true
        },
      },
      { id: "heart10_sha_1", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♥", 
        rank: "10", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "heart10_sha_2", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♥", 
        rank: "10", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "heart10_huosha", 
        name: "火【殺】", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点火焰伤害", 
        suit: "♥", 
        rank: "10", 
        extra: 
        {
          damage: 1,
          damageType: "火焰"
        },
      },
      { id: "heartJ_sha", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♥", 
        rank: "J", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      {
        id: "heartJ_wuzhongshengyou",
        name: "無中生有",
        type: "錦囊牌",
        subtype: "普通類",
        effect: "出牌阶段，对你使用。你摸两张牌",
        suit: "♥",
        rank: "J",
        extra: {
          drawCards: 2
        }
      },
      { id: "heartJ_shan", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♥", 
        rank: "J", 
        extra: 
        {
          dodgeSha: true
        },
      },
      {
        id: "heartQ_tao",
        name: "桃",
        type: "基本牌",
        effect: "出牌阶段回復已受伤的你1点体力或令一名处于濒死状态的角色回復1点体力",
        suit: "♥",
        rank: "Q",
        extra: {
          heal: 1    
        }
      },
      { id: "heartQ_guohechaiqiao", 
        name: "過河拆橋", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对一名区域里有牌的其他角色使用。你弃置其区域里的一张牌", 
        suit: "♥", 
        rank: "Q", 
        extra: 
        {
          distanceLimit: false,
          discardOneCard: true 
        },
      },
      {
        id: "heart_shandian",
        name: "閃電",
        type: "錦囊牌",
        subtype: "延時類",
        effect: "出牌阶段，对你使用。将【闪电】置入你的判定区。若判定结果为♠2-9，则目标角色受到3点雷电伤害。若判定不为此结果，将之置入其下家的判定区",
        suit: "♥",
        rank: "Q",
        extra: {
          delayed: true,
          judgeRange: "♠2-9",
          damage: 3,
          damageType: "雷電"
        },
      },
      { id: "heartQ_shan", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♥", 
        rank: "Q", 
        extra: 
        {
          dodgeSha: true
        },
      },
       { id: "zhuahuangfeidian", 
        name: "爪黃飛電", 
        type: "裝備牌", 
        subtype: "坐騎牌",
        subsubtype: "+1坐騎",
        effect: "锁定技，其他角色计算与你的距离+1", 
        suit: "♥", 
        rank: "K", 
        extra: 
        {
          locked: true,
          othersToMeDistanceLimitPlus: 1
        },
      },
      { id: "heartK_shan", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♥", 
        rank: "K", 
        extra: 
        {
          dodgeSha: true
        },
      },
      { id: "heartK_wuxiekeji", 
        name: "無懈可擊", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "当一张锦囊牌对一名角色生效前或一张【无懈可击】生效前，对此牌使用。抵消此牌对该角色或该【无懈可击】的效果", 
        suit: "♥", 
        rank: "K", 
        extra: 
        {
          canNegateTrick: true
        },
      },
      { id: "club_zhugeliannu", 
        name: "諸葛連弩", 
        type: "裝備牌",
        subtype: "武器牌", 
        effect: "锁定技，你使用【杀】无次数限制", 
        suit: "♣", 
        rank: "A", 
        extra: 
        {
          locked: true,
          range: 1,
          canUseUnlimitedSha: true
        },
      },
      { id: "club_juedou", 
        name: "決鬥", 
        type: "錦囊牌",
        subtype: "普通類",
        effect: "出牌阶段，对一名其他角色使用。由该角色开始，你与其轮流打出一张【杀】，然后首先未打出【杀】的角色受到另一名角色造成的1点伤害", 
        suit: "♣", 
        rank: "A", 
        extra: {
          duel: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "baiyinshizi", 
        name: "白銀獅子", 
        type: "裝備牌", 
        subtype: "防具牌",
        effect: "锁定技，当你受到伤害时，若伤害值大于1，则你将伤害值改为1；当你失去装备区里的【白银狮子】后，你回復1点体力", 
        suit: "♣", 
        rank: "A", 
        extra: 
        {
            locked: true,
            limitDamageToOne: true,
            healOnUnquip: 1
        },
      },
      { id: "club_baguazhen", 
        name: "八卦陣", 
        type: "裝備牌", 
        subtype: "防具牌",
        effect: "当你需要使用或打出【闪】时，你可以进行判定。若判定结果为红色，则你视为使用或打出一张【闪】", 
        suit: "♣", 
        rank: "2", 
        extra: 
        {
            locked: false,
            enableJudgement: true,
            judgeRange: "♥♦"
        },
      },
      { id: "club2_sha", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♣", 
        rank: "2", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
       { id: "renwangdun", 
        name: "仁王盾", 
        type: "裝備牌", 
        subtype: "防具牌",
        effect: "锁定技，黑色的【杀】对你无效", 
        suit: "♣", 
        rank: "2", 
        extra: 
        {
            locked: true,
            immuneBlackSha: true
        },
      },
      { id: "club_tengjia", 
        name: "藤甲", 
        type: "裝備牌", 
        subtype: "防具牌",
        effect: "锁定技，【南蛮入侵】、【万箭齐发】和普通【杀】对你无效；当你受到火焰伤害时，此伤害+1", 
        suit: "♣", 
        rank: "2", 
        extra: 
        {
          locked: true,
          immuneNormalSha: true,
          immuneNanman: true,
          immuneWanjian: true,
          fireDamageIncrease: 1      
        },
      },
      { id: "club3_guohechaiqiao", 
        name: "過河拆橋", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对一名区域里有牌的其他角色使用。你弃置其区域里的一张牌", 
        suit: "♣", 
        rank: "3", 
        extra: 
        {
          distanceLimit: false,
          discardOneCard: true    
        },
      },
      { id: "club3_sha", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♣", 
        rank: "3", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "club3_jiu", 
        name: "酒", 
        type: "基本牌", 
        effect: "出牌阶段令你本回合使用的下一张【杀】伤害+1或令处于濒死状态的你回復1点体力", 
        suit: "♣", 
        rank: "3", 
        extra: 
        {
          shaDamagePlus: 1,
          healWhenPreDie: 1

        },
      },
      { id: "club4_guohechaiqiao", 
        name: "過河拆橋", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对一名区域里有牌的其他角色使用。你弃置其区域里的一张牌", 
        suit: "♣", 
        rank: "4", 
        extra: 
        {
          distanceLimit: false,
          discardOneCard: true  
        },
      },
      { id: "club4_sha", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♣", 
        rank: "4", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "club_bingliangcunduan", 
        name: "兵糧寸斷", 
        type: "錦囊牌", 
        subtype: "延時類",
        effect: "出牌阶段，对距离为1的一名其他角色使用。将【兵粮寸断】置入该角色的判定区，若判定结果不为♣，则其跳过摸牌阶段", 
        suit: "♣", 
        rank: "4", 
        extra: 
        {
          delayed: true,
          distanceLimit: 1,
          skipDrawIfNotClub: true,
          judgeRange: "♣"
        },
      },
      { id: "dilu", 
        name: "的盧", 
        type: "裝備牌", 
        subtype: "坐騎牌",
        subsubtype: "+1坐騎",
        effect: "锁定技，其他角色计算与你的距离+1", 
        suit: "♣", 
        rank: "5", 
        extra: 
        {
          locked: true,
          othersToMeDistanceLimitPlus: 1
        },
      },
      { id: "club5_sha", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♣", 
        rank: "5", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "club5_leisha", 
        name: "雷【殺】", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点雷电伤害", 
        suit: "♣", 
        rank: "5", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "雷電"
        },
      },
      { id: "club_lebusishu", 
        name: "樂不思蜀", 
        type: "錦囊牌", 
        subtype: "延時類",
        effect: "出牌阶段，对一名其他角色使用。将【乐不思蜀】置入该角色的判定区，若判定结果不为♥，则其跳过出牌阶段", 
        suit: "♣", 
        rank: "6", 
        extra: 
        {
          delayed: true,
          distanceLimit: false,
          skipPlayIfNotHeart: true,
          judgeRange: "♥"
        },
      },
      { id: "club6_sha", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♣", 
        rank: "6", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "club6_leisha", 
        name: "雷【殺】", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点雷电伤害", 
        suit: "♣", 
        rank: "6", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "雷電"
        },
      },
      { id: "club7_nanmanruqin", 
        name: "南蠻入侵", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌階段，對所有其他角色使用。每名目標角色需打出一張【殺】，否則受到你造成的1點傷害", 
        suit: "♣", 
        rank: "7", 
        extra: 
        {
          targetsAllOthers: true,
          mustPlayShaOrTakeDamage: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "club7_sha", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♣", 
        rank: "7", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "club7_leisha", 
        name: "雷【殺】", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点雷电伤害", 
        suit: "♣", 
        rank: "7", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "雷電"
        },
      },
      { id: "club8_sha_1", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♣", 
        rank: "8", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "club8_sha_2", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♣", 
        rank: "8", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
       { id: "club8_leisha", 
        name: "雷【殺】", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点雷电伤害", 
        suit: "♣", 
        rank: "8", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "雷電"
        },
      },
       { id: "club9_sha_1", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♣", 
        rank: "9", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "club9_sha_2", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♣", 
        rank: "9", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "club9_jiu", 
        name: "酒", 
        type: "基本牌", 
        effect: "出牌阶段令你本回合使用的下一张【杀】伤害+1或令处于濒死状态的你回復1点体力", 
        suit: "♣", 
        rank: "9", 
        extra: 
        {
          shaDamagePlus: 1,
          healWhenPreDie: 1

        },
      },
       { id: "club10_sha_1", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♣", 
        rank: "10", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "club10_sha_2", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♣", 
        rank: "10", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "club10_tiesuolianhuan", 
        name: "鐵索連環", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对一至两名角色使用。目标角色横置或重置。（被横置的角色处于「连环状态」）重铸：出牌阶段，你可以将此牌置入弃牌堆，然后摸一张牌", 
        suit: "♣", 
        rank: "10", 
        extra: 
        {
          selectOneOrTwoTargets: true,
          linkedState: true, 
          recast: true,
          drawAfterRecast: true
        },
      },
      { id: "clubJ_sha_1", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♣", 
        rank: "J", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "clubJ_sha_2", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♣", 
        rank: "J", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "clubJ_tiesuolianhuan", 
        name: "鐵索連環", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对一至两名角色使用。目标角色横置或重置。（被横置的角色处于「连环状态」）重铸：出牌阶段，你可以将此牌置入弃牌堆，然后摸一张牌", 
        suit: "♣", 
        rank: "J", 
        extra: 
        {
          selectOneOrTwoTargets: true,
          linkedState: true, 
          recast: true,
          drawAfterRecast: true
        },
      },
      { id: "clubQ_jiedaosharen", 
        name: "借刀殺人", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对一名装备区里有武器牌的其他角色使用。除非该角色对其攻击范围内，由你选择的另一名角色使用一张【杀】，否则将其装备区里的武器牌交给你", 
        suit: "♣", 
        rank: "Q", 
        extra: 
        {
         targetMustHaveWeapon: true,
         mustShaOrLoseWeapon: true
        },
      },
      { id: "clubQ_wuxiekeji", 
        name: "無懈可擊", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "当一张锦囊牌对一名角色生效前或一张【无懈可击】生效前，对此牌使用。抵消此牌对该角色或该【无懈可击】的效果", 
        suit: "♣", 
        rank: "Q", 
        extra: 
        {
          canNegateTrick: true
        },
      },
      { id: "clubQ_tiesuolianhuan", 
        name: "鐵索連環", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对一至两名角色使用。目标角色横置或重置。（被横置的角色处于「连环状态」）重铸：出牌阶段，你可以将此牌置入弃牌堆，然后摸一张牌", 
        suit: "♣", 
        rank: "Q", 
        extra: 
        {
          selectOneOrTwoTargets: true,
          linkedState: true, 
          recast: true,
          drawAfterRecast: true
        },
      },
      { id: "clubK_jiedaosharen", 
        name: "借刀殺人", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对一名装备区里有武器牌的其他角色使用。除非该角色对其攻击范围内，由你选择的另一名角色使用一张【杀】，否则将其装备区里的武器牌交给你", 
        suit: "♣", 
        rank: "K", 
        extra: 
        {
         targetMustHaveWeapon: true,
         mustShaOrLoseWeapon: true
        },
      },
      { id: "clubK_wuxiekeji", 
        name: "無懈可擊", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "当一张锦囊牌对一名角色生效前或一张【无懈可击】生效前，对此牌使用。抵消此牌对该角色或该【无懈可击】的效果", 
        suit: "♣", 
        rank: "K", 
        extra: 
        {
          canNegateTrick: true
        },
      },
      { id: "clubK_tiesuolianhuan", 
        name: "鐵索連環", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对一至两名角色使用。目标角色横置或重置。（被横置的角色处于「连环状态」）重铸：出牌阶段，你可以将此牌置入弃牌堆，然后摸一张牌", 
        suit: "♣", 
        rank: "K", 
        extra: 
        {
          selectOneOrTwoTargets: true,
          linkedState: true, 
          recast: true,
          drawAfterRecast: true
        },
      },
      { id: "diamond_zhugeliannu", 
        name: "諸葛連弩", 
        type: "裝備牌",
        subtype: "武器牌", 
        effect: "锁定技，你使用【杀】无次数限制", 
        suit: "♦", 
        rank: "A", 
        extra: 
        {
          locked: true,
          range: 1,
          canUseUnlimitedSha: true
        },
      },
      { id: "diamond_juedou", 
        name: "決鬥", 
        type: "錦囊牌",
        subtype: "普通類",
        effect: "出牌阶段，对一名其他角色使用。由该角色开始，你与其轮流打出一张【杀】，然后首先未打出【杀】的角色受到另一名角色造成的1点伤害", 
        suit: "♦", 
        rank: "A", 
        extra: {
          duel: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "zhuqueyushan", 
        name: "朱雀羽扇", 
        type: "裝備牌",
        subtype: "武器牌", 
        effect: "当你使用普通【杀】时，你可以将此【杀】改为火【杀】", 
        suit: "♦", 
        rank: "A", 
        extra: 
        {
          locked: false,
          range: 4,
          convertNormalShaToFireSha: true
        },
      },
      { id: "diamond2_shan_1", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♦", 
        rank: "2", 
        extra: 
        {
          dodgeSha: true
        },
      },
      { id: "diamond2_shan_2", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♦", 
        rank: "2", 
        extra: 
        {
          dodgeSha: true
        },
      },
      {
        id: "diamond2_tao",
        name: "桃",
        type: "基本牌",
        effect: "出牌阶段回復已受伤的你1点体力或令一名处于濒死状态的角色回復1点体力",
        suit: "♦",
        rank: "2",
        extra: {
          heal: 1    
        }
      },
      { id: "diamond3_shan", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♦", 
        rank: "3", 
        extra: 
        {
          dodgeSha: true
        },
      },
      { id: "diamond3_shunshouqianyang", 
        name: "順手牽羊", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对距离为1的一名区域里有牌的其他角色使用。你获得其区域里的一张牌", 
        suit: "♦", 
        rank: "3", 
        extra: 
        {
          distanceLimit: 1,
          stealOneCard: true   
        },
      },
      {
        id: "diamond3_tao",
        name: "桃",
        type: "基本牌",
        effect: "出牌阶段回復已受伤的你1点体力或令一名处于濒死状态的角色回復1点体力",
        suit: "♦",
        rank: "3",
        extra: {
          heal: 1    
        }
      },
      { id: "diamond4_shan", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♦", 
        rank: "4", 
        extra: 
        {
          dodgeSha: true
        },
      },
      { id: "diamond4_shunshouqianyang", 
        name: "順手牽羊", 
        type: "錦囊牌", 
        subtype: "普通類",
        effect: "出牌阶段，对距离为1的一名区域里有牌的其他角色使用。你获得其区域里的一张牌", 
        suit: "♦", 
        rank: "4", 
        extra: 
        {
          distanceLimit: 1,
          stealOneCard: true   
        },
      },
      { id: "diamond4_huosha", 
        name: "火【殺】", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点火焰伤害", 
        suit: "♦", 
        rank: "4", 
        extra: 
        {
          damage: 1,
          damageType: "火焰"
        },
      },
      { id: "diamond5_shan", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♦", 
        rank: "5", 
        extra: 
        {
          dodgeSha: true
        },
      },
      { id: "guanshifu", 
        name: "貫石斧", 
        type: "裝備牌",
        subtype: "武器牌", 
        effect: "当你使用的【杀】被目标角色使用的【闪】抵消后，你可以弃置两张牌。若如此做，此【杀】依然会造成伤害", 
        suit: "♦", 
        rank: "5", 
        extra: 
        {
          locked: false,
          range: 3,
          discardTwoWhenShaNegated: true
        },
      },
      { id: "diamond5_huosha", 
        name: "火【殺】", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点火焰伤害", 
        suit: "♦", 
        rank: "5", 
        extra: 
        {
          damage: 1,
          damageType: "火焰"
        },
      },
      { id: "diamond6_shan_1", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♦", 
        rank: "6", 
        extra: 
        {
          dodgeSha: true
        },
      },
      { id: "diamond6_sha", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♦", 
        rank: "6", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "diamond6_shan_2", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♦", 
        rank: "6", 
        extra: 
        {
          dodgeSha: true
        },
      },
      { id: "diamond7_shan_1", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♦", 
        rank: "7", 
        extra: 
        {
          dodgeSha: true
        },
      },
      { id: "diamond7_sha", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♦", 
        rank: "7", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "diamond7_shan_2", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♦", 
        rank: "7", 
        extra: 
        {
          dodgeSha: true
        },
      },
      { id: "diamond8_shan_1", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♦", 
        rank: "8", 
        extra: 
        {
          dodgeSha: true
        },
      },
      { id: "diamond8_sha", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♦", 
        rank: "8", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "diamond8_shan_2", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♦", 
        rank: "8", 
        extra: 
        {
          dodgeSha: true
        },
      },
      { id: "diamond9_shan", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♦", 
        rank: "9", 
        extra: 
        {
          dodgeSha: true
        },
      },
      { id: "diamond9_sha", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♦", 
        rank: "9", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "diamond9_jiu", 
        name: "酒", 
        type: "基本牌", 
        effect: "出牌阶段令你本回合使用的下一张【杀】伤害+1或令处于濒死状态的你回復1点体力", 
        suit: "♦", 
        rank: "9", 
        extra: 
        {
          shaDamagePlus: 1,
          healWhenPreDie: 1

        },
      },
      { id: "diamond10_shan_1", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♦", 
        rank: "10", 
        extra: 
        {
          dodgeSha: true
        },
      },
      { id: "diamond10_sha", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♦", 
        rank: "10", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
      { id: "diamond10_shan_2", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♦", 
        rank: "10", 
        extra: 
        {
          dodgeSha: true
        },
      },
      { id: "diamondJ_shan_1", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♦", 
        rank: "J", 
        extra: 
        {
          dodgeSha: true
        },
      },
      { id: "diamondJ_shan_2", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♦", 
        rank: "J", 
        extra: 
        {
          dodgeSha: true
        },
      },
       { id: "diamondJ_shan_3", 
        name: "閃", 
        type: "基本牌", 
        effect: "当你成为杀的目标时，使用此牌可抵消【杀】的效果", 
        suit: "♦", 
        rank: "J", 
        extra: 
        {
          dodgeSha: true
        },
      },
      {
        id: "diamondQ_tao",
        name: "桃",
        type: "基本牌",
        effect: "出牌阶段回復已受伤的你1点体力或令一名处于濒死状态的角色回復1点体力",
        suit: "♦",
        rank: "Q",
        extra: {
          heal: 1   
        }
      },
      { id: "fangtianhuaji", 
        name: "方天畫戟", 
        type: "裝備牌",
        subtype: "武器牌", 
        effect: "锁定技，若你使用【杀】是你最后的手牌，则此【杀】可以多选择两个目标", 
        suit: "♦", 
        rank: "Q", 
        extra: 
        {
          locked: true,
          range: 4,
          maxExtraTargetsWhenShaIsOnlyHand: 2
        },
      },
       {
        id: "diamondQ_huogong",
        name: "火攻",
        type: "錦囊牌",
        subtype: "普通類",
        effect: "出牌阶段，对一名有手牌的角色使用。该角色展示一张手牌，然后若你弃置与之花色相同的一张手牌，则你对其造成1点火焰伤害",
        suit: "♦",
        rank: "Q",
        extra: {
          mustHaveHandCard: true,
          showCard: true,            
          discardSameColor: true,     
          damage: 1,                 
          damageType: "火焰"     
        }
      },
      { id: "diamondK_sha", 
        name: "殺", 
        type: "基本牌", 
        effect: "出牌阶段，对你攻击范围内的一名其他角色使用，你对该角色造成1点伤害", 
        suit: "♦", 
        rank: "K", 
        extra: 
        {
          attackDistanceLimit: true,
          damage: 1,
          damageType: "普通"
        },
      },
       { id: "zixing", 
        name: "紫騂", 
        type: "裝備牌", 
        subtype: "坐騎牌",
        subsubtype: "-1坐騎",
        effect: "锁定技，其他角色计算与你的距离-1", 
        suit: "♦", 
        rank: "K", 
        extra: 
        {
          locked: true,
          toOthersDistanceLimit: -1
        },
      },
      { id: "hualiu", 
        name: "驊騮", 
        type: "裝備牌", 
        subtype: "坐騎牌",
        subsubtype: "+1坐騎",
        effect: "锁定技，其他角色计算与你的距离+1", 
        suit: "♦", 
        rank: "K", 
        extra: 
        {
          locked: true,
          othersToMeDistanceLimitPlus: 1
        },
      },
      



      








      
    
    ];
export { deck };