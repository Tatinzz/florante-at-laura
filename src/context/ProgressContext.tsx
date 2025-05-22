import React, { createContext, useContext, useState, useEffect } from 'react';
import { Progress, UserProgress } from '../types';

interface ProgressContextType {
  userProgress: UserProgress | null;
  updateProgress: (progress: Partial<Progress>) => void;
  markChapterAsRead: (chapterId: number) => void;
  markQuizAsCompleted: (type: 'vocabulary' | 'content' | 'symbolism', chapterId: number) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const initialProgress: Progress = {
  chaptersRead: [],
  quizzesCompleted: {
    vocabulary: [],
    content: [],
    symbolism: []
  }
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const savedName = localStorage.getItem('studentName');
    const savedProgress = localStorage.getItem('userProgress');
    
    if (savedName) {
      const progress = savedProgress ? JSON.parse(savedProgress) : initialProgress;
      setUserProgress({
        name: savedName,
        progress: {
          ...initialProgress,
          ...progress
        }
      });
    }
  }, []);

  const updateProgress = (newProgress: Partial<Progress>) => {
    if (userProgress) {
      const updatedProgress = {
        ...userProgress,
        progress: {
          ...userProgress.progress,
          ...newProgress
        }
      };
      setUserProgress(updatedProgress);
      localStorage.setItem('userProgress', JSON.stringify(updatedProgress.progress));
    }
  };

  const markChapterAsRead = (chapterId: number) => {
    if (userProgress && !userProgress.progress.chaptersRead.includes(chapterId)) {
      const updatedChaptersRead = [...userProgress.progress.chaptersRead, chapterId];
      updateProgress({
        chaptersRead: updatedChaptersRead,
        lastReadChapter: chapterId,
        lastReadDate: new Date().toISOString()
      });
    }
  };

  const markQuizAsCompleted = (type: 'vocabulary' | 'content' | 'symbolism', chapterId: number) => {
    if (userProgress && !userProgress.progress.quizzesCompleted[type].includes(chapterId)) {
      const updatedQuizzes = {
        ...userProgress.progress.quizzesCompleted,
        [type]: [...userProgress.progress.quizzesCompleted[type], chapterId]
      };
      updateProgress({ quizzesCompleted: updatedQuizzes });
    }
  };

  return (
    <ProgressContext.Provider value={{
      userProgress,
      updateProgress,
      markChapterAsRead,
      markQuizAsCompleted
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}; 