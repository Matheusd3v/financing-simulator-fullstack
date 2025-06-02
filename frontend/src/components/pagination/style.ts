import { styled } from "styled-components";
import Button from "../button";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

export const NavigationButton = styled(Button)`
  padding: 0.5rem;
  min-width: auto;
`;

export const PageButton = styled(Button)<{ $isActive: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  min-width: 2.5rem;
  padding: 0;
  
  ${({ $isActive, theme }) => $isActive && `
    color: ${theme.white};
  `}
  
  ${({ $isActive, theme }) => !$isActive && `
    color: ${theme.primary};
  `}
`;

export const EllipsisButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  color: ${({ theme }) => theme.primary};
`;