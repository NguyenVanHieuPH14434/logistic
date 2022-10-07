import { OrderItemController } from './../order_item/order_item.controller';
import { OrderController } from './order.controller';
import * as express from 'express';
import { OrderSchema } from './order';

function NewOrderAPI(orderController:OrderController, orderItemController:OrderItemController){
    const router = express.Router();

    router.get('/list', async(req, res)=>{
        const order:any = await orderController.GetOrder('o8HqoEU35SzxIV');
        // const order:any = await orderController.ListOrder();
        const orderItem = await orderItemController.ListOrderItem(order._id);
        res.json({
           order,
            orderItem
        });
    });

    router.post('/create', async(req, res)=>{

        const params : OrderSchema.CreateOrderParams = {
            user_id: req.body.order.user_id,
            full_name: req.body.order.full_name,
            phone: req.body.order.phone,
            address: req.body.order.address,
            type: req.body.order.type
        }
       
        const paramItems:any = [...req.body.orderItem];

        const doc = await orderController.CreateOrder(params);
        const docs = await orderItemController.CreateOrderItem(doc, paramItems)
        res.json({doc, docs});
    });

    return router;
}

export {
    NewOrderAPI
}