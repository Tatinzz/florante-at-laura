import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, X, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChapterGrid from '../components/ChapterGrid';
import ChapterList from '../components/ChapterList';
import { chapters } from '../data/chapters';
import AnimatedBackground from '../components/AnimatedBackground';

type ViewMode = 'grid' | 'list';

const ChaptersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredChapters, setFilteredChapters] = useState(chapters);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'uncompleted'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const chaptersPerPage = viewMode === 'grid' ? 9 : 12;
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredChapters.length / chaptersPerPage);
  
  // Get current chapters
  const indexOfLastChapter = currentPage * chaptersPerPage;
  const indexOfFirstChapter = indexOfLastChapter - chaptersPerPage;
  const currentChapters = filteredChapters.slice(indexOfFirstChapter, indexOfLastChapter);
  
  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  useEffect(() => {
    let result = chapters;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(chapter => 
        chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        chapter.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply completion filter
    if (activeFilter === 'completed') {
      result = result.filter(chapter => chapter.completed);
    } else if (activeFilter === 'uncompleted') {
      result = result.filter(chapter => !chapter.completed);
    }
    
    setFilteredChapters(result);
    setCurrentPage(1);  // Reset to first page when filters change
  }, [searchTerm, activeFilter]);
  
  return (
    <div 
      className="min-h-screen bg-indigo-950 text-ivory-100"
    >
      <div className="overflow-x-hidden">
        <Header />
        <AnimatedBackground bubbleCount={6} speed={0.5} theme="literary" />
        
        <div 
          className="container mx-auto px-4 pt-24 pb-16 relative z-10 fade-in" style={{animationDelay: '0.2s'}}
        >
          <div className="relative mb-12 bg-indigo-900/30 p-8 rounded-2xl backdrop-blur-sm border border-indigo-800/30 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-700/20 rounded-full blur-3xl"></div>
            
            <h1 className="font-serif text-3xl md:text-5xl text-amber-400 mb-4 relative">
              <span 
                className="relative inline-block"
              >
                Mga Kabanata
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-amber-400/30"></div>
              </span>
            </h1>
            
            <p 
              className="text-ivory-300 max-w-2xl text-lg relative z-10"
            >
              Pag-aralan ang bawat kabanata ng "Florante at Laura" kasama ang mga buod at pagsusulit 
              para sa mas malalim na pag-unawa.
            </p>
            
            <div className="absolute bottom-4 right-8 opacity-20">
              <BookOpen size={80} className="text-amber-400" />
            </div>
          </div>
        </div>
        
        <div 
          className="container mx-auto px-4 relative z-10 mb-10 fade-in" style={{animationDelay: '0.4s'}}
        >
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Maghanap ng kabanata" 
                className="w-full pl-10 pr-4 py-3 bg-indigo-900/50 backdrop-blur-sm border border-indigo-800/50 rounded-lg text-ivory-100 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 hover:text-ivory-200"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex rounded-lg overflow-hidden bg-indigo-900/30 border border-indigo-800/50">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-3 flex items-center justify-center ${viewMode === 'grid' ? 'bg-amber-500/20 text-amber-400' : 'text-ivory-300 hover:bg-indigo-800/30'}`}
                  aria-label="Grid View"
                  title="Grid View"
                >
                  <Grid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-3 flex items-center justify-center ${viewMode === 'list' ? 'bg-amber-500/20 text-amber-400' : 'text-ivory-300 hover:bg-indigo-800/30'}`}
                  aria-label="List View"
                  title="List View"
                >
                  <List size={18} />
                </button>
              </div>
            
              <div className="relative">
                <button 
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 px-4 py-3 bg-indigo-900/50 backdrop-blur-sm border border-indigo-800/50 rounded-lg text-ivory-200 hover:border-amber-400/30 transition-colors"
                >
                  <Filter size={18} />
                  <span>Mga Filter</span>
                </button>
                
                {filterOpen && (
                    <div 
                      className="absolute right-0 top-full mt-2 bg-indigo-900/90 backdrop-blur-md border border-indigo-800/50 rounded-lg shadow-lg p-3 z-20 min-w-[200px]"
                    >
                      <div className="text-sm font-medium text-ivory-200 mb-2">Ipakita:</div>
                      <div className="space-y-1">
                        <button 
                          className={`w-full text-left px-3 py-2 rounded ${activeFilter === 'all' ? 'bg-amber-400/20 text-amber-400' : 'hover:bg-indigo-800/50 text-ivory-300'}`}
                          onClick={() => setActiveFilter('all')}
                        >
                          Lahat ng Kabanata
                        </button>
                        <button 
                          className={`w-full text-left px-3 py-2 rounded ${activeFilter === 'completed' ? 'bg-amber-400/20 text-amber-400' : 'hover:bg-indigo-800/50 text-ivory-300'}`}
                          onClick={() => setActiveFilter('completed')}
                        >
                          Nabasa na
                        </button>
                        <button 
                          className={`w-full text-left px-3 py-2 rounded ${activeFilter === 'uncompleted' ? 'bg-amber-400/20 text-amber-400' : 'hover:bg-indigo-800/50 text-ivory-300'}`}
                          onClick={() => setActiveFilter('uncompleted')}
                        >
                          Hindi pa Nabasa
                        </button>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10 fade-in" style={{animationDelay: '0.6s'}}>
          {filteredChapters.length === 0 ? (
            <div className="text-center text-ivory-300 py-10">
              Walang mahanap na kabanata na tumutugma sa iyong salita.
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <ChapterGrid chapters={currentChapters} />
              ) : (
                <ChapterList chapters={currentChapters} />
              )}

              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-10 text-ivory-200">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full bg-indigo-900/50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-800/50 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full bg-indigo-900/50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-800/50 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChaptersPage;