import React, { useState } from 'react';
import { Character, Scenario, TriageResult } from '../types';
import { diagnoseProblem } from '../services/advisorEngine';
import { Eye, Sparkles, ArrowRight, MessageSquare } from 'lucide-react';

interface WaterMirrorViewProps {
  onDirectConsult: (character: Character, scenario?: Scenario) => void;
  onGoToCouncilWithQuery: (query: string, primaryChar: Character) => void;
}

export const WaterMirrorView: React.FC<WaterMirrorViewProps> = ({
  onDirectConsult,
  onGoToCouncilWithQuery,
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [result, setResult] = useState<TriageResult | null>(null);

  const handleTriage = () => {
    if (!inputQuery.trim()) return;
    const res = diagnoseProblem(inputQuery);
    setResult(res);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* 水鏡先生 Banner */}
      <div className="relative rounded-2xl p-6 sm:p-8 overflow-hidden border border-blue-500/30 bg-gradient-to-br from-[#101726] via-[#0d131e] to-[#080b12] shadow-xl">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center font-serif text-blue-300 text-2xl font-bold shadow-lg">
            鏡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-serif font-bold text-slate-100">
                水鏡先生 · 疑難智慧分診室
              </h2>
              <span className="chinese-seal text-xs">分診</span>
            </div>
            <p className="text-xs text-blue-300/90 font-serif mt-0.5">
              司馬徽坐鎮 · 洞察天下迷津 · 推薦最契合此局之謀士
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm font-serif italic text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          「識時務者在乎俊傑。天下奇謀異士多矣，有長於宏圖者，有精於奇策者，亦有善於自保者。迷茫不知求教何人？只需言明片語，老朽自當為你引薦合適策士。」
        </p>
      </div>

      {/* 輸入區塊 */}
      <div className="ink-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-sm font-serif font-bold text-slate-200 flex items-center gap-2">
          <Eye className="w-4 h-4 text-blue-400" />
          向先生陳述當前苦惱或抉擇
        </h3>

        <textarea
          rows={3}
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="例如：在原單位待太久很憋屈想換環境出來闖蕩 / 主管決策失誤企圖拉我背黑鍋 / 團隊資源不足如何對抗大廠龍頭..."
          className="w-full p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 leading-relaxed"
        />

        {/* 快速提示標籤 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-500 font-serif">快速填入：</span>
          <button
            onClick={() => setInputQuery('被困在原崗位太久了，心裡憋悶得發慌，想跳出舒適圈去外面闖蕩但缺乏勇氣。')}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-blue-300 border border-slate-800"
          >
            被悶已久想闖蕩
          </button>
          <button
            onClick={() => setInputQuery('公司內部派系嚴重，主管想把專案失敗的黑鍋甩到我頭上，該如何自保？')}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-blue-300 border border-slate-800"
          >
            甩鍋險局求自保
          </button>
          <button
            onClick={() => setInputQuery('公司資源極度匱乏，但必須搶佔一個龐大巨頭把持的新市場，如何以弱勝強？')}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-blue-300 border border-slate-800"
          >
            資源匱乏以弱勝強
          </button>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleTriage}
            disabled={!inputQuery.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-serif font-bold text-xs shadow-glow-blue transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>請水鏡先生指路分診</span>
          </button>
        </div>
      </div>

      {/* 分診診斷結果 */}
      {result && (
        <div className="ink-card rounded-2xl p-6 sm:p-8 border border-blue-500/40 bg-gradient-to-b from-[#131b2e] to-[#0d121c] shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-blue-500/20 pb-4">
            <div className="flex items-center gap-2">
              <span className="chinese-seal text-xs">籤定</span>
              <h4 className="text-lg font-serif font-bold text-blue-200">
                水鏡診斷 · 【{result.problemType}】
              </h4>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 font-serif text-sm text-slate-200 leading-relaxed">
            {result.diagnosis}
          </div>

          <div>
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
              RECOMMENDED STRATEGISTS 推薦召喚軍師
            </div>
            <p className="text-xs text-slate-400 font-serif mb-4 leading-relaxed">
              {result.reason}
            </p>

            {/* 推薦策士卡片列表 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {result.recommendedCharacters.map((char) => (
                <div
                  key={char.id}
                  className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-serif font-bold text-lg border"
                        style={{
                          backgroundColor: `${char.accentColor}25`,
                          borderColor: `${char.accentColor}60`,
                          color: char.accentColor,
                        }}
                      >
                        {char.name[0]}
                      </div>
                      <div>
                        <h5 className="text-sm font-serif font-bold text-slate-100">
                          {char.name}（字 {char.courtesyName}）
                        </h5>
                        <p className="text-[11px] text-amber-400 font-serif">
                          {char.title}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 font-serif line-clamp-2 mb-3">
                      {char.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => onDirectConsult(char, {
                        id: 'custom-triage',
                        title: result.problemType,
                        category: '分診推薦',
                        tag: '水鏡指引',
                        description: inputQuery,
                        prompt: inputQuery,
                        recommendedIds: [char.id]
                      })}
                      className="w-full flex items-center justify-center gap-1 py-1.5 rounded-lg bg-amber-600/90 hover:bg-amber-500 text-slate-950 font-serif font-bold text-xs transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      向 {char.name} 問策
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onGoToCouncilWithQuery(inputQuery, result.recommendedCharacters[0])}
              className="text-xs font-serif text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <span>直接帶這兩位軍師前往【赤壁廷議】當面論證</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
