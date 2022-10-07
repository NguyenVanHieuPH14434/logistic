import { MongoDB } from "../lib/mongodb";
import { OrderSchema } from "./order";

export class OrderModel {
    constructor(private db : MongoDB){}

    async init (){}

    private col_order = this.db.collection('order');

    async ListOrder () {
        const docs = await this.col_order.find().toArray();
        return docs;
    }

    async GetOrder (_id:string) {
        const doc = await this.col_order.findOne({_id:_id});
        return doc;
    }

    async CreateOrder (order:OrderSchema.CreateOrderParams) {
        const doc = await this.col_order.insertOne(order);
        return doc;
    }

    async UpdateOrder (_id:string, order:OrderSchema.UpdateOrderParams){
        const doc = await this.col_order.updateOne({_id:_id}, {$set:order});
        return doc;
    }

    async DeleteOrder (_id:string){
        const doc = await this.col_order.deleteOne({_id:_id});
        return doc;
    }
}