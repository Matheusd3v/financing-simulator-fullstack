import React from "react";
import { css } from "styled-components";

export type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  size?: "max" | "medium" | "small";
  ref?: React.RefObject<HTMLButtonElement | null>
};

export const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
    border: none;
    &:hover:not(:disabled) {
      background: #003840;
    }
    &:focus {
      outline: none;
      box-shadow: ${({ theme }) => theme.button.focusRing} ${({ theme }) => theme.primary}60;
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
    border: none;
    &:hover:not(:disabled) {
      background: #c0f0ec;
    }
    &:focus {
      outline: none;
      box-shadow: ${({ theme }) => theme.button.focusRing} ${({ theme }) => theme.secondary}60;
    }
  `,
  outline: css`
    background: transparent;
    border: 1.5px solid ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.white};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.secondary};
      color: ${({ theme }) => theme.primary};
    }
    &:focus {
      outline: none;
      box-shadow: ${({ theme }) => theme.button.focusRing} ${({ theme }) => theme.primary}60;
    }
  `,
  danger: css`
    background: #ef4444;
    color: ${({ theme }) => theme.white};
    border: none;
    &:hover:not(:disabled) {
      background: #dc2626;
    }
    &:focus {
      outline: none;
      box-shadow: ${({ theme }) => theme.button.focusRing} #ef444460;
    }
  `,
};
