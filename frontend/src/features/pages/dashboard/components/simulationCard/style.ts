import styled from "styled-components";

export const CardContainer = styled.div<{ $isExpanded?: boolean }>`
    background-color: ${({ theme }) => theme.white};
    width: 480px;
    min-height: 250px;
     position: relative;
    z-index: ${({ $isExpanded }) => $isExpanded ? 10 : 1};
    --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
        0 2px 4px -2px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color),
        0 2px 4px -2px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
        var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px;
    box-sizing: border-box;
    margin-bottom: 75px;

    .simulation-icons {
        width: 100%;
        display: flex;
        justify-content: end;

        svg {
            margin: 0 12px;
        }

        button {
            all: unset;
            background-color: transparent;
            color: inherit;
            cursor: pointer;
        }
    }

    .monthly-installment {
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 700px;
        font-size: 24px;
        color: ${({ theme }) => theme.primary};
        margin-top: 20px;
        width: 90%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    p {
        font-size: 15px;
        margin: 8px;
    }

    .total-value-simulaton {
        padding-top: 15px;
        width: 90%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);

        p {
            font-size: 15px;
        }
    }

    .second-values {
        font-weight: 600px;
        font-size: 1.125rem;
        line-height: 1.75rem;
    }

    .simulation-details {
         position: absolute; /* ✅ Remove do fluxo normal */
        top: 98%; /* ✅ Posiciona abaixo do card */
        left: 0;
        right: 0;
        background-color: ${({ theme }) => theme.white};
        width: 480px;
        height: 250px;
        --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
            0 2px 4px -2px rgb(0 0 0 / 0.1);
        --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color),
            0 2px 4px -2px var(--tw-shadow-color);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
            var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        border-radius: 0 0 8px 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 25px;
        box-sizing: border-box;
                z-index: 20; /* ✅ Fica sobre outros cards */


        span {
            color: rgba(0, 0, 0, 0.6);
            width: 90%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            
            svg {
                margin-right: 5px;;
            }
        }
    }
`;
