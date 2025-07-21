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

const StyledCardBox = styled.div`
  position: absolute;
  width: 265px;
  height: 262px;
  background: #1e1855;
  border-radius: 41px;
`;

const StyledCardInner = styled.div`
  position: absolute;
  width: 236px;
  height: 229px;
  background: white;
  border-radius: 41px;
`;

const StyledItemLabel = styled.span`
  position: absolute;
  color: white;
  font-size: 32px;
  font-family: Inter;
  font-style: italic;
  font-weight: 900;
  word-wrap: break-word;
`;

const StyledCardsPage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(0deg, black 0%, black 100%),
    linear-gradient(135deg, #030f2d 17%, #fff700 48%, #030f2d 77%);
  overflow: hidden;
`;

export const CardsPage = () => {
  return (
    <StyledCardsPage>
      <StyledRectangle1 />
      <StyledHomespan>Home</StyledHomespan>
      <StyledNewspan>New</StyledNewspan>
      <StyledPacksspan>Packs</StyledPacksspan>
      <StyledCardsspan>Cards</StyledCardsspan>
      <StyledContactspan>Contact</StyledContactspan>

      <StyledLuckyhelmetlogo1 src="https://placehold.co/239x239" />
      <StyledPokBalliconsvg1 src="https://placehold.co/131x131" />

      {/* First row */}
      <StyledCardBox style={{ left: 323, top: 342 }} />
      <StyledCardInner style={{ left: 338, top: 358 }} />
      <StyledItemLabel style={{ left: 345, top: 600 }}>Item: xyz<br />Price: $xyz</StyledItemLabel>

      <StyledCardBox style={{ left: 721, top: 342 }} />
      <StyledCardInner style={{ left: 736, top: 358 }} />
      <StyledItemLabel style={{ left: 743, top: 600 }}>Item: xyz<br />Price: $xyz</StyledItemLabel>

      {/* Second row */}
      <StyledCardBox style={{ left: 335, top: 798 }} />
      <StyledCardInner style={{ left: 350, top: 814 }} />
      <StyledItemLabel style={{ left: 357, top: 1070 }}>Item: xyz<br />Price: $xyz</StyledItemLabel>

      <StyledCardBox style={{ left: 733, top: 798 }} />
      <StyledCardInner style={{ left: 745, top: 814 }} />
      <StyledItemLabel style={{ left: 752, top: 1070 }}>Item: xyz<br />Price: $xyz</StyledItemLabel>

      {/* Third row */}
      <StyledCardBox style={{ left: 347, top: 1254 }} />
      <StyledCardInner style={{ left: 359, top: 1270 }} />
      <StyledItemLabel style={{ left: 366, top: 1530 }}>Item: xyz<br />Price: $xyz</StyledItemLabel>

      <StyledCardBox style={{ left: 745, top: 1254 }} />
      <StyledCardInner style={{ left: 757, top: 1275 }} />
      <StyledItemLabel style={{ left: 764, top: 1530 }}>Item: xyz<br />Price: $xyz</StyledItemLabel>

      {/* Fourth row */}
      <StyledCardBox style={{ left: 359, top: 1710 }} />
      <StyledCardInner style={{ left: 374, top: 1726 }} />
      <StyledItemLabel style={{ left: 381, top: 1980 }}>Item: xyz<br />Price: $xyz</StyledItemLabel>

      <StyledCardBox style={{ left: 757, top: 1710 }} />
      <StyledCardInner style={{ left: 766, top: 1731 }} />
      <StyledItemLabel style={{ left: 773, top: 1980 }}>Item: xyz<br />Price: $xyz</StyledItemLabel>
    </StyledCardsPage>
  );
};
