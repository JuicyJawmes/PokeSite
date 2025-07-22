import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import pokeballImage from "../assets/images/Pokeball.png";
import LHImage from "../assets/images/luckyhelmetlogo.png";
import svLogo from "../assets/images/Scarlet_Violet.png";
import ssLogo from "../assets/images/sword_shield.png";
import placeholderImg from "../assets/images/Pokeball.png";
import packsData from '../data/packsData';

const svPacks = packsData.filter(p => p.set === 'sv');
const ssPacks = packsData.filter(p => p.set === 'ss');

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

const Logo = styled.img`
  width: 160px;
  margin: 1px 0;
`;

const NavBar = styled.div`
  background: #1e1855;
  border-radius: 999px;
  padding: 10px 40px 10px 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width:100%;
  gap: 2rem;
  margin-bottom: 1rem;
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

const SectionLogo = styled.img`
  width: 400px;
  margin: 2rem 0 1rem 0;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ProductCard = styled.div`
  background: #1e1855;
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 180px;
  height: 180px;
  background: white;
  border-radius: 12px;
`;

const ProductText = styled.div`
  font-size: 0.9rem;
  font-style: italic;
  font-weight: 900;
  color: white;
  margin-top: 2rem;
  text-align: center;
`;

export const PacksPage = () => {
  return (
    <StyledPage>
      <CenterWrapper>
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

        <SectionLogo src={svLogo} alt="Scarlet & Violet" />
        <ProductGrid>
          {packsData.filter(p => p.set === 'sv').map((product) => (
            <Link 
              key={product.id}
              to={`/product/${product.id}`} 
              style={{ textDecoration: 'none' }}
            >
              <ProductCard>
                <ProductImage src={product.image} alt={product.title} />
                <ProductText>
                  {product.title}<br />
                  Price: ${product.price}
                </ProductText>
              </ProductCard>
            </Link>
          ))}
        </ProductGrid>

        {/* <ProductGrid>
          {[1,2,3,4].map((_, i) => (
            <ProductCard key={i}>
              <ProductImage src={placeholderImg} alt={`SV Product ${i + 1}`} />
              <ProductText>
                Item: xyz<br />
                Price: $xyz
              </ProductText>
            </ProductCard>
          ))}
        </ProductGrid> */}

        <SectionLogo src={ssLogo} alt="Sword & Shield" />
        <ProductGrid>
          {packsData.filter(p => p.set === 'ss').map((product) => (
            <Link 
              key={product.id}
              to={`/product/${product.id}`} 
              style={{ textDecoration: 'none' }}
            >
              <ProductCard>
                <ProductImage src={product.image} alt={product.title} />
                <ProductText>
                  {product.title}<br />
                  Price: ${product.price}
                </ProductText>
              </ProductCard>
            </Link>
          ))}
        </ProductGrid>

        {/* <ProductGrid>
          {[1,2,3,4].map((_, i) => (
            <ProductCard key={i}>
              <ProductImage src={placeholderImg} alt={`SS Product ${i + 1}`} />
              <ProductText>
                Item: xyz<br />
                Price: $xyz
              </ProductText>
            </ProductCard>
          ))}
        </ProductGrid> */}
      </CenterWrapper>
    </StyledPage>
  );
};
