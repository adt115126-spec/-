import React from 'react';
import { StageId } from '../types.ts';
import { BookOpen, Award, RotateCcw, Unlock, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentStage: StageId | 'overview';
  onSelectStage: (stage: StageId | 'overview') => void;
  completedStages: StageId[];
  freeMode: boolean;
  onToggleFreeMode: () => void;
  onResetProgress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStage,
  onSelectStage,
  completedStages,
  freeMode,
  onToggleFreeMode,
  onResetProgress,
}) => {
  const percent = Math.round((completedStages.length / 5) * 100);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectStage('overview')}
          className="text-left group flex items-center gap-2.5 focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 transition-transform group-hover:scale-105">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              電腦科技發展與世代演進
            </span>
          </div>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectStage('overview')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              currentStage === 'overview'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            教材首頁
          </button>

          {[
            { id: 1 as StageId, label: '一：科技先驅' },
            { id: 2 as StageId, label: '二：一二代電腦' },
            { id: 3 as StageId, label: '三：三四代電腦' },
            { id: 4 as StageId, label: '四：五代與未來' },
            { id: 5 as StageId, label: '五：統整複習' },
          ].map((stg) => {
            const isCompleted = completedStages.includes(stg.id);
            const isUnlocked = freeMode || stg.id === 1 || completedStages.includes((stg.id - 1) as StageId);
            const isActive = currentStage === stg.id;

            return (
              <button
                key={stg.id}
                disabled={!isUnlocked}
                onClick={() => onSelectStage(stg.id)}
                className={`relative px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : isUnlocked
                    ? 'hover:text-slate-900 hover:bg-slate-50'
                    : 'text-slate-300 cursor-not-allowed'
                }`}
                title={!isUnlocked ? '請先完成前一階段解鎖' : ''}
              >
                <span>{stg.label}</span>
                {isCompleted && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline-block" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Progress Mini Badge */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>進度</span>
            <span className="font-semibold text-slate-800">{percent}%</span>
            <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* Free exploration mode toggle */}
          <button
            onClick={onToggleFreeMode}
            title={freeMode ? '目前已解鎖全部階段（自由瀏覽模式）' : '切換為自由瀏覽模式'}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              freeMode
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Unlock className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{freeMode ? '自由模式中' : '快速全解鎖'}</span>
          </button>

          {/* Reset progress */}
          <button
            onClick={onResetProgress}
            title="重設所有學習進度"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
