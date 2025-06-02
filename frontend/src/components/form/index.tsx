import type React from "react";
import { FormStyle } from "./style";

interface FormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
    className?: string;
}

export const Form: React.FC<FormProps> = ({
    onSubmit,
    children,
    className,
}) => {
    return (
        <FormStyle onSubmit={onSubmit} className={className}>
            {children}
        </FormStyle>
    );
};

export default Form;
