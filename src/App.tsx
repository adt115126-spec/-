/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StageId } from './types.ts';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { StageOverview } from './components/StageOverview.tsx';
import { Stage1Mechanical } from './components/Stage1Mechanical.tsx';
import { Stage2FirstSecondGen } from './components/Stage2FirstSecondGen.tsx';
import { Stage3ThirdFourthGen } from './components/Stage3ThirdFourthGen.tsx';
import { Stage4FifthModernGen } from './components/Stage4FifthModernGen.tsx';
import { Stage5ReviewAssessment } from './components/Stage5ReviewAssessment.tsx';
import { ArrowLeft, ChevronRight, BookOpen } from 'lucide-react';

export default function App() {
  const [currentStage, setCurrentStage] = useState<StageId | 'overview'>('overview');

  const [completedStages, setCompletedStages] = useState<StageId[]>(() => {
    try {
      const saved = localStorage.getItem('computer_history_completed_stages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [freeMode, setFreeMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('computer_history_free_mode') === 'true';
    } catch {
      return false;
    }
  });

  const [studentName, setStudentName] = useState<string>(() => {
    try {
      return localStorage.getItem('computer_history_student_name') || '自主學習探索者';
    } catch {
      return '自主學習探索者';
    }
  });

  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('computer_history_completed_stages', JSON.stringify(completedStages));
    } catch (e) {
      console.error(e);
    }
  }, [completedStages]);

  useEffect(() => {
    try {
      localStorage.setItem('computer_history_free_mode', String(freeMode));
    } catch (e) {
      console.error(e);
    }
  }, [freeMode]);

  useEffect(() => {
    try {
      localStorage.setItem('computer_history_student_name', studentName);
    } catch (e) {
      console.error(e);
    }
  }, [studentName]);

  const handleSelectStage = (stage: StageId | 'overview') => {
    setCurrentStage(stage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteStage = (stageId: StageId) => {
    if (!completedStages.includes(stageId)) {
      setCompletedStages((prev) => [...prev, stageId]);
    }
  };

  const handleResetProgress = () => {
    setCompletedStages([]);
    setShowResetConfirm(false);
  };

  const stageTitles: Record<StageId, string> = {
    1: '第一階段：認識電腦科技發展（早期機械至電子時代）',
    2: '第二階段：第一代與第二代電腦（真空管 vs. 電晶體）',
    3: '第三階段：第三代與第四代電腦（積體電路 vs. 微處理器）',
    4: '第四階段：第五代與後續科技發展（AI、行動與雲端運算）',
    5: '第五階段：統整與複習（五代總表、配對挑戰與評量）',
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Bar Header */}
      <Header
        currentStage={currentStage}
        onSelectStage={handleSelectStage}
        completedStages={completedStages}
        freeMode={freeMode}
        onToggleFreeMode={() => setFreeMode((prev) => !prev)}
        onResetProgress={() => setShowResetConfirm(true)}
      />

      {/* Main Learning Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6">
        {/* Stage Sub-Navigation Breadcrumb (when inside a stage) */}
        {currentStage !== 'overview' && (
          <div className="pt-6 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-500">
              <button
                onClick={() => handleSelectStage('overview')}
                className="hover:text-indigo-600 transition-colors flex items-center gap-1 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>返回首頁概覽</span>
              </button>
              <span>/</span>
              <span className="font-semibold text-slate-800">
                {stageTitles[currentStage]}
              </span>
            </div>

            {/* Quick Next/Prev Buttons */}
            <div className="flex items-center gap-2">
              {currentStage > 1 && (
                <button
                  onClick={() => handleSelectStage((currentStage - 1) as StageId)}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  上一階段
                </button>
              )}
              {currentStage < 5 && (
                <button
                  disabled={!freeMode && !completedStages.includes(currentStage)}
                  onClick={() => handleSelectStage((currentStage + 1) as StageId)}
                  className={`px-2.5 py-1 rounded-md border transition-colors flex items-center gap-1 ${
                    freeMode || completedStages.includes(currentStage)
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                  }`}
                  title={
                    !freeMode && !completedStages.includes(currentStage)
                      ? '完成目前階段後才能進入下一階段'
                      : '進入下一階段'
                  }
                >
                  <span>下一階段</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* View Router */}
        {currentStage === 'overview' && (
          <StageOverview
            onSelectStage={handleSelectStage}
            completedStages={completedStages}
            freeMode={freeMode}
          />
        )}

        {currentStage === 1 && (
          <Stage1Mechanical
            onCompleteStage={() => handleCompleteStage(1)}
            isCompleted={completedStages.includes(1)}
            onGoNextStage={() => handleSelectStage(2)}
          />
        )}

        {currentStage === 2 && (
          <Stage2FirstSecondGen
            onCompleteStage={() => handleCompleteStage(2)}
            isCompleted={completedStages.includes(2)}
            onGoNextStage={() => handleSelectStage(3)}
          />
        )}

        {currentStage === 3 && (
          <Stage3ThirdFourthGen
            onCompleteStage={() => handleCompleteStage(3)}
            isCompleted={completedStages.includes(3)}
            onGoNextStage={() => handleSelectStage(4)}
          />
        )}

        {currentStage === 4 && (
          <Stage4FifthModernGen
            onCompleteStage={() => handleCompleteStage(4)}
            isCompleted={completedStages.includes(4)}
            onGoNextStage={() => handleSelectStage(5)}
          />
        )}

        {currentStage === 5 && (
          <Stage5ReviewAssessment
            onCompleteStage={() => handleCompleteStage(5)}
            isCompleted={completedStages.includes(5)}
            studentName={studentName}
            onUpdateStudentName={setStudentName}
            onNavigateToStage={(stageId) => handleSelectStage(stageId)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectStage={handleSelectStage} />

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              確認重設學習進度？
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              重設後所有單元完成標記、配對挑戰與評量紀錄將清空，您可以重新體驗整個數位學習流程。
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleResetProgress}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-colors"
              >
                確認重設
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
