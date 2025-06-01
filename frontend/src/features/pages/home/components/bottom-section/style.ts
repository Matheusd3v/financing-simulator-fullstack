import styled from "styled-components";

export const Section = styled.section`
    width: 100%;
    background-color: ${({ theme }) => theme.secondary};
    height: 250px;
    color: ${({ theme }) => theme.primary};
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding: 50px;
    box-sizing: border-box;

    .home-bottom-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 1500px;
    }

    @media (max-width: 991px) {
        height: 350px;
    }
`;
