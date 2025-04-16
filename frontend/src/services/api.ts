import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";
import { signOut } from "../contexts/AuthContext";

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            Authorization: `Bearer ${cookies["@tasks.token"]}`,
        }
    });

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if (typeof window != undefined) {
            //deslogar o usuário
            signOut();
            window.location.href = "/login";
        } else {
            return (
                Promise.reject(new AuthTokenError())
            )
        }
        return Promise.reject(error);
    });

    return api;
}