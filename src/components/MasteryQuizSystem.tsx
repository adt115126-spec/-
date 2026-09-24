import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Award,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  Check,
  MoveUp,
  MoveDown,
  Layers,
  Flame,
  ShieldCheck,
} from 'lucide-react';
import { MASTERY_QUESTIONS, MasteryQuestion } from '../data/masteryQuizData.ts';
import { StageId } from '../types.ts';

interface MasteryQuizSystemProps {
  onCompleteQuiz: (score: number) => void;
  onNavigateToStage: (stageId: StageId) => void;
  initialCompleted?: boolean;
}

export interface QuizAttemptResult {
  questionId: number;
  isCorrect: boolean;
  attemptsCount: number; // 1 = first attempt correct, 2 = second attempt correct, 3 = both wrong
  userFinalAnswer: any;
}

export const MasteryQuizSystem: React.FC<MasteryQuizSystemProps> = ({
  onCompleteQuiz,
  onNavigateToStage,
  initialCompleted = false,
}) => {
  // Current question index (0 ~ 4)
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Per-question tracking
  // attemptState: 'answering' | 'hint_first_error' | 'second_error_revealed' | 'correct_revealed'
  const [attemptState, setAttemptState] = useState<
    'answering' | 'hint_first_error' | 'second_error_revealed' | 'correct_revealed'
  >('answering');
  const [failCount, setFailCount] = useState<number>(0); // 0, 1, or 2

  // Current answering inputs
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // For Q3 (ordering)
  const [orderedItems, setOrderedItems] = useState<string[]>(['ARPANET', 'WWW', 'ENIAC']);

  // For Q4 (matching)
  const [currentMatching, setCurrentMatching] = useState<Record<string, string>>({});
  const [activeGenKey, setActiveGenKey] = useState<string | null>(null);

  // Overall results
  const [results, setResults] = useState<Record<number, QuizAttemptResult>>({});
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  const currentQ: MasteryQuestion = MASTERY_QUESTIONS[currentIndex];

  // Reset inputs when switching question
  const prepareQuestion = (idx: number) => {
    setCurrentIndex(idx);
    setAttemptState('answering');
    setFailCount(0);
    setSelectedOption(null);
    if (MASTERY_QUESTIONS[idx].type === 'ordering') {
      setOrderedItems(['ARPANET', 'WWW', 'ENIAC']);
    }
    if (MASTERY_QUESTIONS[idx].type === 'matching') {
      setCurrentMatching({});
      setActiveGenKey(null);
    }
  };

  // Helper to verify answers
  const checkIsCorrect = (): boolean => {
    if (currentQ.type === 'single_choice' || currentQ.type === 'true_false' || currentQ.type === 'scenario') {
      return selectedOption === currentQ.correctAnswer;
    }
    if (currentQ.type === 'ordering') {
      const target = currentQ.correctAnswer as string[];
      return (
        orderedItems.length === target.length &&
        orderedItems.every((val, i) => val === target[i])
      );
    }
    if (currentQ.type === 'matching') {
      const target = currentQ.correctAnswer as Record<string, string>;
      const keys = Object.keys(target);
      return (
        keys.every((k) => currentMatching[k] === target[k]) &&
        Object.keys(currentMatching).length === keys.length
      );
    }
    return false;
  };

  // Student Submits Answer (Stimulus -> Response -> Reinforcement loop)
  const handleSubmitAnswer = () => {
    const isCorrect = checkIsCorrect();

    if (isCorrect) {
      // Correct!
      setAttemptState('correct_revealed');
      const attemptsCount = failCount + 1; // 1 or 2
      setResults((prev) => ({
        ...prev,
        [currentQ.id]: {
          questionId: currentQ.id,
          isCorrect: true,
          attemptsCount,
          userFinalAnswer:
            currentQ.type === 'ordering'
              ? orderedItems
              : currentQ.type === 'matching'
              ? currentMatching
              : selectedOption,
        },
      }));
    } else {
      // Wrong!
      const nextFail = failCount + 1;
      setFailCount(nextFail);

      if (nextFail === 1) {
        // First error: Do NOT reveal answer. Show hint & allow retry.
        setAttemptState('hint_first_error');
      } else {
        // Second error: Reveal correct answer, explanation & review button
        setAttemptState('second_error_revealed');
        setResults((prev) => ({
          ...prev,
          [currentQ.id]: {
            questionId: currentQ.id,
            isCorrect: false,
            attemptsCount: 3,
            userFinalAnswer:
              currentQ.type === 'ordering'
                ? orderedItems
                : currentQ.type === 'matching'
                ? currentMatching
                : selectedOption,
          },
        }));
      }
    }
  };

  // Handle retry after first error
  const handleRetryAfterHint = () => {
    setAttemptState('answering');
  };

  // Move to next question or finish quiz
  const handleProceedNext = () => {
    if (currentIndex < MASTERY_QUESTIONS.length - 1) {
      prepareQuestion(currentIndex + 1);
    } else {
      // Quiz Finished! Ensure current question's result is accounted for
      const isCurrCorrect = attemptState === 'correct_revealed';
      const updatedResults = {
        ...results,
        [currentQ.id]: results[currentQ.id] || {
          questionId: currentQ.id,
          isCorrect: isCurrCorrect,
          attemptsCount: isCurrCorrect ? failCount + 1 : 3,
          userFinalAnswer:
            currentQ.type === 'ordering'
              ? orderedItems
              : currentQ.type === 'matching'
              ? currentMatching
              : selectedOption,
        },
      };

      setResults(updatedResults);
      setIsQuizFinished(true);

      const correctCount = Object.values(updatedResults).filter((r) => r.isCorrect).length;
      const score = Math.round((correctCount / MASTERY_QUESTIONS.length) * 100);
      if (score >= 80) {
        onCompleteQuiz(score);
      }
    }
  };

  // Restart Quiz
  const handleRestartQuiz = () => {
    setResults({});
    setIsQuizFinished(false);
    prepareQuestion(0);
  };

  // Reorder helper for Q3
  const moveOrderItem = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= orderedItems.length) return;
    const nextArr = [...orderedItems];
    const temp = nextArr[index];
    nextArr[index] = nextArr[targetIdx];
    nextArr[targetIdx] = temp;
    setOrderedItems(nextArr);
  };

  // Matching helper for Q4
  const matchingData = {
    gens: [
      { id: 'gen1', label: '第一代電腦' },
      { id: 'gen2', label: '第二代電腦' },
      { id: 'gen3', label: '第三代電腦' },
    ],
    techs: [
      { id: 'transistor', label: '電晶體' },
      { id: 'tube', label: '真空管' },
      { id: 'ic', label: '積體電路（IC）' },
    ],
  };

  const handleSelectMatchingGen = (genId: string) => {
    setActiveGenKey(genId);
  };

  const handleSelectMatchingTech = (techId: string) => {
    if (!activeGenKey) return;
    setCurrentMatching((prev) => ({
      ...prev,
      [activeGenKey]: techId,
    }));
    setActiveGenKey(null);
  };

  // Calculate Summary metrics
  const totalQuestions = MASTERY_QUESTIONS.length;
  const correctCount = Object.values(results).filter((r) => r.isCorrect).length;
  const wrongCount = totalQuestions - correctCount;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const isMastered = scorePercent >= 80;

  // List of failed questions for review list
  const wrongQuestions = MASTERY_QUESTIONS.filter(
    (q) => results[q.id] && !results[q.id].isCorrect
  );

  return (
    <div className="bg-white border-2 border-indigo-100 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>精熟學習與行為主義評量系統</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            電腦科技與世代演進：數位檢測與精熟驗證
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            採用「<strong>刺激 → 作答 → 即時回饋</strong>」行為主義設計。第一次答錯提供關鍵字鷹架提示；第二次答錯剖析對照並指引回教材複習。<strong>總分達 80% 即獲精熟成就徽章！</strong>
          </p>
        </div>

        {/* Status Badge */}
        {!isQuizFinished ? (
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="text-right">
              <span className="text-[11px] font-mono text-slate-400 block font-semibold">
                目前進度
              </span>
              <span className="text-sm font-bold text-indigo-700">
                第 {currentIndex + 1} / {totalQuestions} 題
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center text-sm font-mono shadow-xs">
              Q{currentIndex + 1}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleRestartQuiz}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重新進行測驗</span>
            </button>
          </div>
        )}
      </div>

      {/* Progress pill indicator */}
      {!isQuizFinished && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>測驗題型流程</span>
            <span>精熟合格門檻：80%（答對 4 題以上）</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {MASTERY_QUESTIONS.map((q, idx) => {
              const res = results[q.id];
              const isCurrent = idx === currentIndex;
              let bg = 'bg-slate-100 text-slate-500';
              if (res) {
                bg = res.isCorrect
                  ? 'bg-emerald-500 text-white font-bold'
                  : 'bg-rose-500 text-white font-bold';
              } else if (isCurrent) {
                bg = 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-200';
              }

              return (
                <div
                  key={q.id}
                  className={`h-2.5 rounded-full transition-all ${
                    res
                      ? res.isCorrect
                        ? 'bg-emerald-500'
                        : 'bg-rose-500'
                      : isCurrent
                      ? 'bg-indigo-600 ring-2 ring-indigo-300'
                      : 'bg-slate-200'
                  }`}
                  title={`第 ${idx + 1} 題：${q.typeBadge}`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ACTIVE QUESTION VIEW (WHEN NOT FINISHED)                        */}
      {/* ============================================================== */}
      {!isQuizFinished ? (
        <div className="space-y-6">
          {/* Question Stem Box */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-bold text-xs font-mono">
                {currentQ.typeBadge}
              </span>
              <span className="text-xs text-slate-500">
                知識點領域：<strong>{currentQ.topic}</strong>
              </span>
            </div>

            {currentQ.scenarioContext && (
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-xs sm:text-sm text-amber-950 font-medium">
                {currentQ.scenarioContext}
              </div>
            )}

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQ.id}. {currentQ.question}
            </h3>
          </div>

          {/* Interactive Question Input Area */}
          <div className="space-y-4">
            {/* TYPE 1, 2, 5: Single Choice, True/False, Scenario */}
            {(currentQ.type === 'single_choice' ||
              currentQ.type === 'true_false' ||
              currentQ.type === 'scenario') && (
              <div className="space-y-2.5">
                {currentQ.options?.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  const isAnsweringDisabled =
                    attemptState === 'correct_revealed' ||
                    attemptState === 'second_error_revealed';

                  return (
                    <button
                      key={opt.id}
                      disabled={isAnsweringDisabled}
                      onClick={() => setSelectedOption(opt.id)}
                      className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-200 font-semibold'
                          : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <span>{opt.text}</span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-3 ${
                          isSelected
                            ? 'border-white bg-white text-indigo-600'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* TYPE 3: Ordering (Q3: ENIAC -> ARPANET -> WWW) */}
            {currentQ.type === 'ordering' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-500 font-medium">
                  使用每張卡片右側按鈕調整事件上下順序，由最古老 (上方) 至最現代 (下方) 排列：
                </div>
                <div className="space-y-2">
                  {orderedItems.map((itemId, idx) => {
                    const optObj = currentQ.options?.find((o) => o.id === itemId);
                    const isAnsweringDisabled =
                      attemptState === 'correct_revealed' ||
                      attemptState === 'second_error_revealed';

                    return (
                      <div
                        key={itemId}
                        className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                            0{idx + 1}
                          </span>
                          <span className="text-sm font-bold text-slate-800">
                            {optObj?.text}
                          </span>
                        </div>

                        {!isAnsweringDisabled && (
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              disabled={idx === 0}
                              onClick={() => moveOrderItem(idx, 'up')}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 transition-colors"
                              title="上移（時間更早）"
                            >
                              <MoveUp className="w-4 h-4" />
                            </button>
                            <button
                              disabled={idx === orderedItems.length - 1}
                              onClick={() => moveOrderItem(idx, 'down')}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 transition-colors"
                              title="下移（時間更晚）"
                            >
                              <MoveDown className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TYPE 4: Matching (Q4: Gen1->Tube, Gen2->Transistor, Gen3->IC) */}
            {currentQ.type === 'matching' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-500 font-medium">
                  點選左側「電腦世代」，再點選右側符合之「代表性技術」進行配對：
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Left Column: Generations */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      步驟 1：選擇世代
                    </span>
                    {matchingData.gens.map((g) => {
                      const isSelected = activeGenKey === g.id;
                      const matchedTechId = currentMatching[g.id];
                      const matchedTechObj = matchingData.techs.find(
                        (t) => t.id === matchedTechId
                      );

                      return (
                        <button
                          key={g.id}
                          disabled={
                            attemptState === 'correct_revealed' ||
                            attemptState === 'second_error_revealed'
                          }
                          onClick={() => handleSelectMatchingGen(g.id)}
                          className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-200'
                              : matchedTechId
                              ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950 font-semibold'
                              : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-800'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-mono opacity-80 font-bold">
                              {g.id.toUpperCase()}
                            </div>
                            <div className="text-sm font-bold mt-0.5">{g.label}</div>
                            {matchedTechObj && (
                              <div className="text-xs text-indigo-600 font-medium mt-1">
                                配對為：{matchedTechObj.label}
                              </div>
                            )}
                          </div>
                          <span className="text-xs opacity-60">
                            {matchedTechId ? '✓ 已選' : isSelected ? '待選右側' : '點擊選取'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Column: Techs */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      步驟 2：點選配對技術
                    </span>
                    {matchingData.techs.map((t) => {
                      const isUsed = Object.values(currentMatching).includes(t.id);

                      return (
                        <button
                          key={t.id}
                          disabled={
                            attemptState === 'correct_revealed' ||
                            attemptState === 'second_error_revealed'
                          }
                          onClick={() => handleSelectMatchingTech(t.id)}
                          className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                            isUsed
                              ? 'bg-slate-100 border-slate-200 text-slate-600'
                              : 'bg-white border-slate-200 hover:border-indigo-400 text-slate-800 shadow-2xs'
                          }`}
                        >
                          <div className="text-sm font-bold">{t.label}</div>
                          <span className="text-xs text-indigo-600 font-semibold">
                            {activeGenKey ? '連結配對' : '請先選左側'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================== */}
          {/* FEEDBACK & REINFORCEMENT STATES (BEHAVIORIST LOOP)         */}
          {/* ========================================================== */}

          {/* 1. FIRST ERROR: HINT ONLY (NO REVEAL, ALLOW RETRY) */}
          {attemptState === 'hint_first_error' && (
            <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-950 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>再想想看！請注意題目中的關鍵字。</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/70 p-3.5 rounded-xl border border-amber-200/80">
                {currentQ.hint}
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-amber-800">
                  還有一次答題機會，請仔細思考後重新作答！
                </span>
                <button
                  onClick={handleRetryAfterHint}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  重新調整並再次嘗試
                </button>
              </div>
            </div>
          )}

          {/* 2. SECOND ERROR: REVEAL CORRECT ANSWER + EXPLANATION + BACK TO STUDY BUTTON */}
          {attemptState === 'second_error_revealed' && (
            <div className="p-6 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-950 space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-rose-900 text-base">
                <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                <span>連續答錯兩次，已為您揭示完整解析與重點對照</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-rose-200/80 space-y-2 text-xs sm:text-sm">
                <div className="text-rose-900 font-bold flex items-center gap-1.5">
                  <span>正確解答：</span>
                  <span className="text-indigo-700 font-extrabold text-sm">
                    {currentQ.type === 'single_choice' ||
                    currentQ.type === 'true_false' ||
                    currentQ.type === 'scenario'
                      ? currentQ.options?.find((o) => o.id === currentQ.correctAnswer)?.text ||
                        String(currentQ.correctAnswer)
                      : currentQ.type === 'ordering'
                      ? 'ENIAC (1946) → ARPANET (1969) → WWW (1989)'
                      : '第一代 → 真空管、第二代 → 電晶體、第三代 → 積體電路（IC）'}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  <strong>簡短解析：</strong> {currentQ.explanation}
                </p>
                <div className="p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-xs">
                  <strong>重點對照：</strong> {currentQ.keyContrast}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => onNavigateToStage(currentQ.targetStage)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-rose-300 text-rose-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-rose-600" />
                  <span>回到教材階段 0{currentQ.targetStage} 複習</span>
                </button>

                <button
                  onClick={handleProceedNext}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>
                    {currentIndex < totalQuestions - 1 ? '進入下一題' : '查看測驗結算報告'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 3. CORRECT REVEALED: POSITIVE REINFORCEMENT + AUTO PROCEED OR NEXT BUTTON */}
          {attemptState === 'correct_revealed' && (
            <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-base">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>答對了！恭喜精確掌握核心關鍵！</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-emerald-200/80 space-y-2 text-xs sm:text-sm">
                <p className="text-emerald-900 font-bold">
                  {currentQ.successFeedback}
                </p>
                <p className="text-slate-700 leading-relaxed">
                  <strong>解析說明：</strong> {currentQ.explanation}
                </p>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleProceedNext}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>
                    {currentIndex < totalQuestions - 1 ? '太棒了！進入下一題' : '完成測驗！結算成果'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* INITIAL SUBMIT BUTTON (WHEN IN ANSWERING STATE) */}
          {attemptState === 'answering' && (
            <div className="flex items-center justify-between pt-3">
              <span className="text-xs text-slate-500">
                作答後立即獲得回饋與增強評析
              </span>
              <button
                onClick={handleSubmitAnswer}
                disabled={
                  ((currentQ.type === 'single_choice' ||
                    currentQ.type === 'true_false' ||
                    currentQ.type === 'scenario') &&
                    !selectedOption) ||
                  (currentQ.type === 'matching' &&
                    Object.keys(currentMatching).length < 3)
                }
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-2"
              >
                <span>送出答案</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ============================================================== */
        /* QUIZ SUMMARY & MASTERY REPORT (AFTER FINISHING)               */
        /* ============================================================== */
        <div className="space-y-8 animate-fadeIn">
          {/* Top Banner (Score & Status) */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border-2 flex flex-col md:flex-row items-center justify-between gap-6 ${
              isMastered
                ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100/60 border-emerald-300'
                : 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100/60 border-amber-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                  isMastered
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-600 text-white'
                }`}
              >
                {isMastered ? (
                  <Award className="w-9 h-9" />
                ) : (
                  <AlertTriangle className="w-9 h-9" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                      isMastered
                        ? 'bg-emerald-200/80 text-emerald-900'
                        : 'bg-amber-200/80 text-amber-900'
                    }`}
                  >
                    {isMastered ? '達到 80% 精熟標準' : '未達 80% 精熟標準'}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    精熟門檻：80%
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {isMastered ? '恭喜完成本單元！' : '再挑戰一次！'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-1">
                  {isMastered
                    ? '太優秀了！你已全面掌握電腦科技發展五大世代主要特色、重大里程碑與技術演進！'
                    : '請先透過下方的「我的複習清單」回教材加強弱點知識點，完成複習後再次進行精熟挑戰。'}
                </p>
              </div>
            </div>

            {/* Score Stats Ring / Pill */}
            <div className="flex flex-wrap items-center gap-4 bg-white/90 p-4 rounded-2xl border border-slate-200/80 shadow-xs shrink-0 text-center">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  測驗總分
                </span>
                <span
                  className={`text-3xl font-black font-mono ${
                    isMastered ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {scorePercent}分
                </span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block" />
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  正確率
                </span>
                <span className="text-xl font-black font-mono text-indigo-700">
                  {scorePercent}%
                </span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block" />
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  答對 / 答錯題數
                </span>
                <span className="text-sm font-bold font-mono text-slate-800">
                  <span className="text-emerald-600 font-extrabold">{correctCount}</span> 題答對 /{' '}
                  <span className="text-rose-600 font-extrabold">{wrongCount}</span> 題答錯
                  <span className="text-slate-400 text-xs ml-1">(共 {totalQuestions} 題)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Mastery Badge Display if Passed */}
          {isMastered && (
            <div className="p-6 rounded-2xl bg-indigo-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    單元精熟認證徽章：電腦科技發展大師 (Mastery Certified)
                  </h4>
                  <p className="text-xs text-indigo-200 mt-0.5">
                    已達標 80% 精熟水準，系統已為您在學習紀錄中點亮最終完賽勳章。
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigateToStage(5)}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold shadow-xs transition-colors whitespace-nowrap"
              >
                前往取得結業成就證書
              </button>
            </div>
          )}

          {/* REVIEW LIST (我的複習清單 & 錯題補強) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <span>我的複習清單（錯題與弱點補強）</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  系統自動記錄答錯之題目與知識點，點擊可直接跳轉至對應教材章節重新學習
                </p>
              </div>

              <div className="text-xs font-mono font-bold text-slate-400">
                {wrongQuestions.length === 0 ? '無答錯題目' : `${wrongQuestions.length} 項需補強`}
              </div>
            </div>

            {wrongQuestions.length === 0 ? (
              <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div className="text-xs sm:text-sm">
                  <strong>太厲害了！全數 5 題皆順利過關！</strong>
                  <p className="text-slate-600 mt-0.5">
                    清單中沒有任何錯題，代表你對五大世代特徵、時序與元件配對已有完整深刻的掌握。
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {wrongQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl border-2 border-rose-100 bg-rose-50/40 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-rose-200 text-rose-900 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                          Q{q.id}
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          {q.question}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-xs font-semibold shrink-0 self-start sm:self-auto">
                        知識點：{q.knowledgePoint}
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-rose-200/60 text-xs space-y-1.5">
                      <div className="text-rose-950 font-bold">
                        正確答案：
                        <span className="text-emerald-700 ml-1">
                          {q.type === 'single_choice' ||
                          q.type === 'true_false' ||
                          q.type === 'scenario'
                            ? q.options?.find((o) => o.id === q.correctAnswer)?.text
                            : q.type === 'ordering'
                            ? 'ENIAC (1946) → ARPANET (1969) → WWW (1989)'
                            : '第一代 → 真空管、第二代 → 電晶體、第三代 → 積體電路（IC）'}
                        </span>
                      </div>
                      <p className="text-slate-600">
                        <strong>核心解析：</strong> {q.explanation}
                      </p>
                      <p className="text-indigo-900">
                        <strong>重點對照：</strong> {q.keyContrast}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-rose-800">
                        需補強教材：階段 0{q.targetStage}
                      </span>
                      <button
                        onClick={() => onNavigateToStage(q.targetStage)}
                        className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-rose-300 text-rose-800 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-rose-600" />
                        <span>回到階段 0{q.targetStage} 複習此知識點</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-500">
              {isMastered
                ? '已達成精熟目標，可以隨時重新測驗挑戰滿分或前往證書頁面。'
                : '先閱讀教材並完成相關互動，再進行第二次測驗。'}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleRestartQuiz}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4 text-slate-600" />
                <span>{isMastered ? '再次測驗挑戰滿分' : '再挑戰一次'}</span>
              </button>

              {isMastered && (
                <button
                  onClick={() => onNavigateToStage(5)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
                >
                  領取成就證書
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
