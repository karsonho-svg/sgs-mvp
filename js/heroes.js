const generals = [
      {
        id: "liubei",
        name: "刘备",
        kingdom: "蜀",
        maxHp: 4,
        startHp: 4, 
        gender: "male",
        pool: "standard",
        edition: "jie",
        skills: [
          {
            name: "仁德",
            description: "出牌阶段，你可以将任意张手牌交给一名本阶段未获得过“仁德”牌的其他角色。当你于本阶段给出第二张“仁德”牌时，你可以视为使用一张基本牌。"
          },
          {
            name: "激将",
            description: "主公技，当你需要使用或打出【杀】时，你可以令其他蜀势力角色选择是否打出一张【杀】（视为由你使用或打出）。"
         }
        ]
      },
      {
        id: "guanyu",
        name: "关羽",
        kingdom: "蜀",
        maxHp: 4,
        startHp: 4,
        gender: "male",
        pool: "standard",
        edition: "jie",
        skills: [
          {
            name: "武聖",
            description: "你可以将一张红色牌当【杀】使用或打出。你使用方块【杀】无距离限制。"
          },
          {
            name: "义绝",
            description: "+出牌阶段限一次，你可以弃置一张牌，然后令一名其他角色展示一张手牌。若此牌为黑色，则其本回合非锁定技失效且不能使用或打出手牌，你对其使用的红桃【杀】伤害+1；若此牌为红色，则你获得之，然后你可令该角色回复1点体力。"
          }
        ]
      },
      {
        id: "zhangfei",
        name: "张飞",
        kingdom: "蜀",
        maxHp: 4,
        startHp: 4,
        gender: "male",
        pool: "standard",
        edition: "jie",
        skills: [
          {
            name: "咆哮",
            description: "锁定技，你使用【杀】无次数限制。你的出牌阶段，若你于当前阶段内使用过【杀】，你于此阶段使用【杀】无距离限制。"
         },
         {
            name: "替身",
            description: "出牌阶段结束时，你可发动此技能。你弃置所有锦囊牌和坐骑牌。然后直到你的下回合开始，获得所有以你为目标且未对你造成伤害的【杀】。"
         }
        ]
      },
       {
        id: "zhugeliang",
        name: "诸葛亮",
        kingdom: "蜀",
        maxHp: 3,
        startHp: 3,
        gender: "male",
        pool: "standard",
        edition: "jie",
        skills: [
          {
            name: "观星",
            description: "准备阶段，你可以观看牌堆顶的五张牌（存活人数小于4时改为三张），然后以任意顺序放回牌堆顶或牌堆底。若你将这些牌均放至牌堆底，则结束阶段你可以再进行一次“观星”。"
          },
          {
            name: "空城",
            description: "锁定技，若你没有手牌，则你不能被选择为【杀】或【决斗】的目标。"
          }
         ]
      },
      {
        id: "zhaoyun",
        name: "赵云",
        kingdom: "蜀",
        maxHp: 4,
        startHp: 4,
        gender: "male",
        pool: "standard",
        edition: "jie",
        skills: [
          {
            name: "龍膽",
            description: "你可以将一张【杀】当【闪】、【闪】当【杀】使用或打出。"
          },
          {
            name: "涯角",
            description: "当你于回合外使用或打出手牌时，你可以展示牌堆顶一张牌并将其交给任意一名角色。若这两张牌类别不同，你弃置一张牌。"
          }
         ]
      },
      {
       id: "machao",
       name: "马超",
       kingdom: "蜀",
       maxHp: 4,
       startHp: 4,
       gender: "male",
       pool: "standard",
       edition: "jie",
       skills: [
         {
           name: "馬術",
           description: "锁定技，你计算与其他角色的距离-1。"
         },
         {
           name: "鐵騎",
           description: "当你使用【杀】指定一个目标后，你可令其本回合内非锁定技失效，然后你进行判定，除非该角色弃置与结果花色相同的一张牌，否则不能使用【闪】响应此【杀】。"
         }
       ]
     },
     {
      id: "sunquan",
      name: "孙权",
      kingdom: "吳",
      maxHp: 4,
      startHp: 4,
      gender: "male",
      pool: "standard",
      edition: "jie",
      skills: [
       {
         name: "制衡",
         description: "出牌阶段限一次，你可以弃置任意张牌，然后摸等量的牌。若你以此法弃置了所有的手牌，则额外摸一张牌。"
       },        
       {
          name: "救援",
         description: "主公技，其他吴势力角色对其自己使用【桃】时，若其体力值大于你，则该角色可以改为令你回复1点体力，然后其摸一张牌。"
       }
     ]
     },
     {
       id: "ganning",
       name: "甘宁",
       kingdom: "吳",
       maxHp: 4,
       startHp: 4,
       gender: "male",
       pool: "standard",
       edition: "jie",
       skills: [
        {
          name: "奇策",
          description: "你可以将一张黑色牌当【过河拆桥】使用。"
        },   
        {
          name: "奋威",
          description: "限定技，当一张锦囊牌指定两个或更多目标后，你可令此牌对其中任意名目标角色无效。"
        }     
      ]
    },
    {
      id: "lvmeng",
      name: "吕蒙",
      kingdom: "吳",
      maxHp: 4,
      startHp: 4,
      gender: "male",
      pool: "standard",
      edition: "jie",
      skills: [
        {
          name: "克己",
          description: "若你未于出牌阶段内使用或打出过【杀】，则你可以跳过弃牌阶段。"
        },        
        {
          name: "勤学",
          description: "觉醒技，准备阶段，若你的手牌数比你的体力值多3或更多（若游戏人数不小于7则改为2），你减1点体力上限，然后获得“攻心”。（出牌阶段限一次，你可以观看一名其他角色的手牌，然后你可以展示其中一张红桃牌，选择一项：1.弃置此牌；2.将此牌置于牌堆顶）。"
        }
      ]
     },
     {
      id: "huanggai",
      name: "黄盖",
      kingdom: "吳",
      maxHp: 4,
      startHp: 4,
      gender: "male",
      pool: "standard",
      edition: "jie",
      artX: 80,
      skills: [
        {
          name: "苦肉",
          description: "出牌阶段限一次，你可以弃置一张牌，然后失去1点体力。"
        },        
        {
          name: "诈降",
          description: "锁定技，当你失去1点体力后，你摸三张牌，然后若此时在你的出牌阶段内，则直到回合结束，你使用红色【杀】无距离限制且不能被【闪】响应，且你可以多使用一张【杀】。"
        }
      ]
     },
     {
      id: "zhouyu",
      name: "周瑜",
      kingdom: "吳",
      maxHp: 3,
      startHp: 3,
      gender: "male",
      pool: "standard",
      edition: "jie",
      skills: [
       {
         name: "英姿",
         description: "锁定技，摸牌阶段，你多摸一张牌；你的手牌上限等于X（X为你的体力上限）。"
       },        
       {
          name: "反间",
         description: "出牌阶段限一次，你可以将一张手牌正面向上交给一名其他角色，该角色选择一项：1.展示所有手牌，然后弃置与此牌花色相同的所有牌；2.失去1点体力。"
       }
     ]
     },
   
      
 
];
export { generals };