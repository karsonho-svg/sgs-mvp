const generals = [
      {
        id: "liubei",
        name: "刘备",
        kingdom: "蜀",
        maxHp: 4,
        gender: "male",
        version: "standard",
        edition: "",
        skills: [
          {
            name: "仁德",
            description: "出牌阶段限一次，你可以将任意数量的手牌交给其他角色，若你给出的牌张数达到两张或更多时，你回復1点体力。"
          },
          {
            name: "激将",
            description: "主公技，当你需要使用或打出一张【杀】时，你可以令其他蜀势力角色打出一张【杀】（视为由你使用或打出）。"
         }
        ]
      },
      {
        id: "guanyu",
        name: "关羽",
        kingdom: "蜀",
        maxHp: 4,
        gender: "male",
        version: "standard",
        edition: "",
        skills: [
          {
            name: "武聖",
            description: "你可以将一张红色牌当【杀】使用或打出。"
          }
        ]
      },
      {
        id: "zhangfei",
        name: "张飞",
        kingdom: "蜀",
        maxHp: 4,
        gender: "male",
        version: "standard",
        edition: "",
        skills: [
          {
            name: "咆哮",
            description: "锁定技，你使用【杀】无次数限制。"
         }
        ]
      },
       {
        id: "zhugeliang",
        name: "诸葛亮",
        kingdom: "蜀",
        maxHp: 3,
        gender: "male",
        version: "standard",
        edition: "",
        skills: [
          {
            name: "观星",
            description: "准备阶段，你可以观看牌堆顶的X张牌（X为全场角色数且最多为5），然后以任意顺序分配于牌堆顶或牌堆底。"
          },
          {
            name: "空城",
            description: "锁定技，若你没有手牌，则你不能成为【杀】或【决斗】的目标。"
          }
         ]
      },
      {
        id: "zhaoyun",
        name: "赵云",
        kingdom: "蜀",
        maxHp: 4,
        gender: "male",
        version: "standard",
        edition: "",
        skills: [
          {
            name: "龍膽",
            description: "你可以将【杀】当【闪】，【闪】当【杀】使用或打出。"
          }
         ]
      },
      {
       id: "machao",
       name: "马超",
       kingdom: "蜀",
       maxHp: 4,
       gender: "male",
       version: "standard",
       edition: "",
       skills: [
         {
           name: "馬術",
           description: "锁定技，你计算与其他角色的距离-1。"
         },
         {
           name: "鐵騎",
           description: "你的【杀】指定目标后，你可以进行判定，若结果为红色，该角色不能使用【闪】。"
         }
       ]
     },
     {
      id: "sunquan",
      name: "孙权",
      kingdom: "吳",
      maxHp: 4,
      gender: "male",
      version: "standard",
      edition: "",
      skills: [
       {
         name: "制衡",
         description: "出牌阶段限一次，你可以弃置任意张牌，然后摸等量的牌。"
       },        
       {
          name: "救援",
         description: "主公技，锁定技，其他吴势力角色对你使用【桃】回復的体力+1。"
       }
     ]
     },
     {
       id: "ganning",
       name: "甘宁",
       kingdom: "吳",
       maxHp: 4,
       gender: "male",
       version: "standard",
       edition: "",
       skills: [
        {
          name: "奇策",
          description: "你可以将一张黑色牌当【过河拆桥】使用。"
        },        
      ]
    },
    {
      id: "lvmeng",
      name: "吕蒙",
      kingdom: "吳",
      maxHp: 4,
      gender: "male",
      version: "standard",
      edition: "",
      skills: [
        {
          name: "克己",
          description: "若你未于出牌阶段内使用或打出过【杀】，则你可以跳过弃牌阶段。"
        },        
      ]
     },
     {
      id: "huanggai",
      name: "黄盖",
      kingdom: "吳",
      maxHp: 4,
      gender: "male",
      version: "standard",
      edition: "",
      skills: [
        {
          name: "苦肉",
          description: "出牌阶段，你可以失去1点体力，然后摸两张牌。"
        },        
      ]
     },
     {
      id: "zhouyu",
      name: "周瑜",
      kingdom: "吳",
      maxHp: 3,
      gender: "male",
      version: "standard",
      edition: "",
      skills: [
       {
         name: "英姿",
         description: "摸牌阶段，你可以多摸一张牌。"
       },        
       {
          name: "反间",
         description: "出牌阶段限一次，你可以令一名其他角色猜一种花色，然后获得你的一张手牌并展示之，如果猜错花色，该角色受到1点伤害。"
       }
     ]
     },
   
      
 
];
export { generals };