import axios, { isAxiosError } from "axios"

export const Client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    }
});

Client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const refineAndThrowError = (err: any, message?: string) => {
    if(isAxiosError(err)) {
        if(err.response?.data?.message?.toLowerCase().includes("User is not activated".toLowerCase())) {
            throw new Error("Your account is not activated. Please contact system admin.");
        } else throw new Error(message || err.response?.data?.message || "Request failed. Please contact system admin.");
    } else throw err;
}