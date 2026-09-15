import React, { useState } from 'react';
import { Character, Scenario, ApiSettings } from './types';
import { CHARACTERS } from './data/characters';
import { Navbar } from './components/Navbar';
import { MarketplaceView } from './components/MarketplaceView';
import { ConsultationView } from './components/ConsultationView';
import { WarCouncilView } from './components/WarCouncilView';
import { WaterMirrorView } from './components/WaterMirrorView';
import { CharacterModal } from './components/CharacterModal';
import { ApiKeyModal } from './components/ApiKeyModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'consult' | 'council' | 'triage'>('marketplace');
  
  // 當前選定諮詢的策士（預設為關羽）
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(
    CHARACTERS.find((c) => c.id === 'guan-yu') || CHARACTERS[0]
  );
  
  // 檢視檔案彈窗
  const [dossierCharacter, setDossierCharacter] = useState<Character | null>(null);
  
  // 當前夾帶的情境預設
  const [activeScenario, setActiveScenario] = useState<Scenario | undefined>(undefined);
  
  // 赤壁廷議主題與成員
  const [councilQuery, setCouncilQuery] = useState('');
  const [councilParticipants, setCouncilParticipants] = useState<Character[]>([
    CHARACTERS.find((c) => c.id === 'guan-yu')!,
    CHARACTERS.find((c) => c.id === 'sima-yi')!,
    CHARACTERS.find((c) => c.id === 'jia-xu')!,
  ]);

  // 天機閣 API 設定
  const [apiSettings, setApiSettings] = useState<ApiSettings>(() => {
    const saved = localStorage.getItem('sanguo_api_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return { provider: 'mock', apiKey: '', model: 'gemini-1.5-flash' };
  });
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  const handleSaveApiSettings = (newSettings: ApiSettings) => {
    setApiSettings(newSettings);
    localStorage.setItem('sanguo_api_settings', JSON.stringify(newSettings));
  };

  // 從市集或情境直接啟動單兵問策
  const handleDirectConsult = (character: Character, scenario?: Scenario) => {
    setSelectedCharacter(character);
    setActiveScenario(scenario);
    setActiveTab('consult');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 攜帶難題與策士前往廷議
  const handleGoToCouncilWithQuery = (query: string, primaryChar: Character) => {
    setCouncilQuery(query);
    // 搭配另一位性格相剋的軍師
    let opponentId = 'sima-yi';
    if (primaryChar.id === 'sima-yi') opponentId = 'guan-yu';
    if (primaryChar.id === 'zhuge-liang') opponentId = 'sima-yi';
    if (primaryChar.id === 'jia-xu') opponentId = 'guan-yu';

    const opponent = CHARACTERS.find((c) => c.id === opponentId) || CHARACTERS[1];
    setCouncilParticipants([primaryChar, opponent]);
    setActiveTab('council');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080c10] text-slate-100 flex flex-col font-sans">
      {/* 頂部導航列 */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        apiSettings={apiSettings}
        onOpenApiModal={() => setIsApiModalOpen(true)}
      />

      {/* 主體畫面 */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'marketplace' && (
          <MarketplaceView
            onSelectDossier={(char) => setDossierCharacter(char)}
            onDirectConsult={handleDirectConsult}
            onGoToCouncil={() => {
              setActiveTab('council');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToTriage={() => {
              setActiveTab('triage');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'consult' && (
          <ConsultationView
            selectedCharacter={selectedCharacter}
            setSelectedCharacter={setSelectedCharacter}
            initialScenario={activeScenario}
            apiSettings={apiSettings}
            onGoToCouncilWithQuery={handleGoToCouncilWithQuery}
          />
        )}

        {activeTab === 'council' && (
          <WarCouncilView
            councilQuery={councilQuery}
            setCouncilQuery={setCouncilQuery}
            initialParticipants={councilParticipants}
            apiSettings={apiSettings}
          />
        )}

        {activeTab === 'triage' && (
          <WaterMirrorView
            onDirectConsult={handleDirectConsult}
            onGoToCouncilWithQuery={handleGoToCouncilWithQuery}
          />
        )}
      </main>

      {/* 策士檔案彈窗 */}
      <CharacterModal
        character={dossierCharacter}
        onClose={() => setDossierCharacter(null)}
        onConsult={handleDirectConsult}
      />

      {/* 天機閣設定彈窗 */}
      <ApiKeyModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        settings={apiSettings}
        onSave={handleSaveApiSettings}
      />

      {/* 底部頁尾 */}
      <footer className="border-t border-slate-800/80 bg-[#06090d] py-8 text-center text-xs text-slate-500 font-serif">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <span className="chinese-seal text-[10px]">鑒古知今</span>
            <span>三國策士智庫市集 · Three Kingdoms Strategy & Skill Council</span>
          </div>
          <p className="text-slate-600">
            以史為鏡，知天下得失；以謀為鋒，破今世迷局。融合三國十大家心智模型，為現代決策注入千年智慧。
          </p>
        </div>
      </footer>
    </div>
  );
};
