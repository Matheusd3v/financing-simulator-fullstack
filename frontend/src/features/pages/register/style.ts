import styled from "styled-components";

export const FormContainer = styled.section`
    background-color: ${({ theme }) => theme.secondary};
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        width: 90%;
        margin: 15px 0;
    }
`;
