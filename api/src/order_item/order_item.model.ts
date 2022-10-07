import { MongoDB } from "../lib/mongodb";
import { Order_item_Schema } from "./order_item";

export class OrderItemModel {
    constructor(private db:MongoDB){}

    async init () {}

    private col_orderItem = this.db.collection('order_item');

    async CreateOrderItem (orderItem:any){
        const docs = await this.col_orderItem.insertMany(orderItem);
        return docs;
    }

    async ListOrderItem (_id:string){
        const docs = await this.col_orderItem.find({order_id:_id}).toArray();
        return docs;
    }
}