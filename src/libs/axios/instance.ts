import axios from "axios";
import environment from "@/config/environment";
import { getSession, signOut } from "next-auth/react";
import { SessionExtended } from "@/types/Auth";

const headers = {
    "Content-Type": "application/json",
}

const instance = axios.create({
    baseURL: environment.API_URL,
    headers: headers,
    timeout: 60 * 1000,
});

instance.interceptors.request.use(
    async (request) => {
        const session: SessionExtended | null = await getSession();
        if (session && session.accessToken) {
            request.headers.Authorization = `Bearer ${session.accessToken}`
        }
        return request;
    },
    (error) => Promise.reject(error),
);

instance.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            await signOut();
        }
    }
)

export default instance;