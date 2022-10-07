import * as express from 'express';
import { Commons } from '../common/common';
import { Order_item_Schema } from './order_item';
import { OrderItemController } from './order_item.controller';

function NewOrderItemAPI(orderItemController:OrderItemController){
    const router = express.Router();

    router.get('/list', async(req, res)=>{
        // const docs = await orderItemController.CreateOrderItem(req.body);
        // res.json(docs);
    });

    router.post('/create', Commons.upload.single('file'), async(req, res)=>{
        // const total = Number(req.body.quantity) * Number(req.body.product_price);
        // const params : Order_item_Schema.CreateOrderItemParams = {
        //     order_id: req.body.order_id,
        //     product_name: req.body.product_name,
        //     product_link: req.body.product_link,
        //     product_image: req.body.product_image,
        //     product_color: req.body.product_color,
        //     product_size: req.body.product_size,
        //     quantity: req.body.quantity,
        //     product_price: req.body.product_price,
        //     note: req.body.note,
        //     total_price: total
        // }
        res.send(req.file?.originalname);
        // const _id = 'o8HqoEU35SzxIV';
        // const params:any = [...req.body];
        // params.total_price = total;
        // const doc = await orderItemController.CreateOrderItem(_id,params);
        // res.json(doc);
    });

    return router;
}

export {
    NewOrderItemAPI
}