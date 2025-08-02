import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './Components/HomePage';
import { CardPage } from './Components/CardPage';
import { ContactsPage } from './Components/ContactsPage';
import { GradingPage } from './Components/GradingPage';
import { NewContentPage } from './Components/NewContentPage';
import { PacksPage } from './Components/PacksPage';
import { PreorderPage } from './Components/PreorderPage';
import ProductPage from './Components/ProductPage';
import CartPage from "./Components/CartPage";
import CartContext from "./context/CartContext";
import CheckoutPage from "./Components/CheckoutPage";
import ConfirmationPage from "./Components/ConfirmationPage";
import styled from "styled-components";

const FloatingCartButton = styled(Link)`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #fff700;
  color: black;
  font-weight: bold;
  border: none;
  padding: 12px 20px;
  border-radius: 999px;
  z-index: 1000;
  text-decoration: none;
  box-shadow: 0px 2px 10px rgba(0,0,0,0.2);
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
  }
`;

function App() {
  return (
    <>
      <FloatingCartButton to="/cart">🛒 Cart</FloatingCartButton>
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
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </>
  );
}

export default App;
