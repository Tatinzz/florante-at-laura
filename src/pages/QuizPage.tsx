import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, BookText, Lightbulb, RefreshCw, Trophy } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuizQuestion from '../components/QuizQuestion';
import { quizzes } from '../data/quizzes';
import { Quiz } from '../types';
import AnimatedBackground from '../components/AnimatedBackground';

const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [hideQuestions, setHideQuestions] = useState(false);

  // Auto-scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (id) {
      const quizId = parseInt(id);
      const current = quizzes.find(q => q.id === quizId) || null;
      setQuiz(current);
      resetQuiz();
    }
  }, [id]);

  // Hide questions after showing score with timing matching CSS
  useEffect(() => {
    if (showScore) {
      const timer = setTimeout(() => {
        setHideQuestions(true);
      }, 1000); // Match the animation-delay in CSS
      
      return () => clearTimeout(timer);
    }
  }, [showScore]);

  const handleAnswer = (questionId: number, selectedAnswer: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedAnswer
    }));
  };

  const calculateScore = () => {
    if (!quiz) return;
    
    let correct = 0;
    quiz.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    
    setScore(correct);
    setShowScore(true);
    setHideQuestions(false);
  };

  const resetQuiz = () => {
    // Reset all state to initial values
    setAnswers({});
    setShowScore(false);
    setScore(0);
    setHideQuestions(false);
    // Force scroll to top when resetting
    window.scrollTo(0, 0);
  };

  const getQuizTypeIcon = () => {
    if (!quiz) return <BookOpen className="w-5 h-5" />;
    
    switch (quiz.type) {
      case 'bokabularyo':
        return <BookOpen className="w-5 h-5" />;
      case 'nilalaman':
        return <BookText className="w-5 h-5" />;
      case 'simbolismo':
        return <Lightbulb className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getQuizTypeColor = () => {
    if (!quiz) return 'bg-amber-500/20 text-amber-400';
    
    switch (quiz.type) {
      case 'bokabularyo':
        return 'bg-blue-500/20 text-blue-400';
      case 'nilalaman':
        return 'bg-purple-500/20 text-purple-400';
      case 'simbolismo':
        return 'bg-emerald-500/20 text-emerald-400';
      default:
        return 'bg-amber-500/20 text-amber-400';
    }
  };

  if (!quiz) {
    return (
      <div className="min-h-screen bg-indigo-950 text-ivory-100 flex items-center justify-center overflow-hidden">
        <AnimatedBackground bubbleCount={3} />
        <div className="text-center relative z-10">
          <p className="text-2xl text-amber-400">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const allAnswered = quiz.questions.every(q => answers[q.id] !== undefined);

  return (
    <div className="min-h-screen bg-indigo-950 text-ivory-100 overflow-hidden flex flex-col">
      <Header />
      <AnimatedBackground bubbleCount={3} className="opacity-70" />
      
      <div className="container mx-auto px-4 pt-28 pb-16 relative z-10 flex-grow">
        {hideQuestions ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-indigo-900/70 backdrop-blur-md p-10 rounded-xl border border-indigo-700/50 shadow-lg max-w-xl mx-auto pulse-glow">
              <div className="flex flex-col items-center justify-center">
                <div className="p-5 rounded-full bg-amber-500/30 shadow-inner mb-4">
                  <Trophy className="w-12 h-12 text-amber-400" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl text-amber-400 font-serif mb-4">Iyong Marka</h3>
                  <div className="mb-4">
                    <p className="text-ivory-100 text-5xl font-bold mb-2">
                      {score} / {quiz.questions.length}
                    </p>
                    <p className="text-xl text-amber-300/80">
                      ({Math.round((score / quiz.questions.length) * 100)}%)
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center px-6 py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-lg text-amber-400 transition-all btn-glow btn-press"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    <span>Subukang Muli</span>
                  </button>
                </div>
                
                <div className="mt-6">
                  <Link to={`/chapter/${quiz.chapterId}`} className="inline-flex items-center text-amber-400 hover:text-amber-300 border-expand">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    <span>Bumalik sa Kabanata {quiz.chapterId}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Link to={`/chapter/${quiz.chapterId}`} className="inline-flex items-center text-amber-400 hover:text-amber-300 border-expand">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Bumalik sa Kabanata {quiz.chapterId}</span>
              </Link>
            </div>
            
            <div className="mb-8 fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-full ${getQuizTypeColor()}`}>
                  {getQuizTypeIcon()}
                </div>
                <div>
                  <h2 className="font-medium text-lg text-ivory-100 capitalize">{quiz.type}</h2>
                  <p className="text-ivory-300 text-sm">Kabanata {quiz.chapterId}</p>
                </div>
              </div>
              
              <h1 className="font-serif text-3xl text-amber-400 mb-2">
                {quiz.title}
              </h1>
              
              <p className="text-ivory-300 mb-6">
                Sagutin ang lahat ng tanong upang sukatin ang iyong pag-unawa.
              </p>
            </div>

            {showScore && (
              <div className="bg-indigo-900/70 backdrop-blur-md p-8 rounded-xl border border-indigo-700/50 mb-8 shadow-lg">
                <div className="flex items-center gap-6 justify-center">
                  <div className="p-4 rounded-full bg-amber-500/20">
                    <Trophy className="w-8 h-8 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl text-amber-400 mb-2">Iyong Marka</h3>
                    <p className="text-ivory-100 text-4xl font-bold">
                      {score} / {quiz.questions.length}
                      <span className="text-xl text-ivory-300 ml-2">
                        ({Math.round((score / quiz.questions.length) * 100)}%)
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center mt-8">
                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center px-6 py-3 bg-indigo-800 hover:bg-indigo-700 rounded-lg text-ivory-100 transition-colors btn-glow btn-press"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    <span>Subukang Muli</span>
                  </button>
                </div>
              </div>
            )}
            
            <div className={showScore ? "fade-out-questions" : ""}>
              {quiz.questions.map((question, index) => (
                <QuizQuestion 
                  key={question.id} 
                  question={question} 
                  onAnswer={handleAnswer}
                  showFeedback={answers[question.id] !== undefined}
                  userAnswer={answers[question.id]}
                  index={index}
                />
              ))}
              
              {!showScore && allAnswered && (
                <div className="mt-8 fade-in" style={{ animationDelay: '0.5s' }}>
                  <button
                    onClick={calculateScore}
                    className="px-6 py-3 rounded-lg font-medium bg-amber-500 hover:bg-amber-600 text-indigo-900 transition-colors btn-press btn-glow flex items-center gap-2"
                  >
                    <Trophy className="w-5 h-5" />
                    <span>Tingnan ang Score</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <Footer style={{ position: 'sticky', bottom: 0 }} />
    </div>
  );
};

export default QuizPage;