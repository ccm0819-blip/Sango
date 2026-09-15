export type Faction = 'shu' | 'wei' | 'wu' | 'qun';

export type Category = 
  | 'strategy'     // 戰略宏圖
  | 'defense'      // 防守反擊 / 風控
  | 'breakthrough'  // 拓荒破局 / 決斷
  | 'tactics'      // 奇策心理 / 戰術
  | 'survival'     // 極致生存 / 自保
  | 'organization' // 組織治理 / 體系
  | 'leadership';  // 權變統率 / 激勵

export interface MentalModel {
  name: string;
  summary: string;
  principles: string[];
}

export interface Character {
  id: string;
  name: string;
  courtesyName: string; // 字，如孔明、仲達
  title: string;        // 稱號
  faction: Faction;
  category: Category;
  badgeColor: string;
  accentColor: string;
  iconName: string;
  quote: string;
  description: string;
  mentalModel: MentalModel;
  tags: string[];
  historicalFeats: string[];
  systemPrompt: string;
}

export interface AdviceResponse {
  characterId: string;
  characterName: string;
  courtesyName: string;
  toneEmoji: string;
  situationAnalysis: string; // 【觀局】
  upperPlan: { title: string; detail: string; risk: string };  // 【上策】
  middlePlan: { title: string; detail: string; risk: string }; // 【中策】
  lowerPlan: { title: string; detail: string; risk: string };  // 【下策】
  actionItems: string[];     // 【錦囊行動清單】
  farewellQuote: string;     // 【策士勉辭】
}

export interface DebateTurn {
  speakerId: string;
  speakerName: string;
  faction: Faction;
  stance: string;
  critiqueTargetId?: string;
  critiqueTargetName?: string;
  argument: string;
}

export interface CouncilDebate {
  id: string;
  query: string;
  participants: Character[];
  turns: DebateTurn[];
  synthesis: {
    coreDilemma: string;
    blindspotsExposed: string[];
    lordDecision: string; // 主公決策指引
  };
}

export interface Scenario {
  id: string;
  title: string;
  category: string;
  tag: string;
  description: string;
  prompt: string;
  recommendedIds: string[];
}

export interface TriageResult {
  problemType: string;
  diagnosis: string;
  recommendedCharacters: Character[];
  reason: string;
}

export interface ApiSettings {
  provider: 'mock' | 'gemini' | 'openai';
  apiKey: string;
  model: string;
}
