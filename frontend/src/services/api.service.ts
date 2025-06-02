import axios from "axios";
import { storage } from "../utils/storage.util";

export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: `Bearer ${
            storage.get<{ token: string }>(storage.KEY.USER)?.token
        }`,
    },
});
