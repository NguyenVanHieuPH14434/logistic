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
        const orderItem = await orderItemController.ListOrderItem(order._id);
        res.json({
           order,
            orderItem
        });
    });

    // get list order || deposit with userId login
    router.get('/list/:userId', async(req, res)=>{
        const orderByUser:any = await orderController.ListByUserId(req.params.userId, String(req.query.type));
        const ordId = Array();
        for (let i = 0; i < orderByUser.length; i++) {
            ordId.push(orderByUser[i]._id);
        }
        const order:any = await orderController.ListItem(ordId, String(req.query.type));
        return res.json({data: order})
    })

    // get detail order || deposit and order item || deposit item
    router.get('/detailOrder/:orderId', async(req, res)=>{
        const detail = await orderController.DetailOrder(req.params.orderId, String(req.query.type));
        return res.json({data:detail});
    })

    // create order and order item
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
        res.json({doc, docs});
    });

    // search order by date
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

    //deposit list
    router.get('/deposit/list', async(req, res)=>{
        const docs = await depositItemController.ListDeposit();
        return res.json({data:docs})
    })

    // create deposit and deposit item
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
        // console.log('pa',req.body.deposit);
        // console.log('ite',req.body.depositItem);
        
        // res.json({depo:req.body.deposit, depoItem:req.body.depositItem})
    })

    //update deposit and deposit item
    router.post('/deposit/update/:_id', async(req, res)=>{
        // const params:OrderSchema.UpdateOrderParams={
        //     full_name: req.body.deposit.full_name,
        //     phone: req.body.deposit.phone,
        //     address: req.body.deposit.address,
        //     type: req.body.deposit.type,
        //     address_TQ: req.body.deposit.address_TQ ? req.body.deposit.address_TQ : '',
        //     status: req.body.deposit.status?req.body.deposit.status:0,
        //     total: req.body.deposit.total,
        // }

        // const paramsItem = req.body.depositItem;

        // const depo = await orderController.UpdateOrder(req.params._id,params);
        // const depoItem = await depositItemController.UpdateDeposit(paramsItem)
        // return res.json({
        //     deposit: depo,
        //     depositItem: depoItem
        // })
        console.log('pa',req.body.deposit);
        console.log('ite',req.body.depositItem);
        
        res.json({depo:req.body.deposit, depoItem:req.body.depositItem})
    })

    return router;
}

export {
    NewOrderAPI
}