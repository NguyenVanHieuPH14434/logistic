import { DepositController } from './deposit.controller';
import * as express from 'express';


function NewDepositAPI(depoControll:DepositController){
    const router = express.Router();

   
    router.post('/update', async(req, res)=>{
        const params = req.body.depositItem
        // res.json({'pa': params})
        const data = await depoControll.UpdateDeposit(params)
        return res.json({data:data})
    })
    return router;
}

export {
    NewDepositAPI
}