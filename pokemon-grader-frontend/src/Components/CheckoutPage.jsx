// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import valid from "card-validator";

// /* --- Simple API helpers --- */
// const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:8080";

// async function quoteOrder(lines) {
//   const res = await fetch(`${API_BASE}/api/orders/quote`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ items: lines }),
//   });
//   if (!res.ok) throw new Error(`Quote failed: ${res.status}`);
//   return res.json(); // { items, subtotal, tax, shipping, total }
// }

// async function createOrder(email, lines) {
//   const res = await fetch(`${API_BASE}/api/orders`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, items: lines }),
//   });
//   if (!res.ok) throw new Error(await res.text());
//   return res.json(); // Order
// }

// /* --- Styles --- */
// const Title = styled.h1`
//   text-align: center;
// `;

// const Label = styled.label`
//   font-weight: bold;
//   font-size: 1.2rem;
// `;

// const CheckboxLabel = styled.label`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// const Button = styled.button`
//   padding: 12px;
//   background: #fff700;
//   color: black;
//   font-weight: bold;
//   font-size: 1.3rem;
//   border: none;
//   border-radius: 10px;
//   cursor: pointer;
//   width: 32vw;
//   align-self: center;
//   &:disabled { opacity: 0.6; cursor: not-allowed; }
// `;

// const PageWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: flex-start;
//   width: 100vw;
//   height: 200vh;
//   background-color: #030f2d;
//   color: white;
// `;

// const CheckoutLayout = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 100%;
//   height: 100%;
// `;

// const FormSection = styled.form`
//   width: 60%;
//   padding: 2rem;
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
// `;

// const SummaryCard = styled.div`
//   width: 35%;
//   height: 500px;
//   padding: 1.5rem;
//   background: white;
//   color: black;
//   border-radius: 12px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//   align-self: flex-start;
//   overflow-y: auto;
//   margin-top: 12rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   min-height: 400px;
//   margin-left: -6rem;
// `;

// const Section = styled.div`
//   background-color: #061a3a;
//   padding: 1.2rem;
//   border-radius: 12px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   width: 50%;
//   align-self: center;
// `;

// const Input = styled.input`
//   padding: 12px;
//   border-radius: 8px;
//   border: 1px solid rgba(0, 0, 0, 1);
//   font-size: 1.2rem;
//   background: #f8f8f8;
//   color: #000;
//   caret-color: #000;
//   box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
//   width: 95%;

//   &::placeholder { color: #555; }

//   &:-webkit-autofill {
//     -webkit-text-fill-color: #000;
//     box-shadow: 0 0 0px 1000px #f8f8f8 inset;
//     transition: background-color 9999s ease-out 0s;
//   }
// `;

// const Select = styled.select`
//   padding: 12px;
//   border-radius: 8px;
//   font-size: 1rem;
//   background: #f8f8f8;
//   border: 1px solid #ccc;
//   color: #000;
//   box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
//   width: 100%;
//   option { color: #000; background: #fff; }
// `;

// const TotalRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   font-weight: bold;
//   font-size: 1.1rem;
//   margin-top: 1rem;
// `;

// const Row = styled.div`
//   display: flex;
//   gap: 1rem;
// `;

// const HalfInput = styled(Input)` width: 150px; `;
// const HalfSelect = styled(Select)` width: 150px; `;

// const BackButton = styled(Button)`
//   position: absolute;
//   top: 20px;
//   left: 20px;
//   background: transparent;
//   color: white;
//   border: 2px solid #fff700;
//   width: auto;
//   &:hover { background: #fff700; color: black; }
// `;

// /* States for selects */
// const states = [
//   "", "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN",
//   "IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH",
//   "NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT",
//   "VT","VA","WA","WV","WI","WY"
// ];

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const { cartItems /*, clearCart */ } = useCart();

//   const [cardValid, setCardValid] = useState(true);
//   const [formData, setFormData] = useState({
//     name: "", email: "", phone: "",
//     shippingStreet: "", shippingCity: "", shippingState: "", shippingZip: "",
//     billingStreet: "", billingCity: "", billingState: "", billingZip: "",
//     cardNumber: "", expiry: "", cvv: "",
//   });
//   const [useDifferentBilling, setUseDifferentBilling] = useState(false);
//   const [attemptedSubmit, setAttemptedSubmit] = useState(false);

//   // Backend totals / status
//   const [quote, setQuote] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState(null);

//   // Build server lines from cart
//   const lines = cartItems.map(i => ({ productId: i.id, quantity: i.quantity || 1 }));

//   // Fetch server quote when cart changes
//   useEffect(() => {
//     if (lines.length === 0) { setQuote(null); return; }
//     let cancelled = false;
//     (async () => {
//       try {
//         setLoading(true);
//         setErr(null);
//         const q = await quoteOrder(lines);
//         if (!cancelled) setQuote(q);
//       } catch (e) {
//         if (!cancelled) setErr(e.message || "Quote failed");
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     })();
//     return () => { cancelled = true; };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [JSON.stringify(lines)]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (name === "cardNumber") setCardValid(valid.number(value).isValid);
//   };

//   const isValidZip = (zip) => /^\d{5}$/.test(zip);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setAttemptedSubmit(true);

//     const required = [
//       "email", "phone", "name", "shippingStreet", "shippingCity",
//       "shippingState", "shippingZip", "cardNumber", "expiry", "cvv"
//     ];
//     if (useDifferentBilling)
//       required.push("billingStreet", "billingCity", "billingState", "billingZip");

//     const emptyFields = required.some((field) => !formData[field]);
//     const invalidZips =
//       !isValidZip(formData.shippingZip) ||
//       (useDifferentBilling && !isValidZip(formData.billingZip));

//     if (emptyFields || invalidZips) return;

//     try {
//       setLoading(true);
//       setErr(null);
//       const order = await createOrder(formData.email, lines);
//       clearCart?.();
//       navigate(`/order/${order.id}`); 
//     } catch (e) {
//       // e.g. 409 insufficient_stock:<productId>
//       setErr(typeof e === "string" ? e : e.message || "Order failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fallback totals while quote loads
//   const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
//   const subtotal = quote?.subtotal ?? cartSubtotal;
//   const shipping = quote?.shipping ?? 0;
//   const tax = quote?.tax ?? 0;
//   const grandTotal = (quote?.total ?? (subtotal + shipping + tax)).toFixed(2);

//   if (cartItems.length === 0) {
//     return <PageWrapper><Title>Your cart is empty.</Title></PageWrapper>;
//   }

//   return (
//     <PageWrapper>
//       <CheckoutLayout>
//         <FormSection onSubmit={handleSubmit}>
//           <BackButton type="button" onClick={() => navigate(-1)}>
//             ← Back
//           </BackButton>
//           <Title>Checkout</Title>

//           {loading && <div style={{ color: "#9ad0ff" }}>Calculating totals…</div>}
//           {err && <div style={{ color: "#ff6b6b" }}>Error: {err}</div>}

//           <Section>
//             <Label>Contact Information</Label>
//             <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//             <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
//           </Section>

//           <Section>
//             <Label>Shipping Address</Label>
//             <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
//             <Input name="shippingStreet" placeholder="Street" value={formData.shippingStreet} onChange={handleChange} />
//             <Input name="shippingCity" placeholder="City" value={formData.shippingCity} onChange={handleChange} />
//             <Row>
//               <HalfSelect name="shippingState" value={formData.shippingState} onChange={handleChange}>
//                 {states.map(state => <option key={state} value={state}>{state}</option>)}
//               </HalfSelect>
//               <HalfInput name="shippingZip" placeholder="ZIP Code" value={formData.shippingZip} onChange={handleChange} />
//             </Row>
//           </Section>

//           <Section>
//             <CheckboxLabel>
//               <input
//                 type="checkbox"
//                 checked={useDifferentBilling}
//                 onChange={() => setUseDifferentBilling(!useDifferentBilling)}
//               />
//               Billing address is different
//             </CheckboxLabel>
//             {useDifferentBilling && (
//               <>
//                 <Input name="billingStreet" placeholder="Street" value={formData.billingStreet} onChange={handleChange} />
//                 <Input name="billingCity" placeholder="City" value={formData.billingCity} onChange={handleChange} />
//                 <Row>
//                   <HalfSelect name="billingState" value={formData.billingState} onChange={handleChange}>
//                     {states.map(state => <option key={state} value={state}>{state}</option>)}
//                   </HalfSelect>
//                   <HalfInput name="billingZip" placeholder="ZIP Code" value={formData.billingZip} onChange={handleChange} />
//                 </Row>
//               </>
//             )}
//           </Section>

//           <Section>
//             <Label>Payment Information</Label>
//             <Input
//               name="cardName"
//               placeholder="Name on Card"
//               value={formData.cardName || ""}
//               onChange={handleChange}
//             />
//             <Input
//               name="cardNumber"
//               placeholder="Card Number"
//               value={formData.cardNumber}
//               onChange={handleChange}
//               aria-invalid={!cardValid}
//             />
//             <Row>
//               <HalfInput name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleChange} />
//               <HalfInput name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} />
//             </Row>
//           </Section>

//           <Button type="submit" disabled={loading}>
//             {loading ? "Processing..." : "Place Order"}
//           </Button>
//         </FormSection>

//         <SummaryCard>
//           <div>
//             <h2>Order Summary</h2>
//             {cartItems.map(item => (
//               <div key={item.id}>
//                 {item.name} x{item.quantity || 1} – ${(item.price * (item.quantity || 1)).toFixed(2)}
//               </div>
//             ))}
//           </div>

//           <div>
//             <TotalRow><span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span></TotalRow>
//             <TotalRow><span>Shipping:</span> <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></TotalRow>
//             <TotalRow><span>Tax:</span><span>${tax.toFixed(2)}</span></TotalRow>
//             <TotalRow><span>Grand Total:</span> <span>${grandTotal}</span></TotalRow>
//           </div>
//         </SummaryCard>
//       </CheckoutLayout>
//     </PageWrapper>
//   );
// };

// export default CheckoutPage;
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import valid from "card-validator";

/* --- Simple API helpers --- */
const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:8080";

async function quoteOrder(lines) {
  const res = await fetch(`${API_BASE}/api/orders/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: lines }),
  });
  if (!res.ok) throw new Error(`Quote failed: ${res.status}`);
  return res.json(); // { items, subtotal, tax, shipping, total }
}

async function createOrder(email, lines, shippingAddress, billingAddress) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, items: lines, shippingAddress, billingAddress }),
  });
  if (!res.ok) {
    const text = await res.text();
    try {
      const j = JSON.parse(text);
      if (j.error === "INSUFFICIENT_STOCK") {
        throw new Error(
          `Not enough stock for “${j.name}”. Available: ${j.available}, requested: ${j.requested}.`
        );
      }
      throw new Error(j.message || text || `Order failed: ${res.status}`);
    } catch {
      throw new Error(text || `Order failed: ${res.status}`);
    }
  }
  return res.json();
}

/* --- Styles --- */
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
  &:disabled { opacity: 0.6; cursor: not-allowed; }
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
  color: #000;
  caret-color: #000;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  width: 95%;

  &::placeholder { color: #555; }

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
  color: #000;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  width: 100%;
  option { color: #000; background: #fff; }
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

const HalfInput = styled(Input)` width: 150px; `;
const HalfSelect = styled(Select)` width: 150px; `;

const BackButton = styled(Button)`
  position: absolute;
  top: 20px;
  left: 20px;
  background: transparent;
  color: white;
  border: 2px solid #fff700;
  width: auto;
  &:hover { background: #fff700; color: black; }
`;

/* States for selects */
const states = [
  "", "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN",
  "IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH",
  "NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT",
  "VT","VA","WA","WV","WI","WY"
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems /*, clearCart */ } = useCart();

  const [cardValid, setCardValid] = useState(true);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    shippingStreet: "", shippingCity: "", shippingState: "", shippingZip: "",
    billingStreet: "", billingCity: "", billingState: "", billingZip: "",
    cardNumber: "", expiry: "", cvv: "",
  });
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  // Backend totals / status
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // Build server lines from cart
  const lines = cartItems.map(i => ({ productId: i.id, quantity: i.quantity || 1 }));

  // Fetch server quote when cart changes
  useEffect(() => {
    if (lines.length === 0) { setQuote(null); return; }
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const q = await quoteOrder(lines);
        if (!cancelled) setQuote(q);
      } catch (e) {
        if (!cancelled) setErr(e.message || "Quote failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(lines)]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "cardNumber") setCardValid(valid.number(value).isValid);
  };

  const isValidZip = (zip) => /^\d{5}$/.test(zip);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    const required = [
      "email", "phone", "name", "shippingStreet", "shippingCity",
      "shippingState", "shippingZip", "cardNumber", "expiry", "cvv"
    ];
    if (useDifferentBilling)
      required.push("billingStreet", "billingCity", "billingState", "billingZip");

    const emptyFields = required.some((field) => !formData[field]);
    const invalidZips =
      !isValidZip(formData.shippingZip) ||
      (useDifferentBilling && !isValidZip(formData.billingZip));

    if (emptyFields || invalidZips) return;

    try {
      setLoading(true);
      setErr(null);
      const order = await createOrder(formData.email, lines);
      clearCart?.();
      navigate(`/order/${order.id}`); 
    } catch (e) {
      // e.g. 409 insufficient_stock:<productId>
      setErr(typeof e === "string" ? e : e.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  // Fallback totals while quote loads
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const subtotal = quote?.subtotal ?? cartSubtotal;
  const shipping = quote?.shipping ?? 0;
  const tax = quote?.tax ?? 0;
  const grandTotal = (quote?.total ?? (subtotal + shipping + tax)).toFixed(2);

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

          {loading && <div style={{ color: "#9ad0ff" }}>Calculating totals…</div>}
          {err && <div style={{ color: "#ff6b6b" }}>Error: {err}</div>}

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
              value={formData.cardName || ""}
              onChange={handleChange}
            />
            <Input
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
              aria-invalid={!cardValid}
            />
            <Row>
              <HalfInput name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleChange} />
              <HalfInput name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} />
            </Row>
          </Section>

          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Place Order"}
          </Button>
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
            <TotalRow><span>Tax:</span><span>${tax.toFixed(2)}</span></TotalRow>
            <TotalRow><span>Grand Total:</span> <span>${grandTotal}</span></TotalRow>
          </div>
        </SummaryCard>
      </CheckoutLayout>
    </PageWrapper>
  );
};

export default CheckoutPage;
