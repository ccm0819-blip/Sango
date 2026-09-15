import React, { useState } from 'react';
import { ApiSettings } from '../types';
import { X, Key, ShieldCheck, Cpu } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ApiSettings;
  onSave: (settings: ApiSettings) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const [provider, setProvider] = useState<'mock' | 'gemini'>(
    settings.provider === 'gemini' ? 'gemini' : 'mock'
  );
  const [apiKey, setApiKey] = useState(settings.apiKey || '');
  const [model, setModel] = useState(settings.model || 'gemini-1.5-flash');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      provider: apiKey ? provider : 'mock',
      apiKey,
      model
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md ink-card border border-slate-700/80 rounded-2xl shadow-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-slate-100">
              天機符節 · 運算核心設定
            </h3>
            <p className="text-xs text-slate-400">
              切換推演引擎或填入自有 API Key
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {/* Mode Switch */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setProvider('mock')}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-serif transition-all ${
                provider === 'mock'
                  ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              內建情境推演引擎
            </button>

            <button
              onClick={() => setProvider('gemini')}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-serif transition-all ${
                provider === 'gemini'
                  ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              自訂 Gemini API
            </button>
          </div>

          {provider === 'mock' ? (
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                免 Key 隨開即用模式
              </div>
              <p className="text-slate-400 leading-relaxed">
                使用本地預裝的「三國策士深度情境語料與推演矩陣」，無需任何 API Key 即可體驗所有軍師問策、赤壁廷議與水鏡分診功能！
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Google Gemini API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  模型代號
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="gemini-1.5-flash">gemini-1.5-flash (極速推薦)</option>
                  <option value="gemini-1.5-pro">gemini-1.5-pro (深度推演)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 transition-colors font-serif"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-serif font-bold text-xs shadow-glow-gold transition-all"
          >
            保存符節
          </button>
        </div>
      </div>
    </div>
  );
};
