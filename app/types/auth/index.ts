import type { EGender, EGeneralStatus, EUserRole } from "../common/enum";

export type User = {
    id: number;
    firstName: string;
    middleName: string | null;
    lastName: string;
    email: string;
    role: EUserRole;
    gender: EGender;
    status: EGeneralStatus;
    creditScore: number;
    createdAt: string;
    updatedAt: string;
}

export type UserSession = {
    id: number;
}

export type LoginDTO = {
    username: string;
    password: string;
}

export type RegisterDTO = {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    password: string;
    gender: EGender;
    role: EUserRole;
}

export type LoginResBodyDataDTO = {
    token: string;
    refreshToken: string;
    refreshTokenExpiry: string;
}

export type UserProfileResBodyDataDTO = {
    user: User;
    activeSessions: UserSession[];
}
