import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Check,
  Cpu,
  Layers,
  Zap,
  Flame,
  Info,
} from 'lucide-react';

export interface GenMatchItem {
  id: string; // 'gen1' | 'gen2' | 'gen3' | 'gen4'
  genTitle: string;
  period: string;
  componentTargetId: string;
  hint: string;
}

export interface ComponentMatchItem {
  id: string;
  name: string;
  desc: string;
  techKeywords: string[];
}

export const LEFT_GENERATIONS: GenMatchItem[] = [
  {
    id: 'gen1',
    genTitle: '第一代電腦',
    period: '1946 - 1958 年',
    componentTargetId: 'tube',
    hint: '提示：第一代電腦體積龐大如整棟房，利用高溫發熱、內部抽成真空的玻璃管元件。',
  },
  {
    id: 'gen2',
    genTitle: '第二代電腦',
    period: '1959 - 1964 年',
    componentTargetId: 'transistor',
    hint: '提示：第二代電腦告別易燒壞的真空管，採用貝爾實驗室發明的固態半導體微型三極元件。',
  },
  {
    id: 'gen3',
    genTitle: '第三代電腦',
    period: '1965 - 1970 年',
    componentTargetId: 'ic',
    hint: '提示：第三代電腦將數十到數百個電晶體蝕刻整合在單片小矽晶片（積體化）上。',
  },
  {
    id: 'gen4',
    genTitle: '第四代電腦',
    period: '1971 年至今',
    componentTargetId: 'microprocessor',
    hint: '提示：第四代電腦將整顆中央處理器（CPU）完全壓縮於單晶片上，成就個人電腦 PC 革命。',
  },
];

export const RIGHT_COMPONENTS: ComponentMatchItem[] = [
  {
    id: 'tube',
    name: '真空管',
    desc: '熱電子玻璃真空管，發熱量極大且壽命短，代表機種為 ENIAC 與 UNIVAC。',
    techKeywords: ['第一代', 'ENIAC', '高耗電易燒毀'],
  },
  {
    id: 'transistor',
    name: '電晶體',
    desc: '固態半導體元件，體積縮小百倍、耗電大減，催生 FORTRAN/COBOL 高階語言。',
    techKeywords: ['第二代', '半導體固態', '磁芯記憶體'],
  },
  {
    id: 'ic',
    name: '積體電路（IC）',
    desc: 'Integrated Circuit，在矽晶片上整合多個元件，誕生 DEC PDP 迷你電腦與分時系統。',
    techKeywords: ['第三代', '迷你電腦', '矽晶片積體'],
  },
  {
    id: 'microprocessor',
    name: '微處理器／CPU 晶片',
    desc: '超大型積體電路 (VLSI)，整顆 CPU 做在單晶片，引爆桌上型 PC、筆電與圖形介面 (GUI)。',
    techKeywords: ['第四代', 'Intel 4004', '個人電腦PC'],
  },
];

interface GenMatchingActivityProps {
  onComplete?: () => void;
  isCompleted?: boolean;
}

export const GenMatchingActivity: React.FC<GenMatchingActivityProps> = ({
  onComplete,
  isCompleted = false,
}) => {
  // State: selected generation on the left
  const [selectedLeftGen, setSelectedLeftGen] = useState<string | null>(null);

  // Matched pairs record: { [genId]: componentId }
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});

  // Behavioral Feedback State
  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
    hint?: string;
  } | null>(null);

  // Drag & drop support
  const [draggedGenId, setDraggedGenId] = useState<string | null>(null);

  // Handle Click Matching
  const handleSelectGen = (genId: string) => {
    if (matchedPairs[genId]) return;
    setSelectedLeftGen(genId);
    setFeedbackMessage({
      type: 'info',
      text: '已選取左側世代，請點選右側符合的核心電子元件進行配對！',
    });
  };

  const handleSelectComponent = (componentId: string) => {
    // If a pair already holds this component, ignore
    if (Object.values(matchedPairs).includes(componentId)) return;

    if (!selectedLeftGen) {
      setFeedbackMessage({
        type: 'info',
        text: '請先在左側點選一個「電腦世代」，再點選右側要配對的「主要元件」！',
      });
      return;
    }

    const genObj = LEFT_GENERATIONS.find((g) => g.id === selectedLeftGen);
    if (!genObj) return;

    // Check correctness
    if (genObj.componentTargetId === componentId) {
      // Correct!
      const compObj = RIGHT_COMPONENTS.find((c) => c.id === componentId);
      const updated = { ...matchedPairs, [selectedLeftGen]: componentId };
      setMatchedPairs(updated);
      setSelectedLeftGen(null);

      const allDone = Object.keys(updated).length === LEFT_GENERATIONS.length;

      setFeedbackMessage({
        type: 'success',
        text: `✓ 配對成功！${genObj.genTitle} 核心元件確為【${compObj?.name}】。`,
      });

      if (allDone && onComplete) {
        onComplete();
      }
    } else {
      // Wrong: Behaviorist design - Do not disclose direct answer immediately, provide keyword hint
      setFeedbackMessage({
        type: 'error',
        text: '配對未吻合，請再想一想！',
        hint: genObj.hint,
      });
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (genId: string) => {
    setDraggedGenId(genId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnComponent = (componentId: string) => {
    if (!draggedGenId) return;
    const genObj = LEFT_GENERATIONS.find((g) => g.id === draggedGenId);
    if (!genObj) return;

    if (genObj.componentTargetId === componentId) {
      const compObj = RIGHT_COMPONENTS.find((c) => c.id === componentId);
      const updated = { ...matchedPairs, [draggedGenId]: componentId };
      setMatchedPairs(updated);
      setDraggedGenId(null);
      setSelectedLeftGen(null);

      const allDone = Object.keys(updated).length === LEFT_GENERATIONS.length;

      setFeedbackMessage({
        type: 'success',
        text: `✓ 拖曳配對成功！${genObj.genTitle} 核心元件為【${compObj?.name}】。`,
      });

      if (allDone && onComplete) {
        onComplete();
      }
    } else {
      setFeedbackMessage({
        type: 'error',
        text: `拖曳配對錯誤：${genObj.genTitle} 並非對應此元件。`,
        hint: genObj.hint,
      });
      setDraggedGenId(null);
    }
  };

  const handleReset = () => {
    setMatchedPairs({});
    setSelectedLeftGen(null);
    setFeedbackMessage(null);
  };

  const isAllCompleted = Object.keys(matchedPairs).length === LEFT_GENERATIONS.length;

  return (
    <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>互動二：電腦世代圖文配對</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            電腦世代配對
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            請點選左側「電腦世代」與右側「主要元件」進行配對，亦可直接<strong>拖曳左側卡片至右側元件上</strong>。
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
            配對進度: {Object.keys(matchedPairs).length} / 4
          </div>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-600 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置配對</span>
          </button>
        </div>
      </div>

      {/* Behavioral Immediate Feedback Banner */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : feedbackMessage.type === 'error'
              ? 'bg-rose-50 border-rose-300 text-rose-950'
              : 'bg-indigo-50 border-indigo-200 text-indigo-950'
          }`}
        >
          {feedbackMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : feedbackMessage.type === 'error' ? (
            <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          )}

          <div className="text-xs sm:text-sm space-y-1">
            <div className="font-semibold">{feedbackMessage.text}</div>
            {feedbackMessage.hint && (
              <div className="text-rose-800 font-medium">
                💡 <strong>關鍵字引導：</strong>{feedbackMessage.hint}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Two Column Matching Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Generations */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>步驟 1：選擇電腦世代（可點擊或拖曳）</span>
            <span className="text-[11px] text-indigo-600 font-normal">左側</span>
          </div>

          <div className="space-y-2.5">
            {LEFT_GENERATIONS.map((gen) => {
              const isMatched = !!matchedPairs[gen.id];
              const isSelected = selectedLeftGen === gen.id;
              const matchedComp = RIGHT_COMPONENTS.find(
                (c) => c.id === matchedPairs[gen.id]
              );

              return (
                <div
                  key={gen.id}
                  draggable={!isMatched}
                  onDragStart={() => handleDragStart(gen.id)}
                  onClick={() => handleSelectGen(gen.id)}
                  className={`p-4 rounded-xl border transition-all select-none ${
                    isMatched
                      ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-2xs opacity-90 cursor-default'
                      : isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-200 cursor-pointer'
                      : 'bg-white border-slate-200 hover:border-indigo-400 text-slate-800 hover:shadow-2xs cursor-grab active:cursor-grabbing'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span
                        className={`text-[11px] font-mono font-semibold block ${
                          isSelected ? 'text-indigo-200' : 'text-slate-400'
                        }`}
                      >
                        {gen.period}
                      </span>
                      <h3 className="text-base font-extrabold mt-0.5">
                        {gen.genTitle}
                      </h3>
                      {isMatched && matchedComp && (
                        <div className="text-xs text-emerald-700 font-bold mt-1 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>已鎖定：{matchedComp.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="shrink-0">
                      {isMatched ? (
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      ) : isSelected ? (
                        <span className="text-xs bg-white text-indigo-700 font-bold px-2.5 py-1 rounded-md shadow-2xs">
                          待配對
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">點擊選取</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Components (Deliberately shuffled order) */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>步驟 2：對應主要元件（點擊或接收拖曳）</span>
            <span className="text-[11px] text-indigo-600 font-normal">右側</span>
          </div>

          <div className="space-y-2.5">
            {/* Shuffled right elements: IC, 真空管, 微處理器, 電晶體 */}
            {[
              RIGHT_COMPONENTS[2], // 積體電路
              RIGHT_COMPONENTS[0], // 真空管
              RIGHT_COMPONENTS[3], // 微處理器
              RIGHT_COMPONENTS[1], // 電晶體
            ].map((comp) => {
              const matchedGenId = Object.keys(matchedPairs).find(
                (k) => matchedPairs[k] === comp.id
              );
              const isMatched = !!matchedGenId;
              const matchedGen = LEFT_GENERATIONS.find((g) => g.id === matchedGenId);

              return (
                <div
                  key={comp.id}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDropOnComponent(comp.id)}
                  onClick={() => handleSelectComponent(comp.id)}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    isMatched
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 opacity-80 cursor-default'
                      : 'bg-white border-slate-200 hover:border-indigo-400 text-slate-800 hover:shadow-2xs cursor-pointer'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-900">
                          {comp.name}
                        </span>
                        {isMatched && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            {matchedGen?.genTitle}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {comp.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {comp.techKeywords.map((kw) => (
                          <span
                            key={kw}
                            className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="shrink-0 mt-0.5">
                      {isMatched ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[10px] text-slate-400">
                          ＋
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completion Banner */}
      {isAllCompleted && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                恭喜完成互動練習！
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
                你已精準無誤掌握第一代至第四代電腦的核心電子元件對應關係，行為學習目標圓滿達成！
              </p>
            </div>
          </div>

          <div className="text-xs font-semibold bg-white text-emerald-800 px-4 py-2 rounded-xl shadow-xs shrink-0">
            ✓ 學習進度已更新
          </div>
        </div>
      )}
    </div>
  );
};
