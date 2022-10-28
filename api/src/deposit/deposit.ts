import rand from "../lib/rand";

export namespace DepositSchema {
    export interface Deposit {
        _id:string;
        image:string,
        maVanDon:string,
        nameSanPham:string,
        soKien:number,
        kgM3:number,
        donGia:number,
        phuPhi:number,
        tongTien:number
        ctime:string;
        utime:string;
    }

    export interface CreateDepositParams {
        image:string,
        maVanDon:string,
        nameSanPham:string,
        soKien:number,
        kgM3:number,
        donGia:number,
        phuPhi:number,
        tongTien:number
    }

    export interface UpdateDepositParams {
        image?:string,
        maVanDon?:string,
        nameSanPham?:string,
        soKien?:number,
        kgM3?:number,
        donGia?:number,
        phuPhi?:number,
        tongTien?:number
        utime:string
    }

    export const Generate = {
        NewDepositId:()=> rand.alphabet(14)
    }
}