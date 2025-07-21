// import React from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import pokeballImage from "../assets/images/Pokeball.png";
// import LHImage from "../assets/images/luckyhelmetlogo.png";
// import reshiramImage from "../assets/images/reshiram.png";
// import zekromImage from "../assets/images/zekrom.png";
// import cappikaImage from "../assets/images/captain_pika.png";
// import BandWImage from "../assets/images/Black_and_White_Logo.png";

// const StyledNewContentPage = styled.div`
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

// const Logo = styled.img`
//   width: 160px;
//   margin: 1px 0;
// `;

// const NavBar = styled.div`
//   background: #1e1855;
//   border-radius: 999px;
//   padding: 10px 40px 10px 80px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   width:100%;
//   gap: 2rem;
//   margin-bottom: 1rem;
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

// const ProductBox = styled.div`
//   background: #1e1855;
//   border-radius: 41px;
//   margin: 2rem 0;
//   padding: 2rem;
//   max-width: 600px;
//   width: 100%;
//   display: flex;
//   justify-content: center;
// `;

// const InnerBox = styled.div`
//   background: white;
//   border-radius: 30px;
//   padding: 2rem;
//   display: flex;
//   align-items: center;
//   gap: 2rem;
//   flex-wrap: wrap;
//   justify-content: center;
//   width: 100%;
// `;

// const ProductImage = styled.img`
//   width: 250px;
//   max-width: 100%;
// `;

// const ProductText = styled.div`
//   font-size: 1.2rem;
//   font-style: italic;
//   font-weight: 900;
//   text-align: center;
// `;

// export const PacksPage = () => {
//   return (
//     <StyledNewContentPage>
//       <CenterWrapper>
//         <Logo src={LHImage} alt="Lucky Helmet Logo" />
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
//       </CenterWrapper>
//     </StyledNewContentPage>
//   );
// };
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import pokeballImage from "../assets/images/Pokeball.png";
import LHImage from "../assets/images/luckyhelmetlogo.png";

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

const ProductBox = styled.div`
  background: #1e1855;
  border-radius: 41px;
  margin: 2rem 0;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InnerBox = styled.div`
  background: white;
  border-radius: 30px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const ProductImage = styled.img`
  width: 250px;
  max-width: 100%;
`;

const ProductText = styled.div`
  font-size: 1.2rem;
  font-style: italic;
  font-weight: 900;
  text-align: center;
`;

export const CardPage = () => {
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


      </CenterWrapper>
    </StyledPage>
  );
};
