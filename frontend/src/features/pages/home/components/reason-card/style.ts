import styled from "styled-components";

export const ReasonStyle = styled.div`
    background-color: ${({ theme }) => theme.secondary};
    width: 400px;
    height: 200px;
    border-radius: 10px;
    padding: 10px 20px;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    h3 {
        font-size: 28px;
    }

    .financing-card-icon {
        background-color: ${({ theme }) => theme.primary};
        border-radius: 50%;
        color: ${({ theme }) => theme.primary};
        display: inline-flex;
        padding: 12px;
        color: rgb(255 255 255 / var(--tw-text-opacity, 1));
    }

    @media (max-width: 1320px) {
        margin: 0px;
        width: 290px;

        h3 {
            font-size: 24px;
        }
    }

    @media (max-width: 991px) {
        margin: 10px 0px;
        width: 350px;
    }

    @media (max-width: 350px) {
        margin: 10px 0px;
        width: 300px;
        height: 250px;
    }
`;
