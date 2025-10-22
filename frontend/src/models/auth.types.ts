//TODO: Projektbezogen Anpassen

export const Roles = {
    ADMIN: "Admin",
    USER: "User"
} as const;
//Key: "ADMIN" | "USER"
export type TRoleKey = keyof typeof Roles;
//Value: "Admin" | "User"
export type TRoleValue = typeof Roles[TRoleKey];

export type TLoginUser = {
    username: string
    password: string
}

export type TJwtUserPayload = {
    sub: string;
    username?: string;
    roles?: TRoleValue[];
    iat?: number;
    exp?: number;
}



