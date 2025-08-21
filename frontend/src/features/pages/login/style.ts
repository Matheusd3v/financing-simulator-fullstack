import styled from "styled-components";

export const FormLoginContainer = styled.div`
    background-color: ${({ theme }) => theme.secondary};
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    align-items: center;
    justify-content: center;

    .form-default-inputs {
        height: 150px;
    }

    button {
        width: 90%;
        margin: 15px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 165px;
    }

    span {
        color: grey;
    }

    a {
        text-decoration: none;
        color: ${({ theme }) => theme.primary};
    }
`;
