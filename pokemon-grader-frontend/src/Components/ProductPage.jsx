import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import LHImage from "../assets/images/luckyhelmetlogo.png";
import pokeballImage from "../assets/images/Pokeball.png";
import mockProducts from "../data/packsData";

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
  padding: 2rem 1rem;
`;

const Logo = styled.img`
  width: 160px;
  margin-bottom: 2rem;
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

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = mockProducts.find((p) => p.id === Number(productId));
    setProduct(found);
  }, [productId]);

  if (!product) return <StyledPage><CenterWrapper>Loading...</CenterWrapper></StyledPage>;

  return (
    <StyledPage>
      <CenterWrapper>
        <Logo src={LHImage} alt="Lucky Helmet Logo" />
        <ProductContainer>
          <ProductImage src={product.image} alt={product.title} />
          <ProductTitle>{product.title}</ProductTitle>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductPrice>Price: ${product.price}</ProductPrice>
        </ProductContainer>
      </CenterWrapper>
    </StyledPage>
  );
};

export default ProductPage;
