import React, { useState } from 'react';
import { Character, CouncilDebate, ApiSettings } from '../types';
import { CHARACTERS } from '../data/characters';
import { generateWarCouncil } from '../services/advisorEngine';
import { Swords, AlertOctagon, CheckCircle2, UserCheck, Flame } from 'lucide-react';

interface WarCouncilViewProps {
  councilQuery: string;
  setCouncilQuery: (query: string) => void;
  initialParticipants?: Character[];
  apiSettings: ApiSettings;
}

export const WarCouncilView: React.FC<WarCouncilViewProps> = ({
  councilQuery,
  setCouncilQuery,
  initialParticipants,
  apiSettings,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    initialParticipants && initialParticipants.length >= 2
      ? initialParticipants.map((c) => c.id)
      : ['guan-yu', 'sima-yi', 'jia-xu']
  );
  const [loading, setLoading] = useState(false);
  const [debate, setDebate] = useState<CouncilDebate | null>(null);

  const toggleParticipant = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length <= 2) return; // 至少保持 2 位
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length >= 3) {
        setSelectedIds([selectedIds[1], selectedIds[2], id]);
      } else {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const setPresetPair = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleStartCouncil = async () => {
    if (!councilQuery.trim()) return;
    setLoading(true);
    try {
      const participants = CHARACTERS.filter((c) => selectedIds.includes(c.id));
      const res = await generateWarCouncil(participants, councilQuery, apiSettings);
      setDebate(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="relative rounded-2xl p-6 sm:p-8 overflow-hidden border border-rose-500/30 bg-gradient-to-br from-[#1b1216] via-[#120f14] to-[#0a0a0f] shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-serif font-bold text-slate-100">
                赤壁廷議殿 · 多方軍師論道
              </h2>
              <span className="chinese-seal text-xs">廷議</span>
            </div>
            <p className="text-xs text-rose-300/80 font-serif mt-0.5">
              召集理念相剋的名將策士，展開紅藍軍攻防對決，逼出決策最深層盲區
            </p>
          </div>
        </div>
      </div>

      {/* 策士出席席位選擇 */}
      <div className="ink-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-serif font-bold text-slate-200">
              挑選 2~3 位廷議策士（已選 {selectedIds.length} 位）
            </h3>
          </div>

          {/* 經典廷議組合 */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-500 font-serif">經典爭鋒：</span>
            <button
              onClick={() => setPresetPair(['guan-yu', 'sima-yi', 'jia-xu'])}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-900/50"
            >
              單騎 vs 忍耐 vs 自保
            </button>
            <button
              onClick={() => setPresetPair(['zhuge-liang', 'sima-yi'])}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-900/50"
            >
              亮懿大對決
            </button>
            <button
              onClick={() => setPresetPair(['zhou-yu', 'guo-jia'])}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-blue-300 border border-blue-900/50"
            >
              火攻 vs 奇策
            </button>
          </div>
        </div>

        {/* 策士勾選按鈕群 */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {CHARACTERS.map((c) => {
            const isSelected = selectedIds.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggleParticipant(c.id)}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-600/20 border-amber-500/60 shadow-sm text-slate-100'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-serif font-bold">
                    {c.name}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-400' : 'bg-slate-700'}`} />
                </div>
                <span className="text-[10px] text-slate-500 line-clamp-1 font-serif">
                  {c.courtesyName} · {c.mentalModel.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 廷議主題輸入 */}
      <div className="ink-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-sm font-serif font-bold text-slate-200">
          陳述廷議主題 / 重大抉擇
        </h3>

        <textarea
          rows={3}
          value={councilQuery}
          onChange={(e) => setCouncilQuery(e.target.value)}
          placeholder="例如：我面臨一個高風險但高前景的專案，若成功可晉升，若失敗恐被當替罪羊，各部門都在推拖，我該接嗎？..."
          className="w-full p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 leading-relaxed"
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-500 font-serif">
            策士們將站在各自哲學立場互相辯難，直擊彼端之漏洞。
          </span>

          <button
            onClick={handleStartCouncil}
            disabled={loading || !councilQuery.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-serif font-bold text-xs shadow-glow-red transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>策士論辯中...</span>
              </>
            ) : (
              <>
                <Flame className="w-3.5 h-3.5" />
                <span>開筵廷議</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 廷議論道結果 (Debate Dialogue) */}
      {debate && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif font-bold text-slate-100 flex items-center gap-2">
              <Swords className="w-5 h-5 text-rose-400" />
              赤壁廷議論道實錄
            </h3>
            <span className="text-xs text-slate-400 font-serif">
              共計 {debate.turns.length} 輪交鋒
            </span>
          </div>

          {/* 逐位策士發言 */}
          <div className="space-y-4">
            {debate.turns.map((turn, idx) => {
              const char = CHARACTERS.find((c) => c.id === turn.speakerId);
              return (
                <div
                  key={idx}
                  className="ink-card rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-serif font-bold text-lg border"
                        style={{
                          backgroundColor: `${char?.accentColor || '#f59e0b'}25`,
                          borderColor: `${char?.accentColor || '#f59e0b'}60`,
                          color: char?.accentColor || '#f59e0b',
                        }}
                      >
                        {turn.speakerName[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-slate-100 text-sm">
                            {turn.speakerName}
                          </span>
                          <span className="text-xs font-serif px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                            {turn.stance}
                          </span>
                        </div>
                      </div>
                    </div>

                    {turn.critiqueTargetName && (
                      <span className="text-[11px] font-serif text-rose-400 bg-rose-950/60 border border-rose-500/30 px-2 py-0.5 rounded-full">
                        反駁 {turn.critiqueTargetName}
                      </span>
                    )}
                  </div>

                  <p className="font-serif text-sm text-slate-200 leading-relaxed pl-13">
                    {turn.argument}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 盲區對沖與主公最終裁決令 (Synthesis) */}
          <div className="ink-card rounded-2xl p-6 sm:p-8 border border-amber-500/40 bg-gradient-to-br from-[#1f1910] via-[#141214] to-[#0c0d12] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
              <div className="flex items-center gap-2">
                <span className="chinese-seal text-xs">裁決</span>
                <h4 className="text-lg font-serif font-bold text-amber-300">
                  主公最終裁決令 · 廷議綜合研判
                </h4>
              </div>
              <span className="text-xs text-amber-400/80 font-serif">
                全盤對沖完備
              </span>
            </div>

            {/* 核心矛盾 */}
            <div>
              <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-1">
                CORE DILEMMA 核心矛盾
              </div>
              <p className="text-sm text-slate-200 font-serif">
                {debate.synthesis.coreDilemma}
              </p>
            </div>

            {/* 揭露盲區 (Red Teaming) */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertOctagon className="w-3.5 h-3.5" />
                BLINDSPOTS EXPOSED 廷議逼出之隱藏盲區
              </div>
              <div className="space-y-1.5">
                {debate.synthesis.blindspotsExposed.map((blind, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-300 p-2 rounded-lg bg-slate-900/60 border border-slate-800"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span>{blind}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 主公裁決指引 */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                ACTION DIRECTIVE 落地決策方案
              </div>
              <p className="font-serif text-sm text-amber-100 leading-relaxed font-semibold">
                {debate.synthesis.lordDecision}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
