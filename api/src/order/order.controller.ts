import { OrderSchema } from './order';
import { OrderModel } from './order.model';
import dayjs from 'dayjs';

export class OrderController {
    constructor(private model:OrderModel){}

    async init (){}

    // get all list order
    async ListOrder (){
        return this.model.ListOrder();
    }

    // get list order with userID login 
    async ListByUserId (userId:string, type:string){
        return this.model.ListByUserId(userId, type);
    }

    // get list order (parent) and order item (children)
    async ListItem (_id:any, type:string){
        return this.model.ListItem(_id, type);
    }

    // get detail order by orderId (parent) and order item (children)
    async DetailOrder (orderId:string, type:string) {
        return this.model.DetailOrder(orderId, type);
    }

    // get order by _id
    async GetOrder (_id:string){
        return this.model.GetOrder(_id);
    }

    // create order || deposit
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
            datCoc: params.datCoc?params.datCoc:0,
            status: params.status,
            total: params.total,
            ctime: nowFormat,
            utime: nowFormat,
        };
        await this.model.CreateOrder(order);
        return order._id;
    }

    // update order || deposit
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

    // search by date
    async SearchByDate (userId:string, from:any, to:any) {
        return this.model.SearchByDate(userId, from, to);
    }
}