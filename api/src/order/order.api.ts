import { OrderItemController } from './../order_item/order_item.controller';
import { OrderController } from './order.controller';
import * as express from 'express';
import { OrderSchema } from './order';
import { Commons } from '../common/common';

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

        const dataOrder = Array(req.body.order)
        // convert to object
        var newObjOrder = dataOrder.reduce((key:any, val:any) => Object.assign(key, val), {})

        const params : OrderSchema.CreateOrderParams = {
            user_id: newObjOrder.user_id,
            full_name: newObjOrder.full_name,
            phone: newObjOrder.phone,
            address: newObjOrder.address,
            type: newObjOrder.type
        }
       
        const paramItems = req.body.orderItem;

        const doc = await orderController.CreateOrder(params);
        const docs = await orderItemController.CreateOrderItem(doc, paramItems)
        console.log({'...pa':params, '...item':paramItems});
        res.json({doc, docs});
    });

    return router;
}

export {
    NewOrderAPI
}