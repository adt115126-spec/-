import React from 'react';
import { StageId } from '../types.ts';
import { Check, Lock } from 'lucide-react';

interface ProgressBarProps {
  currentStage: StageId | 'overview';
  completedStages: StageId[];
  onSelectStage: (stage: StageId) => void;
  freeMode: boolean;
}

const STAGES = [
  { id: 1 as StageId, shortName: '1. 科技先驅', label: '早期機械至電子' },
  { id: 2 as StageId, shortName: '2. 第一與二代', label: '真空管與電晶體' },
  { id: 3 as StageId, shortName: '3. 第三與四代', label: 'IC與微處理器' },
  { id: 4 as StageId, shortName: '4. 第五代與AI', label: '智慧運算與雲端' },
  { id: 5 as StageId, shortName: '5. 統整與複習', label: '世代總結與測驗' },
];

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStage,
  completedStages,
  onSelectStage,
  freeMode,
}) => {
  const completedCount = completedStages.length;
  const percentage = Math.round((completedCount / 5) * 100);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-xs mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <span>自主學習進度</span>
            <span className="text-xs font-normal text-slate-500">
              · 已完成 {completedCount} / 5 個階段
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            依序完成各階段以解鎖後續內容，循序掌握電腦世代核心概念
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold font-mono text-indigo-600 tabular-nums">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Progress track */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-slate-100 z-0" />
        <div
          className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-indigo-600 transition-all duration-500 z-0"
          style={{ width: `${((Math.max(1, completedCount) - 0.5) / 4.5) * 100}%` }}
        />

        {/* Steps */}
        <div className="relative z-10 grid grid-cols-5 gap-2">
          {STAGES.map((stg) => {
            const isCompleted = completedStages.includes(stg.id);
            const isUnlocked = freeMode || stg.id === 1 || completedStages.includes((stg.id - 1) as StageId);
            const isCurrent = currentStage === stg.id;

            return (
              <button
                key={stg.id}
                disabled={!isUnlocked}
                onClick={() => onSelectStage(stg.id)}
                className={`flex flex-col items-center text-center group focus:outline-none transition-all ${
                  isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                }`}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-sm ring-4 ring-emerald-50'
                      : isCurrent
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                      : isUnlocked
                      ? 'bg-white border-2 border-indigo-200 text-indigo-700 hover:border-indigo-600'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  ) : !isUnlocked ? (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    stg.id
                  )}
                </div>

                <div className="mt-2 hidden sm:block">
                  <span
                    className={`block text-xs font-semibold leading-tight ${
                      isCurrent
                        ? 'text-indigo-600 font-bold'
                        : isCompleted
                        ? 'text-emerald-700'
                        : isUnlocked
                        ? 'text-slate-800'
                        : 'text-slate-400'
                    }`}
                  >
                    {stg.shortName}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-0.5 truncate max-w-[100px]">
                    {isCompleted ? '✓ 已完成' : isUnlocked ? stg.label : '未解鎖'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
