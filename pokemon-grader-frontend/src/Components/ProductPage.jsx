
// import { useCart } from "../context/CartContext.jsx";
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import LHImage from "../assets/images/luckyhelmetlogo.png";
// import pokeballImage from "../assets/images/Pokeball.png";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase/firebaseConfig";

// // --- Styled components ---
// const StyledPage = styled.div`
//   width: 100vw;
//   min-height: 100vh;
//   background: linear-gradient(135deg, #030f2d 17%, #fff700 48%, #030f2d 77%);
//   display: flex;
//   justify-content: center;
//   overflow-x: hidden;
// `;
// const BackButton = styled.button`
//   background: transparent;
//   color: white;
//   border: none;
//   font-size: 1rem;
//   cursor: pointer;
//   margin-bottom: 1rem;
//   text-decoration: underline;
//   align-self: flex-start;
// `;

// const CenterWrapper = styled.div`
//   width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 2rem 1rem;
// `;

// const Logo = styled.img`
//   width: 160px;
//   margin-bottom: 1rem;
// `;

// const NavBar = styled.div`
//   background: #1e1855;
//   border-radius: 999px;
//   padding: 10px 40px 10px 80px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   width: 100%;
//   gap: 2rem;
//   margin-bottom: 2rem;
//   position: relative;
//   max-width: 800px;
// `;

// const NavItem = styled.span`
//   color: white;
//   font-size: 1.2rem;
//   font-style: italic;
//   font-weight: 900;
//   cursor: pointer;
//   padding: 4px 12px;
//   border-radius: 12px;
//   white-space: nowrap;
// `;

// const Pokeball = styled.img`
//   width: 90px;
//   position: absolute;
//   left: -45px;
//   top: 50%;
//   transform: translateY(-50%);
//   z-index: 2;
// `;

// const ProductContainer = styled.div`
//   background: #1e1855;
//   border-radius: 30px;
//   padding: 2rem;
//   width: 100%;
//   max-width: 800px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   color: white;
// `;

// const ProductImage = styled.img`
//   width: 200px;
//   height: 200px;
//   background: white;
//   border-radius: 20px;
//   margin-bottom: 1.5rem;
// `;

// const ProductTitle = styled.h1`
//   font-size: 2rem;
//   margin-bottom: 1rem;
// `;

// const ProductDescription = styled.p`
//   font-size: 1rem;
//   margin-bottom: 1rem;
//   text-align: center;
//   max-width: 600px;
// `;

// const ProductPrice = styled.div`
//   font-size: 1.3rem;
//   font-weight: bold;
//   margin-top: 1rem;
// `;

// const ProductPage = () => {
//   const navigate = useNavigate(); 
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const { addToCart } = useCart();

//   const handleAddToCart = () => {
//     addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.marketValue,
//       image: product.image,
//     });
//   };

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const docRef = doc(db, "products", productId);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           const normalized = {
//             id: docSnap.id,
//             name: data.name || "Unnamed",
//             image: data.image || pokeballImage,
//             description: data.description || "No description available.",
//             marketValue: Number(data.market_value || data.marketValue || 0),
//             purchasePrice: data.purchase_price || data.purchasePrice || "N/A",
//             cardId: data.card_id || data.cardId || "",
//             quantity: data.quantity || 0,
//           };
//           setProduct(normalized);
//         } else {
//           console.error("No such product!");
//         }
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   if (!product)
//     return (
//       <StyledPage>
//         <CenterWrapper>Loading...</CenterWrapper>
//       </StyledPage>
//     );

//   return (
//     <StyledPage>
//       <CenterWrapper>
//         <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
//         <Logo src={LHImage} alt="Lucky Helmet Logo" />

//         {/* ✅ Copied NavBar from HomePage */}
//         <NavBar>
//           <Pokeball src={pokeballImage} alt="Pokeball" />
//           <div style={{ display: 'flex', gap: '2rem' }}>
//             <Link to="/" style={{ textDecoration: 'none' }}><NavItem>Home</NavItem></Link>
//             <Link to="/new" style={{ textDecoration: 'none' }}><NavItem>New</NavItem></Link>
//             <Link to="/packs" style={{ textDecoration: 'none' }}><NavItem>Packs</NavItem></Link>
//             <Link to="/cards" style={{ textDecoration: 'none' }}><NavItem>Cards</NavItem></Link>
//           </div>
//           <Link to="/contact" style={{ textDecoration: 'none' }}><NavItem>Contact</NavItem></Link>
//         </NavBar>

//         <ProductContainer>
//           <ProductImage src={product.image} alt={product.name} />
//           <ProductTitle>{product.name}</ProductTitle>
//           <ProductDescription>{product.description}</ProductDescription>
//           <ProductPrice>Market Value: ${product.marketValue.toFixed(2)}</ProductPrice>
//           <button
//             onClick={handleAddToCart}
//             style={{
//               marginTop: "1.5rem",
//               padding: "10px 20px",
//               borderRadius: "10px",
//               background: "#fff700",
//               fontWeight: "bold",
//               cursor: "pointer",
//             }}
//           >
//             Add to Cart
//           </button>
//         </ProductContainer>
//       </CenterWrapper>
//     </StyledPage>
//   );
// };

// export default ProductPage;
import { useCart } from "../context/CartContext.jsx";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, Link, useNavigate } from "react-router-dom";
import LHImage from "../assets/images/luckyhelmetlogo.png";
import pokeballImage from "../assets/images/Pokeball.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// --- Styled components ---
const StyledPage = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #030f2d 17%, #fff700 48%, #030f2d 77%);
  display: flex;
  justify-content: center;
  overflow-x: hidden;
`;

const BackButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  text-decoration: underline;
  align-self: flex-start;
`;

const CenterWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
`;

const Logo = styled.img`
  width: 160px;
  margin-bottom: 1rem;
`;

const NavBar = styled.div`
  background: #1e1855;
  border-radius: 999px;
  padding: 10px 40px 10px 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
  max-width: 800px;
`;

const NavItem = styled.span`
  color: white;
  font-size: 1.2rem;
  font-style: italic;
  font-weight: 900;
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 12px;
  white-space: nowrap;
`;

const Pokeball = styled.img`
  width: 90px;
  position: absolute;
  left: -45px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
`;

const ProductContainer = styled.div`
  background: #1e1855;
  border-radius: 30px;
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const ProductImage = styled.img`
  width: 200px;
  height: 200px;
  background: white;
  border-radius: 20px;
  margin-bottom: 1.5rem;
`;

const ProductTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  max-width: 600px;
`;

const ProductPrice = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const TopNotification = styled.div`
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 1.3rem;
  font-weight: bold;
  z-index: 999;
  animation: fadeInOut 3s ease-in-out forwards;

  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translate(-50%, 0);
    }
    15% {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    80% {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -40px);
    }
  }
`;



const ProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false); // ✅

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.marketValue,
      image: product.image,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000); // ✅ Hide after 2 seconds
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const normalized = {
            id: docSnap.id,
            name: data.name || "Unnamed",
            image: data.image || pokeballImage,
            description: data.description || "No description available.",
            marketValue: Number(data.market_value || data.marketValue || 0),
            purchasePrice: data.purchase_price || data.purchasePrice || "N/A",
            cardId: data.card_id || data.cardId || "",
            quantity: data.quantity || 0,
          };
          setProduct(normalized);
        } else {
          console.error("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product)
    return (
      <StyledPage>
        <CenterWrapper>Loading...</CenterWrapper>
      </StyledPage>
    );

  return (
    <StyledPage>
      <CenterWrapper>
        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
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
          <ProductPrice>Market Value: ${product.marketValue.toFixed(2)}</ProductPrice>
          <button
            onClick={handleAddToCart}
            style={{
              marginTop: "1.5rem",
              padding: "10px 20px",
              borderRadius: "10px",
              background: "#fff700",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>

          {addedToCart && <TopNotification>✅ Added to Cart!</TopNotification>}
        </ProductContainer>
      </CenterWrapper>
    </StyledPage>
  );
};

export default ProductPage;
