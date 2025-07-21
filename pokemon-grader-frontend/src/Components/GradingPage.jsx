import React from "react";
import styled from "styled-components";

const StyledRectangle1 = styled.div`
    width: 1118px;
    height: 65px;
    left: 108px;
    top: 196px;
    position: absolute;
    background: #1E1855;
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

const StyledLuckyhelmetlogo1 = styled.div`
    width: 239px;
    height: 239px;
    left: 520px;
    top: -11px;
    position: absolute;
`;

const StyledPokBalliconsvg1 = styled.div`
    width: 131px;
    height: 131px;
    left: 42px;
    top: 163px;
    position: absolute;
`;

const StyledRectangle34 = styled.div`
    width: 1070px;
    height: 196px;
    left: 94px;
    top: 350px;
    position: absolute;
    background: #1E1855;
    border-radius: 41px;
`;

const StyledRectangle35 = styled.div`
    width: 1070px;
    height: 321px;
    left: 94px;
    top: 635px;
    position: absolute;
    background: #1E1855;
    border-radius: 41px;
`;

const StyledPsagradeanalyzerspan = styled.span`
    color: white;
    font-size: 96px;
    font-family: Inter;
    font-style: italic;
    font-weight: 900;
    word-wrap: break-word;
`;

const StyledHowitworkssubmitimagesofthefrontandbackofthedesiredcardyouwanttogradeaiwillscantheimagesanddeterminedthepotentialgradeofyourcarddisclaimerluckyhelmetclubisnotresponsibleforincorrectgradesthatyoureceivefrompsaandwillnotreimburseyouforyoursubmissionsspan = styled.span`
    color: white;
    font-size: 20px;
    font-family: Inter;
    font-style: italic;
    font-weight: 900;
    word-wrap: break-word;
`;

const StyledGradingPage = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background: linear-gradient(0deg, black 0%, black 100%), linear-gradient(135deg, #030F2D 17%, #FFF700 48%, #030F2D 77%);
    overflow: hidden;
`;

export const GradingPage = () => {
    return (
        <StyledGradingPage>
            <StyledRectangle1 />
            <StyledHome>Home</StyledHome>
            <StyledNew>New</StyledNew>
            <StyledPacks>Packs</StyledPacks>
            <StyledCards>Cards</StyledCards>
            <StyledContact>Contact</StyledContact>
            <StyledLuckyhelmetlogo1  src="https://placehold.co/239x239"/>
            <StyledPokBalliconsvg1  src="https://placehold.co/131x131"/>
            <StyledRectangle34 />
            <StyledRectangle35 />
            <StyledPSAGradeAnalyzer>PSA Grade Analyzer</StyledPSAGradeAnalyzer>
            <StyledHowitworksSubmitimagesofthefrontandbackofthedesiredcardyouwanttogradeAiwillscantheimagesanddeterminedthepotentialgradeofyourcardDisclaimerLuckyHelmetClubisnotresponsibleforincorrectgradesthatyoureceivefromPSAandwillnotreimburseyouforyoursubmissions>How it works:<br/><br/>Submit images of the front and back of the desired card you want to grade. Ai will scan the images and determined the potential grade of your card.<br/><br/><br/>Disclaimer:      Lucky Helmet Club is not responsible for incorrect grades that you receive from PSA and will not reimburse you for your submissions.</StyledHowitworksSubmitimagesofthefrontandbackofthedesiredcardyouwanttogradeAiwillscantheimagesanddeterminedthepotentialgradeofyourcardDisclaimerLuckyHelmetClubisnotresponsibleforincorrectgradesthatyoureceivefromPSAandwillnotreimburseyouforyoursubmissions>
        </StyledGradingPage>
    );
};