import { OrderSchema } from './order';
import { OrderModel } from './order.model';
import dayjs from 'dayjs';

export class OrderController {
    constructor(private model:OrderModel){}

    async init (){}

    async ListOrder (){
        return this.model.ListOrder();
    }

    async ListOrderByUser (userId:string){
        return this.model.ListOrderByUser(userId);
    }

    async ListItemByOrder (_id:any){
        return this.model.ListItemByOrder(_id);
    }

    async DetailOrder (orderId:string) {
        return this.model.DetailOrder(orderId);
    }

    async GetOrder (_id:string){
        return this.model.GetOrder(_id);
    }

    async CreateOrder (params:OrderSchema.CreateOrderParams){
        const now = dayjs();
        const nowFormat = now.format('DD/MM/YYYY');
        const order : OrderSchema.Order = {
            _id: OrderSchema.Generate.NewOrderId(),
            user_id: params.user_id,
            full_name: params.full_name,
            phone: params.phone,
            address: params.address,
            type: params.type,
            address_TQ: params.address_TQ,
            status: params.status,
            total: params.total,
            ctime: nowFormat,
            utime: nowFormat,
        };
        await this.model.CreateOrder(order);
        return order._id;
    }

    async UpdateOrder (_id:string, params:OrderSchema.UpdateOrderParams){
        const now = dayjs();
        const nowFormat = now.format('DD/MM/YYYY');
        const order = params;
        order.utime = nowFormat;
        await this.model.UpdateOrder(_id, order)
        return order;
    }

    async Search (filter:any) {
        return this.model.Search(filter);
    }

    async SearchByDate (userId:string, from:any, to:any) {
        return this.model.SearchByDate(userId, from, to);
    }
}