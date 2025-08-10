import React, { createContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// 既有圖片
import tomato   from '../assets/images/tomato.jpg';
import avocado  from '../assets/images/avocado-toast.jpg';
import ramen    from '../assets/images/ramen.jpg';
import sushi    from '../assets/images/sushi-roll.jpg';
import pancake  from '../assets/images/pancake.jpg';
import salad    from '../assets/images/salad.jpg';

// 新增的 5 張圖片（檔名與大小寫要完全一致）
import pesto    from '../assets/images/PestoChickenPasta.jpg';
import shrimp   from '../assets/images/GarlicButterShrimp.jpg';
import kimchi   from '../assets/images/KimchiFriedRice.jpg';
import thai     from '../assets/images/ThaiGreenCurryChicken.jpg';
import potato   from '../assets/images/GarlicRoastedPotatoes.jpg';

export const RecipeContext = createContext();

const IMAGE_BY_ID = {
  '1': tomato,
  '2': avocado,
  '3': ramen,
  '4': sushi,
  '5': pancake,
  '6': salad,
  '7': pesto,
  '8': shrimp,
  '9': kimchi,
  '10': thai,
  '11': potato,
};

const initialRecipes = [
  {
    id:'1', title:'番茄義大利麵',
    description:'快速美味的番茄紅醬義大利麵。',
    image: tomato, tags:['義大利麵','快速','番茄'],
    prepTime:15, cookTime:30, servings:2, calories:520, difficulty:'簡單',
    ingredients: ['義大利麵 200g','番茄罐頭 1 罐(400g)','蒜末 2 瓣','洋蔥半顆(切末)','橄欖油 2 大匙','帕瑪森起司 少許','新鮮羅勒 少許'],
    seasonings: ['鹽 適量','黑胡椒 適量','砂糖 1 茶匙(平衡酸度)'],
    steps:['熱鍋下油爆香蒜末與洋蔥','加入番茄罐頭煮至微收，調味','麵煮至略硬撈起拌醬，灑起司與羅勒']
  },
  {
    id:'2', title:'酪梨吐司',
    description:'營養豐富、好吃又健康。',
    image: avocado, tags:['早餐','素食','健康'],
    prepTime:5, cookTime:3, servings:1, calories:320, difficulty:'簡單',
    ingredients: ['全麥吐司 2 片','熟成酪梨 1 顆','檸檬汁 1 茶匙'],
    seasonings: ['橄欖油 1 茶匙','鹽 少許','黑胡椒 少許','辣椒碎(可選)'],
    steps:['吐司烤至微焦酥','酪梨壓成泥拌檸檬汁','抹在吐司上淋油、調味']
  },
  {
    id:'3', title:'日式豚骨拉麵',
    description:'濃郁湯頭，搭配中細麵。',
    image: ramen, tags:['拉麵','日式','濃湯'],
    prepTime:20, cookTime:180, servings:2, calories:780, difficulty:'較難',
    ingredients: ['拉麵麵條 2 份','叉燒肉 適量','糖心蛋 2 顆','蔥花 適量','海苔 2 片','筍乾 適量','豚骨高湯 800ml'],
    seasonings: ['醬油 2 大匙','味醂 1 大匙','香油 1 茶匙'],
    steps:['高湯加醬油味醂調味','麵煮開撈起入碗','放上叉燒、蛋、蔥花與海苔']
  },
  {
    id:'4', title:'壽司捲',
    description:'在家也能輕鬆做。',
    image: sushi, tags:['日式','海鮮','聚會'],
    prepTime:25, cookTime:10, servings:3, calories:450, difficulty:'中等',
    ingredients: ['壽司飯 2 碗(拌醋)','海苔片 3 張','小黃瓜條 1 根','酪梨條 1 顆','蟹肉棒/鮭魚 適量'],
    seasonings: ['壽司醋(米醋2 大匙+砂糖1 大匙+鹽 1/2 茶匙)','哇沙米 適量','醬油 適量'],
    steps:['將壽司飯鋪在海苔上放入餡料','捲緊收邊切段','搭配哇沙米與醬油食用']
  },
  {
    id:'5', title:'美式鬆餅',
    description:'蓬鬆香甜的經典早餐。',
    image: pancake, tags:['甜點','早餐','美式'],
    prepTime:10, cookTime:15, servings:2, calories:610, difficulty:'簡單',
    ingredients: ['低筋麵粉 120g','泡打粉 1 茶匙','牛奶 160ml','雞蛋 1 顆','砂糖 1.5 大匙','無鹽奶油 20g(融化)'],
    seasonings: ['鹽 少許','香草精(可選)','楓糖漿/奶油(食用時)'],
    steps:['粉類混合，加入牛奶、蛋與融化奶油拌勻','平底鍋小火煎至表面起泡翻面','盛盤淋楓糖與奶油']
  },
  {
    id:'6', title:'凱撒沙拉',
    description:'清爽低卡，快速完成。',
    image: salad, tags:['沙拉','健康','低卡'],
    prepTime:10, cookTime:0, servings:2, calories:230, difficulty:'簡單',
    ingredients: ['蘿蔓生菜 1 顆','麵包丁 適量','帕瑪森起司片 適量','(可選) 烤雞胸 100g'],
    seasonings: ['凱撒醬(蛋黃/美乃滋, 橄欖油, 蒜, 鯷魚, 檸檬汁, 第戎芥, 醬油或伍斯特醬, 黑胡椒)'],
    steps:['生菜洗淨切段','與醬拌勻','灑麵包丁與起司']
  },
  {
    id:'7', title:'青醬雞胸義麵',
    description:'羅勒青醬拌香煎雞胸，清爽不膩。',
    image: pesto, tags:['義大利麵','雞肉','香草'],
    prepTime:12, cookTime:15, servings:2, calories:590, difficulty:'中等',
    ingredients: ['義大利麵 200g','雞胸肉 1 片(切條)','市售青醬 3 大匙','小番茄 8 顆','帕瑪森起司 少許'],
    seasonings: ['鹽、黑胡椒 適量','橄欖油 1 大匙'],
    steps:['雞胸用鹽胡椒抓醃煎至上色','麵煮好拌青醬與雞肉/小番茄','灑起司即可']
  },
  {
    id:'8', title:'蒜香奶油蝦',
    description:'簡單三步驟，下酒下飯都適合。',
    image: shrimp, tags:['海鮮','下酒菜','快速'],
    prepTime:8, cookTime:8, servings:2, calories:430, difficulty:'簡單',
    ingredients: ['草蝦 12 隻(去腸泥)','無鹽奶油 30g','蒜末 3 瓣','巴西里碎 少許','檸檬角 1 份'],
    seasonings: ['鹽、黑胡椒 適量','白酒 2 大匙(可選)','辣椒碎(可選)'],
    steps:['融奶油爆香蒜末','下蝦翻炒變色','調味灑巴西里擠檸檬']
  },
  {
    id:'9', title:'韓式泡菜炒飯',
    description:'酸辣開胃，加入半熟蛋更讚。',
    image: kimchi, tags:['韓式','家常','快炒'],
    prepTime:5, cookTime:10, servings:1, calories:650, difficulty:'簡單',
    ingredients: ['白飯 1 碗','泡菜 150g(含汁)','培根/午餐肉 80g','雞蛋 1 顆','蔥花 少許'],
    seasonings: ['韓式辣醬 1 大匙','泡菜汁 2 大匙','香油 1 茶匙','醬油 1 茶匙','白芝麻 少許'],
    steps:['炒香培根與泡菜','下飯拌炒，加辣醬與泡菜汁調味','起鍋前淋香油放荷包蛋']
  },
  {
    id:'10', title:'泰式綠咖哩雞',
    description:'香茅與羅望子風味，椰奶香濃。',
    image: thai, tags:['泰式','咖哩','香料'],
    prepTime:15, cookTime:25, servings:3, calories:720, difficulty:'中等',
    ingredients: ['去骨雞腿 300g','青咖哩醬 2 大匙','椰奶 400ml','茄子/甜椒 200g','竹筍 100g','泰國九層塔 一把'],
    seasonings: ['魚露 1 大匙','棕櫚糖/砂糖 1 茶匙','卡菲爾萊姆葉 2 片','食用油 1 大匙'],
    steps:['爆香咖哩醬','下雞腿與椰奶煮滾','加入蔬菜調味，起鍋前放九層塔']
  },
  {
    id:'11', title:'蒜香烤馬鈴薯',
    description:'外酥內綿的小配菜，百搭主食。',
    image: potato, tags:['烤箱','配菜','馬鈴薯'],
    prepTime:10, cookTime:30, servings:2, calories:310, difficulty:'簡單',
    ingredients: ['馬鈴薯 500g(切塊)','蒜末 4 瓣','迷迭香/百里香 少許','橄欖油 2 大匙'],
    seasonings: ['鹽、黑胡椒 適量','紅椒粉(可選)'],
    steps:['馬鈴薯泡鹽水拭乾','拌蒜香草與油','200°C 烤 25~30 分翻面一次']
  },
];


export function RecipeProvider({ children }) {
  // 用新版 key（你原本用 v3 也 OK；若要強制刷新可改 v4）
  const [recipes, setRecipes]     = useLocalStorage('recipes_v3', initialRecipes);
  const [notes, setNotes]         = useLocalStorage('notes', []);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  // 修復舊資料（空圖或 /src/... 字串路徑）
  useEffect(() => {
    const repaired = recipes.map(r => {
      const needFix = !r.image || (typeof r.image === 'string' && r.image.startsWith('/src/'));
      return needFix ? { ...r, image: IMAGE_BY_ID[r.id] || salad } : r;
    });
    if (JSON.stringify(repaired) !== JSON.stringify(recipes)) setRecipes(repaired);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const toggleFavorite = (id) => {
  if (!id) return; // 防呆
  setFavorites(prev => {
    const set = new Set(prev.filter(Boolean)); // 清掉 undefined/null
    if (set.has(id)) set.delete(id); else set.add(id);
    return Array.from(set);
  });
};

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes, notes, setNotes, favorites, toggleFavorite }}>
      {children}
    </RecipeContext.Provider>
  );
}
