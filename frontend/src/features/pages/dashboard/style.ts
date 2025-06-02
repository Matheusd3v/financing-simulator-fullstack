import styled from "styled-components";

export const DashboardContainer = styled.section`
    background-color: ${({ theme }) => theme.secondary};
    width: 100%;
    min-height: calc(100vh - 60px);
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;

    h1 {
        color: ${({ theme }) => theme.primary};
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 700;
    }

    .dashboard-header {
        max-width: 1500px;
        padding: 25px 150px;
        display: flex;
        width: 100%;
        justify-content: space-between;
        box-sizing: border-box;
    }

    .cards-container {
        width: 100%;
        max-width: 1200px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
`;
