import styled from "styled-components";

export const Section = styled.section`
    width: 100%;
    background-color: ${({ theme }) => theme.primary};
    height: 300px;
    color: ${({ theme }) => theme.white};
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding: 50px;
    box-sizing: border-box;

    p {
        font-size: 1.25rem;
        line-height: 1.75rem;
    }
`;
