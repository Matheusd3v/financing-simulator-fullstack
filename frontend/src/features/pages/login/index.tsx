import { useForm, type SubmitHandler } from "react-hook-form";
import Form from "../../../components/form";
import { Services, type ServiceProps } from "../../../services/data";
import { Container } from "../../../style/container";
import { FormLoginContainer } from "./style";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/Input";
import Button from "../../../components/button";
import { LockIcon } from "lucide-react";
import { hook } from "../../../contexts";
import { toast } from "react-toastify";

type LoginFormProps = ServiceProps["AuthProps"]["LoginCredentialProps"];

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginFormProps>({
        resolver: Services.Auth.resolver.login,
    });
    const navigate = useNavigate();
    const { handleLogin } = hook.useAuth();

    const submit: SubmitHandler<LoginFormProps> = (formData) => {
        handleLogin(formData)
            .then((response) => {
                console.log(response);
                if (response?.token) {
                    reset();
                    navigate("/dashboard");
                } else {
                    toast.error("Falha ao realizar login! Revise as credenciais.");
                }
            })
    };

    return (
        <Container>
            <FormLoginContainer>
                <Form onSubmit={handleSubmit(submit)}>
                    <h3>Acesse sua conta</h3>
                    <div className="form-default-inputs">
                        <Input
                            label="Email:"
                            type="email"
                            {...register("email")}
                            error={errors?.email ? errors.email.message : ""}
                        />
                        <Input
                            label="Senha:"
                            type="password"
                            {...register("password")}
                            error={
                                errors?.password ? errors?.password.message : ""
                            }
                        />
                    </div>

                    <Button type="submit">
                        <LockIcon />
                        Entrar
                    </Button>
                </Form>
            </FormLoginContainer>
        </Container>
    );
};

export default Login;
