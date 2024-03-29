import rand from "../lib/rand";

export namespace OrderSchema {
    export interface Order {
        _id:string;
        user_id:string;
        full_name:string;
        phone:string;
        address:string;
        type:string;
        ctime:string;
        utime:string;
    }

    export interface CreateOrderParams {
        user_id:string;
        full_name:string;
        phone:string;
        address:string;
        type:string;
    }

    export interface UpdateOrderParams {
        full_name?:string;
        phone?:string;
        address?:string;
        type?:string;
        utime:string;
    }

    export const Generate = {
        NewOrderId: ()=> rand.alphabet(14)
    }

}