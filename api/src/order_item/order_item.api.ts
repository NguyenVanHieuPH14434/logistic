import * as express from 'express';
import { Commons } from '../common/common';
import { Order_item_Schema } from './order_item';
import { OrderItemController } from './order_item.controller';

function NewOrderItemAPI(orderItemController:OrderItemController){
    const router = express.Router();

    router.post('/create', Commons.upload1('order').array('product_image',100), async(req, res)=>{
        const file = req.files;
        res.send(file);
    });
    router.post('/depo/create', Commons.upload1('deposit').array('image',100), async(req, res)=>{
        const file = req.files;
        res.send(file);
    });
    // router.post('/create', Commons.upload.array('product_image',100), async(req, res)=>{
    //     const file = req.files;
    //     res.send(file);
    // });

    return router;
}

export {
    NewOrderItemAPI
}