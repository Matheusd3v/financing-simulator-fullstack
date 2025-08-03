import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../../../../../components/button";
import Form from "../../../../../components/form";
import { Input } from "../../../../../components/Input";
import { Container } from "../../../../../style/container";
import { Services, type ServiceProps } from "../../../../../services/data";
import { useState } from "react";
import { BlackoutWall } from "../editSimulationModal/style";
import { toast } from "react-toastify";

type CreateSimulationType = ServiceProps["Simulation"]["Props"];
type CreateSimulationProps = {
    onClose(): void;
    onSuccess(): void
};

function CreateSimulationModal({ onClose, onSuccess }: CreateSimulationProps) {
    const [monthlyInstallment, setmonthlyInstallment] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateSimulationType>({
        resolver: Services.Simulation.resolver.create,
    });
    const submit: SubmitHandler<CreateSimulationType> = async (formData) => {
        const { monthlyInstallment } = await Services.Simulation.api.create(
            formData
        );
        setmonthlyInstallment(monthlyInstallment);
        toast.success("Simulação salva!");
        onSuccess()
		onClose()
    };

    return (
        <Container>
            <BlackoutWall>
                <Form onSubmit={handleSubmit(submit)}>
                    <h3>Crie uma simulação</h3>
                    <div className="form-default-inputs">
                        <Input
                            label="Juros a.m:"
                            type="number"
                            step="0.0001"
                            min="0.0001"
                            {...register("monthlyInterest", {
                                valueAsNumber: true,
                            })}
                            error={
                                errors?.monthlyInterest
                                    ? errors.monthlyInterest.message
                                    : ""
                            }
                        />
                        <Input
                            label="Total: "
                            type="number"
                            step="0.01"
                            min="10"
                            max="999999999"
                            {...register("total", {
                                valueAsNumber: true,
                            })}
                            error={errors?.total ? errors.total.message : ""}
                        />
                        <Input
                            label="Prazo: "
                            type="number"
                            error={errors?.installments?.message ?? ""}
                            {...register("installments", {
                                valueAsNumber: true,
                            })}
                        />
                    </div>
                    <div className="installment-value-modal">
                        Parcela mensal:
                        <p className="installment-value">
                            {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(
                                monthlyInstallment ? +monthlyInstallment : 0
                            )}
                        </p>
                    </div>

                    <div className="modal-btns">
                        <Button onClick={onClose} variant="danger">
                            Fechar
                        </Button>
                        <Button 
							type="submit" 
						>
                            Salvar
                        </Button>
                    </div>
                </Form>
            </BlackoutWall>
        </Container>
    );
}

export default CreateSimulationModal;
