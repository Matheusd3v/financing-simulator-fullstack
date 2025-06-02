import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { API } from "../api.service";
import { apiRoutes } from "../api-routes.service";
import type { ISimulationPaginated } from "../types/simulation.type";

const schema = z.object({
    total: z.number().min(10),
    installments: z.number().min(3),
    monthlyInterest: z.number().min(0.0005),
});

const updateSchema = schema.partial();

const resolver = {
    create: zodResolver(schema),
    update: zodResolver(updateSchema),
};

interface CreateResponseProps {
    monthlyInstallment: string;
    uuid: string;
}

interface PaginationProps {
    limit: number;
    page: number;
}

interface UpdateResponseProps {
    monthlyInstallment: string;
}

type SimulationFormProps = z.output<typeof schema>;
type UpdateSimulationData = z.infer<typeof updateSchema>;

class Simulations {
    async list({ limit, page }: PaginationProps) {
        const { data } = await API.get<ISimulationPaginated>(
            `${apiRoutes.simulation.get}?size=${limit}&page=${page}`
        );
        return data;
    }

    async create(fields: SimulationFormProps) {
        const { data } = await API.post<CreateResponseProps>(
            apiRoutes.simulation.create,
            {
                installments: fields.installments,
                monthlyInterest: fields.monthlyInterest.toString(),
                total: fields.total.toString()
            }
        );

        return data;
    }

    async update(data: UpdateSimulationData & { id: string }) {
        const { data: body } = await API.patch<UpdateResponseProps>(
            apiRoutes.simulation.update(data.id),
            {
                installments: data?.installments,
                monthlyInterest: data?.monthlyInterest?.toString(),
                total: data?.total?.toString()
            }
        );
        return body;
    }

    async delete(id: string) {
        await API.delete(apiRoutes.simulation.delete(id));
    }
}

export const Simulation = {
    api: new Simulations(),
    resolver,
};

export type SimulationProps = {
    Props: SimulationFormProps;
    UpdateProp: UpdateSimulationData;
};
