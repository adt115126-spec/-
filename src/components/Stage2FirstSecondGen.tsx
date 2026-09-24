import React, { useState } from 'react';
import { GEN1_DATA, GEN2_DATA } from '../data/learningContent.ts';
import {
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Flame,
  Zap,
  Gauge,
  Box,
  Code2,
  Sparkles,
  Layers,
  ArrowLeftRight,
} from 'lucide-react';
import { InteractiveGenCards } from './InteractiveGenCards.tsx';

interface Stage2Props {
  onCompleteStage: () => void;
  isCompleted: boolean;
  onGoNextStage: () => void;
}

export const Stage2FirstSecondGen: React.FC<Stage2Props> = ({
  onCompleteStage,
  isCompleted,
  onGoNextStage,
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'gen1' | 'gen2'>('both');
  const [interactiveAspect, setInteractiveAspect] = useState<
    'component' | 'size' | 'speed' | 'heat' | 'language'
  >('component');

  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const handleQuizAnswer = (idx: number) => {
    setQuizAnswer(idx);
    setQuizSubmitted(true);
    if (idx === 1 && !isCompleted) {
      onCompleteStage();
    }
  };

  return (
    <div className="py-6 sm:py-10 space-y-10">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-semibold">
              <span>STAGE 02</span>
              <span>·</span>
              <span>第一代與第二代電腦</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              真空管 vs. 電晶體的電子技術躍進
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              從1946年真空管電腦的高溫龐大與易損，到1959年電晶體引爆的固態半導體革命。透過雙卡互動與規格指標對照，探索早期電腦體積劇降100倍與高階語言誕生的關鍵差異。
            </p>
          </div>

          <div className="shrink-0">
            {isCompleted ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>階段 2 已完成</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold">
                <ArrowLeftRight className="w-4 h-4 text-indigo-600" />
                <span>對比兩代特色以解鎖</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'both'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            雙卡並排深入比對
          </button>
          <button
            onClick={() => setActiveTab('gen1')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'gen1'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            聚焦第一代：真空管
          </button>
          <button
            onClick={() => setActiveTab('gen2')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'gen2'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            聚焦第二代：電晶體
          </button>
        </div>

        <div className="text-xs text-slate-500 hidden sm:block">
          點擊卡片深入檢視代表機型與技術規格
        </div>
      </div>

      {/* Two Interactive Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: First Generation */}
        {(activeTab === 'both' || activeTab === 'gen1') && (
          <div
            className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
              activeTab === 'gen1' ? 'md:col-span-2' : ''
            } bg-white border-amber-200/90 shadow-xs hover:border-amber-300`}
          >
            {/* Visual Banner */}
            <div className="relative h-44 bg-slate-950 overflow-hidden">
              <img
                src={GEN1_DATA.image}
                alt="第一代真空管電腦"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-bold mb-1">
                    <span>{GEN1_DATA.period}</span>
                    <span>·</span>
                    <span>1940s-1950s</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    {GEN1_DATA.generation}：{GEN1_DATA.component}
                  </h3>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-5">
              {/* Five key comparative aspects */}
              <div className="space-y-3">
                <div className="bg-amber-50/60 border border-amber-100/80 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>主要電子元件</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700">
                    <strong>熱電子真空管 (Vacuum Tube)</strong>
                    ：透過燈絲加熱發射電子進行開關切換，每台耗用上萬支，發熱量極大。
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                    <Box className="w-4 h-4 text-slate-600" />
                    <span>體積規模</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {GEN1_DATA.size}（占地約 167 平方公尺，需專門水泥加固機房樓地板）
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                    <Gauge className="w-4 h-4 text-slate-600" />
                    <span>運算速度與記憶體</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {GEN1_DATA.speed}；採用延遲線水銀槽或磁鼓，記憶容量僅數千位元組。
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                    <Flame className="w-4 h-4 text-amber-600" />
                    <span>散熱與耗電</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {GEN1_DATA.heatPower}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                    <Code2 className="w-4 h-4 text-slate-600" />
                    <span>程式語言與輸入模式</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {GEN1_DATA.programmingLanguage}；需由工程師手動拔插電纜與打孔紙卡。
                  </p>
                </div>
              </div>

              {/* Distinctive Features */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-900 mb-2">代表性電腦機種</h4>
                <div className="flex flex-wrap gap-2">
                  {GEN1_DATA.representativeMachines.map((m) => (
                    <span
                      key={m}
                      className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-mono"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs text-amber-900 leading-relaxed">
                <strong>發展突破：</strong> {GEN1_DATA.breakthrough}
              </div>
            </div>
          </div>
        )}

        {/* Card 2: Second Generation */}
        {(activeTab === 'both' || activeTab === 'gen2') && (
          <div
            className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
              activeTab === 'gen2' ? 'md:col-span-2' : ''
            } bg-white border-blue-200/90 shadow-xs hover:border-blue-300`}
          >
            {/* Visual Banner */}
            <div className="relative h-44 bg-slate-950 overflow-hidden">
              <img
                src={GEN2_DATA.image}
                alt="第二代電晶體電腦"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold mb-1">
                    <span>{GEN2_DATA.period}</span>
                    <span>·</span>
                    <span>1950s-1960s</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    {GEN2_DATA.generation}：{GEN2_DATA.component}
                  </h3>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-5">
              {/* Five key comparative aspects */}
              <div className="space-y-3">
                <div className="bg-blue-50/60 border border-blue-100/80 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900 mb-1">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span>主要電子元件</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700">
                    <strong>固態電晶體 (Transistor)</strong>
                    ：利用鍺或矽半導體製造，不需真空泡與加熱燈絲，體積如小豆子般微小耐撞。
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                    <Box className="w-4 h-4 text-slate-600" />
                    <span>體積規模</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {GEN2_DATA.size}（整整比第一代縮小約百倍，普通辦公室機房即可容納）
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                    <Gauge className="w-4 h-4 text-slate-600" />
                    <span>運算速度與記憶體</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {GEN2_DATA.speed}；採用磁芯記憶體 (Core Memory)，存取速度提升數十倍。
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                    <Flame className="w-4 h-4 text-blue-600" />
                    <span>散熱與耗電</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {GEN2_DATA.heatPower}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                    <Code2 className="w-4 h-4 text-slate-600" />
                    <span>程式語言與輸入模式</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {GEN2_DATA.programmingLanguage}；工程師可用接近英文的語法撰寫軟體。
                  </p>
                </div>
              </div>

              {/* Distinctive Features */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-900 mb-2">代表性電腦機種</h4>
                <div className="flex flex-wrap gap-2">
                  {GEN2_DATA.representativeMachines.map((m) => (
                    <span
                      key={m}
                      className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-mono"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl text-xs text-blue-900 leading-relaxed">
                <strong>發展突破：</strong> {GEN2_DATA.breakthrough}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Metric Comparison Dashboard */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono text-cyan-400 font-semibold mb-1">
              METRIC CONTRAST
            </div>
            <h2 className="text-lg sm:text-xl font-bold">
              第一代 vs. 第二代：五大維度量化規格對比
            </h2>
          </div>
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl text-xs">
            {[
              { id: 'component', label: '主要元件' },
              { id: 'size', label: '體積對比' },
              { id: 'speed', label: '運算速度' },
              { id: 'heat', label: '散熱功耗' },
              { id: 'language', label: '程式語言' },
            ].map((asp) => (
              <button
                key={asp.id}
                onClick={() => setInteractiveAspect(asp.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  interactiveAspect === asp.id
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {asp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Comparison Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 font-bold">
                第一代（真空管時代）
              </span>
              <span className="text-xs text-slate-400">1946-1958</span>
            </div>

            {interactiveAspect === 'component' && (
              <div>
                <div className="text-xl font-bold text-white mb-2">真空管 (Vacuum Tube)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  玻璃燈泡結構，需高溫燈絲發射熱電子，易燒斷，平均每隔數小時就必須更換損壞的管子。
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-amber-400 font-mono">
                  <span>● 物理限制：易碎、高溫、高故障率</span>
                </div>
              </div>
            )}

            {interactiveAspect === 'size' && (
              <div>
                <div className="text-xl font-bold text-white mb-2">約 30 噸（整座房間）</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  佔地數十坪，重如一架小型客機，需要重型起重機與建築承重施工。
                </p>
                <div className="mt-4 w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-full" />
                </div>
              </div>
            )}

            {interactiveAspect === 'speed' && (
              <div>
                <div className="text-xl font-bold text-white mb-2">毫秒級 (約 5,000 次/秒)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  以毫秒 (10⁻³ 秒) 計算，相比人工作業快數千倍，但無法即時處理巨量資訊。
                </p>
                <div className="mt-4 w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[5%]" />
                </div>
              </div>
            )}

            {interactiveAspect === 'heat' && (
              <div>
                <div className="text-xl font-bold text-white mb-2">約 150 kW 超大功耗</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  運轉時散發驚人熱量，傳言 ENIAC 啟動時會使費城周遭街區燈光變暗。
                </p>
              </div>
            )}

            {interactiveAspect === 'language' && (
              <div>
                <div className="text-xl font-bold text-white mb-2">機器語言 (0 與 1)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  程式設計師必須直接撰寫繁複二進位機器碼，除錯極度困難。
                </p>
              </div>
            )}
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-bold">
                第二代（電晶體時代）
              </span>
              <span className="text-xs text-slate-400">1959-1964</span>
            </div>

            {interactiveAspect === 'component' && (
              <div>
                <div className="text-xl font-bold text-white mb-2">電晶體 (Transistor)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  固態半導體元件，耐震耐敲，不需預熱，使用壽命長達數萬小時，大幅提升系統可靠度。
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 font-mono">
                  <span>● 突破優勢：壽命激增、低功耗、微型化</span>
                </div>
              </div>
            )}

            {interactiveAspect === 'size' && (
              <div>
                <div className="text-xl font-bold text-white mb-2">約為第一代 1/100</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  體積縮小至數個普通檔案鐵櫃大小，普通公司企業的空調房即可擺設。
                </p>
                <div className="mt-4 w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 w-[15%]" />
                </div>
              </div>
            )}

            {interactiveAspect === 'speed' && (
              <div>
                <div className="text-xl font-bold text-white mb-2">微秒級 (數萬至數十萬次/秒)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  速度提升百倍，以微秒 (10⁻⁶ 秒) 計算，搭配磁芯記憶體存取更加敏捷。
                </p>
                <div className="mt-4 w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 w-[60%]" />
                </div>
              </div>
            )}

            {interactiveAspect === 'heat' && (
              <div>
                <div className="text-xl font-bold text-white mb-2">功耗驟降至數千瓦</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  發熱量大幅減少，不再需要巨型工業級送風冷卻塔維持運作。
                </p>
              </div>
            )}

            {interactiveAspect === 'language' && (
              <div>
                <div className="text-xl font-bold text-white mb-2">高階程式語言 (FORTRAN / COBOL)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  人類可用英文單字（如 PRINT, IF, GOTO）撰寫程式，編譯器自動轉譯，軟體開發效率大躍進。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Flipping Comparison Cards */}
      <InteractiveGenCards initialGen="gen1" />

      {/* Checkpoint Quiz */}
      <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-6 sm:p-8">
        <div className="flex items-start gap-3.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono font-semibold text-indigo-700">
              階段 02 理解自我檢測
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              第二代電腦使用「電晶體」取代「真空管」後，帶來的主要改進為何？
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {[
            { id: 0, text: 'A. 電腦體積變得比足球場還要大，耗電量倍增' },
            { id: 1, text: 'B. 體積大幅縮小、發熱量減少、可靠度提升且催生高階語言' },
            { id: 2, text: 'C. 只能使用打孔紙卡輸入，且平均每小時燒毀一支管子' },
            { id: 3, text: 'D. 全面淘汰了磁芯記憶體改用蒸氣齒輪' },
          ].map((opt) => {
            const isChosen = quizAnswer === opt.id;
            const isCorrect = opt.id === 1;

            let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300';
            if (quizSubmitted) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold ring-1 ring-emerald-400';
              } else if (isChosen && !isCorrect) {
                btnStyle = 'bg-rose-50 border-rose-400 text-rose-800';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleQuizAnswer(opt.id)}
                className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt.text}</span>
                {quizSubmitted && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {quizSubmitted && (
          <div
            className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed mb-6 ${
              quizAnswer === 1
                ? 'bg-emerald-100/70 border border-emerald-200 text-emerald-900'
                : 'bg-rose-100/70 border border-rose-200 text-rose-900'
            }`}
          >
            {quizAnswer === 1 ? (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>觀念正確！</strong> 電晶體是固態半導體，耐用且不需燈絲加熱，使得第二代電腦體積大幅縮減約 100 倍，並伴隨 FORTRAN、COBOL 等高階語言普及。
                </span>
              </div>
            ) : (
              <div>
                <strong>請再思考一下：</strong> 正確答案是 <strong>B</strong>。電晶體解決了真空管高熱、體積巨型與高故障率的缺點。
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-indigo-100/80">
          <div className="text-xs text-slate-500">
            {isCompleted ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                恭喜！第二階段學習已通過認證
              </span>
            ) : (
              <span>答對題目即可完成認證並解鎖下一階段</span>
            )}
          </div>

          <button
            onClick={() => {
              if (!isCompleted) onCompleteStage();
              onGoNextStage();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center justify-center gap-2 transition-all"
          >
            <span>前往第三階段：第三代與第四代電腦</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
