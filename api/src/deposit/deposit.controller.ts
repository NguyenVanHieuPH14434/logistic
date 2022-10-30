import dayjs from 'dayjs';
import { DepositSchema } from './deposit';
import { DepositModel } from './deposit.model';
export class DepositController {
    constructor(private model:DepositModel){}

    async init () {}

    async CreateDeposit (depoId:string, params:any){
        const now = dayjs();
        const nowFormat = now.format('DD/MM/YYYY');
        const deposit:DepositSchema.Deposit = params.map((item:any)=>({
            _id: DepositSchema.Generate.NewDepositId(),
            image: item.image,
            deposit_id:depoId,
            maVanDon: item.maVanDon,
            nameSanPham: item.nameSanPham,
            soKien: item.soKien,
            kgM3: item.kgM3,
            donGia: item.donGia,
            phuPhi: item.phuPhi,
            note:item.note,
            tongTien: item.tongTien,
            ctime: nowFormat,
            utime: nowFormat,
        }));
        await this.model.CreateDeposit(deposit);
        return deposit;
    }

    async UpdateDeposit (depoId:string, params:any){
        const now = dayjs();
        const nowFormat = now.format('DD/MM/YYYY');
        // const deposit = params
        // const deposit:DepositSchema.UpdateDepositParams = params.map((item:any)=>({
        //     image: item.image,
        //     deposit_id:depoId,
        //     maVanDon: item.maVanDon,
        //     nameSanPham: item.nameSanPham,
        //     soKien: item.soKien,
        //     kgM3: item.kgM3,
        //     donGia: item.donGia,
        //     phuPhi: item.phuPhi,
        //     note:item.note,
        //     tongTien: item.tongTien,
        //     utime: nowFormat,
        // }));
        for (let i = 0; i < params.length; i++) {
            await this.model.UpdateDeposit(params[i]);
        }
        // return deposit;
        return params.length
    }

    async ListDeposit () {
        return this.model.ListDeposit();
    }
}