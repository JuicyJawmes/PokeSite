import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './Components/HomePage';
import { CardPage } from './Components/CardPage';
import { ContactsPage } from './Components/ContactsPage';
import { GradingPage } from './Components/GradingPage';
import { NewContentPage } from './Components/NewContentPage';
import { PacksPage } from './Components/PacksPage';
import { PreorderPage } from './Components/PreorderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewContentPage />} />
        <Route path="/packs" element={<PacksPage />} />
        <Route path="/cards" element={<CardPage />} />
        <Route path="/contact" element={<ContactsPage />} />
        <Route path="/grading" element={<GradingPage />} />
        <Route path="/preorder" element={<PreorderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
