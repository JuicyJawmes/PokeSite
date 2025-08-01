import React from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

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

const BackButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  text-decoration: underline;
`;

const CartItem = styled.div`
  background: #1e1855;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 2;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  background: white;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const RemoveButton = styled.button`
  background: #ff5252;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;
`;

const Total = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
  margin-top: 2rem;
`;

const CheckoutButton = styled(Link)`
  display: block;
  margin: 2rem auto 0 auto;
  padding: 12px 24px;
  background: #fff700;
  color: black;
  font-weight: bold;
  text-align: center;
  border-radius: 10px;
  text-decoration: none;
  width: fit-content;
`;

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => {
    const price =
      typeof item.price === "string"
        ? parseFloat(item.price.replace(/[^0-9.]/g, ""))
        : item.price;

    const validPrice = isNaN(price) ? 0 : price;
    const quantity = item.quantity || 1;

    return sum + validPrice * quantity;
  }, 0);

  return (
    <PageWrapper>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>

      <Title>Your Cart</Title>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => {
            const price =
              typeof item.price === "string"
                ? parseFloat(item.price.replace(/[^0-9.]/g, ""))
                : item.price;

            const validPrice = isNaN(price) ? 0 : price;
            const quantity = item.quantity || 1;

            return (
              <CartItem key={item.id}>
                <ItemInfo>
                  <ItemImage src={item.image} alt={item.name} />
                  <ItemDetails>
                    <div>{item.name}</div>
                    <div>Price: ${validPrice.toFixed(2)}</div>
                    <div>Quantity: {quantity}</div>
                  </ItemDetails>
                </ItemInfo>
                <RemoveButton onClick={() => removeFromCart(item.id)}>
                  Remove
                </RemoveButton>
              </CartItem>
            );
          })}

          <Total>Total: ${totalPrice.toFixed(2)}</Total>
          <CheckoutButton to="/checkout">Proceed to Checkout</CheckoutButton>
        </>
      )}
    </PageWrapper>
  );
};

export default CartPage;
