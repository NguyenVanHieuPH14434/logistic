import { Commons } from './../common/common';
import * as dayjs from 'dayjs';
import { DepositSchema } from './deposit';
import { DepositModel } from './deposit.model';
export class DepositController {
    constructor(private model:DepositModel){}

    async init () {}

    async CreateDeposit (depoId:string, params:any){
        const now = dayjs();
        const nowFormat = now.format('DD/MM/YYYY');
        const nowFormatIMG = now.format('DDMMYYYY');
        const deposit:DepositSchema.Deposit = params.map((item:any)=>({
            _id: DepositSchema.Generate.NewDepositId(),
            image: item.image?item.image.map((it:any)=> Commons.folderImageDeposit+ nowFormatIMG + '_' +it):item.image,
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

    async UpdateDeposit (params:any){
        const now = dayjs();
        const nowFormat = now.format('DD/MM/YYYY');
        const nowFormatIMG = now.format('DDMMYYYY');
        for (let i = 0; i < params.length; i++) {
            let deposit = params[i];
            deposit.utime = nowFormat
           await this.model.UpdateDeposit(deposit);
        }
        return params;
    }

    async ListDeposit () {
        return this.model.ListDeposit();
    }
}