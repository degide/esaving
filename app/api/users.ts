import type { User } from "~/types/auth";
import { Client, refineAndThrowError } from "./client";
import type { PaginatedResBodyDTO } from "~/types/common";

export type UserPagination = {
    search: string;
    page: number;
    limit: number;
};

export class UserApi {
    static async getAllUsers(pagination: UserPagination) {
        try {
            const response = await Client.get<PaginatedResBodyDTO<User>>("/users", {
                params: pagination
            });
            return response.data!;
        } catch (err: any) {
            refineAndThrowError(err, "Can not fetch users.");
        }
    }

    static async approveUser(userId: number) {
        try {
            const response = await Client.put(`/users/approve-user/${userId}`);
            return response.data!;
        } catch (err: any) {
            refineAndThrowError(err, "User approval failed");
        }
    }

    static async suspendUser(userId: number) {
        try {
            const response = await Client.put(`/users/suspend-user/${userId}`);
            return response.data!;
        } catch (err: any) {
            refineAndThrowError(err, "User suspension failed");
        }
    }


    static async activateUser(userId: number) {
        try {
            const response = await Client.put(`/users/activate-user/${userId}`);
            return response.data!;
        } catch (err: any) {
            refineAndThrowError(err, "User activation failed");
        }
    }
}