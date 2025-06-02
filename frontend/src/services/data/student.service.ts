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

export const updateStudentSchema = z
    .object({
        name: z
            .string()
            .min(2, "Nome obrigatório!")
            .max(25, "Máximo de 25 caracteres!"),
        lastName: z
            .string()
            .min(2, "Sobrenome obrigatório!")
            .max(25, "Máximo de 25 caracteres!"),
        email: z.string().min(1, "Email obrigatório!").email("Email inválido!"),

        newPassword: z
            .string()
            .transform((val) => (val.trim() === "" ? undefined : val))
            .optional()
            .refine(
                (val) => {
                    if (!val) return true;
                    return val.length >= 6 && val.length <= 12;
                },
                { message: "Nova senha deve ter entre 6 e 12 caracteres!" }
            ),

        confirmPassword: z
            .string()
            .transform((val) => (val.trim() === "" ? undefined : val))
            .optional(),
    })
    .superRefine((data, ctx) => {
        const { newPassword, confirmPassword } = data;

        if (newPassword && !confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Confirmação de senha é obrigatória!",
                path: ["confirmPassword"],
            });
        }

        if (!newPassword && confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Nova senha é obrigatória!",
                path: ["newPassword"],
            });
        }

        if (newPassword && confirmPassword && newPassword !== confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Confirmação de senha não confere!",
                path: ["confirmPassword"],
            });
        }
    });

const resolver = {
    create: zodResolver(schema),
    update: zodResolver(updateStudentSchema),
};

type Student = z.output<typeof schema>;
type FormProps = z.input<typeof schema>;
type UpdateFormProps = z.input<typeof updateStudentSchema>;

interface GetStudentProps extends Omit<Student, "password"> {
    uuid: string;
    createdAt: Date;
    isActive: boolean;
}

class Students {
    async create(data: FormProps) {
        const fetcher = () => API.post(apiRoutes.student.register, data);
        return handleResponse(fetcher);
    }

    async get() {
        const { data } = await API.post<GetStudentProps>(
            apiRoutes.student.find
        );
        return data;
    }

    async update(data: UpdateFormProps) {
        const { confirmPassword, ...rest } = data;
        const fetcher = () =>
            API.put(apiRoutes.student.update, {
                password: confirmPassword,
                ...rest,
            });
        return handleResponse(fetcher);
    }
}

export const Student = {
    api: new Students(),
    resolver,
};

export type StudentProps = {
    Props: Student;
    Form: FormProps;
    UpdateForm: UpdateFormProps;
};
