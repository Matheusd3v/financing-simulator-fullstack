import { css, styled } from "styled-components";
import { variantStyles, type ButtonProps } from "./types";

export const StyledButton = styled.button<{
    $variant: ButtonProps["variant"];
    $fullWidth: boolean;
    $size: ButtonProps["size"];
}>`
    padding: ${({ theme }) => theme.button.padding};
    border-radius: ${({ theme }) => theme.button.borderRadius};
    font-weight: ${({ theme }) => theme.button.fontWeight};
    font-size: ${({ theme }) => theme.button.fontSize};
    transition: ${({ theme }) => theme.button.transition};
    height: ${({ theme, $size }) => theme.button.height[$size || "max"]};
    ${({ $variant }) => variantStyles[$variant || "primary"]}
    ${({ $fullWidth }) =>
        $fullWidth &&
        css`
            width: 100%;
            display: block;
        `}
    cursor: pointer;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
