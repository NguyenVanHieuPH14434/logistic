import dayjs from 'dayjs';
import { DepositSchema } from './deposit';
import { DepositModel } from './deposit.model';
export class DepositController {
    constructor(private model:DepositModel){}

    async init () {}

    async CreateDeposit (params:DepositSchema.CreateDepositParams){
        const now = dayjs();
        const nowFormat = now.format('DD/MM/YYYY');
        const deposit:DepositSchema.Deposit = {
            _id: DepositSchema.Generate.NewDepositId(),
            image: params.image,
            maVanDon: params.maVanDon,
            nameSanPham: params.nameSanPham,
            soKien: params.soKien,
            kgM3: params.kgM3,
            donGia: params.donGia,
            phuPhi: params.phuPhi,
            tongTien: params.tongTien,
            ctime: nowFormat,
            utime: nowFormat,
        }
        await this.model.CreateDeposit(deposit);
        return deposit;
    }
}