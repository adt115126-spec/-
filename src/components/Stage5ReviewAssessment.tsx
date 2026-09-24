import React, { useState } from 'react';
import {
  GENERATION_SUMMARY_TABLE,
  MATCHING_PAIRS,
  CHRONO_ITEMS,
  QUIZ_QUESTIONS,
} from '../data/learningContent.ts';
import { MatchPair, ChronoItem, QuizQuestion } from '../types.ts';
import {
  Award,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowUpDown,
  Check,
  X,
  Printer,
  ChevronDown,
  Layers,
  Clock,
  Shuffle,
  ThumbsUp,
} from 'lucide-react';
import { TimelineOrderingActivity } from './TimelineOrderingActivity.tsx';
import { GenMatchingActivity } from './GenMatchingActivity.tsx';
import { InteractiveGenCards } from './InteractiveGenCards.tsx';
import { MasteryQuizSystem } from './MasteryQuizSystem.tsx';
import { StageId } from '../types.ts';

interface Stage5Props {
  onCompleteStage: () => void;
  isCompleted: boolean;
  studentName: string;
  onUpdateStudentName: (name: string) => void;
  onNavigateToStage?: (stageId: StageId) => void;
}

export const Stage5ReviewAssessment: React.FC<Stage5Props> = ({
  onCompleteStage,
  isCompleted,
  studentName,
  onUpdateStudentName,
  onNavigateToStage,
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'matching' | 'chrono' | 'cards' | 'quiz' | 'certificate'>(
    'matrix'
  );

  // 1. Matching Game State
  const [selectedGenId, setSelectedGenId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({}); // genId -> pairId
  const [matchingFeedback, setMatchingFeedback] = useState<string | null>(null);

  // 2. Chronological Order State
  // Shuffle initially
  const [chronoList, setChronoList] = useState<ChronoItem[]>(() => {
    return [...CHRONO_ITEMS].sort(() => Math.random() - 0.5);
  });
  const [chronoChecked, setChronoChecked] = useState<boolean>(false);
  const [chronoIsCorrect, setChronoIsCorrect] = useState<boolean>(false);

  // 3. Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Handlers for Matching
  const handleSelectGeneration = (genId: string) => {
    setSelectedGenId(genId);
    setMatchingFeedback(null);
  };

  const handleSelectTech = (pair: MatchPair) => {
    if (!selectedGenId) {
      setMatchingFeedback('請先點選左側的一個「電腦世代」，再點選要配對的技術！');
      return;
    }

    if (selectedGenId === pair.id) {
      // Correct match
      const updated = { ...matchedPairs, [selectedGenId]: pair.id };
      setMatchedPairs(updated);
      setSelectedGenId(null);
      setMatchingFeedback(`配對正確！${pair.generation} 的關鍵核心為【${pair.componentName}】。`);

      if (Object.keys(updated).length === MATCHING_PAIRS.length && !isCompleted) {
        onCompleteStage();
      }
    } else {
      setMatchingFeedback('配對錯誤，請再仔細思考該世代代表性硬體元件喔！');
    }
  };

  const resetMatching = () => {
    setMatchedPairs({});
    setSelectedGenId(null);
    setMatchingFeedback(null);
  };

  // Handlers for Chronological
  const moveChronoItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= chronoList.length) return;

    const updated = [...chronoList];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setChronoList(updated);
    setChronoChecked(false);
  };

  const checkChronoOrder = () => {
    let correct = true;
    for (let i = 0; i < chronoList.length - 1; i++) {
      if (chronoList[i].year > chronoList[i + 1].year) {
        correct = false;
        break;
      }
    }
    setChronoIsCorrect(correct);
    setChronoChecked(true);

    if (correct && !isCompleted) {
      onCompleteStage();
    }
  };

  const resetChronoOrder = () => {
    setChronoList([...CHRONO_ITEMS].sort(() => Math.random() - 0.5));
    setChronoChecked(false);
    setChronoIsCorrect(false);
  };

  // Handlers for Quiz
  const handleSelectQuizOption = (questionId: number, optionIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) correctCount++;
    });

    if (correctCount >= 4 && !isCompleted) {
      onCompleteStage();
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) correct++;
    });
    return Math.round((correct / QUIZ_QUESTIONS.length) * 100);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-6 sm:py-10 space-y-10">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-semibold">
              <span>STAGE 05</span>
              <span>·</span>
              <span>統整與複習</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              電腦五大世代總結、年代排序與配對挑戰
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              整合全教材五個世代的主要元件、發展特色與關鍵里程碑。本單元包含「年代排序拖曳活動」、「世代圖文配對」與「世代比較卡片」，遵循行為主義設計（刺激→作答→即時增強回饋），全面鞏固核心知識。
            </p>
          </div>

          <div className="shrink-0">
            {isCompleted ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>階段 5 已通過認證</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>完成互動挑戰即可結業</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Section Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'matrix'
              ? 'bg-white text-slate-900 shadow-2xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>五代世代統整矩陣表</span>
        </button>

        <button
          onClick={() => setActiveTab('chrono')}
          className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'chrono'
              ? 'bg-white text-slate-900 shadow-2xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4 text-indigo-600" />
          <span>互動一：年代排序時間軸</span>
        </button>

        <button
          onClick={() => setActiveTab('matching')}
          className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'matching'
              ? 'bg-white text-slate-900 shadow-2xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>互動二：世代圖文配對</span>
        </button>

        <button
          onClick={() => setActiveTab('cards')}
          className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'cards'
              ? 'bg-white text-slate-900 shadow-2xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowUpDown className="w-4 h-4 text-indigo-600" />
          <span>互動三：世代比較卡片</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'quiz'
              ? 'bg-white text-slate-900 shadow-2xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>數位測驗與精熟學習</span>
        </button>

        <button
          onClick={() => setActiveTab('certificate')}
          className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'certificate'
              ? 'bg-white text-slate-900 shadow-2xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4 text-amber-600" />
          <span>結業成就證書</span>
        </button>
      </div>

      {/* TAB 1: Five Generations Summary Matrix Table */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                電腦五大世代核心特徵完整統整總表
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                學習目標 1 達成：清晰對照五個世代的主要元件、速度量級、記憶體與里程碑
              </p>
            </div>
          </div>

          <div className="overflow-x-auto bg-white border border-slate-200/90 rounded-2xl shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="py-3.5 px-4 whitespace-nowrap">世代與年代</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">主要電子元件</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">運算速度級別</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">主要記憶體介質</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">軟體語言發展</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">電腦型態規模</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">代表機種與里程碑</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {GENERATION_SUMMARY_TABLE.map((row, idx) => (
                  <tr
                    key={row.gen}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {row.gen}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-indigo-700">
                      {row.component}
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-slate-600 whitespace-nowrap">
                      {row.speed}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {row.memory}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {row.language}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {row.pcOrMainframe}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {row.milestone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick takeaway summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950 space-y-1.5">
              <span className="font-bold block text-indigo-900">體積與能耗趨勢：</span>
              <p className="text-slate-700 leading-relaxed">
                由早期 30 噸佔滿整間房的真空管巨獸，一路微縮至桌面 PC、口袋智慧型手機到毫米級穿戴晶片，耗電量與發熱量暴跌數萬倍。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-purple-950 space-y-1.5">
              <span className="font-bold block text-purple-900">運算速度飛躍：</span>
              <p className="text-slate-700 leading-relaxed">
                速度從每秒數千次 (毫秒 ms) 演進至每秒數億次 (GHz / 奈秒 ns)，今日超級電腦與 AI 晶片更已邁入每秒百億億次 (ExaFLOPS) 領域。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-950 space-y-1.5">
              <span className="font-bold block text-emerald-900">人機互動革命：</span>
              <p className="text-slate-700 leading-relaxed">
                從手動接線與 0/1 機器代碼，到高階語言、圖形視窗滑鼠，再到今日自然語音、觸控手勢與大型語言模型自然對話。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Interactive Chronological Ordering (排排看：電腦科技發展時間軸) */}
      {activeTab === 'chrono' && (
        <TimelineOrderingActivity
          onComplete={onCompleteStage}
          isCompleted={isCompleted}
        />
      )}

      {/* TAB 3: Interactive Generation Matching (電腦世代配對) */}
      {activeTab === 'matching' && (
        <GenMatchingActivity
          onComplete={onCompleteStage}
          isCompleted={isCompleted}
        />
      )}

      {/* TAB 4: Interactive Generation Comparison Cards (世代比較卡片) */}
      {activeTab === 'cards' && (
        <InteractiveGenCards initialGen="gen1" />
      )}

      {/* TAB 5: Comprehensive Mastery Quiz System (數位測驗與精熟學習系統) */}
      {activeTab === 'quiz' && (
        <MasteryQuizSystem
          onCompleteQuiz={(score) => {
            if (score >= 80 && !isCompleted) {
              onCompleteStage();
            }
          }}
          onNavigateToStage={(stageId) => {
            if (stageId === 5) {
              setActiveTab('certificate');
            } else if (onNavigateToStage) {
              onNavigateToStage(stageId);
            }
          }}
          initialCompleted={isCompleted}
        />
      )}

      {/* TAB 5: Certificate & Achievement Card */}
      {activeTab === 'certificate' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                數位學習結業證明卡
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                輸入你的姓名，生成專屬的電腦科技發展與世代演進學習成果認證卡
              </p>
            </div>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs flex items-center gap-2 transition-colors self-start"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>列印 / 存為 PDF 證書</span>
            </button>
          </div>

          {/* Name input */}
          <div className="max-w-md bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
              學習者姓名：
            </span>
            <input
              type="text"
              value={studentName}
              onChange={(e) => onUpdateStudentName(e.target.value)}
              placeholder="請輸入姓名（例如：自主學習者）"
              className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Certificate Card Printable Container */}
          <div
            id="certificate-print-area"
            className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border-4 border-indigo-400/30 shadow-xl overflow-hidden max-w-3xl mx-auto"
          >
            {/* Background watermarks & pattern */}
            <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center space-y-6">
              {/* Badge Icon */}
              <div className="inline-flex w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 items-center justify-center shadow-lg shadow-amber-400/20 mb-2">
                <Award className="w-9 h-9 stroke-[2.2]" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-semibold block">
                  CERTIFICATE OF COMPLETION
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  電腦科技發展與世代演進 · 自主學習結業證書
                </h3>
              </div>

              <div className="py-2">
                <div className="text-xs text-slate-400">茲證明學習者</div>
                <div className="text-2xl sm:text-3xl font-bold text-amber-300 mt-1 border-b border-white/20 pb-2 inline-block px-8">
                  {studentName || '自主學習探索者'}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                已完整修習本數位學習教材，精通早期機械計算到電子電腦演進史，深入辨析真空管、電晶體、積體電路、微處理器晶片到人工智慧五大世代之核心技術突破與歷史里程碑，具備扎實資訊科技基礎素養。
              </p>

              {/* Three Objectives Achieved Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 max-w-lg mx-auto text-left">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <div className="text-emerald-400 font-bold flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>目標 1 達成</span>
                  </div>
                  <span className="text-slate-300 text-[11px]">說出五個世代主要發展特色</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <div className="text-emerald-400 font-bold flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>目標 2 達成</span>
                  </div>
                  <span className="text-slate-300 text-[11px]">依時序辨識重大科技里程碑</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <div className="text-emerald-400 font-bold flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>目標 3 達成</span>
                  </div>
                  <span className="text-slate-300 text-[11px]">世代與代表性技術準確配對</span>
                </div>
              </div>

              {/* Footer Stamp */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
                <div className="font-mono">
                  認證序號: CS-GEN-{Math.abs(studentName.length * 1337 + 8899).toString(16).toUpperCase()}
                </div>
                <div>數位教材學習驗證通過 · 永久有效</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
