import React from 'react';
import { StageId } from '../types.ts';
import { STAGES_DATA } from '../data/learningContent.ts';
import { ProgressBar } from './ProgressBar.tsx';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  Clock,
  Compass,
  Layers,
  Cpu,
  Brain,
  Award,
  Target,
  ChevronRight,
} from 'lucide-react';

interface StageOverviewProps {
  onSelectStage: (stage: StageId) => void;
  completedStages: StageId[];
  freeMode: boolean;
}

const STAGE_ICONS: Record<StageId, React.ComponentType<{ className?: string }>> = {
  1: Compass,
  2: Layers,
  3: Cpu,
  4: Brain,
  5: Award,
};

export const StageOverview: React.FC<StageOverviewProps> = ({
  onSelectStage,
  completedStages,
  freeMode,
}) => {
  // Find first uncompleted stage
  const nextStage = ([1, 2, 3, 4, 5] as StageId[]).find(
    (id) => !completedStages.includes(id)
  ) || 1;

  return (
    <div className="py-8 sm:py-12 space-y-12">
      {/* Hero Intro Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-100/80 px-3.5 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>資訊科技領域數位自主學習教材</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 text-balance leading-tight">
          電腦科技發展與世代演進
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
          從早期齒輪機械計算器、真空管與電晶體革命，到微處理器普及與今日人工智慧運算。透過互動式時間軸、雙世代深度對照與實務配對測驗，輕鬆掌握資訊科技演化重要里程碑。
        </p>

        {/* Start Learning Primary Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onSelectStage(nextStage)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 group"
          >
            <span>
              {completedStages.length === 0
                ? '開始學習'
                : completedStages.length === 5
                ? '重新複習全階段'
                : `繼續學習：第 ${nextStage} 階段`}
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => onSelectStage(5)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-indigo-700 border-2 border-indigo-200 font-semibold text-base shadow-2xs transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>數位測驗與精熟學習系統</span>
          </button>
        </div>
      </section>

      {/* Learning Goals (Explicitly from the prompt) */}
      <section className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-4">
          <Target className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">核心學習目標</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          完成本教材後，學習者應能掌握以下三個關鍵資訊科技素養能力：
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs">
            <div className="text-xs font-mono font-semibold text-indigo-600 mb-1">
              目標 01
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">
              辨識五個世代主要發展特色
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              清晰說出真空管、電晶體、積體電路、微處理器晶片到AI世代的主要電子元件與演化優勢。
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs">
            <div className="text-xs font-mono font-semibold text-indigo-600 mb-1">
              目標 02
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">
              依時間順序辨識重大里程碑
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              自巴斯卡齒輪加法器、ENIAC、電晶體、Intel微處理器到現代雲端智慧裝置，正確梳理歷史脈絡。
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs">
            <div className="text-xs font-mono font-semibold text-indigo-600 mb-1">
              目標 03
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">
              世代與代表性技術配對
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              透過互動式配對遊戲與實作挑戰，準確將關鍵科技技術與對應電腦世代無縫串聯。
            </p>
          </div>
        </div>
      </section>

      {/* Progress Bar Widget */}
      <ProgressBar
        currentStage="overview"
        completedStages={completedStages}
        onSelectStage={onSelectStage}
        freeMode={freeMode}
      />

      {/* Five Learning Stage Cards */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              五大數位學習階段
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              點選卡片即可進入各學習單元；完成單元檢測後自動解鎖下一階段
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STAGES_DATA.map((stage) => {
            const isCompleted = completedStages.includes(stage.id);
            const isUnlocked =
              freeMode || stage.id === 1 || completedStages.includes((stage.id - 1) as StageId);
            const Icon = STAGE_ICONS[stage.id];

            return (
              <div
                key={stage.id}
                className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between p-6 ${
                  isUnlocked
                    ? 'bg-white hover:border-indigo-400 hover:shadow-md cursor-pointer border-slate-200/90'
                    : 'bg-slate-50/70 border-slate-200/60 opacity-75'
                }`}
                onClick={() => {
                  if (isUnlocked) onSelectStage(stage.id);
                }}
              >
                <div>
                  {/* Top status & duration */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-600'
                          : isUnlocked
                          ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>約 {stage.durationMinutes} 分鐘</span>
                      </div>

                      {isCompleted ? (
                        <span className="text-emerald-700 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>已完成</span>
                        </span>
                      ) : !isUnlocked ? (
                        <span className="text-slate-400 font-medium flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" />
                          <span>未解鎖</span>
                        </span>
                      ) : (
                        <span className="text-indigo-600 font-medium">可開始學習</span>
                      )}
                    </div>
                  </div>

                  {/* Stage Title & Subtitle */}
                  <div className="space-y-1 mb-3">
                    <span className="text-xs font-mono font-semibold text-slate-400 block">
                      STAGE 0{stage.id}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {stage.title.replace(/^第.階段：/, '')}
                    </h3>
                    <p className="text-xs font-medium text-indigo-700">
                      {stage.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {stage.description}
                  </p>

                  {/* Key Concepts - Clean unboxed text with separators per Zero-Pill rules */}
                  <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                    <span className="font-medium text-slate-700 mr-1.5">核心重點:</span>
                    {stage.keyConcepts.map((concept, idx) => (
                      <React.Fragment key={concept}>
                        <span>{concept}</span>
                        {idx < stage.keyConcepts.length - 1 && (
                          <span className="text-slate-300 mx-1.5">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA trigger */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <span
                    className={
                      isCompleted
                        ? 'text-emerald-700'
                        : isUnlocked
                        ? 'text-indigo-600 group-hover:underline'
                        : 'text-slate-400'
                    }
                  >
                    {isCompleted
                      ? '重新檢視單元內容'
                      : isUnlocked
                      ? '進入單元學習'
                      : '完成前置階段以解鎖'}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                      isUnlocked ? 'text-indigo-600' : 'text-slate-300'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Activities Highlight Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>行為主義互動學習實作</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              精選三大實作互動活動（刺激 → 作答 → 即時回饋）
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              告別單向被動閱讀！透過拖曳排序、點選配對與可翻轉比較卡片，在遊戲化互動中建構深刻記憶。
            </p>
          </div>

          <button
            onClick={() => onSelectStage(5)}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors whitespace-nowrap self-start"
          >
            直接前往統整挑戰區
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div
            onClick={() => onSelectStage(5)}
            className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer group space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-indigo-400 font-bold">INTERACTION 01</span>
              <Clock className="w-4 h-4 text-indigo-400" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
              年代排序時間軸
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              巴貝奇分析機、真空管、積體電路、微處理器、網路、行動運算至雲端運算，利用拖曳進行年代排序挑戰。
            </p>
          </div>

          <div
            onClick={() => onSelectStage(5)}
            className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer group space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-cyan-400 font-bold">INTERACTION 02</span>
              <Layers className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              電腦世代圖文配對
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              第一～四代電腦與真空管、電晶體、積體電路、微處理器晶片進行點選或拖曳配對，立即獲得回饋與關鍵字提示。
            </p>
          </div>

          <div
            onClick={() => onSelectStage(2)}
            className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer group space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-amber-400 font-bold">INTERACTION 03</span>
              <Cpu className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
              世代比較翻轉卡片
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              點擊世代卡片流暢翻轉，清晰呈現世代名稱、主要元件、體積速度與關鍵歷史發展影響。
            </p>
          </div>

          <div
            onClick={() => onSelectStage(5)}
            className="p-5 rounded-2xl bg-indigo-600/30 hover:bg-indigo-600/40 border border-indigo-400/30 transition-all cursor-pointer group space-y-2.5 ring-1 ring-indigo-400/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-400 font-bold">INTERACTION 04</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              數位測驗與精熟系統
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              五大題型行為主義評量，錯題鷹架提示、二次作答、複習清單導航與 80% 精熟標準徽章！
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
