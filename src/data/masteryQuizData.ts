import { StageId } from './types.ts';

export type QuestionType = 'single_choice' | 'true_false' | 'ordering' | 'matching' | 'scenario';

export interface MasteryQuestion {
  id: number;
  type: QuestionType;
  typeBadge: string;
  topic: string;
  knowledgePoint: string;
  targetStage: StageId;
  question: string;
  scenarioContext?: string;
  options?: { id: string; text: string }[];
  correctAnswer: any; // string, boolean, string[] for ordering, Record<string, string> for matching
  hint: string;
  explanation: string;
  keyContrast: string; // 重點對照
  successFeedback: string; // 答對正向鼓勵
}

export const MASTERY_QUESTIONS: MasteryQuestion[] = [
  {
    id: 1,
    type: 'single_choice',
    typeBadge: '單選題',
    topic: '第五代電腦核心技術',
    knowledgePoint: '第五代電腦與人工智慧（AI）',
    targetStage: 4,
    question:
      '第五代電腦最大的特色是結合了什麼技術，讓電腦開始具備像人類一樣學習、思考與語音辨識的能力？',
    options: [
      { id: 'A', text: 'A. 真空管技術' },
      { id: 'B', text: 'B. 人工智慧（AI）與超大型積體電路' },
      { id: 'C', text: 'C. 手動開關控制' },
    ],
    correctAnswer: 'B',
    hint: '提示：想想看，真空管是第一代電腦的古老元件；讓電腦能「學習與思考」的關鍵技術是現代的什麼技術？',
    explanation:
      '第五代電腦以超大型積體電路（ULSI）與「人工智慧（AI）」為標竿，導入平行處理與類神經網路，讓電腦具備邏輯推論、學習分析與語音辨識等接近人類的能力。',
    keyContrast: '真空管（第一代） vs. 人工智慧/ULSI（第五代智慧運算）。',
    successFeedback:
      '答對了！太出色了！第五代電腦正是結合了人工智慧（AI）與超大型積體電路，讓電腦跨入能學習、思考與自然互動的新世代！',
  },
  {
    id: 2,
    type: 'true_false',
    typeBadge: '是非題',
    topic: '第五代電腦概念判斷',
    knowledgePoint: '第五代電腦的發展定義與核心目標',
    targetStage: 4,
    question:
      '「第五代電腦最大的特色是結合人工智慧（AI），讓電腦開始具備像人類一樣學習、思考與語音辨識的能力。」',
    options: [
      { id: 'A', text: 'A. 正確' },
      { id: 'B', text: 'B. 錯誤' },
    ],
    correctAnswer: 'A',
    hint: '提示：請回想第四階段教材，第五代電腦打破傳統單純數值運算，專注於智慧推論與語音理解。這句話是否完全吻合？',
    explanation:
      '敘述完全正確！第五代電腦的目標正是融合 AI 演算法、多處理器平行運算與巨量資料處理，實現智慧語音、圖像理解與自主學習。',
    keyContrast: '前四代電腦專注於硬體微縮與運算速度，第五代則全面深化到「人工智慧思考模式」。',
    successFeedback:
      '答對了！你的觀念非常清晰！第五代電腦確實以結合人工智慧（AI）與模擬人類智慧為最大特色！',
  },
  {
    id: 3,
    type: 'ordering',
    typeBadge: '排序題',
    topic: '電腦科技發展時間順序',
    knowledgePoint: '重大歷史里程碑時間序列',
    targetStage: 1,
    question: '請將以下事件依照時間先後順序排列（由早到晚）：',
    // initial list
    options: [
      { id: 'ARPANET', text: '網際網路的前身 ARPANET 出現 (1969)' },
      { id: 'WWW', text: '提姆・柏內茲－李發明全球資訊網 WWW (1989)' },
      { id: 'ENIAC', text: '世界上第一台通用電子電腦 ENIAC 問世 (1946)' },
    ],
    correctAnswer: ['ENIAC', 'ARPANET', 'WWW'],
    hint: '提示：想想看，是先有第一台通用電子電腦 ENIAC，還是先有網路連線？最後在現代廣泛使用的 WWW 全球資訊網是在什麼時候出現的？',
    explanation:
      '正確順序為：ENIAC (1946年第一代電子電腦) → ARPANET (1969年美國國防部冷戰網路) → WWW 全球資訊網 (1989年提姆・柏內茲－李於 CERN 發明)。',
    keyContrast: '1946 ENIAC（單機運算） → 1969 ARPANET（電腦互聯） → 1989 WWW（全球資訊超連結）。',
    successFeedback:
      '答對了！時序掌握極度精準！依序為 ENIAC (1946) → ARPANET (1969) → WWW (1989)，成功掌握通訊科技躍進歷程！',
  },
  {
    id: 4,
    type: 'matching',
    typeBadge: '配對題',
    topic: '電腦世代與代表性技術配對',
    knowledgePoint: '電腦世代與代表性主要元件對應',
    targetStage: 2,
    question: '請將「電腦世代」與其對應的「代表性主要元件技術」進行配對：',
    correctAnswer: {
      gen1: 'tube',
      gen2: 'transistor',
      gen3: 'ic',
    },
    hint: '提示：注意關鍵元件的體積演進，真空管像大玻璃燈泡（第一代），電晶體微小如黃豆（第二代），將很多電路縮在矽片上則是積體電路 IC（第三代）。',
    explanation:
      '正確配對為：第一代電腦 → 真空管；第二代電腦 → 電晶體；第三代電腦 → 積體電路（IC）。第四代則為微處理器。',
    keyContrast: '第一代（真空管） → 第二代（電晶體） → 第三代（積體電路 IC） → 第四代（微處理器）。',
    successFeedback:
      '答對了！完美的世代配對！第一代是真空管，第二代是電晶體，第三代是積體電路（IC），硬體元件世代核心已徹底精熟！',
  },
  {
    id: 5,
    type: 'scenario',
    typeBadge: '情境題',
    topic: '個人電腦（PC）歷史情境辨識',
    knowledgePoint: '第四代電腦（微處理器與個人電腦普及）',
    targetStage: 3,
    question:
      'JJ 在看一部歷史電影，主角在 1980 年代買了一台放在家裡書桌上使用的「個人電腦（PC）」。請問這台電腦最可能屬於第幾代？',
    scenarioContext: '【電影情境觀察】：1980 年代家庭書桌、個人電腦 PC、Apple II 與 IBM PC 熱銷時代。',
    options: [
      { id: 'A', text: 'A. 第一代電腦' },
      { id: 'B', text: 'B. 第四代電腦' },
      { id: 'C', text: 'C. 第二代電腦' },
    ],
    correctAnswer: 'B',
    hint: '提示：1980 年代的個人電腦已經不是使用佔滿整間房的真空管或大型電晶體機櫃，而是使用微處理器晶片，體積縮小到能放在書桌上。',
    explanation:
      '第四代電腦以微處理器／CPU 晶片（如 Intel 4004、8088）為革命核心，促成了 1970~1980 年代 Apple II 與 IBM PC 等「個人電腦（Personal Computer）」快速走入家庭與辦公室。',
    keyContrast: '第一/二代電腦為軍事及大型機構專用巨型設備，第四代（微處理器）才真正誕生放在書桌上的「個人電腦 PC」。',
    successFeedback:
      '答對了！很好！第四代電腦以微處理器／CPU 晶片為重要發展特色，促成個人電腦快速普及到個人書桌上！',
  },
];
