
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
console.log("CheckoutPage component loaded");

const PageWrapper = styled.div`
  padding: 2rem;
  background: #030f2d;
  min-height: 100vh;
  color: white;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 12px;
  background: #fff700;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🧾 You could validate/save payment info here.
    navigate("/confirmation");
  };

  if (cartItems.length === 0) {
    return <PageWrapper><Title>Your cart is empty.</Title></PageWrapper>;
  }

  return (
    <PageWrapper>
      <Title>Checkout</Title>
      <Form onSubmit={handleSubmit}>
        <Input name="name" placeholder="Full Name" required onChange={handleChange} />
        <Input name="address" placeholder="Shipping Address" required onChange={handleChange} />
        <Input name="cardNumber" placeholder="Card Number" required onChange={handleChange} />
        <Input name="expiry" placeholder="MM/YY" required onChange={handleChange} />
        <Input name="cvv" placeholder="CVV" required onChange={handleChange} />
        <Button type="submit">Place Order</Button>
      </Form>
    </PageWrapper>
  );
};

export default CheckoutPage;
