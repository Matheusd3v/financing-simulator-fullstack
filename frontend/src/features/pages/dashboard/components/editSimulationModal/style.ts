import { styled } from "styled-components";

export const BlackoutWall = styled.div`
    width: 100vw;
    min-height: 100vh;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 25;
    display: block;
    right: 0;
    top: 0;

    .form-default-inputs {
        height: 300px;
    }

    .installment-value {
        color: ${({ theme }) => theme.primary};
        font-size: 15px;
        font-weight: 700;
    }

    .installment-value-modal {
        display: flex;
        width: 90%;
        justify-content: flex-start;
        margin-bottom: 25px;

        p {
            margin-left: 15px;
        }
    }
    
    .modal-btns {
        display: flex;
        width: 100%;

        button {
            width: 150px;
        }
    }
`;
