export interface KabanataStanza {
  title: string;
  lines: string[];
}

export interface QuizItem {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface VocabularyItem {
  word: string;
  meaning: string;
}

export interface SymbolismItem {
  symbol: string;
  meaning: string;
}

export interface KabanataContent {
  id: number;
  title: string;
  subtitle: string;
  buod: string;
  stanzas: KabanataStanza[];
  mahahalagangPangyayari: string[];
  nilalaman: string[];
  bokabularyo: VocabularyItem[];
  simbolismo: SymbolismItem[];
  quiz: QuizItem[];
} 