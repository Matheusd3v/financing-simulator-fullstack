import axios, { AxiosError, type AxiosResponse } from "axios";
import { storage } from "../utils/storage.util";
import { toast } from "react-toastify";
import { handleUnauthorized } from "../contexts/auth.contexts";

export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: `Bearer ${
            storage.get<{ token: string }>(storage.KEY.USER)?.token
        }`,
    },
});

API.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    },
  (error: AxiosError<{ name?: string; message?: string }>) => {
    const status = error?.response?.status
    const name = error?.response?.data?.name
    if (status === 401 && name === 'TOKEN_EXPIRED'){
        toast.error('Sessão Expirada! Faça o Login Novamente')
        handleUnauthorized()
    }
    return Promise.reject(error)
  }
)