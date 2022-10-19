import rand from "../lib/rand";

export namespace AuthSchema {
    export enum Role {
        Admin = "admin",
        User = "nguoi_dung",
        Manager = "quan_ly"
    }

    export interface Auth {
        _id: string;
        username: string;
        phone: string;
        fullName: string;
        role: string;
        password: string;
        delete: number;
        ctime: string;
        utime: string;
        dtime: string;
    }

    export interface CreateAuthParams {
        username: string;
        phone: string;
        fullName: string;
        role: string;
        password: string;
    }

    export interface UpdateAuthParams {
        phone?: string;
        fullName?: string;
        delete?: number;
        utime?: string;
        dtime?:string;
    }

    export const Generate = {
        NewIdAuth : () => rand.alphabet(16)
    }

}