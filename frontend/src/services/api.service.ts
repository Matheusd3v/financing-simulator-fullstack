import axios from "axios";
import { storage } from "../utils/storage.util";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: `Bearer ${
            storage.get<{ token: string }>(storage.KEY.TOKEN)?.token
        }`,
    },
});
