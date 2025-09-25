// // src/Components/NewContentPage.jsx
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import pokeballImage from "../assets/images/Pokeball.png";
// import LHImage from "../assets/images/luckyhelmetlogo.png";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase/firebaseConfig";

// /* ---------- UI (matching single-cards style) ---------- */
// const StyledPage = styled.div`
//   width: 100vw;
//   min-height: 100vh;
//   background: linear-gradient(135deg, #030f2d 17%, #fff700 48%, #030f2d 77%);
//   display: flex;
//   justify-content: center;
//   overflow-x: hidden;
// `;

// const CenterWrapper = styled.div`
//   width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Logo = styled.img` width: 160px; margin: 1px 0; `;

// const NavBar = styled.div`
//   background: #1e1855;
//   border-radius: 999px;
//   padding: 10px 40px 10px 80px;
//   display: flex; align-items: center; justify-content: space-between;
//   width:100%; gap: 2rem; margin-bottom: 1rem; position: relative; max-width: 800px;
// `;

// const NavItem = styled.span`
//   color: white; font-size: 1.2rem; font-style: italic; font-weight: 900;
//   cursor: pointer; padding: 4px 12px; border-radius: 12px; white-space: nowrap;
// `;

// const Pokeball = styled.img`
//   width: 90px; position: absolute; left: -45px; top: 50%;
//   transform: translateY(-50%); z-index: 2;
// `;

// /* Grid + Card (same vibe as cards page) */
// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 2rem;
//   margin: 2rem 0 3rem;
//   width: 100%;
// `;

// const CardLink = styled(Link)`
//   text-decoration: none;
// `;

// const Card = styled.div`
//   background: #1e1855;
//   border-radius: 20px;
//   padding: 2rem;
//   display: flex; flex-direction: column; align-items: center;
// `;

// const Img = styled.img`
//   width: 180px; height: 180px;
//   background: white; border-radius: 12px; object-fit: contain;
// `;

// const Text = styled.div`
//   font-size: 0.9rem; font-style: italic; font-weight: 900; color: white;
//   margin-top: 1.25rem; text-align: center;
// `;

// /* ---------- Data ---------- */
// async function fetchNewProducts() {
//   const snap = await getDocs(collection(db, "new_products"));
//   return snap.docs.map(d => {
//     const x = d.data() || {};
//     const marketValue = Number(x.market_value ?? x.marketValue ?? x.price ?? 0);
//     return {
//       id: d.id,
//       name: x.name || x.title || "Product",
//       image: x.imageUrl || x.image || pokeballImage,
//       price: marketValue,
//     };
//   });
// }

// export default function NewContentPage() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         setErr(null);
//         setItems(await fetchNewProducts());
//       } catch (e) {
//         setErr(e?.message || "Failed to load new products");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const detailHref = (id) => `/product/${encodeURIComponent(id)}?col=new_products`;

//   return (
//     <StyledPage>
//       <CenterWrapper>
//         <Logo src={LHImage} alt="Lucky Helmet Logo" />
//         <NavBar>
//           <Pokeball src={pokeballImage} alt="Pokeball" />
//           <div style={{ display: "flex", gap: "2rem" }}>
//             <Link to="/" style={{ textDecoration: "none" }}><NavItem>Home</NavItem></Link>
//             <Link to="/new" style={{ textDecoration: "none" }}><NavItem>New</NavItem></Link>
//             <Link to="/packs" style={{ textDecoration: "none" }}><NavItem>Packs</NavItem></Link>
//             <Link to="/cards" style={{ textDecoration: "none" }}><NavItem>Cards</NavItem></Link>
//           </div>
//           <Link to="/contact" style={{ textDecoration: "none" }}><NavItem>Contact</NavItem></Link>
//         </NavBar>

//         {loading && <div style={{ color: "#9ad0ff" }}>Loading…</div>}
//         {err && <div style={{ color: "#ff6b6b" }}>Error: {err}</div>}

//         {!loading && !err && (
//           <Grid>
//             {items.map(p => (
//               <CardLink key={p.id} to={detailHref(p.id)}>
//                 <Card>
//                   <Img src={p.image} alt={p.name} />
//                   <Text>
//                     {p.name}<br />
//                     Price: ${p.price.toFixed(2)}
//                   </Text>
//                 </Card>
//               </CardLink>
//             ))}
//             {items.length === 0 && (
//               <div style={{ color: "white", opacity: .9 }}>No items here yet.</div>
//             )}
//           </Grid>
//         )}
//       </CenterWrapper>
//     </StyledPage>
//   );
// }
// src/Components/NewContentPage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import pokeballImage from "../assets/images/Pokeball.png";
import LHImage from "../assets/images/luckyhelmetlogo.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

/* ---------- UI (matching single-cards style) ---------- */
const StyledPage = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #030f2d 17%, #fff700 48%, #030f2d 77%);
  display: flex;
  justify-content: center;
  overflow-x: hidden;
`;

const CenterWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img` width: 160px; margin: 1px 0; `;

const NavBar = styled.div`
  background: #1e1855;
  border-radius: 999px;
  padding: 10px 40px 10px 80px;
  display: flex; align-items: center; justify-content: space-between;
  width:100%; gap: 2rem; margin-bottom: 1rem; position: relative; max-width: 800px;
`;

const NavItem = styled.span`
  color: white; font-size: 1.2rem; font-style: italic; font-weight: 900;
  cursor: pointer; padding: 4px 12px; border-radius: 12px; white-space: nowrap;
`;

const Pokeball = styled.img`
  width: 90px; position: absolute; left: -45px; top: 50%;
  transform: translateY(-50%); z-index: 2;
`;

/* Grid + Card */
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 2rem 0 3rem;
  width: 60%;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const Card = styled.div`
  background: #1e1855;
  border-radius: 20px;
  padding: 1.6rem 2rem;
  display: flex;
  align-items: center;           /* image + text vertically centered */
  gap: 1.25rem;                  /* space between image and text */
`;

const Img = styled.img`
  width: 280px;
  height: 280px;
  background: white;
  border-radius: 12px;
  object-fit: contain;
  flex: 0 0 180px;

  @media (max-width: 480px) {
    width: 140px;
    height: 140px;
    flex-basis: 140px;
  }
`;

const Text = styled.div`
  display: grid;
  gap: 0.35rem;
  color: white;
  text-align: left;              /* text on the right aligned left */
`;

const Name = styled.div`
  font-size: 2rem;
  font-style: italic;
  font-weight: 900;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  opacity: 0.95;
`;

/* ---------- Data ---------- */
async function fetchNewProducts() {
  const snap = await getDocs(collection(db, "new_products"));
  return snap.docs.map(d => {
    const x = d.data() || {};
    const marketValue = Number(x.market_value ?? x.marketValue ?? x.price ?? 0);
    return {
      id: d.id,
      name: x.name || x.title || "Product",
      image: x.imageUrl || x.image || pokeballImage,
      price: marketValue,
    };
  });
}

export default function NewContentPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        setItems(await fetchNewProducts());
      } catch (e) {
        setErr(e?.message || "Failed to load new products");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const detailHref = (id) => `/product/${encodeURIComponent(id)}?col=new_products`;

  return (
    <StyledPage>
      <CenterWrapper>
        <Logo src={LHImage} alt="Lucky Helmet Logo" />
        <NavBar>
          <Pokeball src={pokeballImage} alt="Pokeball" />
          <div style={{ display: "flex", gap: "2rem" }}>
            <Link to="/" style={{ textDecoration: "none" }}><NavItem>Home</NavItem></Link>
            <Link to="/new" style={{ textDecoration: "none" }}><NavItem>New</NavItem></Link>
            <Link to="/packs" style={{ textDecoration: "none" }}><NavItem>Packs</NavItem></Link>
            <Link to="/cards" style={{ textDecoration: "none" }}><NavItem>Cards</NavItem></Link>
          </div>
          <Link to="/contact" style={{ textDecoration: "none" }}><NavItem>Contact</NavItem></Link>
        </NavBar>

        {loading && <div style={{ color: "#9ad0ff" }}>Loading…</div>}
        {err && <div style={{ color: "#ff6b6b" }}>Error: {err}</div>}

        {!loading && !err && (
          <Grid>
            {items.map(p => (
              <CardLink key={p.id} to={detailHref(p.id)}>
                <Card>
                  <Img src={p.image} alt={p.name} />
                  <Text>
                    <Name>{p.name}</Name>
                    <Price>Price: ${Number(p.price || 0).toFixed(2)}</Price>
                  </Text>
                </Card>
              </CardLink>
            ))}
            {items.length === 0 && (
              <div style={{ color: "white", opacity: .9 }}>No items here yet.</div>
            )}
          </Grid>
        )}
      </CenterWrapper>
    </StyledPage>
  );
}
