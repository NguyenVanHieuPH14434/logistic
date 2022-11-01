import rand from "../lib/rand";

export namespace Order_item_Schema {
    export interface Order_item {
        _id:string;
        order_id:string;
        product_name:string;
        product_link:string;
        product_image:string;
        attribute:string;
        quantity:string;
        product_price:number;
        note:any;
        maVanDon?:string,
        soKien:number,
        kgM3:number,
        donGia:number,
        phuPhi:number,
        total_price:number;
        ctime:string;
        utime:string;
    }

    export interface CreateOrderItemParams {
        order_id:string;
        product_name:string;
        product_link:string;
        product_image:string;
        attribute:string;
        quantity:string;
        product_price:number;
        note:any;
        maVanDon?:string,
        soKien:number,
        kgM3:number,
        donGia:number,
        phuPhi:number,
        total_price:number;
    }

    export interface UpdateOrderItemParams {
        product_name?:string;
        product_link?:string;
        product_image?:string;
        attribute?:string;
        quantity?:string;
        product_price?:number;
        note?:any;
        maVanDon?:string,
        soKien?:number,
        kgM3?:number,
        donGia?:number,
        phuPhi?:number,
        total_price?:number;
        utime:string;
    }

    export const Generate = {
        NewOrderItemId : () => rand.alphabet(14)
    }
}