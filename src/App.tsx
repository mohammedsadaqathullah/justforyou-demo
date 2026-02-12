import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateMessagePage from './pages/CreateMessagePage';
import MessageRevealPage from './pages/MessageRevealPage';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create/:category" element={<CreateMessagePage />} />
        <Route path="/message/:encodedData" element={<MessageRevealPage />} />
      </Routes>
    </Router>
  );
};

export default App;
