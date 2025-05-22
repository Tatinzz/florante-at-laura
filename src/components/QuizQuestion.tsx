import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { playSound } from '../utils/sound';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (questionId: number, selectedAnswer: number) => void;
  showFeedback?: boolean;
  userAnswer?: number | null;
  index?: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  onAnswer, 
  showFeedback = false,
  userAnswer = null,
  index = 0
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(userAnswer);

  // Reset selected option when userAnswer changes (including when it becomes null)
  useEffect(() => {
    setSelectedOption(userAnswer);
  }, [userAnswer]);

  const delay = `${0.2 + (index * 0.1)}s`;

  const handleOptionSelect = (index: number) => {
    // Only allow selection if not already answered
    if (!showFeedback) {
      setSelectedOption(index);
      onAnswer(question.id, index);
      // Play sound immediately based on whether the answer is correct
      playSound(index === question.correctAnswer ? 'correct' : 'incorrect');
    }
  };

  const getOptionClass = (index: number) => {
    const baseClasses = 'w-full text-left p-4 rounded-lg border transition-all';
    
    // If no option is selected and not showing feedback
    if (selectedOption === null && !showFeedback) {
      return `${baseClasses} border-indigo-700/30 hover:border-amber-400/50 hover:bg-amber-500/10`;
    }

    // If showing feedback after selection
    if (showFeedback) {
      if (index === question.correctAnswer) {
        return `${baseClasses} border-green-500 bg-green-500/10 text-green-400`;
      } 
      if (index === selectedOption && selectedOption !== question.correctAnswer) {
        return `${baseClasses} border-red-500 bg-red-500/10 text-red-400`;
      }
      return `${baseClasses} border-indigo-700/30 opacity-50`;
    }

    // If an option is selected but not showing feedback yet
    return selectedOption === index 
      ? `${baseClasses} border-amber-400 bg-amber-500/10 text-amber-400`
      : `${baseClasses} border-indigo-700/30 hover:border-amber-400/50 hover:bg-amber-500/10`;
  };

  const getOptionAnimation = (optionIndex: number) => {
    const optionDelay = `${parseFloat(delay) + (optionIndex * 0.08)}s`;
    return { animationDelay: optionDelay };
  };

  return (
    <div className="mb-8 bg-indigo-900/30 backdrop-blur-sm p-6 rounded-xl border border-indigo-700/30 fade-in" style={{ animationDelay: delay }}>
      <h3 className="text-lg font-medium text-ivory-100 mb-4">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option, optionIndex) => (
          <button
            key={optionIndex}
            onClick={() => handleOptionSelect(optionIndex)}
            disabled={showFeedback} // Disable after answering
            className={getOptionClass(optionIndex)}
            style={getOptionAnimation(optionIndex)}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <div className={`w-6 h-6 rounded-full border border-current flex items-center justify-center text-sm ${
                  selectedOption === optionIndex ? 'bg-amber-400/20' : ''
                }`}>
                  {String.fromCharCode(65 + optionIndex)}
                </div>
              </div>
              <span className="text-ivory-100">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {showFeedback && selectedOption !== null && (
        <div className="mt-4 p-3 rounded-lg bg-indigo-800/30 border border-indigo-700/30 fade-in" style={{ animationDelay: '0.3s' }}>
          {selectedOption === question.correctAnswer ? (
            <p className="text-green-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Tama! Magaling.
            </p>
          ) : (
            <p className="text-red-400">
              Hindi tama. Ang tamang sagot ay {String.fromCharCode(65 + question.correctAnswer)}.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;