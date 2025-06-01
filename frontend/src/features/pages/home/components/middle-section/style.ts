import styled from "styled-components";

export const Section = styled.section`
    width: 100%;
    background-color: ${({ theme }) => theme.white};
    height: 500px;
    color: ${({ theme }) => theme.primary};
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding: 50px;
    box-sizing: border-box;

    .financing-cards-container {
        display: flex;
        width: 100%;
        max-width: 1500px;
        justify-content: space-between;
    }


    @media (max-width: 1320px) {
        .financing-cards-container {
            display: flex;
        }
    }

    @media (max-width: 991px) {
        .financing-cards-container {
            flex-direction: column;
            align-items: center;
        }
    }
`;
