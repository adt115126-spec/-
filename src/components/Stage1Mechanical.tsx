import React, { useState, useRef } from 'react';
import { TimelineMilestone } from '../types.ts';
import { MECHANICAL_TIMELINE } from '../data/learningContent.ts';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Calculator,
  Cog,
  Layers,
  Compass,
  Code,
  Binary,
  Cpu,
  Database,
  Info,
} from 'lucide-react';

interface Stage1MechanicalProps {
  onCompleteStage: () => void;
  isCompleted: boolean;
  onGoNextStage: () => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  Cog,
  Layers,
  Compass,
  Code,
  Binary,
  Cpu,
  Database,
};

export const Stage1Mechanical: React.FC<Stage1MechanicalProps> = ({
  onCompleteStage,
  isCompleted,
  onGoNextStage,
}) => {
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone>(
    MECHANICAL_TIMELINE[1] // Default Pascaline
  );
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const categories = [
    { id: 'all', label: '全部里程碑 (8項)' },
    { id: 'ancient', label: '古代與機械齒輪' },
    { id: 'theory', label: '程式概念與理論' },
    { id: 'electronic', label: '電子電腦元年' },
  ];

  const filteredTimeline = MECHANICAL_TIMELINE.filter((item) => {
    if (activeCategory === 'ancient') {
      return ['abacus', 'pascaline', 'leibniz', 'babbage_difference'].includes(item.id);
    }
    if (activeCategory === 'theory') {
      return ['analytical_engine', 'turing_machine', 'von_neumann'].includes(item.id);
    }
    if (activeCategory === 'electronic') {
      return ['eniac', 'von_neumann'].includes(item.id);
    }
    return true;
  });

  const handleQuizOptionClick = (idx: number) => {
    setQuizAnswer(idx);
    setQuizSubmitted(true);
    if (idx === 1 && !isCompleted) {
      onCompleteStage();
    }
  };

  return (
    <div className="py-6 sm:py-10 space-y-10">
      {/* Stage Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-semibold">
              <span>STAGE 01</span>
              <span>·</span>
              <span>認識電腦科技發展</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              從機械計算機到電子電腦
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              電腦並非一夕誕生。從人類利用算盤輔助珠算，到17世紀發明精密齒輪以機械代替人力算術，再到巴貝奇與愛達提出「程式與記憶儲存」的抽象構想，最終在20世紀催生第一部通用電子計算機
              ENIAC。
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            {isCompleted ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>階段 1 已完成</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold">
                <Info className="w-4 h-4 text-indigo-600" />
                <span>探索時間軸完成解鎖</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Scroll Arrows */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 mr-1 hidden sm:inline">橫向左右滑動瀏覽</span>
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs"
            title="向左捲動"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs"
            title="向右捲動"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Interactive Timeline */}
      <div className="relative">
        {/* Subtle connector guideline behind cards */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 -translate-y-1/2 bg-slate-200 z-0 pointer-events-none" />

        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 px-1 scroll-smooth snap-x snap-mandatory relative z-10"
          style={{ scrollbarWidth: 'thin' }}
        >
          {filteredTimeline.map((item, index) => {
            const Icon = ICON_MAP[item.iconName] || Compass;
            const isSelected = selectedMilestone.id === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedMilestone(item)}
                className={`snap-start shrink-0 w-[280px] sm:w-[310px] rounded-2xl border p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-100'
                    : 'bg-white/90 border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  {/* Top: Year & Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold text-indigo-600">
                      {item.year}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {item.tag}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h2>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">
                    里程碑 0{index + 1}
                  </span>
                  <span
                    className={`font-semibold ${
                      isSelected ? 'text-indigo-600' : 'text-slate-400'
                    }`}
                  >
                    {isSelected ? '● 正在檢視' : '點擊深入了解'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Milestone Deep-Dive Showcase */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span>深度檔案解析</span>
              <span>·</span>
              <span className="text-indigo-600 font-semibold">
                {selectedMilestone.year}
              </span>
              <span>·</span>
              <span>{selectedMilestone.tag}</span>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
                {selectedMilestone.title}
              </h2>
              <p className="text-sm font-medium text-indigo-700">
                {selectedMilestone.subtitle}
              </p>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedMilestone.description}
            </p>

            {selectedMilestone.inventor && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  人物
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">重要發明推手</div>
                  <div className="text-sm font-bold text-slate-800">
                    {selectedMilestone.inventor}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>科技歷史劃時代意義</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 bg-amber-50/50 border border-amber-200/60 rounded-xl p-3.5 leading-relaxed">
                {selectedMilestone.significance}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {/* Visual Image / Authentic illustration */}
            {selectedMilestone.image ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-900 group">
                <img
                  src={selectedMilestone.image}
                  alt={selectedMilestone.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="text-xs text-slate-200 font-medium">
                    歷史真實檔案視覺：{selectedMilestone.title}
                  </span>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-6 flex flex-col items-center justify-center text-center aspect-video">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                  <Cog className="w-6 h-6 animate-spin-slow" />
                </div>
                <div className="text-xs font-bold text-slate-700">
                  {selectedMilestone.title} 運算架構
                </div>
                <div className="text-[11px] text-slate-500 mt-1 max-w-xs">
                  奠定現代數位邏輯與二進位計算的早期機械原型
                </div>
              </div>
            )}

            {/* Quick takeaways */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-xs text-slate-600 space-y-2">
              <div className="font-semibold text-slate-800">
                本階段關鍵脈絡總結：
              </div>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>齒輪轉動機械雖然精巧，但受限於機械磨損與轉速物理極限。</li>
                <li>「分析機」首次劃分出記憶體與運算器，愛達寫出史上第一段程式。</li>
                <li>ENIAC 正式以真空管電子脈衝告別齒輪，拉開電子運算序幕。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Stage 1 Checkpoint Quiz to unlock Next Stage */}
      <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-6 sm:p-8">
        <div className="flex items-start gap-3.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono font-semibold text-indigo-700">
              階段 01 理解自我檢測
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              哪一部電腦被公認為人類史上第一部「通用電子數位電腦」？
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {[
            { id: 0, text: 'A. 巴斯卡加法器 (Pascaline)' },
            { id: 1, text: 'B. ENIAC 電子數值積分計算機' },
            { id: 2, text: 'C. 巴貝奇差分機 (Difference Engine)' },
            { id: 3, text: 'D. IBM PC 個人電腦' },
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
                onClick={() => handleQuizOptionClick(opt.id)}
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
                  <strong>答對了！</strong> 1946 年誕生的 ENIAC 耗費近 18,000 支真空管，以純電子開關進行每秒數千次加法運算，是人類歷史上第一部通用電子數位電腦。
                </span>
              </div>
            ) : (
              <div>
                <strong>尚未完全正確：</strong> 正確答案是 <strong>B. ENIAC</strong>。巴斯卡加法器與差分機屬於機械計算器；IBM PC 則是1980年代第四代個人電腦。請點選 B 選項重新確認。
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-indigo-100/80">
          <div className="text-xs text-slate-500">
            {isCompleted ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                恭喜！第一階段學習已通過認證
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
            <span>前往第二階段：第一代與第二代電腦</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
