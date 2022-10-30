import { DepositModel } from './deposit/deposit.model';
import { DepositController } from './deposit/deposit.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModel } from './auth/auth.model';
import { OrderItemController } from './order_item/order_item.controller';
import { OrderItemModel } from './order_item/order_item.model';
import { OrderController } from './order/order.controller';
import { OrderModel } from './order/order.model';
import { MongoCommon } from './lib/mongodb';
import express from 'express';
import path from 'path'
import { ReadConfig } from './config';
import cors from 'cors';
import { NewOrderAPI } from './order/order.api';
import { NewOrderItemAPI } from './order_item/order_item.api';
import { NewAuthAPI } from './auth/auth.api';
import { NewDepositAPI } from './deposit/deposit.api';

export async function main() {
    const config = await ReadConfig();
    console.log(config);
    
    const client = await MongoCommon.Connect(`${config.database.db_url}`);
    console.log('Connected to DB');

    const database = client.db(config.database.db_name);

    // Order + Deposit
    const orderModel = new OrderModel(database);
    await orderModel.init();
    const orderController = new OrderController(orderModel);
    await orderController.init();

    // Order Item
    const orderItemModel = new OrderItemModel(database);
    await orderItemModel.init();
    const orderItemController = new OrderItemController(orderItemModel);
    await orderItemController.init();

    // Deposit Item
    const depositItemModel = new DepositModel(database);
    await depositItemModel.init();
    const depositItemController = new DepositController(depositItemModel);
    await depositItemController.init();

    // Auth
    const authModel = new AuthModel(database);
    await authModel.init();
    const authController = new AuthController(authModel);
    await authController.init();

    const app = express();
    const PORT = config.server.port || 3000;

    app.use(express.json());
    app.use(cors());
    app.disable("x-powered-by");
    // public image api 
    app.use(express.static(path.join(__dirname, 'public')));

    // app.use('/api/order', NewOrderAPI(orderController, orderItemController));
    app.use('/api/order', NewOrderAPI(orderController, orderItemController, depositItemController));
    app.use('/api/orderItem', NewOrderItemAPI(orderItemController));
    app.use('/api/depo', NewDepositAPI(depositItemController));
    app.use('/api/auth', NewAuthAPI(authController));


    app.use((req:any, res:any, next:any)=>{
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