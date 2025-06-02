import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { API } from "../api.service";
import { apiRoutes } from "../api-routes.service";
import type {
    ISimulationPaginated,
} from "../types/simulation.type";

const schema = z.object({
    total: z.number().min(10),
    installments: z.number().min(3),
    monthlyInterest: z.number().min(0.05),
});

const resolver = {
    create: zodResolver(schema),
};

interface CreateResponseProps {
    monthlyInstallment: string;
    uuid: string;
}

interface PaginationProps {
    limit: number;
    page: number;
}

type SimulationFormProps = z.output<typeof schema>;

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
            fields
        );

        return data;
    }
}

export const Simulation = {
    api: new Simulations(),
    resolver,
};

export type SimulationProps = {
    Props: SimulationFormProps;
};
