import React from "react";
import styled from "styled-components";
import reshiramImage from "../assets/images/reshiram.png";
import zekromImage from "../assets/images/zekrom.png";
import pokeballImage from "../assets/images/Pokeball.png";
import cappikaImage from "../assets/images/captain_pika.png";
import BandWImage from "../assets/images/Black_and_White_Logo.png";
import LHImage from "../assets/images/luckyhelmetlogo.png";

const StyledHomePage = styled.div`
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
  margin: 5px 0;
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

const SectionTitle = styled.h2`
  color: white;
  font-size: 2.5rem;
  font-style: italic;
  font-weight: 900;
  margin: 2rem 0 1rem 0;
`;

const ReleaseBanner = styled.div`
  background: #93cee3;
  border-radius: 41px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  width: 100%;
  max-width: 660px; 
`;
const ReleaseBannerOuter = styled.div`
  background: #1e1855;
  border-radius: 50px;
  padding: 1.2rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 740px;
  display: flex;
  justify-content: center;
`;

const ReleaseLogo = styled.img`
  width: 280px;
`;

const PokemonImage = styled.img`
  width: 110px;
`;

const CardsContainer = styled.div`
  background: #1e1855;
  border-radius: 41px;
  display: flex;
  gap: 2rem;
  padding: 2rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 500px;
  position: relative;
`;

const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardBox = styled.div`
  background: ${({ bg }) => bg || "#ccc"};
  padding: 2rem;
  border-radius: 20px;
  font-weight: 900;
  font-size: 1.5rem;
  text-align: center;
  width: 180px;
`;

const Pikachu = styled.img`
  position: absolute;
  bottom: -80px;
  left: -100px;
  width: 200px;
`;

const AnalyzerBox = styled.div`
  background: #ffc5f9;
  padding: 1.2rem;
  border-radius: 30px;
  font-weight: 900;
  font-size: 1.5rem;
  text-align: center;
  width: 280px;
`;

const AnalyzerContainer = styled.div`
  background: #1e1855;
  border-radius: 41px;
  padding: 1.2rem;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  max-width: 360px;
`;

export const HomePage = () => {
  return (
    <StyledHomePage>
      <CenterWrapper>
        <Logo src={LHImage} alt="Lucky Helmet Logo" />
        <NavBar>
          <Pokeball src={pokeballImage} alt="Pokeball" />
          <div style={{ display: 'flex', gap: '2rem' }}>
            <NavItem>Home</NavItem>
            <NavItem>New</NavItem>
            <NavItem>Packs</NavItem>
            <NavItem>Cards</NavItem>
          </div>
          <NavItem>Contact</NavItem>
        </NavBar>

        <SectionTitle>Upcoming Release</SectionTitle>
        <ReleaseBannerOuter>
          <ReleaseBanner>
            <PokemonImage src={zekromImage} alt="Zekrom" />
            <ReleaseLogo src={BandWImage} alt="Set Logo" />
            <PokemonImage src={reshiramImage} alt="Reshiram" />
          </ReleaseBanner>
        </ReleaseBannerOuter>

        <CardsContainer>
          <CardBox bg="#cbc5ff">New</CardBox>
          <CardColumn>
            <CardBox bg="#c5ffc7">Packs</CardBox>
            <CardBox bg="#ffffc5">Cards</CardBox>
          </CardColumn>
          <Pikachu src={cappikaImage} alt="Captain Pikachu" />
        </CardsContainer>
        
        <AnalyzerContainer>
        <AnalyzerBox>Ai Card Analyzer</AnalyzerBox>
        </AnalyzerContainer>

      </CenterWrapper>
    </StyledHomePage>
  );
};
