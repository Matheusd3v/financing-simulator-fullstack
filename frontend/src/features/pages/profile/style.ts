import { styled } from "styled-components";

export const FormProfileContainer = styled.section`
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

     .form-default-inputs {
        height: 350px;
    }

    button {
        width: 90%;
        margin: 15px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 165px;
    }
`;
