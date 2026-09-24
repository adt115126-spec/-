import React, { useState } from 'react';
import { GEN3_DATA, GEN4_DATA } from '../data/learningContent.ts';
import {
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Cpu,
  Monitor,
  HardDrive,
  Layers,
  Sparkles,
  Sliders,
} from 'lucide-react';
import { InteractiveGenCards } from './InteractiveGenCards.tsx';

interface Stage3Props {
  onCompleteStage: () => void;
  isCompleted: boolean;
  onGoNextStage: () => void;
}

export const Stage3ThirdFourthGen: React.FC<Stage3Props> = ({
  onCompleteStage,
  isCompleted,
  onGoNextStage,
}) => {
  const [sliderScale, setSliderScale] = useState<number>(3); // 1 to 5 scale
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const scaleData = [
    {
      level: 1,
      era: '1965 年 (第三代初期 SSI)',
      transistors: '約 10 ～ 100 個電晶體',
      desc: '小規模積體電路，將幾個基本邏輯閘整合在一片矽晶片上。',
      machine: 'IBM System/360 主流模組',
    },
    {
      level: 2,
      era: '1968 年 (第三代中期 MSI)',
      transistors: '約 100 ～ 1,000 個電晶體',
      desc: '中規模積體電路，迷你電腦 PDP-8 興起，價格降至大學可負擔。',
      machine: 'DEC PDP-8 迷你電腦',
    },
    {
      level: 3,
      era: '1971 年 (第四代起點 Intel 4004)',
      transistors: '2,300 個電晶體',
      desc: '全球首款商用單晶片微處理器，將完整運算單元全部放在單一晶片。',
      machine: 'Busicom 計算機 / 早期微控制器',
    },
    {
      level: 4,
      era: '1981 年 (第四代 PC 革命)',
      transistors: '約 29,000 個 (Intel 8086/8088)',
      desc: '超大型積體電路 (VLSI)，誕生 IBM PC，個人電腦標準確立。',
      machine: 'IBM 5150 PC, Apple II',
    },
    {
      level: 5,
      era: '現代 CPU 晶片 (ULSI 奈米製程)',
      transistors: '超過 100 億至 500 億個電晶體',
      desc: '數奈米製程，整合多核心 CPU、GPU、NPU 神經加速單元於指甲般大小。',
      machine: '現代智慧型手機、筆電、AI 伺服器晶片',
    },
  ];

  const currentScale = scaleData[sliderScale - 1];

  const handleQuizAnswer = (idx: number) => {
    setQuizAnswer(idx);
    setQuizSubmitted(true);
    if (idx === 2 && !isCompleted) {
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
              <span>STAGE 03</span>
              <span>·</span>
              <span>第三代與第四代電腦</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              積體電路 (IC) 到微處理器 (CPU 晶片)
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              從把數十至數百個電晶體壓縮在單一矽晶片（積體電路 IC），到將整顆電腦大腦封裝在單晶片上的微處理器（Microprocessor），引爆了全球「個人電腦 (Personal Computer, PC)」普及革命。
            </p>
          </div>

          <div className="shrink-0">
            {isCompleted ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>階段 3 已完成</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold">
                <Cpu className="w-4 h-4 text-indigo-600" />
                <span>左右比較兩代變革</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Container (左右比較方式) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            世代差異左右對照比較
          </h2>
          <span className="text-xs text-slate-500">
            從「企業迷你電腦」到「人手一台個人電腦」
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Left: Third Generation */}
          <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-indigo-50">
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-600 block">
                    THIRD GENERATION (1965 - 1970)
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    第三代：積體電路 (IC)
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
              </div>

              {/* Specs */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="border-l-2 border-indigo-400 pl-3 py-0.5">
                  <span className="font-bold text-slate-900 block text-xs text-slate-500 uppercase tracking-wide">
                    核心元件與製造技術
                  </span>
                  <p className="text-slate-700 mt-1">
                    <strong>積體電路 (IC, Integrated Circuit)</strong>
                    <br />
                    在單一小矽晶片上，將數十至數百個電晶體、電阻與二極體蝕刻整合，解決手工焊接電線的可靠度瓶頸。
                  </p>
                </div>

                <div className="border-l-2 border-indigo-400 pl-3 py-0.5">
                  <span className="font-bold text-slate-900 block text-xs text-slate-500 uppercase tracking-wide">
                    電腦規模與形態
                  </span>
                  <p className="text-slate-700 mt-1">
                    <strong>迷你電腦 (Minicomputer) 興起</strong>
                    <br />
                    縮小至約辦公桌大小，以 DEC PDP-8 為代表，大專院校、研究所與醫院開始有能力採購獨立主機。
                  </p>
                </div>

                <div className="border-l-2 border-indigo-400 pl-3 py-0.5">
                  <span className="font-bold text-slate-900 block text-xs text-slate-500 uppercase tracking-wide">
                    作業系統與運算模式
                  </span>
                  <p className="text-slate-700 mt-1">
                    <strong>分時作業系統 (Time-Sharing OS)</strong>
                    <br />
                    多台終端機能同時連線連入同一台主機共享運算資源；BASIC、Pascal 等結構化語言蓬勃發展。
                  </p>
                </div>

                <div className="border-l-2 border-indigo-400 pl-3 py-0.5">
                  <span className="font-bold text-slate-900 block text-xs text-slate-500 uppercase tracking-wide">
                    運算速度
                  </span>
                  <p className="text-slate-700 mt-1 font-mono">
                    奈秒級 (ns, 10⁻⁹ 秒)，每秒達百萬次運算 (MIPS)。
                  </p>
                </div>

                <div className="border-l-2 border-indigo-400 pl-3 py-0.5">
                  <span className="font-bold text-slate-900 block text-xs text-slate-500 uppercase tracking-wide">
                    歷史經典代表
                  </span>
                  <p className="text-slate-700 mt-1 font-medium">
                    IBM System/360 系列、DEC PDP-8
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 bg-indigo-50/50 rounded-xl p-3 text-xs text-indigo-950">
              <strong>劃時代特色：</strong>
              首創「電腦家族系列（軟體向上相容）」概念，企業升級硬體時不再需要全部重寫程式碼！
            </div>
          </div>

          {/* Right: Fourth Generation */}
          <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-purple-50">
                <div>
                  <span className="text-xs font-mono font-bold text-purple-600 block">
                    FOURTH GENERATION (1971 - 1980s)
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    第四代：微處理器／CPU 晶片
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Cpu className="w-5 h-5" />
                </div>
              </div>

              {/* Specs */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="border-l-2 border-purple-400 pl-3 py-0.5">
                  <span className="font-bold text-slate-900 block text-xs text-slate-500 uppercase tracking-wide">
                    核心元件與製造技術
                  </span>
                  <p className="text-slate-700 mt-1">
                    <strong>超大型積體電路 (VLSI / ULSI)</strong>
                    <br />
                    將整顆中央處理單元 (CPU) 全部濃縮在單一微小矽晶片（微處理器）上，包含運算、控制與暫存器。
                  </p>
                </div>

                <div className="border-l-2 border-purple-400 pl-3 py-0.5">
                  <span className="font-bold text-slate-900 block text-xs text-slate-500 uppercase tracking-wide">
                    電腦規模與形態
                  </span>
                  <p className="text-slate-700 mt-1">
                    <strong>個人電腦 (Personal Computer, PC) 誕生</strong>
                    <br />
                    擺在一般書桌甚至膝蓋上（桌上型 PC、筆記型電腦），售價讓一般家庭與中小企業皆能負擔。
                  </p>
                </div>

                <div className="border-l-2 border-purple-400 pl-3 py-0.5">
                  <span className="font-bold text-slate-900 block text-xs text-slate-500 uppercase tracking-wide">
                    人機介面與作業系統
                  </span>
                  <p className="text-slate-700 mt-1">
                    <strong>圖形使用者介面 (GUI) 與滑鼠普及</strong>
                    <br />
                    從黑底白字的命令列，躍升為視覺化視窗 (Mac OS, Windows)，普通大眾不需背指令就能操作。
                  </p>
                </div>

                <div className="border-l-2 border-purple-400 pl-3 py-0.5">
                  <span className="font-bold text-slate-900 block text-xs text-slate-500 uppercase tracking-wide">
                    運算速度
                  </span>
                  <p className="text-slate-700 mt-1 font-mono">
                    皮秒級 (ps, 10⁻¹² 秒)，頻率從 MHz 飛速飆升至 GHz 領域。
                  </p>
                </div>

                <div className="border-l-2 border-purple-400 pl-3 py-0.5">
                  <span className="font-bold text-slate-900 block text-xs text-slate-500 uppercase tracking-wide">
                    歷史經典代表
                  </span>
                  <p className="text-slate-700 mt-1 font-medium">
                    Intel 4004 (1971)、Apple II (1977)、IBM PC (1981)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 bg-purple-50/50 rounded-xl p-3 text-xs text-purple-950">
              <strong>劃時代特色：</strong>
              資訊運算大眾化！電腦從國防科研或大型企業的特權，轉變為人人書桌上的個人生產力中心。
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Microprocessor Scaling Explorer */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-indigo-400 font-semibold mb-1">
              INTERACTIVE DEMO
            </div>
            <h3 className="text-lg sm:text-xl font-bold">
              半導體微縮探索儀：晶片上容納的電晶體數量演進
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              滑動進度條，直觀感受從第三代積體電路到第四代超大型微處理器的指數級整合度躍進
            </p>
          </div>
          <div className="text-xs font-mono bg-slate-800 text-indigo-300 px-3 py-1.5 rounded-lg border border-slate-700 whitespace-nowrap">
            摩爾定律 (Moore's Law) 歷程
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>等級 1 (第三代 IC 萌芽)</span>
            <span>等級 3 (Intel 4004 首顆 CPU)</span>
            <span>等級 5 (現代微晶片)</span>
          </div>

          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={sliderScale}
            onChange={(e) => setSliderScale(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <div className="grid grid-cols-5 gap-1 text-[11px] text-center text-slate-400 font-mono">
            {scaleData.map((s) => (
              <button
                key={s.level}
                onClick={() => setSliderScale(s.level)}
                className={`py-1 rounded transition-colors ${
                  sliderScale === s.level
                    ? 'text-indigo-400 font-bold bg-slate-800'
                    : 'hover:text-slate-200'
                }`}
              >
                {s.level === 3 ? '★ 第四代' : `階段 ${s.level}`}
              </button>
            ))}
          </div>
        </div>

        {/* Active Stage Highlight Card */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="space-y-1">
            <span className="text-xs font-mono text-cyan-400 font-bold block">
              {currentScale.era}
            </span>
            <div className="text-2xl font-extrabold text-white">
              {currentScale.transistors}
            </div>
            <div className="text-xs text-slate-400">晶片整合電晶體數量</div>
          </div>

          <div className="md:col-span-2 space-y-2 border-t md:border-t-0 md:border-l border-slate-700 pt-3 md:pt-0 md:pl-5">
            <p className="text-sm text-slate-200 leading-relaxed">
              {currentScale.desc}
            </p>
            <div className="text-xs text-indigo-300 font-medium">
              代表機種 / 應用：{currentScale.machine}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Generation Comparison Cards */}
      <InteractiveGenCards initialGen="gen3" />

      {/* Checkpoint Quiz */}
      <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-6 sm:p-8">
        <div className="flex items-start gap-3.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono font-semibold text-indigo-700">
              階段 03 理解自我檢測
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              第四代電腦之所以能促成「個人電腦 (Personal Computer, PC)」普及，最重要的核心硬體革新是什麼？
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {[
            { id: 0, text: 'A. 重新引進了巴斯卡加法器的黃銅齒輪結構' },
            { id: 1, text: 'B. 改用水銀延遲線記憶體取代半導體晶片' },
            { id: 2, text: 'C. 微處理器 (CPU 晶片) 將整顆運算大腦封裝於單一矽晶片' },
            { id: 3, text: 'D. 全面廢除圖形介面與滑鼠，只允許手動拔插電纜' },
          ].map((opt) => {
            const isChosen = quizAnswer === opt.id;
            const isCorrect = opt.id === 2;

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
              quizAnswer === 2
                ? 'bg-emerald-100/70 border border-emerald-200 text-emerald-900'
                : 'bg-rose-100/70 border border-rose-200 text-rose-900'
            }`}
          >
            {quizAnswer === 2 ? (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>太棒了！答對了！</strong> 微處理器（如 Intel 4004、8086）將原本需整塊複雜主機板的算術邏輯與控制單元整合至單一微晶片，造價大幅壓低，才成就了人人桌上的個人電腦 PC。
                </span>
              </div>
            ) : (
              <div>
                <strong>請再思考一下：</strong> 正確答案是 <strong>C</strong>。微處理器 (CPU) 是第四代電腦的最關鍵心臟。
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-indigo-100/80">
          <div className="text-xs text-slate-500">
            {isCompleted ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                恭喜！第三階段學習已通過認證
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
            <span>前往第四階段：第五代與後續科技發展</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
