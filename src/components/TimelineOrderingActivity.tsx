import React, { useState } from 'react';
import {
  GripVertical,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowDown,
  ArrowUp,
  Info,
} from 'lucide-react';

export interface TimelineSortItem {
  id: string;
  name: string;
  correctOrder: number; // 1 to 7
  era: string;
  category: string;
  hint: string;
  description: string;
}

export const TIMELINE_SORT_ITEMS: TimelineSortItem[] = [
  {
    id: 'babbage',
    name: '巴貝奇分析機',
    correctOrder: 1,
    era: '1837 年',
    category: '早期機械概念',
    hint: '巴貝奇與愛達提出「程式與算術磨坊」概念，是現代電腦邏輯概念的最早期先驅。',
    description: '1837年英國巴貝奇提出分析機，包含輸入、儲存與運算單元，奠定通用電腦理論架構。',
  },
  {
    id: 'vacuum_tube',
    name: '真空管',
    correctOrder: 2,
    era: '1946 年 (第一代電腦)',
    category: '第一代電子元件',
    hint: '真空管是第一代電子電腦（如 ENIAC）的核心元件，早於半導體晶片與電晶體。',
    description: '1940年代熱電子真空管取代機械齒輪，催生 ENIAC 等第一代巨型電子電腦。',
  },
  {
    id: 'ic',
    name: '積體電路（IC）',
    correctOrder: 3,
    era: '1965 年 (第三代電腦)',
    category: '第三代微縮元件',
    hint: '想想看：積體電路（IC）在單一矽晶片上整合多個電晶體，早於將整顆 CPU 濃縮的微處理器！',
    description: '1960年代中期將數十至數百個電晶體刻在矽晶片上，誕生迷你電腦與分時作業系統。',
  },
  {
    id: 'microprocessor',
    name: '微處理器',
    correctOrder: 4,
    era: '1971 年 (第四代電腦)',
    category: '第四代 CPU 晶片',
    hint: '微處理器（如 Intel 4004）將整顆 CPU 做在單晶片上，引發個人電腦 (PC) 革命。',
    description: '1971年首款商用微處理器誕生，開啟人人有電腦的個人電腦 (PC) 與微電腦時代。',
  },
  {
    id: 'internet',
    name: '網路',
    correctOrder: 5,
    era: '1980-1990 年代',
    category: '全球資訊網與連網',
    hint: '網路與網際網路 (Internet/WWW) 將獨立的個人電腦跨國串聯，早於現代行動觸控與雲端。',
    description: '從 ARPANET 演進到 1990 年代全球資訊網 (WWW)，電腦進入全球無縫連網資訊時代。',
  },
  {
    id: 'mobile_computing',
    name: '行動運算',
    correctOrder: 6,
    era: '2000-2010 年代',
    category: '隨身智慧運算',
    hint: '智慧型手機、多點觸控與 3G/4G/5G 讓運算進入掌中口袋，成為現代生活必需品。',
    description: '智慧型手機與平板電腦普及，配合無線通訊讓人們能隨時隨地攜帶並使用運算能力。',
  },
  {
    id: 'cloud_computing',
    name: '雲端運算',
    correctOrder: 7,
    era: '現代至未來',
    category: '海量彈性雲端與 AI',
    hint: '雲端運算將算力與數據集中在超大型資料中心按需調度，是當代大型 AI 模型背後的支柱。',
    description: '利用網際網路集中調度超大規模伺服器機房算力與儲存，支撐巨量數據與生成式 AI。',
  },
];

interface TimelineOrderingActivityProps {
  onComplete?: () => void;
  isCompleted?: boolean;
}

export const TimelineOrderingActivity: React.FC<TimelineOrderingActivityProps> = ({
  onComplete,
  isCompleted = false,
}) => {
  // Scramble initial items
  const [items, setItems] = useState<TimelineSortItem[]>(() => {
    // Shuffled sequence that is deliberately NOT in correct order
    return [
      TIMELINE_SORT_ITEMS[3], // 微處理器
      TIMELINE_SORT_ITEMS[1], // 真空管
      TIMELINE_SORT_ITEMS[5], // 行動運算
      TIMELINE_SORT_ITEMS[0], // 巴貝奇分析機
      TIMELINE_SORT_ITEMS[6], // 雲端運算
      TIMELINE_SORT_ITEMS[2], // 積體電路（IC）
      TIMELINE_SORT_ITEMS[4], // 網路
    ];
  });

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Behavioral Feedback State
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [currentHint, setCurrentHint] = useState<string>('');
  const [hasSucceeded, setHasSucceeded] = useState<boolean>(isCompleted);

  // Drag Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Transparent or standard ghost image
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    // Only clear if needed
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...items];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, moved);

    setItems(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);

    // Reset status on user edit so they are encouraged to submit again
    if (submissionStatus === 'wrong') {
      setSubmissionStatus('idle');
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;

    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;
    setItems(updated);

    if (submissionStatus === 'wrong') {
      setSubmissionStatus('idle');
    }
  };

  // Submit Answer & Behavioral Verification
  const handleSubmitAnswer = () => {
    const nextAttempt = attemptCount + 1;
    setAttemptCount(nextAttempt);

    // Check if the current order strictly matches correctOrder 1..7
    let isCorrect = true;
    for (let i = 0; i < items.length; i++) {
      if (items[i].correctOrder !== i + 1) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      // Stimulus: Positive Reinforcement (行為主義立即正向增強)
      setSubmissionStatus('correct');
      setHasSucceeded(true);
      if (onComplete) {
        onComplete();
      }
    } else {
      // Stimulus: Error guidance (不直接給答案，第一次給提示，第二次顯示正確排序與解析)
      setSubmissionStatus('wrong');
      if (nextAttempt === 1) {
        // Specific contextual hint
        // e.g. check vacuum tube vs IC
        const tubeIdx = items.findIndex((it) => it.id === 'vacuum_tube');
        const icIdx = items.findIndex((it) => it.id === 'ic');
        if (tubeIdx > icIdx) {
          setCurrentHint('想想看，真空管（第一代電腦）是在積體電路（第三代電腦）之前還是之後？');
        } else {
          const babbageIdx = items.findIndex((it) => it.id === 'babbage');
          if (babbageIdx !== 0) {
            setCurrentHint('提示：19世紀巴貝奇提出的「分析機」是其中最早期的機械運算概念喔！');
          } else {
            setCurrentHint('提示：仔細檢視「微處理器」、「網路」與「行動運算」的先後時代順序！');
          }
        }
      } else {
        // Second time or more
        setCurrentHint(
          '兩次嘗試未全對。系統已為您展開正確時間脈絡與簡短解析，您可以藉此檢視各個世代關鍵里程碑！'
        );
      }
    }
  };

  const handleReset = () => {
    setItems([
      TIMELINE_SORT_ITEMS[3],
      TIMELINE_SORT_ITEMS[1],
      TIMELINE_SORT_ITEMS[5],
      TIMELINE_SORT_ITEMS[0],
      TIMELINE_SORT_ITEMS[6],
      TIMELINE_SORT_ITEMS[2],
      TIMELINE_SORT_ITEMS[4],
    ]);
    setAttemptCount(0);
    setSubmissionStatus('idle');
    setCurrentHint('');
  };

  const handleAutoAlign = () => {
    setItems([...TIMELINE_SORT_ITEMS]);
    setSubmissionStatus('correct');
    setHasSucceeded(true);
    if (onComplete) onComplete();
  };

  return (
    <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Activity Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>互動一：電腦科技年代排序</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            排排看：電腦科技發展時間軸
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            請利用<strong>拖曳（Drag & Drop）</strong>或按鈕，將下列 7 個打散的電腦科技事件依照<strong>時間發展順序（由古至今）</strong>排列。
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-600 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>打亂重排</span>
          </button>
        </div>
      </div>

      {/* Behavioral Instructional Hint Banner */}
      <div className="flex items-center gap-2 text-xs text-indigo-900 bg-indigo-50/70 border border-indigo-100 px-3.5 py-2.5 rounded-xl">
        <Info className="w-4 h-4 text-indigo-600 shrink-0" />
        <span>
          💡 <strong>操作提示：</strong>滑鼠按住卡片左側圖示直接拖曳上下移動，或點擊右側的「▲ 上移 / ▼ 下移」快速調換位置。排好後點擊最下方<strong>「送出答案」</strong>驗證！
        </span>
      </div>

      {/* Sortable List */}
      <div className="space-y-2.5">
        {items.map((item, index) => {
          const isDragging = draggedIndex === index;
          const isOver = dragOverIndex === index;
          const showCorrectBadge = submissionStatus === 'correct' || (attemptCount >= 2 && submissionStatus === 'wrong');

          return (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-grab active:cursor-grabbing select-none ${
                isDragging
                  ? 'opacity-40 border-indigo-400 bg-indigo-50 scale-95 shadow-lg'
                  : isOver
                  ? 'border-indigo-500 bg-indigo-50/50 shadow-md ring-2 ring-indigo-200'
                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xs'
              }`}
            >
              {/* Left drag handle and rank */}
              <div className="flex items-center gap-3">
                <div className="text-slate-400 hover:text-indigo-600 cursor-grab p-1">
                  <GripVertical className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {index + 1}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {item.name}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    {showCorrectBadge && (
                      <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        年代：{item.era}
                      </span>
                    )}
                  </div>
                  {showCorrectBadge && (
                    <p className="text-xs text-slate-500 mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Move buttons (for keyboard & mobile accessibility) */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 disabled:opacity-25 text-slate-600 transition-colors"
                  title="上移"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={index === items.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 disabled:opacity-25 text-slate-600 transition-colors"
                  title="下移"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Feedback & Stimulus Blocks */}
      {submissionStatus === 'correct' && (
        <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 space-y-3 animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-emerald-950 flex items-center gap-1.5">
                <span>答對了！你已掌握電腦科技發展的時間順序。</span>
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 mt-1">
                🎉 正確順序：<strong>巴貝奇分析機 (1837)</strong> → <strong>真空管 (1946)</strong> → <strong>積體電路 (1965)</strong> → <strong>微處理器 (1971)</strong> → <strong>網路 (1980-90s)</strong> → <strong>行動運算 (2000s)</strong> → <strong>雲端運算 (現代)</strong>。
              </p>
              <div className="mt-2 text-xs font-semibold text-emerald-700">
                ✓ 學習進度已更新並成功解鎖成就！
              </div>
            </div>
          </div>
        </div>
      )}

      {submissionStatus === 'wrong' && (
        <div
          className={`p-5 rounded-2xl border-2 space-y-3 ${
            attemptCount === 1
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs ${
                attemptCount === 1 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
            >
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold">
                {attemptCount === 1
                  ? '順序尚未完全正確，請再思考看看！'
                  : '第 2 次作答仍未完全吻合，以下為歷史時間脈絡解析：'}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed">
                {currentHint}
              </p>
            </div>
          </div>

          {/* After 2 wrong attempts, provide the exact reference breakdown per behavioral requirements */}
          {attemptCount >= 2 && (
            <div className="mt-3 pt-3 border-t border-rose-200/80 space-y-2 text-xs">
              <div className="font-bold text-rose-900">
                標準時間發展順序與簡短解析：
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-700 font-medium">
                {TIMELINE_SORT_ITEMS.map((c) => (
                  <li key={c.id}>
                    <strong>{c.name}</strong>（{c.era}）：{c.hint}
                  </li>
                ))}
              </ol>
              <div className="pt-2">
                <button
                  onClick={handleAutoAlign}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-2xs"
                >
                  自動依正確時序排列並記錄進度
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Submit Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <div className="text-xs text-slate-500">
          作答次數：<strong>{attemptCount}</strong> 次
          {hasSucceeded && (
            <span className="ml-2 text-emerald-700 font-semibold">
              ✓ 此互動已順利過關
            </span>
          )}
        </div>

        <button
          onClick={handleSubmitAnswer}
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center justify-center gap-2"
        >
          <span>送出答案</span>
        </button>
      </div>
    </div>
  );
};
