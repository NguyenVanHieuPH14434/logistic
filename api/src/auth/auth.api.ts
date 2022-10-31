import { verifyToken } from './../middleware/verifyToken';
import bcrypt from 'bcryptjs';
import { AuthController } from './auth.controller';
import * as express from 'express';
import jwt from 'jsonwebtoken';
import { AuthSchema } from './auth';
import { CheckExits, DoesNotExits, MessageCreateSuccess, MessageDeleteSuccess, MessageUpdateSuccess, SamePassword, SendErr, SendResult, SendSuccess, Wrong } from '../lib/httpError';
function NewAuthAPI (authCOntroller: AuthController) {
    const router = express.Router();

    router.get('/', verifyToken, async(req:any, res)=>{
        try {
            const user = await authCOntroller.GetAuth(req.userId);
            if (!user) return SendErr(false, DoesNotExits('Tài khoản'), res);
            const data = {'_id':user._id, 'fullname':user.fullName, 'phone':user.phone, 'username':user.username, 'role':user.role};
            SendResult(true, 'Thông tin tài khoản!', data, ' ', res);
        } catch (error) {
            console.log(error);
            SendErr(false, 'Incorrect server error!', res);
        }
    })

    router.get('/list', async(req, res)=>{
        const docs = await authCOntroller.ListAuth();
        SendSuccess(true, 'Danh sách tài khoản!', docs, res)
    });

    router.post('/create', async(req, res, next)=> {
        const params:AuthSchema.CreateAuthParams = {
            username:req.body.username,
            phone: req.body.phone,
            fullName: req.body.fullName,
            role: req.body.role?req.body.role:"user",
            password: req.body.password
        }
        
        // check exits username
        const checkUserNameExits = await authCOntroller.Login(req.body.username);
        if(checkUserNameExits){
            SendErr(false, CheckExits('Tên đăng nhập'), res)
        }
        // check exits phone
        const checkPhoneExits = await authCOntroller.Login(req.body.phone);
        if(checkPhoneExits){
            SendErr(false, CheckExits('Số điện thoại'), res)
        }
        // check same password
        // if(req.body.password !== req.body.passwordConFirm){
        //     SendErr(false, SamePassword(), res)
        // }
      
            const doc = await authCOntroller.CreateAuth(params);
            SendSuccess(true, MessageCreateSuccess('tài khoản'), doc, res)
    })

   

    router.post('/update/:_id', async(req, res)=>{
        const params:AuthSchema.UpdateAuthParams = {
            fullName: req.body.fullName,
        }
        const doc = await authCOntroller.UpdateAuth(req.params._id, params);
        SendSuccess(true, MessageUpdateSuccess('tài khoản'), doc, res)
    })

    router.delete('/delete/:_id', async(req, res)=>{
        const doc:any = await authCOntroller.DeleteAuth(req.params._id);
        SendSuccess(true, MessageDeleteSuccess('tài khoản'), doc, res)
    })

    router.post('/login', async(req, res)=>{
        const user:any = await authCOntroller.Login(req.body.username);
        if(user){
            const checkPass = await bcrypt.compare(req.body.password, user.password);
            if(checkPass){
                const accesstoken = jwt.sign({userId:user._id}, typeof process.env.ACCESS_TOKEN)
                const data = {"Họ và tên":user.fullName, "SĐT":user.phone, "Tên đăng nhập":user.username};
                SendResult(true, 'Thông tin tài khoản!', data, accesstoken, res);
            }else {
                SendErr(false, Wrong('Mật khẩu'), res);
            }
        }else {
            SendErr(false, DoesNotExits('Tài khoản'), res);
        }
    })

    router.get('/edit/:_id', async(req, res)=>{
        const user = await authCOntroller.GetAuth(req.params._id);
        if(!user){
            SendErr(false, DoesNotExits('Tài khoản'), res);
        }
        SendResult(true, 'Thông tin tài khoản!', user, ' ', res);
    })

    return router;
}   

export {
    NewAuthAPI
}