import { FormProfileContainer } from "./style";
import Form from "../../../components/form";
import { Input } from "../../../components/Input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Services, type ServiceProps } from "../../../services/data";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/button";
import { UserIcon } from "lucide-react";
type UpdateStudent = ServiceProps["Student"]["UpdateForm"];

function Profile() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UpdateStudent>({
        resolver: Services.Student.resolver.update,
    });
    const updateInputs = async () => {
        Services.Student.api
            .get()
            .then((response) => {
                reset({
                    name: response.name,
                    lastName: response.lastName,
                    email: response.email,
                    newPassword: "",
                    confirmPassword: "",
                });
            })
            .catch(() => toast.error("Falha ao buscar dados do estudante"));
    };

    const submit: SubmitHandler<UpdateStudent> = (formData) => {
        Services.Student.api.update(formData).then(() => {
            updateInputs();
            toast.success("Dados atualizados!");
        });
    };

    useEffect(() => {
        updateInputs();
    }, []);

    return (
        <FormProfileContainer>
            <Form onSubmit={handleSubmit(submit)}>
                <UserIcon size={32} />
                <h3>Editar Perfil</h3>
                <div className="form-default-inputs">
                    <Input
                        label="Nome: "
                        type="text"
                        {...register("name")}
                        error={errors.name ? errors.name?.message : ""}
                    />
                    <Input
                        label="Sobrenome"
                        type="text"
                        {...register("lastName")}
                        error={errors.lastName ? errors.lastName?.message : ""}
                    />
                    <Input
                        label="Email"
                        type="email"
                        {...register("email")}
                        error={errors.email ? errors.email?.message : ""}
                    />
                    <Input
                        label="Nova senha"
                        type="password"
                        {...register("newPassword")}
                        error={
                            errors.newPassword
                                ? errors.newPassword?.message
                                : ""
                        }
                    />
                    <Input
                        label="Confirmação de senha"
                        type="password"
                        {...register("confirmPassword")}
                        error={
                            errors.confirmPassword
                                ? errors.confirmPassword?.message
                                : ""
                        }
                    />
                </div>

                <Button type="submit">Atualizar</Button>
            </Form>
        </FormProfileContainer>
    );
}

export default Profile;
