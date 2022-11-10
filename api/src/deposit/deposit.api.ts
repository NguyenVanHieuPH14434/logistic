import dayjs from 'dayjs';
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

    router.get('/testStatistical', async(req, res)=> {
       
        let date = new Date()
        let oldDate = date.setDate(date.getDate() - 30)
        let newDate = new Date(Number(oldDate));
        res.json({date, oldDate, newDate})
    })

    return router;
}

export {
    NewDepositAPI
}