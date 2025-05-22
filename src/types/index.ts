export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  summary: string;
  completed: boolean;
}

export interface Quiz {
  id: number;
  chapterId: number;
  type: 'bokabularyo' | 'nilalaman' | 'simbolismo';
  title: string;
  questions: Question[];
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Progress {
  chaptersRead: number[];
  quizzesCompleted: {
    vocabulary: number[];
    content: number[];
    symbolism: number[];
  };
  lastReadChapter?: number;
  lastReadDate?: string;
}

export interface UserProgress {
  name: string;
  progress: Progress;
}