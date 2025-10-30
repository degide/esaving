import type { LoginDTO, LoginResBodyDataDTO, UserProfileResBodyDataDTO } from "~/types/auth";
import { Client, refineAndThrowError } from "./client";
import type { ResBodyDTO } from "~/types/common";

export class AuthApi {
    static async login(dto: LoginDTO) {
        try {
            const response = await Client.post<ResBodyDTO<LoginResBodyDataDTO>>("/auth/login", dto);
            return response.data;
        } catch (err: any) {
            refineAndThrowError(err, "Invalid username or password.");
        }
    }

    static async getUserProfile() {
        try {
            const response = await Client.get<ResBodyDTO<UserProfileResBodyDataDTO>>("/users/user-profile");
            return response.data;
        } catch (err: any) {
            refineAndThrowError(err);
        }
    }

    static async logout() {
        try {
            await AuthApi.logout();
        } catch (err: any) {
            refineAndThrowError(err);
        }
    }
}