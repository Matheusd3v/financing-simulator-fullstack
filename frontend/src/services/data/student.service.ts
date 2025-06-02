import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { API } from "../api.service";
import { apiRoutes } from "../api-routes.service";
import { handleResponse } from "../../utils/response.util";

const schema = z.object({
    name: z
        .string()
        .min(2, "Nome obrigatório!")
        .max(25, "Maximo de 25 caracteres!"),
    lastName: z
        .string()
        .min(2, "Sobrenome obrigatório!")
        .max(25, "Maximo de 25 caracteres!"),        
    email: z.string().min(1, "Email obrigatório!").email("Email inválido!"),
    password: z
        .string()
        .min(6, "Mínimo 6 caracteres!")
        .max(12, "Maximo 12 caracteres!"),
});

const resolver = zodResolver(schema);

type Student = z.output<typeof schema>;
type FormProps = z.input<typeof schema>;

class Students {
    async create(data: FormProps) {
        const fetcher = () => API.post(apiRoutes.student.register, data);
        return handleResponse(fetcher);
    }

}

export const Student =  {
    api: new Students(),
    resolver
}

export type StudentProps = {
    Props: Student,
    Form: FormProps
}