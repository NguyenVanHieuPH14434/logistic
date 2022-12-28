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
        maVanDon:string,
        soKien:number,
        kgM3:number,
        donGia:number,
        phuPhi:number,
        typeMoney:number,
        total_price:number;
        ship:number; // phí ship
        ne_price:number; // giá đàm phán
        group:string; // nhóm hàng
        product_code:string; // mã sản phẩm
        delivery_date:string; //ngày giao hàng dự kiến
        type_title:string; // tên loại
        type_code:string // mã loại
        product_supplier:string; // nhà cung cấp
        about_the_warehouse:string; //hàng về kho: X=>đã về
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
        maVanDon:string,
        soKien:number,
        kgM3:number,
        donGia:number,
        phuPhi:number,
        typeMoney:number,
        total_price:number;
        ship:number; // phí ship
        ne_price:number; // giá đàm phán
        group:string; // nhóm hàng
        product_code:string; // mã sản phẩm
        delivery_date:string; //ngày giao hàng dự kiến
        type_title:string; // tên loại
        type_code:string // mã loại
        product_supplier:string; // nhà cung cấp
        about_the_warehouse:string; //hàng về kho: X=>đã về
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
        typeMoney?:number,
        total_price?:number;
        utime:string;
        ship?:number; // phí ship
        ne_price?:number; // giá đàm phán
        group?:string; // nhóm hàng
        product_code?:string; // mã sản phẩm
        delivery_date?:string; //ngày giao hàng dự kiến
        type_title?:string; // tên loại
        type_code?:string // mã loại
        product_supplier?:string; // nhà cung cấp
        about_the_warehouse?:string; //hàng về kho: X=>đã về
    }

    export const Generate = {
        NewOrderItemId : () => rand.alphabet(14)
    }
}