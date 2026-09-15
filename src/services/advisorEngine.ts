import { Character, AdviceResponse, CouncilDebate, TriageResult, ApiSettings, DebateTurn } from '../types';
import { CHARACTERS } from '../data/characters';

/**
 * 水鏡先生 (Sima Hui) 智慧分診系統
 */
export function diagnoseProblem(problem: string): TriageResult {
  const p = problem.toLowerCase();

  if (p.includes('闖') || p.includes('悶') || p.includes('走') || p.includes('離職') || p.includes('換環境') || p.includes('創業') || p.includes('舒適圈')) {
    const guan = CHARACTERS.find(c => c.id === 'guan-yu')!;
    const cao = CHARACTERS.find(c => c.id === 'cao-cao')!;
    return {
      problemType: '千里破局與拓荒之變',
      diagnosis: '水鏡先生撫鬚曰：「此乃樊籠困獸之局也！心有大志而形骸受困，長此以往必磨滅英雄之氣。非具大魄力、懷大義者不能破此局。」',
      recommendedCharacters: [guan, cao],
      reason: '雲長公具「封金掛印」之萬丈豪情與看家硬本領；孟德公則懷「唯才是舉、百折不撓」之創業野性，二公可為你指引出關之道。'
    };
  }

  if (p.includes('鍋') || p.includes('政治') || p.includes('內鬥') || p.includes('主管') || p.includes('算計') || p.includes('被害') || p.includes('開除') || p.includes('裁員')) {
    const jia = CHARACTERS.find(c => c.id === 'jia-xu')!;
    const sima = CHARACTERS.find(c => c.id === 'sima-yi')!;
    return {
      problemType: '亂世明哲與政治險局',
      diagnosis: '水鏡先生正色曰：「此乃刀俎魚肉、凶險莫測之殺局！此局不在立功，而在全軀保命。若稍懷婦人之仁或貪圖虛名，恐死無葬身之地。」',
      recommendedCharacters: [jia, sima],
      reason: '賈文和精通「亂世明哲自保」，算無遺策且無道德包袱；司馬仲達善於「裝病避禍、蟄伏待變」，專治凶險官場。'
    };
  }

  if (p.includes('資源') || p.includes('弱') || p.includes('巨頭') || p.includes('對手強') || p.includes('錢少') || p.includes('小團隊') || p.includes('逆襲')) {
    const zhou = CHARACTERS.find(c => c.id === 'zhou-yu')!;
    const guo = CHARACTERS.find(c => c.id === 'guo-jia')!;
    return {
      problemType: '非對稱以弱勝強之局',
      diagnosis: '水鏡先生撫琴曰：「曹瞞八十萬眾下江南，天下皆以為必亡，然公瑾一炬定乾坤。勢弱不可力敵，當取其樞紐、施以奇謀。」',
      recommendedCharacters: [zhou, guo],
      reason: '周公瑾善尋龐然大物之致命死穴、精通火攻槓桿；郭奉孝十勝十敗洞察人性，善打兵貴神速之奇襲。'
    };
  }

  if (p.includes('接') || p.includes('風險') || p.includes('兩難') || p.includes('接不接') || p.includes('代價') || p.includes('轉型')) {
    const sima = CHARACTERS.find(c => c.id === 'sima-yi')!;
    const zhuge = CHARACTERS.find(c => c.id === 'zhuge-liang')!;
    return {
      problemType: '高危險機遇之抉擇博弈',
      diagnosis: '水鏡先生沉吟曰：「福兮禍所伏，禍兮福所倚。誘人之餌，往往懸於利鉤之上。若無通盤條件與深謀遠慮，不可輕動。」',
      recommendedCharacters: [zhuge, sima],
      reason: '諸葛孔明教你如何借勢索權、立於大義正道；司馬仲達教你如何冷眼看穿殺機、預留退路或以退為進。'
    };
  }

  // 默認戰略全局
  const zhuge = CHARACTERS.find(c => c.id === 'zhuge-liang')!;
  const xun = CHARACTERS.find(c => c.id === 'xun-yu')!;
  return {
    problemType: '長期立身與頂層建制之局',
    diagnosis: '水鏡先生曰：「天下大勢，浩浩湯湯。凡圖大事者，必先固本培元，深察大勢走向，不可被一時之迷霧遮蔽雙目。」',
    recommendedCharacters: [zhuge, xun],
    reason: '孔明具隆中定鼎之遠略，文若有王佐治理之全才，二人同參，可定乾坤基業。'
  };
}

/**
 * 策士單兵進言生成器
 */
export async function generateAdvice(
  character: Character,
  userProblem: string,
  apiSettings?: ApiSettings
): Promise<AdviceResponse> {
  // 若使用者填入有效 API Key 且選擇真實 LLM
  if (apiSettings?.apiKey && apiSettings.provider === 'gemini') {
    try {
      const response = await callGeminiApi(character, userProblem, apiSettings);
      if (response) return response;
    } catch (e) {
      console.warn('Gemini API call failed, falling back to local simulation engine:', e);
    }
  }

  // 內建深度情境推演引擎 (Local Intelligent Synthesis)
  return generateSimulatedAdvice(character, userProblem);
}

/**
 * 赤壁廷議（多策士論辯）生成器
 */
export async function generateWarCouncil(
  characters: Character[],
  userProblem: string,
  _apiSettings?: ApiSettings
): Promise<CouncilDebate> {
  const turns: DebateTurn[] = [];

  // Round 1: 各自亮出立場與根本哲學
  for (let i = 0; i < characters.length; i++) {
    const c = characters[i];
    const prev = i > 0 ? characters[i - 1] : null;

    let arg = '';
    let stance = '';

    if (c.id === 'guan-yu') {
      stance = '以義決斷，單騎破局';
      arg = `某觀此局，不過是心魔作祟！汝等在此斤斤計較得失，猶如村野小兒算銅板。若心中有傲骨，手中刀磨利，天下何處去不得？！若猶豫不決，便一輩子當那籠中困雀罷了！`;
    } else if (c.id === 'sima-yi') {
      stance = '審時度勢，堅壁清野';
      arg = prev?.id === 'guan-yu' 
        ? `雲長兄莫要憑一時匹夫之勇誤導主公！想當年公失荊州，豈非亦因過剛自恃、輕視下行風險？世情險惡，貿然冒進無異於以卵擊石。當前當稱病示弱，暗中儲力，待敵自露破綻方有一擊必中之勝！`
        : `世人皆求速勝，吾獨好善敗。此時局勢未明，主動出擊只會成為眾矢之的。善隱忍者得天下，將時間化為盟友方為上策。`;
    } else if (c.id === 'jia-xu') {
      stance = '明哲保身，極致自保';
      arg = `諸公莫要談那些高調！名譽也罷、豪情也罷，人若身死首領不保，萬事皆休。依我看，先算最壞情況下如何全身而退。責任能分擔則分擔，功勞不必獨攬，切莫把脖子伸給別人當墊腳石！`;
    } else if (c.id === 'zhuge-liang') {
      stance = '正道合縱，長遠建基';
      arg = `仲達過於陰鷙，雲長過於剛烈，文和又失之大義。此局非不可為，而在於有無「根據地」與「正義名分」！當先與上位者及關鍵盟友立下契約條陳，明晰權責預算，方能謀圖十年大業。`;
    } else if (c.id === 'zhou-yu') {
      stance = '奇謀槓桿，破釜沉舟';
      arg = `畏首畏尾，何以成不世之功？！敵雖眾，必有連環僵化之死穴。某意已決，不可退讓！尋其軟肋，集中全力打其一點，一炬可破其千鈞之勢！`;
    } else if (c.id === 'guo-jia') {
      stance = '攻心為上，兵貴神速';
      arg = `兵貴神速，機不可失！敵之破綻不在甲兵，而在心術。其掌權者猜忌多疑、下屬離心離德，此正是我等快刀斬亂麻之時，豈容緩步慢行？`;
    } else if (c.id === 'cao-cao') {
      stance = '唯才權變，敏捷試錯';
      arg = `哈哈哈哈！諸公所言皆有理，然天下事何來萬全之策？孤打過無數敗仗，宛城失典韋、赤壁失艦隊，何曾被嚇倒過？今日之事，先派輕騎試探，成了便進，敗了立刻轉舵，唯臨機權變者能奪天下！`;
    } else {
      stance = `${c.mentalModel.name}之視角`;
      arg = `以某觀之，${c.quote}。當以大局出發，先安人心，再立制度。`;
    }

    turns.push({
      speakerId: c.id,
      speakerName: c.name,
      faction: c.faction,
      stance,
      critiqueTargetId: prev?.id,
      critiqueTargetName: prev?.name,
      argument: arg
    });
  }

  // 廷議綜合裁決
  const synthesis = {
    coreDilemma: `在「果敢破局（以${characters[0]?.name}為代表）」與「穩健避險（以${characters[1]?.name || '防守派'}為代表）」之間的戰略平衡。`,
    blindspotsExposed: [
      `${characters[0]?.name}指出：過度保守將永遠失去戰略主動權，陷入慢性溫水煮青蛙。`,
      `${characters[1]?.name || characters[0]?.name}警告：盲目求快與情緒化出擊，若未配妥安全繩，極易粉身碎骨。`,
      `群臣共識：可抱持「破局之決心」，但必須採用「防守之紀律與備援」。`
    ],
    lordDecision: `【主公最終裁決令】：採「陽行雲長之勇，陰用仲達之慎，深備文和之退」。對外展現果斷亮劍之姿奪取先機，私下備齊退路契約與半年糧草儲備。不打無準備之仗，亦不作畏縮不前之徒！`
  };

  return {
    id: `council-${Date.now()}`,
    query: userProblem,
    participants: characters,
    turns,
    synthesis
  };
}

/**
 * 本地情境推演引擎
 */
function generateSimulatedAdvice(character: Character, _problem: string): AdviceResponse {

  if (character.id === 'guan-yu') {
    return {
      characterId: 'guan-yu',
      characterName: '關羽',
      courtesyName: '雲長',
      toneEmoji: '⚔️',
      situationAnalysis: `足下被困於樊籠之中，已憋悶多久矣？！
某觀你胸中這股悶氣，非為病態，乃是熱血未涼、豪氣猶在之兆！
你貪戀現在這口殘羹冷炙，便如良駒老死於槽櫪、猛虎馴化於檻籠。
想當年某暫棲許昌，曹瞞賜金封侯，某何曾有半點動搖？既知兄長下落，縱有萬里險阻，亦當封金掛印、單騎突圍！`,
      upperPlan: {
        title: '【上策·封金掛印，千里走單騎】',
        detail: '堂堂正正交代舊責，不欠半分恩義，把交接辦得滴水不漏。明確你的「河北兄長」（大方向與合夥人）在何處，立即啟程！以你過硬之本事，出關破陣！',
        risk: '前路多無熟人庇護，須獨自承擔風霜險阻。'
      },
      middlePlan: {
        title: '【中策·單刀赴會，借機試刀】',
        detail: '不急於斷然撕破臉，但要主動爭取外部關鍵專案或新賽道業務，以單兵突進之姿檢驗自己真實戰鬥力，積累戰功後擇機自立。',
        risk: '若舊環境牽扯過深，容易再度被瑣事泥淖拖回。'
      },
      lowerPlan: {
        title: '【下策·繼續隱忍，消磨志氣】',
        detail: '每日唉聲嘆氣、怨天尤人，卻始終不敢跨出轅門半步，最終淪為庸碌之輩。',
        risk: '志氣全消，青龍刀鏽，終生悔恨！'
      },
      actionItems: [
        '【封金清算】：盤點當前不可替代的 2 項硬本事與足夠支撐 6 個月的盤纏（防禦資金）。',
        '【立定大旗】：明確出關後第一座要拿下的城池（目標崗位/首批核心客戶）。',
        '【邁過東嶺關】：72 小時之內，做出一件不可逆轉的行動（送出辭呈/簽署合夥/正式公開新項目）。'
      ],
      farewellQuote: '路在腳下，刀在手中！牽出你的赤兔馬，莫再長吁短嘆！某在關前候你捷報！'
    };
  }

  if (character.id === 'sima-yi') {
    return {
      characterId: 'sima-yi',
      characterName: '司馬懿',
      courtesyName: '仲達',
      toneEmoji: '🦅',
      situationAnalysis: `世人皆喜迎頭趕上，殊不知「強者易折，善柔者存」。
汝當前面臨之局，水深浪急，暗流密布。對手與環境正等著看你沉不住氣、露出破綻。
此時若盲目向前衝，不過是他人棋盤上的一顆問路卒子。
能忍人之所不能忍，方能成常人所不能成！`,
      upperPlan: {
        title: '【上策·堅壁清野，熬死對手】',
        detail: '任憑外界如何挑釁催促，一概以防守姿態應對。嚴控自身資源損耗，把陣地做實，靜候外部局勢轉變或對手犯下致命失誤。',
        risk: '需要承受外界「無能、膽小」之譏笑與極大的心理壓力。'
      },
      middlePlan: {
        title: '【中策·稱疾示弱，暗中儲力】',
        detail: '主動讓出部分無關緊要之虛名利益，降低各方警惕。暗中培養心腹勢力與關鍵武器，只待關鍵節點雷霆翻盤。',
        risk: '示弱若過度，可能短期內邊緣化。'
      },
      lowerPlan: {
        title: '【下策·意氣用事，正面對攻】',
        detail: '受不住激將法而強行開戰，在客場與強敵血拼。',
        risk: '正中對方下懷，一敗塗地無處翻身。'
      },
      actionItems: [
        '【風險盤點】：列出此決策最壞可能失去的所有東西，設立不可觸碰的「停損紅線」。',
        '【裝聾作啞】：面對外界干擾，延遲一切重大承諾與正面衝突，爭取時間。',
        '【預伏殺招】：確立觸發全面反攻的具體客觀指標（如對手現金流斷裂、核心聯盟破裂）。'
      ],
      farewellQuote: '善敗者不亡！熬過寒冬者，方見春水初生。'
    };
  }

  if (character.id === 'jia-xu') {
    return {
      characterId: 'jia-xu',
      characterName: '賈詡',
      courtesyName: '文和',
      toneEmoji: '🐍',
      situationAnalysis: `某向來不講虛偽道德與大義空談。
天地不仁，亂世人命如草芥，職場亦復如是。
此局兇險之處，在於有人企圖將責任暗中引至你身，或誘你入殺局以利彼身。
記住：活著，且完好無損地活著，才是一切利益的起點！`,
      upperPlan: {
        title: '【上策·責任分流，暗結後路】',
        detail: '凡事留痕，所有關鍵指令必求公文電郵確認；將高危流程拆解，拉攏相關部門共同簽署，「功不必在我，過必有人分」。',
        risk: '過程略顯瑣碎防備，但能確保萬無一失。'
      },
      middlePlan: {
        title: '【中策·禍水東引，金蟬脫殼】',
        detail: '順勢將焦點轉移至制度缺陷或外部客觀阻力，甚至推薦更有威望但好大喜功之人接管危險環節，自己退居次席。',
        risk: '需對人心把握極其精準，不可露出斧鑿痕跡。'
      },
      lowerPlan: {
        title: '【下策·逞英雄主義，一人扛下】',
        detail: '妄想以一己之力挽狂瀾，以為老闆會感念忠心。',
        risk: '一旦出事，第一個被當成棄卒祭旗！'
      },
      actionItems: [
        '【留痕保全】：即刻備份關鍵通訊紀錄與簽核日誌，確保關鍵環節有第三方背書。',
        '【建立安全閥】：對承接的任何事情劃定免責條款或前置必要條件。',
        '【低調閉門】：大事平定前，莫多言、莫爭辯、莫搶功。'
      ],
      farewellQuote: '智者千慮，先自保而後圖存。莫做那墓碑上刻滿美名的糊塗鬼。'
    };
  }

  if (character.id === 'zhuge-liang') {
    return {
      characterId: 'zhuge-liang',
      characterName: '諸葛亮',
      courtesyName: '孔明',
      toneEmoji: '🪶',
      situationAnalysis: `夫圖天下大事者，不可徒圖一朝一夕之虛名。
觀足下當前困惑，乃是未立「隆中之基」便欲馳騁中原。
無根之木不可長，無源之水不可久。
當跳出眼前糾纏之細枝末節，從三年至五年之頂層架構重新審視定位。`,
      upperPlan: {
        title: '【上策·隆中立基，奪取樞紐】',
        detail: '明確你在行業或組織中的不可替代「荊益之地」；先將後方基本盤穩固，與強勢盟友建立長期契約，以正道大義推行之。',
        risk: '築基之期較漫長，需耐得住寂寞與基礎建設投入。'
      },
      middlePlan: {
        title: '【中策·借力合縱，跨界同盟】',
        detail: '以利動人，以誠結盟。主動讓出局部非核心收益，聯合上下游受壓迫之力量，組成利益共同體。',
        risk: '聯盟關係需隨時協調，防止盟友因小利生變。'
      },
      lowerPlan: {
        title: '【下策·孤注一擲，冒進圖成】',
        detail: '在糧草未豐、軍法未正之際倉促發動全面決戰。',
        risk: '一著不慎，滿盤皆輸，重蹈街亭之失。'
      },
      actionItems: [
        '【盤點根據地】：明確核心現金流與最忠誠基本盤在哪裡，絕不容失。',
        '【搭建制度條陳】：凡事立規矩、明權責，以制度管事，減少人情消耗。',
        '【爭取大義名分】：為你的目標賦予一個崇高且符合多數人利益的理由。'
      ],
      farewellQuote: '志當存高遠！路阻且長，行則將至；行而不輟，未來可期。'
    };
  }

  if (character.id === 'zhou-yu') {
    return {
      characterId: 'zhou-yu',
      characterName: '周瑜',
      courtesyName: '公瑾',
      toneEmoji: '🔥',
      situationAnalysis: `曹操號稱百萬，江東諸將聞風喪膽皆欲降，此等庸碌之輩，豈知英雄所見？！
強弱之勢，非在人多馬壯，而在於能否抓其軟肋、施以雷霆火攻！
對手雖大，但機構臃腫、船艦連環，動彈不得。這正是你絕地翻盤、一戰成名的天賜良機！`,
      upperPlan: {
        title: '【上策·非對稱槓桿，火燒連環】',
        detail: '避開正面消耗戰，尋找對方最臃腫、反應最慢的一處致命痛點；集中全部力量引入「借東風」（外部趨勢）實施毀滅性打擊。',
        risk: '需要承擔孤注一擲的決心與超凡的執行精準度。'
      },
      middlePlan: {
        title: '【中策·蔣幹盜書，離間其心】',
        detail: '不與其組織正面抗衡，利用其內部猜忌與矛盾，促使其高層自廢武功或內部瓦解。',
        risk: '情報運作需極其精妙，一旦洩露會引發反彈。'
      },
      lowerPlan: {
        title: '【下策·隨波逐流，舉手投降】',
        detail: '懾於威勢而直接繳械，寄希望於對方的慈悲施捨。',
        risk: '身家性命全操於他人之手，永無翻身之日！'
      },
      actionItems: [
        '【找準連環船】：找出對手體系中最僵硬、不能隨機應變的單點破綻。',
        '【備齊火引柴薪】：準備最具有破壞力的產品槓桿或殺手級殺手鐗。',
        '【借天時東風】：鎖定下一個能引爆趨勢的關鍵事件節點，屆時全力一擊！'
      ],
      farewellQuote: '曲有誤，周郎顧。天下大事，敢為天下先者得其半！'
    };
  }

  // 默認通用生成
  return {
    characterId: character.id,
    characterName: character.name,
    courtesyName: character.courtesyName,
    toneEmoji: '📜',
    situationAnalysis: `某觀足下當前情勢，正處於十字路口。
${character.quote}
當前之局，不可被表面之喧囂所擾，當依據【${character.mentalModel.name}】之核心原則重新切入。`,
    upperPlan: {
      title: `【上策·發揮${character.name}之長】`,
      detail: `秉承${character.mentalModel.principles[0] || '戰略定力'}，主動創造非對稱優勢。`,
      risk: '需極高執行力與抗壓能力。'
    },
    middlePlan: {
      title: '【中策·以守代攻，借勢而為】',
      detail: '先保證底線安全，再透過外部力量或盟友資源逐步推動進程。',
      risk: '進程較為平穩，收益可能被稀釋。'
    },
    lowerPlan: {
      title: '【下策·猶豫不決，坐失良機】',
      detail: '思慮過多而遲疑不前，將決策權拱手讓人。',
      risk: '錯過最佳時間窗口，陷於被動。'
    },
    actionItems: [
      `落實${character.mentalModel.principles[1] || '明確目標'}。`,
      '評估自身優勢與劣勢，剔除冗餘干擾。',
      '在接下來的一週內，採取一項具有實質進展的果斷行動。'
    ],
    farewellQuote: `${character.name}祝足下旗開得勝，早定乾坤！`
  };
}

/**
 * 外部真實 API 調用輔助函式 (Google Gemini)
 */
async function callGeminiApi(
  character: Character,
  userProblem: string,
  settings: ApiSettings
): Promise<AdviceResponse | null> {
  const prompt = `
你現在是三國人物「${character.name}（字${character.courtesyName}）」。
角色設定：${character.systemPrompt}
請針對使用者提出的問題進行【觀局】、【三策分析（上中下策）】與【落地錦囊行動清單】。
問題內容：${userProblem}

請嚴格以純 JSON 格式回應，包含以下欄位：
{
  "characterId": "${character.id}",
  "characterName": "${character.name}",
  "courtesyName": "${character.courtesyName}",
  "toneEmoji": "古代武將策士相應表情",
  "situationAnalysis": "用該人物鮮明語調進行局勢剖析（文言白話兼融，痛快淋漓）",
  "upperPlan": { "title": "上策標題", "detail": "詳細方案", "risk": "代價與風險" },
  "middlePlan": { "title": "中策標題", "detail": "詳細方案", "risk": "代價與風險" },
  "lowerPlan": { "title": "下策標題", "detail": "詳細方案", "risk": "代價與風險" },
  "actionItems": ["行動步驟1", "行動步驟2", "行動步驟3"],
  "farewellQuote": "臨別贈言"
}
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${settings.model || 'gemini-1.5-flash'}:generateContent?key=${settings.apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' }
    })
  });

  if (!res.ok) throw new Error(`Gemini API error: ${res.statusText}`);
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return null;

  return JSON.parse(text) as AdviceResponse;
}
