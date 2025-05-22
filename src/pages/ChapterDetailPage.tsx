import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BookText, Lightbulb, BookOpen, CheckCircle, List, FileText, Home, Maximize, ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { getAllKabanata } from '../data';
import { KabanataContent } from '../types/kabanata';
import { quizzes } from '../data/quizzes';
import { useProgress } from '../context/ProgressContext';
import { AnimatePresence, motion } from 'framer-motion';

// Tab types
const tabList = [
  { id: 'buod', label: 'Buod', icon: <FileText className="w-4 h-4 mr-2" /> },
  { id: 'quiz', label: 'Quiz', icon: <CheckCircle className="w-4 h-4 mr-2" /> },
  { id: 'bokabularyo', label: 'Bokabularyo', icon: <BookOpen className="w-4 h-4 mr-2" /> },
  { id: 'nilalaman', label: 'Nilalaman', icon: <BookText className="w-4 h-4 mr-2" /> },
  { id: 'simbolismo', label: 'Simbolismo', icon: <Lightbulb className="w-4 h-4 mr-2" /> },
] as const;

type TabType = typeof tabList[number]['id'];

// Quiz type mapping
type QuizType = 'bokabularyo' | 'nilalaman' | 'simbolismo';

interface QuizTypeInfo {
  color: string;
  text: string;
  icon: JSX.Element;
  label: string;
}

const quizTypeMap: Record<QuizType, QuizTypeInfo> = {
  bokabularyo: {
    color: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 hover:border-blue-400/50',
    text: 'text-blue-400',
    icon: <BookOpen className="w-5 h-5" />,
    label: 'Bokabularyo'
  },
  nilalaman: {
    color: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 hover:border-purple-400/50',
    text: 'text-purple-400',
    icon: <BookText className="w-5 h-5" />,
    label: 'Nilalaman'
  },
  simbolismo: {
    color: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 hover:border-emerald-400/50',
    text: 'text-emerald-400',
    icon: <Lightbulb className="w-5 h-5" />,
    label: 'Simbolismo'
  }
};

const ChapterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('buod');
  const { userProgress, markChapterAsRead } = useProgress();

  const chapterId = id ? parseInt(id, 10) : 0;
  const allKabanata = getAllKabanata();
  const chapterData = allKabanata.find(k => k.id === chapterId);
  const [kabanata, setKabanata] = useState<KabanataContent | null>(chapterData || null);

  // Determine if the current chapter is read
  const isRead = userProgress?.progress?.chaptersRead.includes(chapterId) || false;

  // Effect to update kabanata when id changes
  useEffect(() => {
    const newChapterData = allKabanata.find(k => k.id === (id ? parseInt(id, 10) : 0));
    setKabanata(newChapterData || null);
  }, [id, allKabanata]);

  // Effect to reset active tab when chapter changes
  useEffect(() => {
    setActiveTab('buod');
  }, [id]); // This effect now ONLY depends on id

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const getChapterImage = () => {
    if (kabanata?.id === 1) return '/florante-at-laura-images/kabanata1.png';
    if (kabanata?.id === 2) return '/florante-at-laura-images/kabanata2.png';
    return '/florante-at-laura-images/cover.png';
  };

  const handleStanzaClick = () => {
    setTimeout(() => {
      if (kabanata) {
      navigate(`/chapter/${kabanata.id}/stanza`);
      }
    }, 400);
  };

  // Find next and previous chapter
  const currentIndex = allKabanata.findIndex(k => kabanata && k.id === kabanata.id);
  const nextKabanata = currentIndex !== -1 && currentIndex < allKabanata.length - 1 ? allKabanata[currentIndex + 1] : null;
  const previousKabanata = currentIndex > 0 ? allKabanata[currentIndex - 1] : null;

  const handleMarkAsRead = () => {
    if (chapterId > 0) {
      markChapterAsRead(chapterId);
    }
  };

  if (!kabanata) {
    return (
      <div className="min-h-screen bg-indigo-950 text-ivory-100 flex items-center justify-center">
        <AnimatedBackground bubbleCount={4} theme="literary" speed={0.7} />
        <div className="text-center relative z-10">
          <h1 className="text-2xl font-bold text-amber-400 mb-2">Kabanata ay Hindi Natagpuan</h1>
          <p className="text-ivory-200">Ang hinahanap mong kabanata ay hindi umiiral.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-950 to-slate-900 text-ivory-100">
      <Header />
      <AnimatedBackground bubbleCount={4} theme="literary" speed={0.7} />

      <AnimatePresence mode="wait">
        {kabanata && (
          <motion.div
            key={id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 pt-24 pb-16 relative z-10"
          >
            {/* Breadcrumbs */}
            <div className="mb-6 flex items-center text-ivory-300 text-sm">
              <Link to="/" className="hover:text-amber-400 transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <span className="mx-2">•</span>
              <Link to="/chapters" className="hover:text-amber-400 transition-colors">
                Mga Kabanata
              </Link>
              <span className="mx-2">•</span>
              <span className="text-amber-400">Kabanata {kabanata.id}</span>
            </div>

            {/* Chapter Info Card */}
            <div className="bg-indigo-900/40 backdrop-blur-md rounded-xl overflow-hidden mb-8 border border-indigo-800/30 shadow-xl">
              {/* Chapter Image Section */}
              <div className="h-48 md:h-64 lg:h-80 bg-gradient-to-r from-indigo-800/30 to-indigo-950/30 relative overflow-hidden">
                <div className="absolute inset-4 border border-amber-400/20 rounded-lg pointer-events-none z-10"></div>
                <div className="absolute top-4 right-4 z-20 md:hidden">
                  {isRead && (
                    <button
                      className="flex items-center gap-1 px-2.5 py-1.5 border border-emerald-400 text-emerald-300 rounded-md bg-indigo-950/80 font-semibold shadow-sm cursor-default text-sm"
                      style={{ fontSize: '0.95rem' }}
                      disabled
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-300" />
                      Nabasa na
                    </button>
                  )}
                </div>
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-85 mix-blend-normal enhanced-image"
                  style={{ backgroundImage: `url(${getChapterImage()})` }}
                ></div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-indigo-950 to-transparent h-1/4"></div>
                <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-indigo-950/40 to-transparent h-1/6"></div>
                <button
                  className="absolute bottom-4 right-4 bg-indigo-900/80 backdrop-blur-sm px-3 py-1.5 rounded-md border border-indigo-700/50 flex items-center text-ivory-100 hover:border-amber-400/30 transition-colors z-20"
                >
                  <Maximize className="w-4 h-4 mr-1.5" />
                  <span className="text-sm">Tingnan ang Larawan</span>
                </button>
                <div className="absolute top-4 left-4 bg-indigo-900/80 backdrop-blur-sm px-3 py-1.5 rounded-md border border-amber-400/30">
                  <span className="text-amber-400 font-medium">Kabanata {kabanata.id}</span>
                </div>
              </div>

              {/* Chapter Details Section */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-amber-400 mb-2">
                      {kabanata.title}
                    </h1>
                    <h2 className="text-xl text-ivory-200 mb-6">{kabanata.subtitle}</h2>
                    <div className="flex items-center text-ivory-300 space-x-4 text-sm">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        <span>Francisco Balagtas</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <List className="w-4 h-4 mr-1" />
                        <span>Akda Klasiko</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-end md:justify-center mt-4 md:mt-0 hidden md:flex">
                    {isRead ? (
                      <button
                        className="flex items-center gap-2 px-4 py-2 border border-emerald-400 text-emerald-300 rounded-lg bg-transparent font-semibold shadow-sm cursor-default"
                        disabled
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-300" />
                        Nabasa na
                      </button>
                    ) : (
                      <button
                        onClick={handleMarkAsRead}
                        className="flex items-center gap-2 px-4 py-2 border border-amber-400 text-amber-400 rounded-lg bg-transparent font-semibold shadow-sm hover:bg-amber-400/10 transition-colors"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Markahan bilang Nabasa na
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            {/* Mobile tabs navigation */}
            <div className="mb-4 flex md:hidden w-full gap-1 relative z-10">
              {tabList.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex-1 flex flex-col items-center justify-center px-1 py-2 rounded-lg font-medium text-xs transition-colors ${
                    activeTab === tab.id
                    ? 'bg-amber-400/20 text-amber-400 shadow-sm'
                    : 'text-ivory-300 hover:bg-indigo-800/30 hover:text-ivory-100'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="mb-0.5">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Desktop tab navigation */}
            <div className="mb-6 bg-indigo-900/20 p-1 rounded-lg border border-indigo-800/30 relative z-10">
              <div className="hidden md:flex space-x-2 relative">
                {tabList.map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex items-center whitespace-nowrap px-4 py-2 rounded-md relative ${
                      activeTab === tab.id 
                      ? 'bg-amber-400/20 text-amber-400 active' 
                      : 'text-ivory-300 hover:bg-indigo-800/30 hover:text-ivory-100'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.icon}
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content with animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-indigo-900/30 backdrop-blur-sm p-6 rounded-xl border border-indigo-700/30 mb-6 card-3d relative overflow-hidden">
                  {(() => {
                    switch (activeTab) {
                      case 'buod':
                        return (
                          <div className="space-y-4">
                            <h3 className="text-xl text-amber-400 mb-4 font-serif">Buod ng Kabanata</h3>
                            <div className="space-y-6">
                              <div className="bg-indigo-800/20 p-4 rounded-lg border border-indigo-700/30">
                                <p className="text-ivory-200 leading-relaxed">{kabanata.buod}</p>
                              </div>
                              {kabanata.stanzas && kabanata.stanzas.length > 0 && (
                                <div className="bg-indigo-900/30 p-6 rounded-lg border border-amber-500/20">
                                  <h4 className="text-xl text-amber-400 font-serif mb-3 flex items-center gap-2 justify-center">
                                    <BookOpen className="w-5 h-5" />
                                    <span>{kabanata.stanzas[0].title}</span>
                                  </h4>
                                  <div className="text-ivory-300 italic text-center mb-4">
                                    {kabanata.stanzas[0].lines.slice(0, 4).map((line, i) => (
                                      <span key={i}>
                                        {line}
                                        <br />
                                      </span>
                                    ))}
                                  </div>
                                  <div className="flex items-center justify-center">
                                    <button
                                      onClick={handleStanzaClick}
                                      className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
                                      type="button"
                                    >
                                      <BookOpen className="w-4 h-4" />
                                      <span>Basahin ang Buong Saknong</span>
                                    </button>
                                  </div>
                                </div>
                              )}
                              {kabanata.mahahalagangPangyayari && (
                                <div className="bg-indigo-800/20 p-4 rounded-lg">
                                  <h4 className="text-amber-400 font-serif mb-3">Mahahalagang Pangyayari</h4>
                                  <ul className="space-y-2 text-ivory-200">
                                    {kabanata.mahahalagangPangyayari.map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <div className="w-2 h-2 mt-2 rounded-full bg-amber-400/50"></div>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {/* Default fallback if no content is available for buod */}
                              {!kabanata.buod && (!kabanata.stanzas || kabanata.stanzas.length === 0) && !kabanata.mahahalagangPangyayari && (
                                <div className="space-y-4">
                                  <h3 className="text-xl text-amber-400 mb-4 font-serif">Walang Nilalaman</h3>
                                  <p className="text-ivory-200">Walang available na buod o mahahalagang pangyayari para sa kabanata na ito.</p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      case 'quiz':
                        return (
                          <div className="space-y-4">
                            <h3 className="text-xl text-amber-400 mb-4 font-serif">Pagsusulit</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
                              {(Object.keys(quizTypeMap) as QuizType[]).map((type) => {
                                const quiz = quizzes.find(q => q.chapterId === Number(id) && q.type === type);
                                if (!quiz) return null;
                                const typeInfo = quizTypeMap[type];
                                return (
                                  <button
                                    key={type}
                                    onClick={() => navigate(`/quiz/${quiz.id}?type=${type}`)}
                                    className={`group relative rounded-xl bg-gradient-to-br ${typeInfo.color} backdrop-blur-sm shadow-lg p-4 sm:p-6 border transition-all duration-300 hover:-translate-y-1 card-3d fade-in flex flex-col text-left focus:outline-none focus:ring-2 focus:ring-amber-400/40 active:scale-95`}
                                    style={{ animationDelay: '0.2s', minWidth: 0 }}
                                  >
                                    <div className="flex items-start justify-between mb-3">
                                      <div className={`flex items-center gap-2 ${typeInfo.text}`}>
                                        {typeInfo.icon}
                                        <span className="font-medium capitalize">{typeInfo.label}</span>
                                      </div>
                                      <div className="text-ivory-300 text-xs">{quiz.questions.length} Tanong</div>
                                    </div>
                                    <h3 className="text-ivory-100 font-medium mb-3 group-hover:text-ivory-50 transition-colors text-base sm:text-lg">
                                      {quiz.title}
                                    </h3>
                                    <div className="flex items-center justify-between mt-2">
                                      <span className="text-xs text-ivory-300/70">Kabanata {quiz.chapterId}</span>
                                      <span className="flex items-center text-ivory-200 text-sm group-hover:text-ivory-100 transition-colors">
                                        <span>Subukan</span>
                                        <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                      </span>
                                    </div>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white shimmer rounded-xl transition-opacity pointer-events-none"></div>
                                  </button>
                                );
                              })}
                              {/* Default fallback if no content is available for quiz */}
                              {!quizzes.some(q => q.chapterId === Number(id)) && (
                                <div className="space-y-4">
                                  <h3 className="text-xl text-amber-400 mb-4 font-serif">Walang Nilalaman</h3>
                                  <p className="text-ivory-200">Walang available na pagsusulit para sa kabanata na ito.</p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      case 'bokabularyo':
                        return (
                          <div className="space-y-4">
                            <h3 className="text-xl text-amber-400 mb-4 font-serif">Bokabularyo</h3>
                            {kabanata.bokabularyo && kabanata.bokabularyo.length > 0 ? (
                              <ul className="space-y-2">
                                {kabanata.bokabularyo.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-3 border-l-4 border-blue-400/40 pl-4 py-2 bg-indigo-900/40 rounded-md">
                                    <div>
                                      <span className="font-semibold text-blue-300 text-base leading-tight">{item.word}</span>
                                      <div className="text-ivory-200 text-sm leading-snug">{item.meaning}</div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="space-y-4">
                                <h3 className="text-xl text-amber-400 mb-4 font-serif">Walang Nilalaman</h3>
                                <p className="text-ivory-200">Walang available na bokabularyo para sa tab na ito.</p>
                              </div>
                            )}
                          </div>
                        );
                      case 'nilalaman':
                        return (
                          <div className="space-y-4">
                            <h3 className="text-xl text-amber-400 mb-4 font-serif">Nilalaman</h3>
                            {kabanata.nilalaman && kabanata.nilalaman.length > 0 ? (
                              <ul className="space-y-2 text-ivory-200">
                                {kabanata.nilalaman.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-amber-400/50"></div>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="space-y-4">
                                <h3 className="text-xl text-amber-400 mb-4 font-serif">Walang Nilalaman</h3>
                                <p className="text-ivory-200">Walang available na nilalaman para sa tab na ito.</p>
                              </div>
                            )}
                          </div>
                        );
                      case 'simbolismo':
                        return (
                          <div className="space-y-4">
                            <h3 className="text-xl text-amber-400 mb-4 font-serif">Simbolismo</h3>
                            {kabanata.simbolismo && kabanata.simbolismo.length > 0 ? (
                              <div className="space-y-4">
                                {kabanata.simbolismo.map((item, idx) => (
                                  <div key={idx} className="flex gap-4 border-l-2 border-emerald-400/30 pl-4">
                                    <div className="bg-emerald-500/20 p-2 rounded-full h-fit">
                                      <Lightbulb className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-ivory-100">{item.symbol}</h4>
                                      <p className="text-ivory-200 text-sm mt-1">{item.meaning}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <h3 className="text-xl text-amber-400 mb-4 font-serif">Walang Nilalaman</h3>
                                <p className="text-ivory-200">Walang available na simbolismo para sa tab na ito.</p>
                              </div>
                            )}
                          </div>
                        );
                      default:
                        return null;
                    }
                  })()}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Chapter Navigation Buttons */}
            {(previousKabanata || nextKabanata) && (
              <div className="flex justify-between mt-8">
                {previousKabanata ? (
                  <button
                    onClick={() => navigate(`/chapter/${previousKabanata.id}`)}
                    className="flex flex-col items-start px-4 py-2 border border-amber-400/40 rounded-lg bg-transparent hover:bg-amber-400/5 transition-colors shadow-sm min-w-[220px]"
                  >
                    <span className="text-xs text-ivory-300 font-normal mb-0.5">Nakaraang Kabanata</span>
                    <span className="flex items-center font-bold text-amber-400 text-base">
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      {previousKabanata.title}
                    </span>
                  </button>
                ) : (
                  <div />
                )}
                {nextKabanata ? (
                  <button
                    onClick={() => navigate(`/chapter/${nextKabanata.id}`)}
                    className="flex flex-col items-end px-4 py-2 border border-amber-400/40 rounded-lg bg-transparent hover:bg-amber-400/5 transition-colors shadow-sm min-w-[220px]"
                  >
                    <span className="text-xs text-ivory-300 font-normal mb-0.5">Susunod na Kabanata</span>
                    <span className="flex items-center font-bold text-amber-400 text-base">
                      {nextKabanata.title}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </button>
                ) : (
                  <div />
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ChapterDetailPage;