import styled from "styled-components";

export const FormStyle = styled.form`
    margin: 0 auto;
    background-color: #fff;
    color: ${({ theme }) => theme.primary};
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 50px 20px;
    height: auto;
    border-radius: 10px;
    box-sizing: border-box;
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
        0 4px 6px -4px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
        var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

    button {
        margin: 0 auto;
    }

    p {
        color: red;
        font-weight: 100;
        font-size: 15px;
        margin: 0;
    }

    h3 {
        margin-bottom: 25px;
    }

    .form-default-inputs {
        height: 300px;
        width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
`;
