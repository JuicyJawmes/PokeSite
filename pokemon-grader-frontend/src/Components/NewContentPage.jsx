import React from "react";
import styled from "styled-components";
import LHImage from "../assets/images/luckyhelmetlogo.png";
import reshiramImage from "../assets/images/reshiram.png";
import zekromImage from "../assets/images/zekrom.png";
import pokeballImage from "../assets/images/Pokeball.png";
import cappikaImage from "../assets/images/captain_pika.png";
import BandWImage from "../assets/images/Black_and_White_Logo.png";

const StyledRectangle1 = styled.div`
  width: 1118px;
  height: 65px;
  left: 108px;
  top: 196px;
  position: absolute;
  background: #1e1855;
  border-radius: 41px;
`;

const StyledHomespan = styled.span`
  color: white;
  font-size: 36px;
  font-family: Inter;
  font-style: italic;
  font-weight: 900;
  word-wrap: break-word;
`;

const StyledNewspan = styled.span`
  color: white;
  font-size: 36px;
  font-family: Inter;
  font-style: italic;
  font-weight: 900;
  word-wrap: break-word;
`;

const StyledPacksspan = styled.span`
  color: white;
  font-size: 36px;
  font-family: Inter;
  font-style: italic;
  font-weight: 900;
  word-wrap: break-word;
`;

const StyledCardsspan = styled.span`
  color: white;
  font-size: 36px;
  font-family: Inter;
  font-style: italic;
  font-weight: 900;
  word-wrap: break-word;
`;

const StyledContactspan = styled.span`
  color: white;
  font-size: 36px;
  font-family: Inter;
  font-style: italic;
  font-weight: 900;
  word-wrap: break-word;
`;

const StyledLuckyhelmetlogo1 = styled.img`
  width: 239px;
  height: 239px;
  left: 520px;
  top: -11px;
  position: absolute;
`;

const StyledPokBalliconsvg1 = styled.img`
  width: 131px;
  height: 131px;
  left: 42px;
  top: 163px;
  position: absolute;
`;

const StyledRectangle15 = styled.div`
  width: 963px;
  height: 542px;
  left: 185px;
  top: 390px;
  position: absolute;
  background: #1e1855;
  border-radius: 41px;
`;

const StyledRectangle31 = styled.div`
  width: 880px;
  height: 476px;
  left: 227px;
  top: 423px;
  position: absolute;
  background: white;
  border-radius: 41px;
`;

const StyledDestinedrivalsetb8999span = styled.span`
  color: black;
  font-size: 32px;
  font-family: Inter;
  font-style: italic;
  font-weight: 900;
  word-wrap: break-word;
`;

const StyledRectangle32 = styled.div`
  width: 963px;
  height: 542px;
  left: 173px;
  top: 1028px;
  position: absolute;
  background: #1e1855;
  border-radius: 41px;
`;

const StyledRectangle33 = styled.div`
  width: 880px;
  height: 476px;
  left: 215px;
  top: 1061px;
  position: absolute;
  background: white;
  border-radius: 41px;
`;

const StyledDestinedrivalsboosterbox23999span = styled.span`
  color: black;
  font-size: 32px;
  font-family: Inter;
  font-style: italic;
  font-weight: 900;
  word-wrap: break-word;
`;

const StyledDestinedrivalsetb1 = styled.img`
  width: 395px;
  height: 376px;
  left: 287px;
  top: 473px;
  position: absolute;
`;

const StyledDRBoosterbox1 = styled.img`
  width: 430px;
  height: 430px;
  left: 700px;
  top: 1514px;
  position: absolute;
  transform: rotate(180deg);
  transform-origin: top left;
`;

const StyledNewContentPage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(0deg, black 0%, black 100%),
    linear-gradient(135deg, #030f2d 17%, #fff700 48%, #030f2d 77%);
  overflow: hidden;
`;

export const NewContentPage = () => {
  return (
    <StyledNewContentPage>
      <StyledRectangle1 />
      <StyledHomespan>Home</StyledHomespan>
      <StyledNewspan>New</StyledNewspan>
      <StyledPacksspan>Packs</StyledPacksspan>
      <StyledCardsspan>Cards</StyledCardsspan>
      <StyledContactspan>Contact</StyledContactspan>

      <StyledLuckyhelmetlogo1 src={LHImage} alt="Lucky Helmet Logo" />
      <StyledPokBalliconsvg1 src="https://placehold.co/131x131" alt="Pokeball Icon" />

      <StyledRectangle15 />
      <StyledRectangle31 />
      <StyledDestinedrivalsetb8999span>
        Destined Rivals
        <br />
        ETB
        <br />
        <br />$89.99
      </StyledDestinedrivalsetb8999span>

      <StyledRectangle32 />
      <StyledRectangle33 />
      <StyledDestinedrivalsboosterbox23999span>
        Destined Rivals
        <br />
        Booster Box
        <br />
        <br />$239.99
      </StyledDestinedrivalsboosterbox23999span>

      <StyledDestinedrivalsetb1
        src="https://placehold.co/395x376"
        alt="ETB Box"
      />
      <StyledDRBoosterbox1
        src="https://placehold.co/430x430"
        alt="Booster Box"
      />
    </StyledNewContentPage>
  );
};
