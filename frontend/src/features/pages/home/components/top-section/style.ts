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

    .home-top-p {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px 0;
    }

    p {
        font-size: 1.25rem;
        line-height: 1.75rem;
        margin: 0
    }

    button {
        margin-left: 20px;
    }

    .top-section-btn-container {
        width: 100%;
        max-width: 350px;
        display: flex;
        justify-content: space-between;
        a {
            text-decoration: none;            
        }

        svg {
            margin-right: 5px;
        }
    }

    @media (max-width: 991px) {
        height: 500px;
    }

    @media (max-width: 400px) {
        .top-section-btn-container {
            justify-content: center;
            flex-direction: column;
            
            button {
                margin-bottom: 20px;
            }

        }

        height: 600px;
    }
`;
