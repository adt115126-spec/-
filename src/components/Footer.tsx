import React from 'react';
import { StageId } from '../types.ts';
import { BookOpen, Sparkles } from 'lucide-react';

interface FooterProps {
  onSelectStage: (stage: StageId | 'overview') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectStage }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-800 text-sm">
              電腦科技發展與世代演進 · 數位學習教材
            </div>
            <div className="text-slate-400 mt-0.5">
              依據十二年國民基本教育科技領域核心素養指標設計
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600 font-medium">
          <button
            onClick={() => onSelectStage('overview')}
            className="hover:text-indigo-600 transition-colors"
          >
            首頁概覽
          </button>
          <span>·</span>
          <button
            onClick={() => onSelectStage(1)}
            className="hover:text-indigo-600 transition-colors"
          >
            一：科技先驅
          </button>
          <span>·</span>
          <button
            onClick={() => onSelectStage(2)}
            className="hover:text-indigo-600 transition-colors"
          >
            二：一二代電腦
          </button>
          <span>·</span>
          <button
            onClick={() => onSelectStage(3)}
            className="hover:text-indigo-600 transition-colors"
          >
            三：三四代電腦
          </button>
          <span>·</span>
          <button
            onClick={() => onSelectStage(4)}
            className="hover:text-indigo-600 transition-colors"
          >
            四：五代與未來
          </button>
          <span>·</span>
          <button
            onClick={() => onSelectStage(5)}
            className="hover:text-indigo-600 transition-colors"
          >
            五：統整與複習
          </button>
        </div>

        <div className="text-slate-400 text-center md:text-right">
          純前端瀏覽器可直接執行 · 支援桌機與行動裝置
        </div>
      </div>
    </footer>
  );
};
