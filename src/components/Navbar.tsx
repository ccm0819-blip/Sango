import React from 'react';
import { Key, Compass, Swords, Feather, Eye } from 'lucide-react';
import { ApiSettings } from '../types';

interface NavbarProps {
  activeTab: 'marketplace' | 'consult' | 'council' | 'triage';
  setActiveTab: (tab: 'marketplace' | 'consult' | 'council' | 'triage') => void;
  apiSettings: ApiSettings;
  onOpenApiModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  apiSettings,
  onOpenApiModal,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#0b0f14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('marketplace')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center text-amber-100 font-serif font-black text-xl shadow-glow-gold border border-amber-500/40 group-hover:scale-105 transition-transform">
              策
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg text-slate-100 tracking-wider">
                  三國策士智庫市集
                </span>
                <span className="chinese-seal text-xs scale-90">智囊</span>
              </div>
              <p className="text-[11px] text-slate-400 font-serif">
                Three Kingdoms Strategy & Skill Council
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-serif font-medium transition-all ${
                activeTab === 'marketplace'
                  ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-400" />
              策士市集
            </button>

            <button
              onClick={() => setActiveTab('consult')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-serif font-medium transition-all ${
                activeTab === 'consult'
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Feather className="w-4 h-4 text-emerald-400" />
              單兵問策
            </button>

            <button
              onClick={() => setActiveTab('council')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-serif font-medium transition-all ${
                activeTab === 'council'
                  ? 'bg-rose-600/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Swords className="w-4 h-4 text-rose-400" />
              赤壁廷議
              <span className="text-[10px] px-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">對辯</span>
            </button>

            <button
              onClick={() => setActiveTab('triage')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-serif font-medium transition-all ${
                activeTab === 'triage'
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Eye className="w-4 h-4 text-blue-400" />
              水鏡分診
            </button>
          </nav>

          {/* Settings / API Key Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenApiModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-xs text-slate-300 hover:text-amber-300 transition-colors"
              title="配置自訂大模型 API Key"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">天機符節</span>
              <span className={`w-2 h-2 rounded-full ${apiSettings.apiKey ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="flex md:hidden border-t border-slate-800/80 bg-[#090d12] px-2 py-1 justify-around">
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`flex flex-col items-center py-1 px-3 text-[11px] font-serif ${
            activeTab === 'marketplace' ? 'text-amber-400' : 'text-slate-400'
          }`}
        >
          <Compass className="w-4 h-4 mb-0.5" />
          市集
        </button>
        <button
          onClick={() => setActiveTab('consult')}
          className={`flex flex-col items-center py-1 px-3 text-[11px] font-serif ${
            activeTab === 'consult' ? 'text-emerald-400' : 'text-slate-400'
          }`}
        >
          <Feather className="w-4 h-4 mb-0.5" />
          問策
        </button>
        <button
          onClick={() => setActiveTab('council')}
          className={`flex flex-col items-center py-1 px-3 text-[11px] font-serif ${
            activeTab === 'council' ? 'text-rose-400' : 'text-slate-400'
          }`}
        >
          <Swords className="w-4 h-4 mb-0.5" />
          廷議
        </button>
        <button
          onClick={() => setActiveTab('triage')}
          className={`flex flex-col items-center py-1 px-3 text-[11px] font-serif ${
            activeTab === 'triage' ? 'text-blue-400' : 'text-slate-400'
          }`}
        >
          <Eye className="w-4 h-4 mb-0.5" />
          分診
        </button>
      </div>
    </header>
  );
};
