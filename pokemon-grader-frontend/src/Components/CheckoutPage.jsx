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
  font-size: 1.2rem;
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
  font-size: 1.3rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 32vw;
  align-self: center;
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: 200vh;
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
  width: 60%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SummaryCard = styled.div`
  width: 35%;
  height: 500px; 
  padding: 1.5rem;
  background: white;
  color: black;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  align-self: flex-start;
  overflow-y: auto;
  margin-top: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 400px;
  margin-left: -6rem;
`;

const Section = styled.div`
  background-color: #061a3a;
  padding: 1.2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  align-self: center;
`;
const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 1);
  font-size: 1.2rem;
  background: #f8f8f8;
  color: #000;            /* <- make text black */
  caret-color: #000;      /* cursor color */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  width: 95%;

  &::placeholder { color: #555; }   /* placeholder color */

  /* Chrome/Safari autofill fix */
  &:-webkit-autofill {
    -webkit-text-fill-color: #000;
    box-shadow: 0 0 0px 1000px #f8f8f8 inset;
    transition: background-color 9999s ease-out 0s;
  }
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem;
  background: #f8f8f8;
  border: 1px solid #ccc;
  color: #000;           /* <- make text black */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  width: 100%;

  option { color: #000; background: #fff; }
`;

// const Input = styled.input`
//   padding: 12px;
//   border-radius: 8px;
//   border: 1px solid rgba(0, 0, 0, 1);
//   font-size: 1.2rem;
//   background: #f8f8f8;
//   box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
//   width: 95%;
// `;

// const Select = styled.select`
//   padding: 12px;
//   border-radius: 8px;
//   font-size: 1rem;
//   background: #f8f8f8;
//   border: 1px solid #ccc;
//   box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
//   width: 100%;
// `;

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
  width: 150px; 
`;

const HalfSelect = styled(Select)`
  width: 150px; 
`;

const BackButton = styled(Button)`
  position: absolute;
  top: 20px;
  left: 20px;
  background: transparent;
  color: white;
  border: 2px solid #fff700;
  width: auto;

  &:hover {
    background: #fff700;
    color: black;
  }
`;


const states = [
  "", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN",
  "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
  "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT",
  "VT", "VA", "WA", "WV", "WI", "WY"
];

/* Example state tax rates (placeholders). Replace with your real rates when ready. */
const STATE_TAX_RATES = {
  AL: 0.04,  AK: 0,     AZ: 0.056, AR: 0.065,
  CA: 0.0725,CO: 0.029, CT: 0.0635,DE: 0,
  FL: 0.06,  GA: 0.04,  HI: 0.04,  ID: 0.06,
  IL: 0.0625,IN: 0.07,  IA: 0.06,  KS: 0.065,
  KY: 0.06,  LA: 0.0445,ME: 0.055, MD: 0.06,
  MA: 0.0625,MI: 0.06,  MN: 0.0688,MS: 0.07,
  MO: 0.0423,MT: 0,     NE: 0.055, NV: 0.0685,
  NH: 0,     NJ: 0.0663,NM: 0.0513,NY: 0.04,
  NC: 0.0475,ND: 0.05,  OH: 0.0575,OK: 0.045,
  OR: 0,     PA: 0.06,  RI: 0.07,  SC: 0.06,
  SD: 0.045, TN: 0.07,  TX: 0.0625,UT: 0.0485,
  VT: 0.06,  VA: 0.043, WA: 0.065, WV: 0.06,
  WI: 0.05,  WY: 0
};

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

  // ---- Totals + Shipping + Tax ----
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const FLAT_SHIPPING_RATE = 1.99;
  const FREE_SHIPPING_THRESHOLD = 50;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;

  const state = formData.shippingState || "";
  const taxRate = STATE_TAX_RATES[state] ?? 0;     // default to 0 if not selected
  const tax = subtotal * taxRate;

  const grandTotal = (subtotal + shipping + tax).toFixed(2);

  if (cartItems.length === 0) {
    return <PageWrapper><Title>Your cart is empty.</Title></PageWrapper>;
  }

  return (
    <PageWrapper>
      <CheckoutLayout>
        <FormSection onSubmit={handleSubmit}>
        <BackButton type="button" onClick={() => navigate(-1)}>
          ← Back
        </BackButton>
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
              <input
                type="checkbox"
                checked={useDifferentBilling}
                onChange={() => setUseDifferentBilling(!useDifferentBilling)}
              />
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
            <Input
              name="cardName"
              placeholder="Name on Card"
              value={formData.cardName}
              onChange={handleChange}
            />
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
            <TotalRow>
              <span>Tax{taxRate ? ` (${(taxRate * 100).toFixed(2)}%)` : ""}:</span>
              <span>${tax.toFixed(2)}</span>
            </TotalRow>
            <TotalRow><span>Grand Total:</span> <span>${grandTotal}</span></TotalRow>
          </div>
        </SummaryCard>
      </CheckoutLayout>
    </PageWrapper>
  );
};

export default CheckoutPage;
