import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './Components/HomePage';
import { CardPage } from './Components/CardPage';
import { ContactsPage } from './Components/ContactsPage';
import { GradingPage } from './Components/GradingPage';
import { NewContentPage } from './Components/NewContentPage';
import { PacksPage } from './Components/PacksPage';
import { PreorderPage } from './Components/PreorderPage';
import ProductPage from './Components/ProductPage';
import CheckoutPage from "./Components/CheckoutPage";
import ConfirmationPage from "./Components/ConfirmationPage";
import CartDrawer from "./Components/CartDrawer";
import styled from "styled-components";
import { useCart } from "./context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

<Elements stripe={stripePromise}>
  <App />
</Elements>

const FloatingCartButton = styled.button`
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
  box-shadow: 0px 2px 10px rgba(0,0,0,0.2);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  &:hover { transform: scale(1.05); }
`;

function App() {
  const { openCart } = useCart();

  return (
    <>
      {/* Floating trigger */}
      <FloatingCartButton onClick={openCart}>🛒 Cart</FloatingCartButton>

      {/* Drawer lives here */}
      <CartDrawer />

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
        {/* /cart route optional now; the drawer replaces it */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order/:orderId" element={<ConfirmationPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
