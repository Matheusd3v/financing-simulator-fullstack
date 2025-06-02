import styled from "styled-components";

export const CardStyle = styled.nav`
    height: 60px;
    width: 100vw;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
    padding: 10px 40px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    
    a {
        all: unset;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    p {
        margin-left: 10px;
        font-size: 1.25rem;
    }

    .logo-container {
        font-weight: 700;
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
`;
