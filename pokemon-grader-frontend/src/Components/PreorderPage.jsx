import React from "react";
import styled from "styled-components";

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
  position: absolute;
  left: 150px;
  top: 210px;
`;

const StyledNewspan = styled.span`
  color: white;
  font-size: 36px;
  font-family: Inter;
  font-style: italic;
  font-weight: 900;
  word-wrap: break-word;
  position: absolute;
  left: 300px;
  top: 210px;
`;

const StyledPacksspan = styled.span`
  color: white;
  font-size: 36px;
  font-family: Inter;
  font-style: italic;
  font-weight: 900;
  word-wrap: break-word;
  position: absolute;
  left: 450px;
  top: 210px;
`;

const StyledCardsspan = styled.span`
  color: white;
  font-size: 36px;
  font-family: Inter;
  font-style: italic;
  font-weight: 900;
  word-wrap: break-word;
  position: absolute;
  left: 600px;
  top: 210px;
`;

const StyledContactspan = styled.span`
  color: white;
  font-size: 36px;
  font-family: Inter;
  font-style: italic;
  font-weight: 900;
  word-wrap: break-word;
  position: absolute;
  left: 750px;
  top: 210px;
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

const StyledBlackboltwhiteflareetb8999span = styled.span`
  color: black;
  font-size: 32px;
  font-family: Inter;
  font-style: italic;
  font-weight: 900;
  word-wrap: break-word;
  position: absolute;
  left: 260px;
  top: 460px;
`;

const StyledBWset2 = styled.img`
  width: 416px;
  height: 417px;
  left: 263px;
  top: 452px;
  position: absolute;
  border-radius: 20px;
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

const StyledBlackboltwhiteflareboosterbundles3999span = styled.span`
  color: black;
  font-size: 32px;
  font-family: Inter;
  font-style: italic;
  font-weight: 900;
  word-wrap: break-word;
  position: absolute;
  left: 250px;
  top: 1100px;
`;

const StyledSv10pt5boosterbundles169en1 = styled.img`
  width: 494px;
  height: 278px;
  left: 240px;
  top: 1160px;
  position: absolute;
  border-radius: 20px;
`;

const StyledPreorderPage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(0deg, black 0%, black 100%),
    linear-gradient(135deg, #030f2d 17%, #fff700 48%, #030f2d 77%);
  overflow: hidden;
`;

export const PreorderPage = () => {
  return (
    <StyledPreorderPage>
      <StyledRectangle1 />
      <StyledHomespan>Home</StyledHomespan>
      <StyledNewspan>New</StyledNewspan>
      <StyledPacksspan>Packs</StyledPacksspan>
      <StyledCardsspan>Cards</StyledCardsspan>
      <StyledContactspan>Contact</StyledContactspan>

      <StyledLuckyhelmetlogo1 src="https://placehold.co/239x239" alt="Lucky Helmet" />
      <StyledPokBalliconsvg1 src="https://placehold.co/131x131" alt="Pokeball Icon" />

      <StyledRectangle15 />
      <StyledRectangle31 />
      <StyledBlackboltwhiteflareetb8999span>
        Black Bolt<br />& White Flare<br />ETB<br /><br />$89.99
      </StyledBlackboltwhiteflareetb8999span>
      <StyledBWset2 src="https://placehold.co/416x417" alt="BW Set" />

      <StyledRectangle32 />
      <StyledRectangle33 />
      <StyledBlackboltwhiteflareboosterbundles3999span>
        Black Bolt<br />& White Flare<br />Booster Bundles<br /><br />$39.99
      </StyledBlackboltwhiteflareboosterbundles3999span>
      <StyledSv10pt5boosterbundles169en1 src="https://placehold.co/494x278" alt="Booster Bundles" />
    </StyledPreorderPage>
  );
};
