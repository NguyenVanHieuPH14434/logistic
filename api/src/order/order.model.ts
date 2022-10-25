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

    async ListOrderByUser (userId:string) {
        const docs = await this.col_order.find({user_id: userId}).toArray();
        return docs;
    }

    async ListItemByOrder (_id:any) {
        const docs = await this.col_order.aggregate([{$match:{
            _id:{$in:_id}
        }},{
            $lookup:{
                from: 'order_item',
                localField: '_id',
                foreignField: 'order_id',
                as: 'orderItem'
            }
        }]).toArray();
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