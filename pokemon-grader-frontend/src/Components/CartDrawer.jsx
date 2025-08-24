import React, { useMemo } from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  opacity: ${(p) => (p.open ? 1 : 0)};
  pointer-events: ${(p) => (p.open ? "auto" : "none")};
  transition: opacity 200ms ease;
  z-index: 999;
`;

const Panel = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: min(420px, 90vw);
  height: 100vh;
  background: #1e1855;
  color: white;
  display: flex;
  flex-direction: column;
  transform: translateX(${(p) => (p.open ? "0%" : "100%")});
  transition: transform 260ms ease;
  z-index: 1000;
  box-shadow: -8px 0 24px rgba(0,0,0,0.35);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  background: #2a2380;
  font-weight: 800;
`;

const CloseBtn = styled.button`
  border: none;
  background: transparent;
  color: white;
  font-size: 1.4rem;
  cursor: pointer;
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.div`
  background: #2b2670;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Img = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  background: white;
  border-radius: 8px;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.95rem;
`;

const Remove = styled.button`
  background: #ff5252;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
`;

const Footer = styled.div`
  padding: 14px 18px;
  border-top: 1px solid rgba(255,255,255,0.15);
  background: #201a61;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: ${(p) => (p.bold ? 800 : 600)};
  font-size: ${(p) => (p.big ? "1.15rem" : "1rem")};
`;

const CTA = styled.button`
  margin-top: 6px;
  padding: 12px 16px;
  background: #fff700;
  color: black;
  font-weight: 900;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const Empty = styled.div`
  opacity: 0.8;
  text-align: center;
  margin-top: 24px;
`;

const CartDrawer = () => {
  const { cartItems, removeFromCart, isCartOpen, closeCart } = useCart();
  const navigate = useNavigate();

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price || 0) * (item.quantity || 1),
        0
      ),
    [cartItems]
  );

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <>
      <Overlay open={isCartOpen} onClick={closeCart} />
      <Panel open={isCartOpen} aria-hidden={!isCartOpen}>
        <Header>
          <span>🛒 Your Cart</span>
          <CloseBtn onClick={closeCart} aria-label="Close cart">×</CloseBtn>
        </Header>

        <Body>
          {cartItems.length === 0 ? (
            <Empty>Your cart is empty.</Empty>
          ) : (
            cartItems.map((item) => {
              const line = Number(item.price || 0) * (item.quantity || 1);
              return (
                <Item key={item.id}>
                  <Left>
                    <Img src={item.image} alt={item.name} />
                    <Meta>
                      <div style={{ fontWeight: 800 }}>{item.name}</div>
                      <div>
                        ${Number(item.price || 0).toFixed(2)} × {item.quantity || 1}
                      </div>
                    </Meta>
                  </Left>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ fontWeight: 800 }}>
                      ${line.toFixed(2)}
                    </div>
                    <Remove onClick={() => removeFromCart(item.id)}>Remove</Remove>
                  </div>
                </Item>
              );
            })
          )}
        </Body>

        <Footer>
          <Row>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </Row>
          <Row bold big>
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </Row>
          <CTA onClick={handleCheckout} disabled={cartItems.length === 0}>
            Proceed to Checkout
          </CTA>
        </Footer>
      </Panel>
    </>
  );
};

export default CartDrawer;
