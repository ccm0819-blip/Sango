import React, { useState } from 'react';
import { Character, Scenario } from '../types';
import { CHARACTERS, FACTIONS, CATEGORIES } from '../data/characters';
import { PRESET_SCENARIOS } from '../data/scenarios';
import { CharacterCard } from './CharacterCard';
import { Search, Sparkles, Filter, Swords, Eye, ArrowRight } from 'lucide-react';

interface MarketplaceViewProps {
  onSelectDossier: (character: Character) => void;
  onDirectConsult: (character: Character, scenario?: Scenario) => void;
  onGoToCouncil: () => void;
  onGoToTriage: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  onSelectDossier,
  onDirectConsult,
  onGoToCouncil,
  onGoToTriage,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaction, setSelectedFaction] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCharacters = CHARACTERS.filter((c) => {
    const matchesSearch =
      c.name.includes(searchTerm) ||
      c.courtesyName.includes(searchTerm) ||
      c.title.includes(searchTerm) ||
      c.description.includes(searchTerm) ||
      c.tags.some((t) => t.includes(searchTerm)) ||
      c.mentalModel.name.includes(searchTerm);

    const matchesFaction = selectedFaction === 'all' || c.faction === selectedFaction;
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;

    return matchesSearch && matchesFaction && matchesCategory;
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner */}
      <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-amber-500/20 bg-gradient-to-br from-[#121924] via-[#0d131a] to-[#080c10] shadow-2xl">
        {/* 背景水墨裝飾感 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-serif mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>三國頂級心智模型 · 現代疑難破局處方</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-slate-100 tracking-tight leading-tight mb-4">
            天下三分，<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">策士雲集</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base font-serif leading-relaxed mb-6">
            跳脫現代 AI 四平八穩的平庸回答。將諸葛亮的頂層宏圖、司馬懿的極限風控、關羽的單騎破局、賈詡的明哲自保封裝為可召喚的技能，助您於職場、商業與人生迷局中一招破關。
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                const guan = CHARACTERS.find(c => c.id === 'guan-yu')!;
                const scenario = PRESET_SCENARIOS.find(s => s.id === 'breakout-venture');
                onDirectConsult(guan, scenario);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-serif font-bold shadow-lg transition-all"
            >
              <span>⚔️ 憋悶已久？召喚關羽單騎破局</span>
            </button>

            <button
              onClick={onGoToCouncil}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-serif transition-colors"
            >
              <Swords className="w-3.5 h-3.5 text-rose-400" />
              <span>赤壁廷議（多策士對辯）</span>
            </button>

            <button
              onClick={onGoToTriage}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-serif transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span>水鏡先生替我分診</span>
            </button>
          </div>
        </div>
      </div>

      {/* 經典疑難快速掛號 (Preset Scenarios) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="chinese-seal text-xs">錦囊</span>
            <h2 className="text-lg font-serif font-bold text-slate-200">
              常見疑難情境 · 快速問策
            </h2>
          </div>
          <span className="text-xs text-slate-500">點選直接進入軍師推演</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRESET_SCENARIOS.map((scenario) => {
            const firstChar = CHARACTERS.find((c) => c.id === scenario.recommendedIds[0]);
            return (
              <div
                key={scenario.id}
                onClick={() => {
                  if (firstChar) onDirectConsult(firstChar, scenario);
                }}
                className="p-4 rounded-xl ink-card hover:border-amber-500/40 cursor-pointer transition-all hover:-translate-y-0.5 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-serif">
                      {scenario.tag}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      推薦：{scenario.recommendedIds.map(id => CHARACTERS.find(c => c.id === id)?.name).filter(Boolean).join('、')}
                    </span>
                  </div>
                  <h3 className="text-sm font-serif font-bold text-slate-200 group-hover:text-amber-300 transition-colors mb-1">
                    {scenario.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {scenario.description}
                  </p>
                </div>
                <div className="flex items-center justify-end mt-3 text-xs text-amber-400 font-serif group-hover:translate-x-1 transition-transform">
                  <span>向軍師請策</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 策士篩選與搜尋欄 */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-slate-100 flex items-center gap-2">
              <span>策士市集大廳</span>
              <span className="text-xs font-mono text-slate-500 font-normal">
                ({filteredCharacters.length} 位智囊就緒)
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-serif mt-0.5">
              選擇合適的軍師進入單兵問策，或檢視其思維模型複製 Prompt
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜尋策士、流派、戰略標籤..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Faction Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <span className="text-xs text-slate-500 font-serif flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" />
            陣營：
          </span>
          {FACTIONS.map((faction) => (
            <button
              key={faction.id}
              onClick={() => setSelectedFaction(faction.id)}
              className={`px-3 py-1 rounded-lg text-xs font-serif transition-all ${
                selectedFaction === faction.id
                  ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {faction.name}
            </button>
          ))}
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-500 font-serif mr-1">流派：</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-serif transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-700 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-900/40 text-slate-400 hover:text-slate-300 border border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Characters Grid */}
      {filteredCharacters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onSelectDossier={onSelectDossier}
              onDirectConsult={(c) => onDirectConsult(c)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 ink-card rounded-2xl border border-slate-800">
          <p className="text-slate-400 font-serif text-sm">
            營中未覓得符合條件之策士，請嘗試放寬篩選條件或搜尋關鍵字。
          </p>
        </div>
      )}
    </div>
  );
};
