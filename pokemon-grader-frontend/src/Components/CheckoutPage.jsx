import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import valid from "card-validator";

const Title = styled.h1`
  text-align: center;
`;

const Label = styled.label`
  font-weight: bold;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  background-color: #030f2d;
  color: white;
`;

const CheckoutLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;


const FormSection = styled.form`
  width: 60%; /* Or 55% */
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SummaryCard = styled.div`
  width: 35%;
  height: 500px; /* <-- you can adjust this manually */
  padding: 1.5rem;
  background: white;
  color: black;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  align-self: flex-start;
  overflow-y: auto; /* scrolls if content overflows */
  margin-top: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;  // pushes top & bottom sections apart
  min-height: 400px;               // ensures enough space to push the totals downward
`;


const Section = styled.div`
  background-color: #061a3a;
  padding: 1.2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background: #f8f8f8;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem;
  background: #f8f8f8;
  border: 1px solid #ccc;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 1rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
`;

const HalfInput = styled(Input)`
  flex: 1;
`;

const HalfSelect = styled(Select)`
  flex: 1;
`;

const states = [
  "", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN",
  "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
  "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT",
  "VT", "VA", "WA", "WV", "WI", "WY"
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [cardValid, setCardValid] = useState(true);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    shippingStreet: "", shippingCity: "", shippingState: "", shippingZip: "",
    billingStreet: "", billingCity: "", billingState: "", billingZip: "",
    cardNumber: "", expiry: "", cvv: "",
  });
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "cardNumber") setCardValid(valid.number(value).isValid);
  };

  const isValidZip = (zip) => /^\d{5}$/.test(zip);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    const required = [
      "email", "phone", "name", "shippingStreet", "shippingCity", "shippingState",
      "shippingZip", "cardNumber", "expiry", "cvv"
    ];
    if (useDifferentBilling)
      required.push("billingStreet", "billingCity", "billingState", "billingZip");
    const emptyFields = required.some((field) => !formData[field]);
    const invalidZips =
      !isValidZip(formData.shippingZip) ||
      (useDifferentBilling && !isValidZip(formData.billingZip));
    if (emptyFields || invalidZips) return;
    navigate("/confirmation");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const FLAT_SHIPPING_RATE = 1.99;
  const FREE_SHIPPING_THRESHOLD = 50;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
  const grandTotal = (subtotal + shipping).toFixed(2);

  if (cartItems.length === 0) {
    return <PageWrapper><Title>Your cart is empty.</Title></PageWrapper>;
  }

  return (
    <PageWrapper>
      <CheckoutLayout>
        <FormSection onSubmit={handleSubmit}>
          <Title>Checkout</Title>

          <Section>
            <Label>Contact Information</Label>
            <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          </Section>

          <Section>
            <Label>Shipping Address</Label>
            <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            <Input name="shippingStreet" placeholder="Street" value={formData.shippingStreet} onChange={handleChange} />
            <Input name="shippingCity" placeholder="City" value={formData.shippingCity} onChange={handleChange} />
            <Row>
              <HalfSelect name="shippingState" value={formData.shippingState} onChange={handleChange}>
                {states.map(state => <option key={state} value={state}>{state}</option>)}
              </HalfSelect>
              <HalfInput name="shippingZip" placeholder="ZIP Code" value={formData.shippingZip} onChange={handleChange} />
            </Row>
          </Section>

          <Section>
            <CheckboxLabel>
              <input type="checkbox" checked={useDifferentBilling} onChange={() => setUseDifferentBilling(!useDifferentBilling)} />
              Billing address is different
            </CheckboxLabel>
            {useDifferentBilling && (
              <>
                <Input name="billingStreet" placeholder="Street" value={formData.billingStreet} onChange={handleChange} />
                <Input name="billingCity" placeholder="City" value={formData.billingCity} onChange={handleChange} />
                <Row>
                  <HalfSelect name="billingState" value={formData.billingState} onChange={handleChange}>
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                  </HalfSelect>
                  <HalfInput name="billingZip" placeholder="ZIP Code" value={formData.billingZip} onChange={handleChange} />
                </Row>
              </>
            )}
          </Section>

          <Section>
            <Label>Payment Information</Label>
            <Input name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} />
            <Row>
              <HalfInput name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleChange} />
              <HalfInput name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} />
            </Row>
          </Section>

          <Button type="submit">Place Order</Button>
        </FormSection>

        <SummaryCard>
  <div>
    <h2>Order Summary</h2>
    {cartItems.map(item => (
      <div key={item.id}>
        {item.name} x{item.quantity || 1} – ${(item.price * (item.quantity || 1)).toFixed(2)}
      </div>
    ))}
  </div>

  <div>
    <TotalRow><span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span></TotalRow>
    <TotalRow><span>Shipping:</span> <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></TotalRow>
    <TotalRow><span>Grand Total:</span> <span>${grandTotal}</span></TotalRow>
  </div>
</SummaryCard>

      </CheckoutLayout>
    </PageWrapper>
  );
};

export default CheckoutPage;
