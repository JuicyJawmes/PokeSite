import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './Components/HomePage';
import { CardPage } from './Components/CardPage';
import { ContactsPage } from './Components/ContactsPage';
import { GradingPage } from './Components/GradingPage';
import { NewContentPage } from './Components/NewContentPage';
import { PacksPage } from './Components/PacksPage';
import { PreorderPage } from './Components/PreorderPage';
import ProductPage from './Components/ProductPage';

function App() {
  return (

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewContentPage />} />
        <Route path="/packs" element={<PacksPage />} />
        <Route path="/cards" element={<CardPage />} />
        <Route path="/contact" element={<ContactsPage />} />
        <Route path="/grading" element={<GradingPage />} />
        <Route path="/preorder" element={<PreorderPage />} />
        <Route path="/grader" element={<GradingPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
      </Routes>
  
  );
}

export default App;
