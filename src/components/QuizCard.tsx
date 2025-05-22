import React from 'react';
import { ExternalLink, BookOpen, BookText, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Quiz } from '../types';

interface QuizCardProps {
  quiz: Quiz;
  index?: number;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, index = 0 }) => {
  const delay = `${0.2 + (index * 0.1)}s`;
  
  const getQuizIcon = () => {
    switch (quiz.type) {
      case 'bokabularyo':
        return <BookOpen className="w-5 h-5 group-hover:animate-pulse" />;
      case 'nilalaman':
        return <BookText className="w-5 h-5 group-hover:animate-pulse" />;
      case 'simbolismo':
        return <Lightbulb className="w-5 h-5 group-hover:animate-pulse" />;
      default:
        return <BookOpen className="w-5 h-5 group-hover:animate-pulse" />;
    }
  };

  const getQuizTypeColor = () => {
    switch (quiz.type) {
      case 'bokabularyo':
        return 'from-blue-500/20 to-blue-600/20 border-blue-500/30 hover:border-blue-400/50';
      case 'nilalaman':
        return 'from-purple-500/20 to-purple-600/20 border-purple-500/30 hover:border-purple-400/50';
      case 'simbolismo':
        return 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 hover:border-emerald-400/50';
      default:
        return 'from-amber-500/20 to-amber-600/20 border-amber-500/30 hover:border-amber-400/50';
    }
  };

  const getQuizTypeText = () => {
    switch (quiz.type) {
      case 'bokabularyo':
        return 'text-blue-400';
      case 'nilalaman':
        return 'text-purple-400';
      case 'simbolismo':
        return 'text-emerald-400';
      default:
        return 'text-amber-400';
    }
  };

  return (
    <Link to={`/quiz/${quiz.id}`} className="group">
      <div 
        className={`relative rounded-xl bg-gradient-to-br ${getQuizTypeColor()} backdrop-blur-sm shadow-lg p-5 border transition-all duration-300 hover:-translate-y-1 card-3d fade-in`}
        style={{ animationDelay: delay }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`flex items-center gap-2 ${getQuizTypeText()}`}>
            {getQuizIcon()}
            <span className="font-medium capitalize">{quiz.type}</span>
          </div>
          <div className="text-ivory-300 text-xs">
            {quiz.questions.length} Tanong
          </div>
        </div>
        
        <h3 className="text-ivory-100 font-medium mb-3 group-hover:text-ivory-50 transition-colors">{quiz.title}</h3>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-ivory-300/70">Kabanata {quiz.chapterId}</span>
          <div className="flex items-center text-ivory-200 text-sm group-hover:text-ivory-100 transition-colors">
            <span>Subukan</span>
            <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
        
        {/* Shimmer effect overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white shimmer rounded-xl transition-opacity pointer-events-none"></div>
      </div>
    </Link>
  );
};

export default QuizCard;