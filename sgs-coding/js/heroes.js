const generals = [
      {
        id: "liubei",
        name: "劉備",
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
        name: "關羽",
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
        name: "張飛",
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
        id: "zhaoyun",
        name: "趙雲",
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
       name: "馬超",
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
     }
      
 
];
export { generals };