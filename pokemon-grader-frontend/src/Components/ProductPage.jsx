import { useCart } from "../context/CartContext.jsx";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import LHImage from "../assets/images/luckyhelmetlogo.png";
import pokeballImage from "../assets/images/Pokeball.png";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:8080";

/* ---------- UI ---------- */
const StyledPage = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #030f2d 17%, #fff700 48%, #030f2d 77%);
  display: flex;
  justify-content: center;
  overflow-x: hidden;
`;
const Button = styled.button`
  padding: 8px 14px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  border: none;
`;
const BackButton = styled(Button)`
  position: fixed; top: 20px; left: 20px; z-index: 1000;
  background: transparent; color: white; border: 2px solid #fff700;
  &:hover { background: #fff700; color: black; }
`;
const CenterWrapper = styled.div`
  width: 100%; max-width: 1200px; margin: 0 auto;
  display: flex; flex-direction: column; align-items: center; padding: 2rem 1rem;
`;
const Logo = styled.img` width: 160px; margin: 1px 0; `;
const NavBar = styled.div`
  background: #1e1855; border-radius: 999px; padding: 10px 40px 10px 80px;
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
const ProductContainer = styled.div`
  background: #1e1855; border-radius: 30px; padding: 2rem;
  width: 100%; max-width: 800px; display: flex; flex-direction: column; align-items: center; color: white;
`;
const ProductImage = styled.img`
  width: 200px; height: 200px; background: white; border-radius: 20px; margin-bottom: 1.5rem; object-fit: contain;
`;
const ProductTitle = styled.h1` font-size: 2rem; margin-bottom: 1rem; `;
const ProductDescription = styled.p`
  font-size: 1rem; margin-bottom: 1rem; text-align: center; max-width: 600px;
`;
const ProductPrice = styled.div` font-size: 1.3rem; font-weight: bold; margin-top: 1rem; `;
const TopNotification = styled.div`
  position: fixed; top: 50px; left: 50%; transform: translateX(-50%);
  background-color: #4caf50; color: white; padding: 16px 32px; border-radius: 12px;
  font-size: 1.3rem; font-weight: bold; z-index: 999; animation: fadeInOut 3s ease-in-out forwards;
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translate(-50%, 0); }
    15% { opacity: 1; transform: translate(-50%, 0); }
    80% { opacity: 1; transform: translate(-50%, 0); }
    100% { opacity: 0; transform: translate(-50%, -40px); }
  }
`;

/* ---------- helpers ---------- */
function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function ProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const qs = useQuery();
  const col = qs.get("col"); // 'sealed_inventory' | 'new_products' | null
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const outOfStock = (product?.quantity ?? 0) <= 0;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,   // single source of truth
      image: product.image,
      quantity: 1,
      col: col || "products",
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  useEffect(() => {
    if (!productId) return;
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        if (col) {
          // Firestore source for sealed/new
          const ref = doc(collection(db, col), productId);
          const snap = await getDoc(ref);
          if (!snap.exists()) throw new Error("Product not found");
          const x = snap.data() || {};
          const normalized = {
            id: snap.id,
            name: x.name || x.title || "Product",
            image: x.imageUrl || x.image || pokeballImage,
            description: x.description || "No description available.",
            price: Number(x.price ?? x.marketValue ?? x.market_value ?? 0),
            quantity: Number(x.quantity ?? x.qty ?? 0),
          };
          if (!cancelled) setProduct(normalized);
        } else {
          // Backend source (same as single cards)
          const res = await fetch(`${API_BASE}/api/products/${productId}`);
          if (!res.ok) throw new Error(`Failed to load product (${res.status})`);
          const x = await res.json();
          const normalized = {
            id: x.id || productId,
            name: x.name || x.title || "Product",
            image: x.imageUrl || x.image || pokeballImage,
            description: x.description || "No description available.",
            price: Number(x.price ?? x.marketValue ?? x.market_value ?? 0),
            quantity: Number(x.quantity ?? 0),
          };
          if (!cancelled) setProduct(normalized);
        }
      } catch (e) {
        if (!cancelled) setErr(e?.message || "Failed to load product");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [productId, col]);

  if (loading) return <StyledPage><CenterWrapper>Loading...</CenterWrapper></StyledPage>;
  if (err) return <StyledPage><CenterWrapper style={{ color:"#ffbaba", fontWeight:800 }}>Error: {err}</CenterWrapper></StyledPage>;
  if (!product) return <StyledPage><CenterWrapper>No product.</CenterWrapper></StyledPage>;

  return (
    <StyledPage>
      <CenterWrapper>
        <BackButton type="button" onClick={() => navigate(-1)}>← Back</BackButton>
        <Logo src={LHImage} alt="Lucky Helmet Logo" />
        <NavBar>
          <Pokeball src={pokeballImage} alt="Pokeball" />
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/" style={{ textDecoration: 'none' }}><NavItem>Home</NavItem></Link>
            <Link to="/new" style={{ textDecoration: 'none' }}><NavItem>New</NavItem></Link>
            <Link to="/packs" style={{ textDecoration: 'none' }}><NavItem>Packs</NavItem></Link>
            <Link to="/cards" style={{ textDecoration: 'none' }}><NavItem>Cards</NavItem></Link>
          </div>
          <Link to="/contact" style={{ textDecoration: 'none' }}><NavItem>Contact</NavItem></Link>
        </NavBar>

        <ProductContainer>
          <ProductImage src={product.image} alt={product.name} />
          <ProductTitle>{product.name}</ProductTitle>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductPrice>
            {outOfStock ? "Out of stock" : `Price: $${product.price.toFixed(2)}`}
          </ProductPrice>

          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            style={{
              marginTop: "1.5rem",
              padding: "10px 20px",
              borderRadius: "10px",
              background: outOfStock ? "rgba(255,247,0,.5)" : "#fff700",
              color: "black",
              fontWeight: "bold",
              cursor: outOfStock ? "not-allowed" : "pointer",
              border: 0,
            }}
          >
            {outOfStock ? "Out of stock" : "Add to Cart"}
          </button>

          {addedToCart && <TopNotification>✅ Added to Cart!</TopNotification>}
        </ProductContainer>
      </CenterWrapper>
    </StyledPage>
  );
}
