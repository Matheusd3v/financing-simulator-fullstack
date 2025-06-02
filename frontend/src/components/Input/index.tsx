import { type ForwardedRef, forwardRef, type InputHTMLAttributes } from "react";
import { InputContainer } from "./style";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string | undefined;
}

export const Input = forwardRef(
    (
        { label, error, ...rest }: IInputProps,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <InputContainer className="input-container">
                {label ? <label>{label}</label> : null}
                <input ref={ref} {...rest} />
                <p>{error}</p>
            </InputContainer>
        );
    }
);
