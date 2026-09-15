import React, { useState, useEffect } from 'react';
import { Character, Scenario, AdviceResponse, ApiSettings } from '../types';
import { CHARACTERS } from '../data/characters';
import { PRESET_SCENARIOS } from '../data/scenarios';
import { generateAdvice } from '../services/advisorEngine';
import { Feather, Send, Copy, Check, Swords, Sparkles, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ConsultationViewProps {
  selectedCharacter: Character;
  setSelectedCharacter: (character: Character) => void;
  initialScenario?: Scenario;
  apiSettings: ApiSettings;
  onGoToCouncilWithQuery: (query: string, primaryChar: Character) => void;
}

export const ConsultationView: React.FC<ConsultationViewProps> = ({
  selectedCharacter,
  setSelectedCharacter,
  initialScenario,
  apiSettings,
  onGoToCouncilWithQuery,
}) => {
  const [problem, setProblem] = useState(initialScenario?.prompt || '');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<AdviceResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [activePlanTab, setActivePlanTab] = useState<'upper' | 'middle' | 'lower'>('upper');

  // 若切換初始情境，自動帶入文字
  useEffect(() => {
    if (initialScenario) {
      setProblem(initialScenario.prompt);
    }
  }, [initialScenario]);

  const handleConsult = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    try {
      const res = await generateAdvice(selectedCharacter, problem, apiSettings);
      setAdvice(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAdvice = () => {
    if (!advice) return;
    const text = `【${advice.characterName}·觀局進言】
${advice.situationAnalysis}

${advice.upperPlan.title}
內容：${advice.upperPlan.detail}
風險：${advice.upperPlan.risk}

${advice.middlePlan.title}
內容：${advice.middlePlan.detail}
風險：${advice.middlePlan.risk}

${advice.lowerPlan.title}
內容：${advice.lowerPlan.detail}
風險：${advice.lowerPlan.risk}

【落地錦囊行動清單】
${advice.actionItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}

「${advice.farewellQuote}」`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* 策士頂部切換條 */}
      <div className="ink-card rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-serif font-black shrink-0 border"
            style={{ 
              backgroundColor: `${selectedCharacter.accentColor}25`,
              borderColor: `${selectedCharacter.accentColor}60`,
              color: selectedCharacter.accentColor 
            }}
          >
            {selectedCharacter.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-serif font-bold text-slate-100">
                {selectedCharacter.name}
              </h2>
              <span className="text-xs font-serif text-slate-400">
                字 {selectedCharacter.courtesyName}
              </span>
              <span className="chinese-seal text-xs scale-90">
                {selectedCharacter.faction === 'shu' ? '蜀' : selectedCharacter.faction === 'wei' ? '魏' : selectedCharacter.faction === 'wu' ? '吳' : '漢'}
              </span>
            </div>
            <p className="text-xs text-amber-400 font-serif mt-0.5">
              {selectedCharacter.title} · {selectedCharacter.mentalModel.name}
            </p>
          </div>
        </div>

        {/* 切換其他策士 */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-serif whitespace-nowrap">換請軍師：</span>
          <select
            value={selectedCharacter.id}
            onChange={(e) => {
              const char = CHARACTERS.find((c) => c.id === e.target.value);
              if (char) setSelectedCharacter(char);
            }}
            className="w-full sm:w-44 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 font-serif focus:outline-none focus:border-amber-500"
          >
            {CHARACTERS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.courtesyName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 疑難輸入帳 */}
      <div className="ink-card rounded-2xl p-6 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Feather className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-serif font-bold text-slate-200">
              請軍師參詳疑難迷局
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {apiSettings.apiKey ? '✨ 自訂 API 模式' : '⚡ 本地推演引擎模式'}
          </span>
        </div>

        {/* 快速填入經典題 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-500 font-serif">經典預設：</span>
          {PRESET_SCENARIOS.slice(0, 4).map((sc) => (
            <button
              key={sc.id}
              onClick={() => setProblem(sc.prompt)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border border-slate-800 transition-colors"
            >
              {sc.tag}
            </button>
          ))}
        </div>

        {/* 輸入文字框 */}
        <textarea
          rows={4}
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder={`例如：我被困在現有環境很久了，日子平淡無奇但極度憋悶。我想跳出舒適圈去外面闖蕩，該如何下定決心？...`}
          className="w-full p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 leading-relaxed"
        />

        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-slate-500 font-serif">
            軍師將依據其獨有哲學，提供【局勢剖析】、【上中下三策】與【行動清單】。
          </p>

          <button
            onClick={handleConsult}
            disabled={loading || !problem.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 font-serif font-bold text-xs shadow-glow-gold transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>軍師推演中...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>請 {selectedCharacter.name} 賜策</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 軍師答覆錦囊 (Result Area) */}
      {advice && (
        <div className="space-y-6 animate-fadeIn">
          {/* 【觀局】氣場直言 */}
          <div className="ink-card rounded-2xl p-6 sm:p-8 border border-amber-500/30 bg-gradient-to-b from-[#161f2c] to-[#0d131b] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none text-8xl font-serif font-black text-amber-500">
              策
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">{advice.toneEmoji}</span>
                <span className="chinese-seal text-xs">觀局</span>
                <h4 className="text-base font-serif font-bold text-amber-300">
                  {advice.characterName}·局勢透視
                </h4>
              </div>

              <button
                onClick={handleCopyAdvice}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-amber-300 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '已複製全部錦囊' : '複製進言'}</span>
              </button>
            </div>

            <p className="font-serif text-sm sm:text-base text-slate-200 leading-relaxed whitespace-pre-line">
              {advice.situationAnalysis}
            </p>
          </div>

          {/* 【三策】分頁展示 */}
          <div className="ink-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-serif font-bold text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                {advice.characterName} 斟酌之上中下三策
              </h4>

              {/* Tabs */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActivePlanTab('upper')}
                  className={`px-3 py-1 rounded-lg text-xs font-serif transition-all ${
                    activePlanTab === 'upper'
                      ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  上策（進取）
                </button>
                <button
                  onClick={() => setActivePlanTab('middle')}
                  className={`px-3 py-1 rounded-lg text-xs font-serif transition-all ${
                    activePlanTab === 'middle'
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  中策（穩健）
                </button>
                <button
                  onClick={() => setActivePlanTab('lower')}
                  className={`px-3 py-1 rounded-lg text-xs font-serif transition-all ${
                    activePlanTab === 'lower'
                      ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  下策（警示）
                </button>
              </div>
            </div>

            {/* Plan Content */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              {activePlanTab === 'upper' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-serif font-bold text-emerald-300">
                      {advice.upperPlan.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      主動破局
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {advice.upperPlan.detail}
                  </p>
                  <div className="flex items-start gap-1.5 text-xs text-amber-400/90 pt-2 border-t border-slate-800">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>潛在代價與風險：{advice.upperPlan.risk}</span>
                  </div>
                </>
              )}

              {activePlanTab === 'middle' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-serif font-bold text-blue-300">
                      {advice.middlePlan.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      平衡折衝
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {advice.middlePlan.detail}
                  </p>
                  <div className="flex items-start gap-1.5 text-xs text-amber-400/90 pt-2 border-t border-slate-800">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>潛在代價與風險：{advice.middlePlan.risk}</span>
                  </div>
                </>
              )}

              {activePlanTab === 'lower' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-serif font-bold text-amber-300">
                      {advice.lowerPlan.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      消極或急躁
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {advice.lowerPlan.detail}
                  </p>
                  <div className="flex items-start gap-1.5 text-xs text-rose-400 pt-2 border-t border-slate-800">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>危險警示：{advice.lowerPlan.risk}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 【落地錦囊行動清單】 */}
          <div className="ink-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <h4 className="text-sm font-serif font-bold text-slate-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              具體落地錦囊 · 72 小時執行清單
            </h4>
            <div className="space-y-2">
              {advice.actionItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs sm:text-sm text-slate-200"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-mono font-bold shrink-0 text-xs mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 策士臨別贈言 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="text-xs font-serif italic text-amber-200/90">
              「{advice.farewellQuote}」
            </div>
            <span className="chinese-seal text-xs scale-90">佩印</span>
          </div>

          {/* 前往赤壁廷議辯駁 */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="text-sm font-serif font-bold text-rose-300 flex items-center gap-2">
                <Swords className="w-4 h-4 text-rose-400" />
                擔心此策有盲區？前往【赤壁廷議】找其他軍師挑刺！
              </h5>
              <p className="text-xs text-slate-400 font-serif mt-0.5">
                一策既出，何不召集理念相剋的軍師（如司馬懿、賈詡）同場論辯，實施紅藍軍攻防對決？
              </p>
            </div>
            <button
              onClick={() => onGoToCouncilWithQuery(problem, selectedCharacter)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-serif font-bold text-xs shadow-glow-red transition-all whitespace-nowrap cursor-pointer"
            >
              攜此題前往廷議
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
