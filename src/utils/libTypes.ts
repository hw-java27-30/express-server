import e from "express";

export interface AuthRequest extends e.Request {
    userId?: number,
    userName?: string,
    roles?: Roles[],
}

export enum Roles {
    ADMIN = "admin",
    USER = "user",
    GUEST = "guest",
}