import rand from "../lib/rand";

export namespace DepositSchema {
    export interface Deposit {
        _id:string;
        deposit_id:string,
        image:string,
        maVanDon:string,
        nameSanPham:string,
        soKien:number,
        kgM3:number,
        donGia:number,
        phuPhi:number,
        note: string,
        tongTien:number
        ctime:string;
        utime:string;
    }

    export interface CreateDepositParams {
        image:string,
        deposit_id:string,
        maVanDon:string,
        nameSanPham:string,
        soKien:number,
        kgM3:number,
        donGia:number,
        phuPhi:number,
        note: string,
        tongTien:number
    }

    export interface UpdateDepositParams {
        image?:string,
        deposit_id:string,
        maVanDon?:string,
        nameSanPham?:string,
        soKien?:number,
        kgM3?:number,
        donGia?:number,
        phuPhi?:number,
        note: string,
        tongTien?:number
        utime:string
    }

    export const Generate = {
        NewDepositId:()=> rand.alphabet(14)
    }
}