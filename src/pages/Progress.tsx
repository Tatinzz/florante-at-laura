import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import { BookOpen, CheckCircle, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Progress: React.FC = () => {
  const { userProgress } = useProgress();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has a name in localStorage
    const savedName = localStorage.getItem('studentName');
    if (!savedName) {
      // If no name is found, redirect to home
      navigate('/');
    }
  }, [navigate]);

  if (!userProgress) {
    return (
      <div className="min-h-screen bg-indigo-950 text-ivory-100 flex items-center justify-center p-4">
        <AnimatedBackground bubbleCount={4} theme="literary" speed={0.7} />
        <div className="text-center relative z-10">
          <h1 className="text-2xl font-bold text-amber-400 mb-2">Walang Progress</h1>
          <p className="text-ivory-200 mb-4">Mangyaring mag-login muna para makita ang iyong progress.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Bumalik sa Home
          </button>
        </div>
      </div>
    );
  }

  const totalChapters = 30; // Total number of chapters
  const totalQuizzes = totalChapters * 3; // 3 types of quizzes per chapter
  const completedQuizzes = 
    userProgress.progress.quizzesCompleted.vocabulary.length +
    userProgress.progress.quizzesCompleted.content.length +
    userProgress.progress.quizzesCompleted.symbolism.length;

  const progressStats = [
    {
      title: 'Mga Kabanatang Nabasa',
      value: userProgress.progress.chaptersRead.length,
      total: totalChapters,
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'Mga Quiz na Natapos',
      value: completedQuizzes,
      total: totalQuizzes,
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Overall Progress',
      value: Math.round(((userProgress.progress.chaptersRead.length + completedQuizzes) / (totalChapters + totalQuizzes)) * 100),
      total: 100,
      icon: Award,
      color: 'bg-amber-500',
      isPercentage: true
    }
  ];

  return (
    <div className="min-h-screen bg-indigo-950 text-ivory-100 overflow-hidden flex flex-col">
      <AnimatedBackground bubbleCount={4} theme="literary" speed={0.7} />
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-amber-400 mb-2">
            Progress ni {userProgress.name}
          </h1>
          <p className="text-ivory-200">
            Subaybayan ang iyong pag-unlad sa pag-aaral ng Florante at Laura
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {progressStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-indigo-900/40 backdrop-blur-md rounded-xl p-6 shadow-sm border border-indigo-800/30"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-ivory-100">{stat.title}</h3>
                <stat.icon className={`w-6 h-6 ${stat.color} text-white p-1 rounded-lg`} />
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-amber-400">
                  {stat.value}
                  {stat.isPercentage ? '%' : ''}
                </span>
                {!stat.isPercentage && (
                  <span className="ml-2 text-ivory-300">/ {stat.total}</span>
                )}
              </div>
              {!stat.isPercentage && (
                <div className="mt-4 w-full bg-indigo-800/30 rounded-full h-2">
                  <div
                    className={`${stat.color} h-2 rounded-full`}
                    style={{ width: `${(stat.value / stat.total) * 100}%` }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-indigo-900/40 backdrop-blur-md rounded-xl p-6 shadow-sm border border-indigo-800/30"
        >
          <h2 className="text-xl font-bold text-amber-400 mb-4">Huling Binasa</h2>
          {userProgress.progress.lastReadChapter ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-ivory-100 font-medium">
                  Kabanata {userProgress.progress.lastReadChapter}
                </p>
                <p className="text-ivory-300 text-sm">
                  {new Date(userProgress.progress.lastReadDate || '').toLocaleDateString('fil-PH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <button
                onClick={() => navigate(`/chapter/${userProgress.progress.lastReadChapter}`)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Magpatuloy
              </button>
            </div>
          ) : (
            <p className="text-ivory-300">Wala pang nababasa</p>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Progress; 