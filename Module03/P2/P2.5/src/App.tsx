import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FaultyComponent } from './components/FaultyComponent';
import './App.css';

function App() {
  const [showErrorDemo, setShowErrorDemo] = useState(false);

  if (showErrorDemo) {
    return (
      <ErrorBoundary>
        {/* Intentionally rendering outside ThemeProvider to trigger custom error */}
        <FaultyComponent />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="app-layout">
          <Header />
          <MainContent triggerFault={() => setShowErrorDemo(true)} />
          <Footer />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
