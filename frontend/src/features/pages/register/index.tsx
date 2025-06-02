import Form from "../../../components/form";
import { Input } from "../../../components/Input";
import { Container } from "../../../style/container";
import { FormContainer } from "./style";
import { Services, type ServiceProps } from "../../../services/data";
import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../../../components/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type CreateStudentFormProps = ServiceProps["Student"]["Form"];

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateStudentFormProps>({
        resolver: Services.Student.resolver,
    });
    const navigate = useNavigate();

    const submit: SubmitHandler<CreateStudentFormProps> = (formData) => {
        Services.Student.api
            .create(formData)
            .then((response) => {
                if (response.success) {
                    reset();
                    toast.success("Estudante criado com sucesso!");
                    navigate("/");
                }
            })
            .catch((e) => {
                toast.error(e?.message ?? "Falha ao criar estudante");
            });
    };

    return (
        <Container>
            <FormContainer>
                <Form onSubmit={handleSubmit(submit)}>
                    <h3>Crie sua conta</h3>

                    <div className="form-default-inputs">
                        <Input
                            label="Nome *:"
                            type="text"
                            {...register("name")}
                            error={errors.name ? errors.name.message : " "}
                        />

                        <Input
                            label="Sobrenome *:"
                            type="text"
                            {...register("lastName")}
                            error={
                                errors.lastName ? errors.lastName.message : " "
                            }
                        />

                        <Input
                            label="Email *:"
                            type="text"
                            {...register("email")}
                            error={errors.email ? errors.email.message : " "}
                        />

                        <Input
                            label="Senha *:"
                            type="password"
                            {...register("password")}
                            error={
                                errors.password ? errors.password.message : " "
                            }
                        />
                    </div>

                    <Button type="submit">Cadastrar</Button>
                </Form>
            </FormContainer>
        </Container>
    );
};

export default Register;
