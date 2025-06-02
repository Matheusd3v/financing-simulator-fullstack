import { StyledButton } from "./style";
import type { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  type = "button",
  fullWidth = false,
  disabled = false,
  className = "",
  size = 'max',
  ref
}) => {
  return (
    <StyledButton
      type={type}
      $variant={variant}
      $fullWidth={fullWidth}
      $size={size}
      disabled={disabled}
      className={className}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
