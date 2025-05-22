import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChaptersPage from './pages/ChaptersPage';
import ChapterDetailPage from './pages/ChapterDetailPage';
import QuizPage from './pages/QuizPage';
import AboutTabsPage from './pages/AboutTabsPage';
import { ProgressProvider } from './context/ProgressContext';
import NameModal from './components/NameModal';
import Progress from './pages/Progress';
import ChapterStanzaPage from './pages/ChapterStanzaPage';

// ScrollToTop component to scroll to top on page change
function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);

  return null;
}

function App() {
  return (
    <ProgressProvider>
      <div className="min-h-screen bg-gray-50">
        <main>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chapters" element={<ChaptersPage />} />
              <Route path="/chapter/:id" element={<ChapterDetailPage />} />
              <Route path="/chapter/:id/stanza" element={<ChapterStanzaPage />} />
              <Route path="/quiz/:id" element={<QuizPage />} />
              <Route path="/about" element={<AboutTabsPage />} />
              <Route path="/progress" element={<Progress />} />
            </Routes>
          </Router>
        </main>
        <NameModal onSave={(name) => localStorage.setItem('studentName', name)} />
      </div>
    </ProgressProvider>
  );
}

export default App;