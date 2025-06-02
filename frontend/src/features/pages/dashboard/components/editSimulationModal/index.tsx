import { useForm, type SubmitHandler } from "react-hook-form";
import Form from "../../../../../components/form";
import { Services, type ServiceProps } from "../../../../../services/data";
import { BlackoutWall } from "./style";
import { Input } from "../../../../../components/Input";
import Button from "../../../../../components/button";
import { useEffect, useState } from "react";
import type { ISimulation } from "../../../../../services/types/simulation.type";

type UpdateSimulationSchema = ServiceProps["Simulation"]["UpdateProp"];
type EditModalProp = {
    onClose(): void;
    simulation: ISimulation;
};

function EditSimulationModal({ onClose, simulation }: EditModalProp) {
    const [monthlyInstallment, setmonthlyInstallment] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UpdateSimulationSchema>({
        resolver: Services.Simulation.resolver.update,
    });
    const submit: SubmitHandler<UpdateSimulationSchema> = async (formData) => {
        const { monthlyInstallment } = await Services.Simulation.api.update({
            ...formData,
            id: simulation.uuid,
        });
        setmonthlyInstallment(monthlyInstallment);
    };

    const loadValues = () => {
        reset({
            installments: simulation.installments,
            monthlyInterest: Number(simulation?.monthlyInterest) || 0,
            total: Number(simulation?.total) || 0,
        });
        setmonthlyInstallment(simulation?.monthlyInstallment ?? "");
    };

    useEffect(() => {
        loadValues();
    }, []);


    return (
        <BlackoutWall>
            <Form onSubmit={handleSubmit(submit)}>
                <h3>Editar Simulação</h3>
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
                                ? errors.monthlyInterest?.message
                                : ""
                        }
                    />
                    <Input
                        label="Total"
                        type="number"
                        step="0.01" 
                        min="10" 
                        max="999999999" 
                        {...register("total", { valueAsNumber: true })}
                        error={errors?.total ? errors.total?.message : ""}
                    />
                    <Input
                        label="Prazo (meses)"
                        type="number"
                        {...register("installments", { valueAsNumber: true })}
                        error={
                            errors?.installments
                                ? errors.installments?.message
                                : ""
                        }
                    />
                </div>
                <div className="installment-value-modal">
                    Parcela mensal:
                    <p className="installment-value">
                        {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(monthlyInstallment ? +monthlyInstallment : 0)}
                    </p>
                </div>
                <div className="modal-btns">
                    <Button onClick={onClose} variant="danger">
                        Fechar
                    </Button>
                    <Button type="submit">Editar</Button>
                </div>
            </Form>
        </BlackoutWall>
    );
}

export default EditSimulationModal;
