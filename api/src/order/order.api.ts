import { DepositController } from './../deposit/deposit.controller';
import { OrderItemController } from './../order_item/order_item.controller';
import { OrderController } from './order.controller';
import * as express from 'express';
import { OrderSchema } from './order';
import { Commons } from '../common/common';

function NewOrderAPI(orderController:OrderController, orderItemController:OrderItemController, depositItemController:DepositController){
    const router = express.Router();

    // order

    router.get('/list', async(req, res)=>{
        const order:any = await orderController.GetOrder('YoaPg5KnRCz9Wx');
        // const order:any = await orderController.ListOrder();
        const orderItem = await orderItemController.ListOrderItem(order._id);
        res.json({
           order,
            orderItem
        });
    });

    router.get('/list/:userId', async(req, res)=>{
        const orderByUser:any = await orderController.ListOrderByUser(req.params.userId);
        const ordId = Array();
        for (let i = 0; i < orderByUser.length; i++) {
            ordId.push(orderByUser[i]._id);
        }
        const order:any = await orderController.ListItemByOrder(ordId);
        // const orItem = await orderItemController.ListItemByOrder(ordId);
        return res.json({data: order})
    })

    router.get('/detailOrder/:orderId', async(req, res)=>{
        const detail = await orderController.DetailOrder(req.params.orderId);
        return res.json({data:detail});
    })

    router.post('/create', async(req, res)=>{

        const dataOrder = Array(req.body.order)
        // convert to object
        var newObjOrder = dataOrder.reduce((key:any, val:any) => Object.assign(key, val), {})

        const params : OrderSchema.CreateOrderParams = {
            user_id: newObjOrder.user_id,
            full_name: newObjOrder.full_name,
            phone: newObjOrder.phone,
            address: newObjOrder.address,
            type: newObjOrder.type,
            address_TQ: newObjOrder.address_TQ?newObjOrder.address_TQ:'',
            status: 0,
            total: newObjOrder.total
        }
       
        const paramItems = req.body.orderItem;

        const doc = await orderController.CreateOrder(params);
        const docs = await orderItemController.CreateOrderItem(doc, paramItems)
        // console.log({'...pa':params, '...item':paramItems});
        res.json({doc, docs});
    });

    router.get('/searchByDate/:userId', async(req, res)=>{
        let dateTo = ''
        if(req.query.from && req.query.to){
            dateTo = String(req.query.to)
        }else if(req.query.from && !req.query.to){
            dateTo = String(req.query.from)
        }
        // const newDateTo = Commons.newToDate(dateTo);
        const data = await orderController.SearchByDate(String(req.params.userId),String(req.query.from), dateTo)
        res.json({data:data})
    })

    //deposit
    router.get('/deposit/list', async(req, res)=>{
        const docs = await depositItemController.ListDeposit();
        return res.json({data:docs})
    })

    router.post('/deposit/create', async(req, res)=>{
        const param:OrderSchema.CreateOrderParams={
            user_id: req.body.deposit.user_id,
            full_name:  req.body.deposit.full_name,
            phone: req.body.deposit.phone,
            address: req.body.deposit.address,
            type: req.body.deposit.type,
            address_TQ: req.body.deposit.address_TQ?req.body.deposit.address_TQ:'',
            status: 0,
            total: req.body.deposit.total
        }

        const params = req.body.depositItem;

        const depo = await orderController.CreateOrder(param);
        const depoItem = await depositItemController.CreateDeposit(depo, params)
        return res.json({
            depo: depo,
            depoItem: depoItem
        })
        // res.json({de:req.body.deposit, item:req.body.depositItem})
    })

    router.post('/deposit/update/:_id', async(req, res)=>{
        const param:OrderSchema.UpdateOrderParams={
            full_name: req.body.deposit.full_name,
            phone: req.body.deposit.phone,
            address: req.body.deposit.address,
            type: req.body.deposit.type,
            address_TQ: req.body.deposit.address_TQ ? req.body.deposit.address_TQ : '',
            status: req.body.deposit.status?req.body.deposit.status:0,
            total: req.body.deposit.total,
        }

        const params = req.body.depositItem;

        // const depo = await orderController.UpdateOrder(req.params._id,param);
        const depo = await orderController.UpdateOrder(req.params._id,param);
        const depoItem = await depositItemController.UpdateDeposit(String(depo), params)
        return res.json({
            depo: depo,
            depoItem: depoItem
        })
        // res.json({de:req.body.deposit, item:req.body.depositItem})
    })

    return router;
}

export {
    NewOrderAPI
}