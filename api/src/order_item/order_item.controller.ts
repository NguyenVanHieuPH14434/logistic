import { OrderItemModel } from "./order_item.model";
import dayjs from "dayjs";
import { Order_item_Schema } from "./order_item";

export class OrderItemController {
    constructor(private model:OrderItemModel){}

    async init () {}

    async CreateOrderItem (_id:string,params:any){
        const now = dayjs();
        const  nowFormat = now.format('DD/MM/YYYY');
        const orderItem :Order_item_Schema.Order_item = params.map((item:any)=>({
                _id: Order_item_Schema.Generate.NewOrderItemId(),
                order_id: _id,
                product_name: item.product_name,
                product_link: item.product_link,
                product_image: item.product_image,
                product_color: item.product_color,
                product_size: item.product_size,
                quantity: item.quantity,
                product_price: item.product_price,
                note: item.note,
                total_price: item.total_price,
                ctime: nowFormat,
                utime: nowFormat
        }));

         await this.model.CreateOrderItem(orderItem);
       return orderItem;
    }

    async ListOrderItem (_id:string){
        return this.model.ListOrderItem(_id);
    }
}