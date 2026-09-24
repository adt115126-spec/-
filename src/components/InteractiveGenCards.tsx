import React, { useState } from 'react';
import {
  Zap,
  Box,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export interface InteractiveGenCardData {
  genId: string;
  name: string;
  enName: string;
  period: string;
  primaryComponent: string;
  componentDetails: string;
  features: string[];
  impact: string;
  accentColor: string;
  image?: string;
}

export const GENERATION_CARDS_DATA: InteractiveGenCardData[] = [
  {
    genId: 'gen1',
    name: '第一代電腦',
    enName: 'First Generation (1946-1958)',
    period: '1946 年 ～ 1958 年',
    primaryComponent: '真空管 (Vacuum Tube)',
    componentDetails:
      '熱電子真空管。每部電腦耗費近 18,000 支玻璃管，需通電加熱燈絲發射電子來控制開關。',
    features: [
      '體積無比龐大：重達 30 噸，佔地達 167 平方公尺（相當於一整間大教室或樓層）。',
      '耗電高且廢熱驚人：功耗約 150 千瓦 (kW)，需強力工業空調與專門通風管道。',
      '可靠度極低：平均每數小時即有一支真空管燒毀，必須人工巡檢更換。',
      '程式設計：以機器語言（0 與 1 二進位代碼）或打孔紙卡 (Punch Cards) 進行輸入。',
    ],
    impact:
      '歷史發展影響：人類首度以純「電子訊號」取代傳統機械齒輪與繼電器，運算速度暴增千倍，象徵現代通用電子計算機紀元正式揭開序幕。',
    accentColor: 'amber',
    image: '/src/assets/images/generation1_vacuum_tube_1790232564274.jpg',
  },
  {
    genId: 'gen2',
    name: '第二代電腦',
    enName: 'Second Generation (1959-1964)',
    period: '1959 年 ～ 1964 年',
    primaryComponent: '電晶體 (Transistor)',
    componentDetails:
      '貝爾實驗室研製之固態半導體電晶體（鍺或矽製成），無需真空抽氣與加熱燈絲，體積如小豆子般微小。',
    features: [
      '體積劇降 100 倍：由原本佔滿房間縮小為數個大鐵櫃，普通辦公室即可容納。',
      '功耗大幅降低：發熱量大減，耐震防摔，平均連續運轉時間提升數千倍。',
      '記憶體升級：改採微小鐵氧體「磁芯記憶體 (Magnetic Core Memory)」，大幅提升存取速度。',
      '軟體革命：誕生 FORTRAN、COBOL 等高階程式語言，工程師無需再記二進位機械碼。',
    ],
    impact:
      '歷史發展影響：奠定現代半導體產業基礎。電腦從昂貴的軍事與國防科研工具，首度大規模擴展到跨國企業、銀行會計與大學學術機構。',
    accentColor: 'blue',
    image: '/src/assets/images/generation2_transistor_board_1790232575476.jpg',
  },
  {
    genId: 'gen3',
    name: '第三代電腦',
    enName: 'Third Generation (1965-1970)',
    period: '1965 年 ～ 1970 年',
    primaryComponent: '積體電路 (IC, Integrated Circuit)',
    componentDetails:
      '半導體晶片整合技術。在單一微小矽晶片平面上，封裝整合數十至數千個電晶體、電阻與電容。',
    features: [
      '元件超微縮化：體積進一步縮小至一張辦公桌大小，催生價格親民的「迷你電腦 (Minicomputer)」。',
      '分時多工 (Time-sharing)：一台電腦可連接數十台終端機，供多位使用者同時連線作業。',
      '軟體相容性：建立電腦「家族系統 (如 IBM System/360)」，不同型號硬體可執行相同軟體。',
      '半導體記憶體萌芽：資料讀取速度達到奈秒 (ns) 等級，運算頻率突破百萬次/秒。',
    ],
    impact:
      '歷史發展影響：矽谷半導體聚落成型，摩爾定律（晶片電晶體數約每 18-24 個月翻倍）驗證展開，電腦正式走入中小型公司與實驗室。',
    accentColor: 'indigo',
    image: '/src/assets/images/generation3_integrated_circuit_1790232588320.jpg',
  },
  {
    genId: 'gen4',
    name: '第四代電腦',
    enName: 'Fourth Generation (1971-Present)',
    period: '1971 年 ～ 至今持續演進',
    primaryComponent: '微處理器／CPU 晶片 (Microprocessor VLSI/ULSI)',
    componentDetails:
      '超大型與極大型積體電路。將中央處理單元（算術邏輯單元 ALU、控制單元 CU）全部完整濃縮在單一微型晶片中。',
    features: [
      '個人電腦 (PC) 誕生：引爆 Apple II、IBM PC 等桌上型個人電腦普及風暴，電腦進入家家戶戶。',
      '圖形使用者介面 (GUI)：滑鼠、視窗、圖示與桌面普及，讓一般非專業大眾皆能直覺操作。',
      '高速互聯網：從 ARPANET 發展至全球網際網路 (Internet) 與全球資訊網 (WWW)，全世界資訊互聯。',
      '筆記型電腦與可攜化：晶片功耗控制在數十瓦，運算效能以每秒數億次至數十億次 (GHz) 計算。',
    ],
    impact:
      '歷史發展影響：實現「人人皆有電腦」的遠景，微處理器擴散至手機、汽車、家電各個角落，開啟人類全面資訊化與數位經濟時代。',
    accentColor: 'purple',
    image: '/src/assets/images/generation4_microprocessor_pc_1790232601700.jpg',
  },
];

interface InteractiveGenCardsProps {
  initialGen?: string;
}

export const InteractiveGenCards: React.FC<InteractiveGenCardsProps> = ({
  initialGen = 'gen1',
}) => {
  const [selectedGenId, setSelectedGenId] = useState<string>(initialGen);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const currentGen =
    GENERATION_CARDS_DATA.find((g) => g.genId === selectedGenId) ||
    GENERATION_CARDS_DATA[0];

  const handleSelect = (id: string) => {
    setSelectedGenId(id);
    setIsFlipped(false);
  };

  return (
    <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>互動三：世代比較卡片</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            第一～第四世代互動探索卡片
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            點擊切換不同世代卡片，或點擊<strong>「卡片翻轉／展開細節」</strong>深度探究各世代主要元件、特色與歷史發展影響。
          </p>
        </div>

        <button
          onClick={() => setIsFlipped((prev) => !prev)}
          className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center gap-2 self-start transition-colors"
        >
          <TrendingUp className="w-4 h-4" />
          <span>{isFlipped ? '切換回：正面核心規格' : '翻轉檢視：主要特色與發展影響'}</span>
        </button>
      </div>

      {/* Generation Switcher Pills / Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {GENERATION_CARDS_DATA.map((card) => {
          const isSelected = selectedGenId === card.genId;
          return (
            <button
              key={card.genId}
              onClick={() => handleSelect(card.genId)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-200'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div
                className={`text-[10px] font-mono uppercase font-bold ${
                  isSelected ? 'text-indigo-200' : 'text-slate-400'
                }`}
              >
                {card.genId.toUpperCase()}
              </div>
              <div className="text-sm font-bold mt-0.5 truncate">{card.name}</div>
              <div
                className={`text-xs truncate ${
                  isSelected ? 'text-indigo-100' : 'text-slate-500'
                }`}
              >
                {card.primaryComponent.split(' ')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* The Interactive Flipping / Expandable Display Card */}
      <div
        className="rounded-2xl border-2 border-slate-200 overflow-hidden bg-white shadow-xs transition-all duration-500"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {!isFlipped ? (
          /* Card Front: Name, Component, Specs */
          <div className="animate-fadeIn">
            {/* Visual Top Bar */}
            <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden">
              {currentGen.image && (
                <img
                  src={currentGen.image}
                  alt={currentGen.name}
                  className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-mono font-bold tracking-wider text-indigo-300">
                  {currentGen.enName}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  {currentGen.name}
                </h3>
                <span className="text-xs text-slate-300 mt-1">
                  年代歷程：{currentGen.period}
                </span>
              </div>
            </div>

            {/* Front Card Body */}
            <div className="p-6 sm:p-7 space-y-6">
              {/* Primary Component Highlight */}
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                  <Zap className="w-4 h-4 text-indigo-600" />
                  <span>主要電子元件</span>
                </div>
                <div className="text-base font-extrabold text-indigo-950">
                  {currentGen.primaryComponent}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {currentGen.componentDetails}
                </p>
              </div>

              {/* Bottom Quick Action to Flip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-500">
                  點擊右側按鈕翻轉卡片，查看「主要特色」與「歷史發展影響」
                </div>
                <button
                  onClick={() => setIsFlipped(true)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>翻轉卡片看特色與影響</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Card Back: Features & Historical Impact */
          <div className="animate-fadeIn p-6 sm:p-8 space-y-6 bg-slate-900 text-white">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-400">
                  {currentGen.period}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                  {currentGen.name}：主要特色與發展影響
                </h3>
              </div>
              <button
                onClick={() => setIsFlipped(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
              >
                ← 返回卡片正面
              </button>
            </div>

            {/* Main Features Bullet Points */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                主要發展特色（重點條列）：
              </h4>
              <ul className="space-y-2.5">
                {currentGen.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-800/60 p-3 rounded-xl border border-slate-700/60"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Historical Impact */}
            <div className="p-4 rounded-xl bg-indigo-950/80 border border-indigo-700/60 text-indigo-200 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>發展影響 (Impact)</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
                {currentGen.impact}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsFlipped(false)}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                回到正面檢視核心元件
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
