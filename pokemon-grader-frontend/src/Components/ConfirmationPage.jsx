// src/pages/ConfirmationPage.jsx
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PageWrapper = styled.div`
  padding: 2rem;
  background: #030f2d;
  min-height: 100vh;
  color: white;
  text-align: center;
`;

const ConfirmationPage = () => {
  return (
    <PageWrapper>
      <h1>🎉 Order Confirmed!</h1>
      <p>Your order has been successfully placed. Thank you!</p>
      <Link to="/" style={{ color: "#fff700", fontWeight: "bold" }}>Return Home</Link>
    </PageWrapper>
  );
};

export default ConfirmationPage;
