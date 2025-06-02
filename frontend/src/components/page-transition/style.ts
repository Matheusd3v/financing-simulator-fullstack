import { styled } from "styled-components";

export const TransitionContainer = styled.div<{ $isVisible: boolean }>`
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: translateX(${({ $isVisible }) => ($isVisible ? '0' : '20px')});
  transition: opacity 0.5s ease, transform 0.5s ease;
`;