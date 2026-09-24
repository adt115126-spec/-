import React, { useState } from 'react';
import { MODERN_ERAS } from '../data/learningContent.ts';
import { ModernTechEra } from '../types.ts';
import {
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Brain,
  Cloud,
  Smartphone,
  Sparkles,
  Network,
  Cpu,
  Radio,
  ChevronRight,
} from 'lucide-react';

interface Stage4Props {
  onCompleteStage: () => void;
  isCompleted: boolean;
  onGoNextStage: () => void;
}

const ERA_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Cloud,
  Smartphone,
  Sparkles,
};

export const Stage4FifthModernGen: React.FC<Stage4Props> = ({
  onCompleteStage,
  isCompleted,
  onGoNextStage,
}) => {
  const [selectedEra, setSelectedEra] = useState<ModernTechEra>(MODERN_ERAS[0]);
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
              <span>STAGE 04</span>
              <span>·</span>
              <span>第五代與後續科技發展</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              人工智慧、行動運算與雲端世代
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              第五代電腦打破傳統單一處理器的限制，引進大規模「平行處理 (Parallel Processing)」與「人工智慧 (AI)」概念。隨後進入2000年代無線雲端、2010年代智慧觸控行動裝置，直至今日生成式 AI 大爆發。
            </p>
          </div>

          <div className="shrink-0">
            {isCompleted ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>階段 4 已完成</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold">
                <Brain className="w-4 h-4 text-indigo-600" />
                <span>探索科技演進圖以解鎖</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Concept Core Highlights (第五代與人工智慧概念) */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-indigo-400 font-semibold block">
              CORE PHILOSOPHY OF 5TH GENERATION
            </span>
            <h2 className="text-lg sm:text-xl font-bold">
              第五代電腦的核心理念：從「單純數值計算」轉向「智慧理解與推論」
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
              <Network className="w-4 h-4" />
              <span>突破馮·紐曼瓶頸</span>
            </div>
            <h3 className="text-sm font-bold text-white">平行處理 (Parallel Processing)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              不再只依賴單顆 CPU 依序排隊處理，而是動用成千上萬顆核心同時並行計算，解決氣象預測、分子模擬等巨量難題。
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
              <Cpu className="w-4 h-4" />
              <span>模擬人腦神經結構</span>
            </div>
            <h3 className="text-sm font-bold text-white">人工類神經網路 (Neural Networks)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              電腦能藉由海量資料自我「學習」權重模式，具備影像辨識、語音轉文字與模式預測能力，擺脫刻板規則限制。
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
              <Radio className="w-4 h-4" />
              <span>自然人機互動</span>
            </div>
            <h3 className="text-sm font-bold text-white">自然語言處理 (NLP)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              使用者不需要精通複雜程式碼，能直接用日常口語、文字提示詞與電腦對話，電腦亦能理解上下文語意。
            </p>
          </div>
        </div>
      </div>

      {/* Modern Evolution Diagram (時間軸／發展圖呈現) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              世代演進圖：從第五代到現代科技發展
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              依序點擊下方發展節點，探索每個年代引領世界的關鍵科技與生活變革
            </p>
          </div>
        </div>

        {/* Step Indicator Chain */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MODERN_ERAS.map((era, idx) => {
            const Icon = ERA_ICONS[era.iconName] || Brain;
            const isSelected = selectedEra.id === era.id;

            return (
              <button
                key={era.id}
                onClick={() => setSelectedEra(era)}
                className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-200'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isSelected ? 'text-indigo-200' : 'text-indigo-600'
                      }`}
                    >
                      {era.era}
                    </span>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold leading-snug">{era.title}</h3>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-xs">
                  <span className={isSelected ? 'text-indigo-100' : 'text-slate-400'}>
                    階段 0{idx + 1}
                  </span>
                  <span className="font-semibold flex items-center gap-1">
                    <span>{isSelected ? '檢視中' : '點選查看'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Era Spotlight Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-600">
                年代焦點探索 · {selectedEra.era}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                {selectedEra.title}
              </h2>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              代表技術：{selectedEra.representativeTechs.length} 項精選
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            {selectedEra.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Core Tech Themes */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                核心突破領域
              </h3>
              <div className="space-y-2">
                {selectedEra.keyThemes.map((theme) => (
                  <div
                    key={theme}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800 flex items-center gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    <span>{theme}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Representative Technologies */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                代表性技術與產品
              </h3>
              <div className="space-y-2">
                {selectedEra.representativeTechs.map((tech) => (
                  <div
                    key={tech}
                    className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100/60 text-xs font-medium text-indigo-950 flex items-center gap-2.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real World Impact Callout */}
          <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-xl p-4 text-xs sm:text-sm text-emerald-900 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>對現代生活的具體影響：</strong>
              <span className="ml-1 text-slate-700">{selectedEra.realWorldImpact}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkpoint Quiz */}
      <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-6 sm:p-8">
        <div className="flex items-start gap-3.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono font-semibold text-indigo-700">
              階段 04 理解自我檢測
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              第五代電腦最根本的發展精神，是突破單一處理器的馮·紐曼瓶頸，並轉向哪一項技術領域？
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {[
            { id: 0, text: 'A. 重新依賴機械齒輪以節省晶片電力' },
            { id: 1, text: 'B. 平行處理 (Parallel Processing) 與人工智慧 (AI) 智慧推論' },
            { id: 2, text: 'C. 將電腦體積重新放大回 30 噸以安裝大型真空管' },
            { id: 3, text: 'D. 廢除所有無線 Wi-Fi 與雲端網路' },
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
                  <strong>非常正確！</strong> 第五代電腦以極大型積體電路 (ULSI)、超大規模平行處理架構以及人工智慧為核心，推動知識推論、神經網路與今日生成式 AI 的繁榮發展。
                </span>
              </div>
            ) : (
              <div>
                <strong>請再想想看：</strong> 正確答案為 <strong>B</strong>。第五代電腦的核心是平行處理架構與人工智慧 (AI)。
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-indigo-100/80">
          <div className="text-xs text-slate-500">
            {isCompleted ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                恭喜！第四階段學習已通過認證
              </span>
            ) : (
              <span>答對題目即可完成認證並解鎖最後統整階段</span>
            )}
          </div>

          <button
            onClick={() => {
              if (!isCompleted) onCompleteStage();
              onGoNextStage();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center justify-center gap-2 transition-all"
          >
            <span>前往第五階段：統整與複習</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
