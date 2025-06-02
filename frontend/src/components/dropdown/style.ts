import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const DropdownContainer = styled.div`
    position: absolute;
    right: 0;
    top: 4%;
    margin-top: 0.5rem;
    width: 12rem;
    background: ${({ theme }) => theme.white};
    border-radius: 6px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    padding: 0.25rem 0;
    z-index: 50;
    border: 1px solid #e5e7eb;
`;

export const DropdownItem = styled(Link)`
    && {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        color: ${({ theme }) => theme.primary};
        background-color: ${({ theme }) => theme.white};
        text-decoration: none;
        transition: background-color 0.2s ease;

        &:hover {
            background-color: ${({ theme }) => theme.secondary};
        }

        svg {
            margin-right: 10px;
        }
    }
`;

export const DropdownButton = styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.white};
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({ theme }) => theme.secondary};
    }

    svg {
        margin-right: 0.5rem;
    }
`;
