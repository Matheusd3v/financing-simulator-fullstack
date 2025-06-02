import type { AxiosResponse, AxiosError } from "axios";
import type { DefaultResponseProps } from "../services/types/default-response.type";

export interface ApiError<E = DefaultResponseProps> {
    data: E;
    status: number;
    message: string;
    originalError?: unknown;
}

export type HandleResponseProps<T, E = DefaultResponseProps> =
    | { data: T; success: true; error?: never }
    | { data?: never; success: false; error: ApiError<E> };

function isAxiosError<E>(error: unknown): error is AxiosError<E> {
    return (
        typeof error === "object" &&
        error !== null &&
        "isAxiosError" in error &&
        (error as AxiosError).isAxiosError === true
    );
}

function createApiError<E>(
    data: E,
    status: number,
    message: string,
    originalError?: unknown
): ApiError<E> {
    return {
        data,
        status,
        message,
        originalError,
    };
}

export async function handleResponse<T, E = DefaultResponseProps>(
    cb: () => Promise<AxiosResponse<T, E>>
): Promise<HandleResponseProps<T, E>> {
    try {
        const { data } = await cb();
        return { data, success: true };
    } catch (error: unknown) {
        if (isAxiosError<E>(error)) {
            const apiError = createApiError<E>(
                error.response?.data || ({} as E),
                error.response?.status || 500,
                error.message || "Request failed",
                error
            );

            return { error: apiError, success: false };
        }
        const networkError = createApiError<E>(
            { message: "Network or unknown error" } as E,
            0,
            error instanceof Error ? error.message : "Unknown error occurred",
            error
        );

        return { error: networkError, success: false };
    }
}
