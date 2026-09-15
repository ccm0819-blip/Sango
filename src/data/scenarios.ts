import { Scenario } from '../types';

export const PRESET_SCENARIOS: Scenario[] = [
  {
    id: 'breakout-venture',
    title: '被悶在舒適圈太久，想要出來闖蕩',
    category: '個人生涯',
    tag: '單騎破局',
    description: '在原公司或既有崗位過得溫吞如水、憋悶壓抑，熱血未冷但瞻前顧後，想出去創業或闖出自己的天地，卻又害怕失敗。',
    prompt: '我被困在現有的環境很久了，日子平淡無奇但極度憋悶。我想跳出舒適圈去外面闖蕩（無論是創業還是開拓新領域），但我不知該如何下定決心斬斷牽絆，又該如何在外面站穩腳步？',
    recommendedIds: ['guan-yu', 'cao-cao', 'zhuge-liang']
  },
  {
    id: 'high-risk-project',
    title: '高層強推高風險新專案，接還是不接？',
    category: '職場博弈',
    tag: '接案決策',
    description: '公司想推一個極具前景但風險極高、資源未給足的創新專案，成功了是大功，失敗了很可能被當成替罪羊祭旗，其他主管都在推託。',
    prompt: '公司高層想指派我主導一個非常關鍵但也極度容易翻車的重大轉型專案。成功有望晉升，但各部門推拖、資源不足，失敗了極可能成為代罪羔羊。我該接還是不接？若要接，該如何設局自保並爭取勝算？',
    recommendedIds: ['sima-yi', 'zhuge-liang', 'jia-xu']
  },
  {
    id: 'asymmetric-competition',
    title: '手頭資源極度匱乏，如何以弱勝強？',
    category: '商業競爭',
    tag: '逆勢槓桿',
    description: '團隊規模只有幾個人，對手卻是資源雄厚、預算幾十倍的行業龍頭，正面交鋒必敗無疑，該如何尋找破綻逆襲？',
    prompt: '我們是一個初創小團隊，面臨行業巨頭在同一賽道的全面擠壓。對手兵強馬壯、預算無限，我們糧草告急。我們該如何利用非對稱競爭找到對方的死穴，打一場翻盤仗？',
    recommendedIds: ['zhou-yu', 'guo-jia', 'zhuge-liang']
  },
  {
    id: 'office-politics-shield',
    title: '部門內鬥混亂，領導企圖甩鍋背黑鍋',
    category: '職場生存',
    tag: '自保防禦',
    description: '公司內部權力洗牌，主管決策失誤造成重大損失，現在隱隱有意圖將責任推到我或我團隊身上。',
    prompt: '公司內部派系傾軋，主管在重大業務上犯了致命錯誤，現在暗地裡拉我做擋箭牌，想讓我頂包背黑鍋。在不能撕破臉又絕不能當犧牲品的情況下，我該如何見招拆招、全身而退？',
    recommendedIds: ['jia-xu', 'sima-yi']
  },
  {
    id: 'startup-talent-architecture',
    title: '新業務初創，缺乏頂尖人才與體系法度',
    category: '組織管理',
    tag: '築基建制',
    description: '剛接管或新創一個團隊，人員參差不齊，做事全靠拍腦袋，沒有明確制度與人才梯隊，難以承受業務擴張。',
    prompt: '我們剛開展一條全新業務線，人員青黃不接，制度一片空白，天天忙於救火。如何從零搭建高效率的組織架構，吸引外部強援，並建立可持續運轉的體系？',
    recommendedIds: ['xun-yu', 'cao-cao', 'zhuge-liang']
  },
  {
    id: 'alliance-vs-monopoly',
    title: '被頭部巨頭全面封殺，如何尋找同盟打破封鎖？',
    category: '商業戰略',
    tag: '合縱連橫',
    description: '市場上出現壟斷級霸主，對中小廠商形成降維打擊，單打獨鬥注定被逐個擊破，需要促成同行跨界聯盟。',
    prompt: '強大的競爭對手正試圖用資本和通路封殺我們。我們需要聯合周邊其他同樣受到威脅的中小夥伴甚至昔日對手，但各方利益訴求不同、互不信任，該如何穿針引線促成戰略大聯盟？',
    recommendedIds: ['lu-su', 'zhuge-liang']
  }
];
