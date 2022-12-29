import rand from "../lib/rand";

export namespace OrderSchema {
    export interface Order {
        _id:string;
        user_id:string;
        full_name:string;
        phone:string;
        address:string;
        type:string;
        address_TQ:string;
        datCoc:number;
        status: number;
        total: string;
        type_title:string; // tên loại
        type_code:string // mã loại
        ctime:string;
        utime:string;
    }

    export interface CreateOrderParams {
        user_id:string;
        full_name:string;
        phone:string;
        address:string;
        type:string;
        address_TQ:string;
        datCoc:number;
        status: number;
        total: string;
    }

    export interface UpdateOrderParams {
        full_name?:string;
        phone?:string;
        address?:string;
        address_TQ?:string;
        datCoc?:number;
        status?: number;
        total?: string;
        utime?:string;
        type_title?:string; // tên loại
        type_code?:string // mã loại
    }

    export const Generate = {
        NewOrderId: ()=> rand.alphabet(14)
    }

}