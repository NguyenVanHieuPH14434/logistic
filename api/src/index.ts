import { OrderItemController } from './order_item/order_item.controller';
import { OrderItemModel } from './order_item/order_item.model';
import { OrderController } from './order/order.controller';
import { OrderModel } from './order/order.model';
import { MongoCommon } from './lib/mongodb';
import express from 'express';
import { ReadConfig } from './config';
import cors from 'cors';
import { NewOrderAPI } from './order/order.api';
import { NewOrderItemAPI } from './order_item/order_item.api';

export async function main() {
    const config = await ReadConfig();
    console.log(config);
    
    const client = await MongoCommon.Connect(`${config.database.db_url}`);
    console.log('Connected to DB');

    const database = client.db(config.database.db_name);

    const orderModel = new OrderModel(database);
    await orderModel.init();
    const orderController = new OrderController(orderModel);
    await orderController.init();

    const orderItemModel = new OrderItemModel(database);
    await orderItemModel.init();
    const orderItemController = new OrderItemController(orderItemModel);
    await orderItemController.init();

    const app = express();
    const PORT = config.server.port || 3000;

    app.use(express.json());
    app.use(cors());
    app.disable("x-powered-by");

    app.use('/api/order', NewOrderAPI(orderController,orderItemController));
    app.use('/api/orderItem', NewOrderItemAPI(orderItemController));


    app.use((req, res, next)=>{
        const err:any = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use((err:any, req:any, res:any, next:any)=>{
        res.status(err.status || 500);
        res.send({
            err:{
                status: err.status,
                message:err.message
            }
        })
    });

    app.listen(PORT, ()=>{
        console.log('Server running on port: '+PORT);
    });
}

main();