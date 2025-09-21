// // src/pages/CheckoutPage.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { quoteOrder, createOrder } from "../api/orders";
// import { createPaymentIntent } from "../api/payments";

// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// /* --- styles --- */
// const Title = styled.h1` text-align: center; `;
// const Label = styled.label` font-weight: bold; font-size: 1.2rem; `;
// const CheckboxLabel = styled.label` display: flex; align-items: center; gap: 0.5rem; `;
// const Button = styled.button`
//   padding: 12px; background: #fff700; color: black; font-weight: bold; font-size: 1.3rem;
//   border: none; border-radius: 10px; cursor: pointer; width: 32vw; align-self: center;
//   &:disabled { opacity: 0.6; cursor: not-allowed; }
// `;
// const PageWrapper = styled.div`
//   display: flex; justify-content: center; align-items: flex-start; width: 100vw; min-height: 100vh;
//   background-color: #030f2d; color: white; padding-bottom: 4rem;
// `;
// const CheckoutLayout = styled.div` display: flex; flex-direction: row; width: 100%; `;
// const FormSection = styled.form` width: 60%; padding: 2rem; display: flex; flex-direction: column; gap: 2rem; `;
// const SummaryCard = styled.div`
//   width: 35%; height: 500px; padding: 1.5rem; background: white; color: black; border-radius: 12px;
//   box-shadow: 0 4px 12px rgba(0,0,0,.15); align-self: flex-start; overflow-y: auto; margin-top: 12rem;
//   display: flex; flex-direction: column; justify-content: space-between; min-height: 400px; margin-left: -6rem;
// `;
// const Section = styled.div`
//   background-color: #061a3a; padding: 1.2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,.3);
//   display: flex; flex-direction: column; gap: 1rem; width: 50%; align-self: center;
// `;
// const Input = styled.input`
//   padding: 12px; border-radius: 8px; border: 1px solid rgba(0,0,0,1); font-size: 1.2rem; background: #f8f8f8;
//   color: #000; caret-color: #000; box-shadow: 0 2px 6px rgba(0,0,0,.08); width: 95%;
//   &::placeholder { color: #555; }
//   &:-webkit-autofill { -webkit-text-fill-color: #000; box-shadow: 0 0 0px 1000px #f8f8f8 inset; transition: background-color 9999s; }
// `;
// const Select = styled.select`
//   padding: 12px; border-radius: 8px; font-size: 1rem; background: #f8f8f8; border: 1px solid #ccc; color: #000;
//   box-shadow: 0 2px 6px rgba(0,0,0,.08); width: 100%;
//   option { color:#000; background:#fff; }
// `;
// const TotalRow = styled.div` display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1rem; margin-top: 1rem; `;
// const Row = styled.div` display: flex; gap: 1rem; `;
// const HalfInput = styled(Input)` width: 150px; `;
// const HalfSelect = styled(Select)` width: 150px; `;
// const BackButton = styled(Button)`
//   position: absolute; top: 20px; left: 20px; background: transparent; color: white; border: 2px solid #fff700; width: auto;
//   &:hover { background: #fff700; color: black; }
// `;

// /* States for selects */
// const states = ["","AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN",
// "IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY",
// "NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

// /* ---------------- Outer: create PaymentIntent & provide Elements ---------------- */
// export default function CheckoutPage() {
//   const { cartItems } = useCart();

//   const lines = useMemo(
//     () => cartItems.map(i => ({ productId: i.id, quantity: i.quantity || 1 })),
//     [cartItems]
//   );

//   const [clientSecret, setClientSecret] = useState(null);
//   const [piErr, setPiErr] = useState(null);
//   const [piLoading, setPiLoading] = useState(false);

//   useEffect(() => {
//     let cancelled = false;
//     if (lines.length === 0) { setClientSecret(null); return; }

//     (async () => {
//       try {
//         setPiLoading(true);
//         setPiErr(null);
//         const { clientSecret } = await createPaymentIntent(lines);
//         if (!cancelled) setClientSecret(clientSecret);
//       } catch (e) {
//         if (!cancelled) setPiErr(e.message || "Failed to start payment");
//       } finally {
//         if (!cancelled) setPiLoading(false);
//       }
//     })();

//     return () => { cancelled = true; };
//   }, [JSON.stringify(lines)]);

//   if (cartItems.length === 0) {
//     return <PageWrapper><Title>Your cart is empty.</Title></PageWrapper>;
//   }
//   if (piErr) {
//     return <PageWrapper><Title style={{color:"#ff6b6b"}}>Error: {piErr}</Title></PageWrapper>;
//   }
//   if (piLoading || !clientSecret) {
//     return <PageWrapper><Title>Loading payment…</Title></PageWrapper>;
//   }

//   return (
//     <Elements
//       stripe={stripePromise}
//       options={{ clientSecret, appearance: { theme: "stripe" } }}
//       key={clientSecret} // ensure rerender if the intent changes
//     >
//       <CheckoutInner lines={lines} />
//     </Elements>
//   );
// }

// /* ---------------- Inner: render form, quote, confirm payment, create order ---------------- */
// function CheckoutInner({ lines }) {
//   const navigate = useNavigate();
//   const { cartItems, clearCart } = useCart();

//   const [formData, setFormData] = useState({
//     name: "", email: "", phone: "",
//     shippingStreet: "", shippingCity: "", shippingState: "", shippingZip: "",
//     billingStreet: "", billingCity: "", billingState: "", billingZip: "",
//   });
//   const [useDifferentBilling, setUseDifferentBilling] = useState(false);

//   const [quote, setQuote] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState(null);

//   useEffect(() => {
//     let cancelled = false;
//     if (!lines.length) { setQuote(null); return; }
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
//   }, [JSON.stringify(lines)]);

//   const stripe = useStripe();
//   const elements = useElements();

//   const isValidZip = (zip) => /^\d{5}$/.test(zip);
//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErr(null);

//     const required = ["email","phone","name","shippingStreet","shippingCity","shippingState","shippingZip"];
//     if (useDifferentBilling) required.push("billingStreet","billingCity","billingState","billingZip");
//     const empty = required.some(f => !formData[f]);
//     const invalidZips = !isValidZip(formData.shippingZip) ||
//       (useDifferentBilling && !isValidZip(formData.billingZip));
//     if (empty || invalidZips) return;

//     if (!stripe || !elements) {
//       setErr("Payment not ready. Please wait a moment and try again.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Confirm the PaymentIntent created by the outer component
//       const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         redirect: "if_required",
//       });

//       if (error) {
//         setErr(error.message || "Payment failed");
//         setLoading(false);
//         return;
//       }

//       if (paymentIntent && (paymentIntent.status === "succeeded" || paymentIntent.status === "processing")) {
//         const shippingAddress = {
//           name: formData.name,
//           street: formData.shippingStreet,
//           city: formData.shippingCity,
//           state: formData.shippingState,
//           zip: formData.shippingZip,
//           phone: formData.phone
//         };
//         const billingAddress = useDifferentBilling ? {
//           name: formData.name,
//           street: formData.billingStreet,
//           city: formData.billingCity,
//           state: formData.billingState,
//           zip: formData.billingZip,
//           phone: formData.phone
//         } : shippingAddress;

//         const order = await createOrder(formData.email, lines, shippingAddress, billingAddress);
//         clearCart?.();
//         navigate(`/order/${order.id}`);
//       } else {
//         setErr(`Payment status: ${paymentIntent?.status || "unknown"}`);
//       }
//     } catch (e2) {
//       setErr(e2?.message || "Checkout failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const subtotal = quote?.subtotal ?? cartItems.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
//   const shipping = quote?.shipping ?? 0;
//   const tax = quote?.tax ?? 0;
//   const grandTotal = (quote?.total ?? (subtotal + shipping + tax)).toFixed(2);

//   return (
//     <PageWrapper>
//       <CheckoutLayout>
//         <FormSection onSubmit={handleSubmit}>
//           <BackButton type="button" onClick={() => navigate(-1)}>← Back</BackButton>
//           <Title>Checkout</Title>

//           {loading && <div style={{ color: "#9ad0ff" }}>Processing…</div>}
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
//                 {states.map(s => <option key={s} value={s}>{s}</option>)}
//               </HalfSelect>
//               <HalfInput name="shippingZip" placeholder="ZIP Code" value={formData.shippingZip} onChange={handleChange} />
//             </Row>
//           </Section>

//           <Section>
//             <CheckboxLabel>
//               <input
//                 type="checkbox"
//                 checked={useDifferentBilling}
//                 onChange={() => setUseDifferentBilling(v => !v)}
//               />
//               Billing address is different
//             </CheckboxLabel>
//             {useDifferentBilling && (
//               <>
//                 <Input name="billingStreet" placeholder="Street" value={formData.billingStreet} onChange={handleChange} />
//                 <Input name="billingCity" placeholder="City" value={formData.billingCity} onChange={handleChange} />
//                 <Row>
//                   <HalfSelect name="billingState" value={formData.billingState} onChange={handleChange}>
//                     {states.map(s => <option key={s} value={s}>{s}</option>)}
//                   </HalfSelect>
//                   <HalfInput name="billingZip" placeholder="ZIP Code" value={formData.billingZip} onChange={handleChange} />
//                 </Row>
//               </>
//             )}
//           </Section>

//           <Section>
//             <Label>Payment</Label>
//             <div style={{ background:"#fff", padding:12, borderRadius:8 }}>
//               <PaymentElement options={{ layout: "accordion" }} />
//             </div>
//           </Section>

//           <Button type="submit" disabled={loading}>
//             {loading ? "Processing..." : "Pay & Place Order"}
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
//             <TotalRow><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></TotalRow>
//             <TotalRow><span>Shipping:</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></TotalRow>
//             <TotalRow><span>Tax:</span><span>${tax.toFixed(2)}</span></TotalRow>
//             <TotalRow><span>Grand Total:</span><span>${grandTotal}</span></TotalRow>
//           </div>
//         </SummaryCard>
//       </CheckoutLayout>
//     </PageWrapper>
//   );
// }
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { quoteOrder, createOrder } from "../api/orders";
import { createPaymentIntent } from "../api/payments";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

/* ---------- styles ---------- */
const Title = styled.h1` text-align: center; `;
const Label = styled.label` font-weight: bold; font-size: 1.2rem; `;
const CheckboxLabel = styled.label` display: flex; align-items: center; gap: 0.5rem; `;
const Button = styled.button`
  padding: 12px; background: #fff700; color: black; font-weight: bold; font-size: 1.3rem;
  border: none; border-radius: 10px; cursor: pointer; width: 32vw; align-self: center;
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;
const PageWrapper = styled.div`
  display: flex; justify-content: center; align-items: flex-start; width: 100vw; height: 200vh;
  background-color: #030f2d; color: white;
`;
const CheckoutLayout = styled.div` display: flex; flex-direction: row; width: 100%; height: 100%; `;
const FormSection = styled.div` width: 60%; padding: 2rem; display: flex; flex-direction: column; gap: 2rem; `;
const SummaryCard = styled.div`
  width: 35%; height: 500px; padding: 1.5rem; background: white; color: black; border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,.15); align-self: flex-start; overflow-y: auto; margin-top: 12rem;
  display: flex; flex-direction: column; justify-content: space-between; min-height: 400px; margin-left: -6rem;
`;
const Section = styled.div`
  background-color: #061a3a; padding: 1.2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,.3);
  display: flex; flex-direction: column; gap: 1rem; width: 50%; align-self: center;
`;
const Input = styled.input`
  padding: 12px; border-radius: 8px; border: 1px solid rgba(0,0,0,1); font-size: 1.2rem; background: #f8f8f8;
  color: #000; caret-color: #000; box-shadow: 0 2px 6px rgba(0,0,0,.08); width: 95%;
  &::placeholder { color: #555; }
  &:-webkit-autofill { -webkit-text-fill-color: #000; box-shadow: 0 0 0px 1000px #f8f8f8 inset; transition: background-color 9999s; }
`;
const Select = styled.select`
  padding: 12px; border-radius: 8px; font-size: 1rem; background: #f8f8f8; border: 1px solid #ccc; color: #000;
  box-shadow: 0 2px 6px rgba(0,0,0,.08); width: 100%;
  option { color:#000; background:#fff; }
`;
const TotalRow = styled.div` display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1rem; margin-top: 1rem; `;
const Row = styled.div` display: flex; gap: 1rem; `;
const HalfInput = styled(Input)` width: 150px; `;
const HalfSelect = styled(Select)` width: 150px; `;
const BackButton = styled(Button)`
  position: absolute; top: 20px; left: 20px; background: transparent; color: white; border: 2px solid #fff700; width: auto;
  &:hover { background: #fff700; color: black; }
`;

const states = ["","AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY",
"LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA",
"RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

/* ---------- Payment submitter that lives inside <Elements> so hooks work ---------- */
function PayAndPlaceOrderButton({
  email, lines, shippingAddress, billingAddress,
  onSuccess, setErr, setLoading, canSubmit, clientSecret
}) {
  const stripe = useStripe();
  const elements = useElements();

  const handleClick = async () => {
    // block if form incomplete/invalid BEFORE hitting Stripe
    if (!canSubmit) {
      setErr("Please complete all required fields and use a 5-digit ZIP.");
      return;
    }
    if (!stripe || !elements || !clientSecret) {
      setErr("Payment not ready. Please wait a moment and try again.");
      return;
    }

    try {
      setLoading(true);
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });
      if (error) {
        setErr(error.message || "Payment failed");
        return;
      }
      if (paymentIntent?.status === "succeeded") {
        const order = await createOrder(email, lines, shippingAddress, billingAddress);
        onSuccess(order);
      } else {
        setErr("Payment not completed. Please try again.");
      }
    } catch (e) {
      setErr(e?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={!stripe || !canSubmit || !clientSecret}
    >
      Pay &amp; Place Order
    </Button>
  );
}

/* ---------- Page ---------- */
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems /*, clearCart */ } = useCart();

  const lines = useMemo(
    () => cartItems.map(i => ({ productId: i.id, quantity: i.quantity || 1 })),
    [cartItems]
  );

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    shippingStreet: "", shippingCity: "", shippingState: "", shippingZip: "",
    billingStreet: "", billingCity: "", billingState: "", billingZip: "",
  });
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);

  const [quote, setQuote] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (lines.length === 0) { setQuote(null); setClientSecret(null); return; }

    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const q = await quoteOrder(lines);
        if (!cancelled) setQuote(q);

        const pi = await createPaymentIntent(lines);
        if (!cancelled) setClientSecret(pi.clientSecret);
      } catch (e) {
        if (!cancelled) setErr(e.message || "Failed to prepare payment");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [JSON.stringify(lines)]);

  const isValidZip = (zip) => /^\d{5}$/.test(zip);
  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const shippingAddress = {
    name: formData.name,
    street: formData.shippingStreet, city: formData.shippingCity,
    state: formData.shippingState, zip: formData.shippingZip, phone: formData.phone
  };
  const billingAddress = useDifferentBilling ? {
    name: formData.name,
    street: formData.billingStreet, city: formData.billingCity,
    state: formData.billingState, zip: formData.billingZip, phone: formData.phone
  } : shippingAddress;

  // validation
  const required = ["email","phone","name","shippingStreet","shippingCity","shippingState","shippingZip"];
  if (useDifferentBilling) required.push("billingStreet","billingCity","billingState","billingZip");
  const formValid =
    required.every(f => !!formData[f]) &&
    isValidZip(formData.shippingZip) &&
    (!useDifferentBilling || isValidZip(formData.billingZip));

  const subtotal = quote?.subtotal ?? cartItems.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
  const shipping = quote?.shipping ?? 0;
  const tax = quote?.tax ?? 0;
  const grandTotal = (quote?.total ?? (subtotal + shipping + tax)).toFixed(2);

  if (cartItems.length === 0) return <PageWrapper><Title>Your cart is empty.</Title></PageWrapper>;

  return (
    <PageWrapper>
      <CheckoutLayout>
        <FormSection>
          <BackButton type="button" onClick={() => navigate(-1)}>← Back</BackButton>
          <Title>Checkout</Title>

          {loading && <div style={{ color: "#9ad0ff" }}>Processing…</div>}
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
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </HalfSelect>
              <HalfInput name="shippingZip" placeholder="ZIP Code" value={formData.shippingZip} onChange={handleChange} />
            </Row>
          </Section>

          <Section>
            <CheckboxLabel>
              <input type="checkbox" checked={useDifferentBilling} onChange={() => setUseDifferentBilling(v => !v)} />
              Billing address is different
            </CheckboxLabel>
            {useDifferentBilling && (
              <>
                <Input name="billingStreet" placeholder="Street" value={formData.billingStreet} onChange={handleChange} />
                <Input name="billingCity" placeholder="City" value={formData.billingCity} onChange={handleChange} />
                <Row>
                  <HalfSelect name="billingState" value={formData.billingState} onChange={handleChange}>
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </HalfSelect>
                  <HalfInput name="billingZip" placeholder="ZIP Code" value={formData.billingZip} onChange={handleChange} />
                </Row>
              </>
            )}
          </Section>

          <Section>
            <Label>Payment</Label>
            {!clientSecret ? (
              <div>Loading payment…</div>
            ) : (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret, appearance: { theme: "stripe" } }}
              >
                <PaymentElement options={{ layout: "accordion" }} />
                {!formValid && (
                  <div style={{ marginTop: 8, fontSize: "0.95rem", color: "#ffe082" }}>
                    Complete required fields (state & 5-digit ZIP) before paying.
                  </div>
                )}
                <div style={{ height: 12 }} />
                <PayAndPlaceOrderButton
                  email={formData.email}
                  lines={lines}
                  shippingAddress={shippingAddress}
                  billingAddress={billingAddress}
                  onSuccess={(order) => { /* clearCart?.(); */ navigate(`/order/${order.id}`); }}
                  setErr={setErr}
                  setLoading={setLoading}
                  canSubmit={formValid}
                  clientSecret={clientSecret}
                />
              </Elements>
            )}
          </Section>
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
            <TotalRow><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></TotalRow>
            <TotalRow><span>Shipping:</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></TotalRow>
            <TotalRow><span>Tax:</span><span>${tax.toFixed(2)}</span></TotalRow>
            <TotalRow><span>Grand Total:</span><span>${grandTotal}</span></TotalRow>
          </div>
        </SummaryCard>
      </CheckoutLayout>
    </PageWrapper>
  );
}
