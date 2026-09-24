export type StageId = 1 | 2 | 3 | 4 | 5;

export interface StageInfo {
  id: StageId;
  title: string;
  subtitle: string;
  description: string;
  keyConcepts: string[];
  durationMinutes: number;
}

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  inventor?: string;
  significance: string;
  tag: string;
  iconName: string;
  image?: string;
  funFact?: string;
}

export interface GenerationSpec {
  generation: string;
  period: string;
  component: string;
  componentEn: string;
  speed: string;
  memory: string;
  size: string;
  programmingLanguage: string;
  heatPower: string;
  representativeMachines: string[];
  keyFeatures: string[];
  breakthrough: string;
  image?: string;
}

export interface ModernTechEra {
  id: string;
  era: string;
  title: string;
  keyThemes: string[];
  description: string;
  representativeTechs: string[];
  realWorldImpact: string;
  iconName: string;
}

export interface MatchPair {
  id: string;
  generation: string;
  techTitle: string;
  description: string;
  componentName: string;
}

export interface ChronoItem {
  id: string;
  year: number;
  yearDisplay: string;
  title: string;
  generation: string;
  description: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  relatedGeneration: string;
}
