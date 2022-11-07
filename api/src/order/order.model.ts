import { MongoDB } from "../lib/mongodb";
import { OrderSchema } from "./order";

export class OrderModel {
    constructor(private db : MongoDB){}

    async init (){}

    private col_order = this.db.collection('order');

    // get all list order
    async ListOrder (type:string) {
        const docs = await this.col_order.find({type:type}).toArray();
        return docs;
    }

    // get list order with userID login 
    async ListByUserId (userId:string, type:string) {
        const docs = await this.col_order.find({$and:[{user_id: userId}, {type:type}]}).toArray();
        return docs;
    }

     // get list order (parent) and order item (children)
    async ListItem (_id:any, type:string) {
        const docs = await this.col_order.aggregate([{$match:{
            _id:{$in:_id}
        }},{
            $lookup:{
                from:  `${type}_item`,
                localField: '_id',
                foreignField: `${type}_id`,
                as: `${type}Item`
            }
        }]).toArray();
        return docs;
    }

    // get detail order by orderId (parent) and order item (children)
    async DetailOrder (orderId:string, type:string) {
        const doc = await this.col_order.aggregate([
            {$match:{
                _id:orderId
            }
        },{
            $lookup:{
                from: `${type}_item`,
                localField: '_id',
                foreignField: `${type}_id`,
                as: `${type}Item`
            }
        }
        ]).toArray();
        return doc[0];
    }

    // get order by _id
    async GetOrder (_id:string) {
        const doc = await this.col_order.findOne({_id:_id});
        return doc;
    }

    // create order || deposit
    async CreateOrder (order:OrderSchema.CreateOrderParams) {
        const doc = await this.col_order.insertOne(order);
        return doc;
    }

    // update order || deposit
    async UpdateOrder (_id:string, order:OrderSchema.UpdateOrderParams){
        const doc = await this.col_order.updateOne({_id:_id}, {$set:order});
        return doc;
    }


    async DeleteOrder (_id:string){
        const doc = await this.col_order.deleteOne({_id:_id});
        return doc;
    }

    async Search (filter:any) {
        const docs = await this.col_order.find({$or:[
        {_id:filter}, {address:filter}, {status:filter}
        ]}).toArray()
        return docs;
    }

    async SearchByDate (userId:string, from:any, to:any) {
        const docs = await this.col_order.find({
            $and:[{
                user_id: userId
            },
            {ctime:{$gte:from, $lte:to}}]
    }).toArray()
        return docs;
    }
}