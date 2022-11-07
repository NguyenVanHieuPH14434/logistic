import { verifyToken } from './../middleware/verifyToken';
import bcrypt from 'bcryptjs';
import { AuthController } from './auth.controller';
import * as express from 'express';
import jwt from 'jsonwebtoken';
import { AuthSchema } from './auth';
import { CheckExits, DoesNotExits, MessageCreateSuccess, MessageDeleteSuccess, MessageUpdateSuccess, SamePassword, SendErr, SendResult, SendSuccess, Wrong } from '../lib/httpError';
function NewAuthAPI (authCOntroller: AuthController) {
    const router = express.Router();

    // check token and get data user
    router.get('/', verifyToken, async(req:any, res)=>{
        try {
            const user = await authCOntroller.GetAuth(req.userId);
            if (!user) return SendErr(false, DoesNotExits('Tài khoản'), res);
            const data = {'_id':user._id, 'fullname':user.fullName, 'phone':user.phone, 'username':user.username, 'role':user.role};
         return SendResult(true, 'Thông tin tài khoản!', data, ' ', res);
        } catch (error) {
            console.log(error);
          return SendErr(false, 'Incorrect server error!', res);
        }
    })

    // list user
    router.get('/list', async(req, res)=>{
        const docs = await authCOntroller.ListAuth();
      return SendSuccess(true, 'Danh sách tài khoản!', docs, res)
    });

    // create user
    router.post('/create', async(req, res, next)=> {
        const params:AuthSchema.CreateAuthParams = {
            phone: req.body.phone,
            fullName: req.body.fullName,
            role: req.body.role?req.body.role:"user",
            password: req.body.password
        }
        
        // check exits phone
        const checkPhoneExits = await authCOntroller.Login(req.body.phone);
        if(checkPhoneExits){
          return SendErr(false, CheckExits('Số điện thoại'), res)
        }
        // check same password
        if(req.body.password !== req.body.passwordConFirm){
          return SendErr(false, SamePassword(), res)
        }
      
            const doc = await authCOntroller.CreateAuth(params);
         return  SendSuccess(true, MessageCreateSuccess('tài khoản'), doc, res)
    })

    // update user
    router.post('/update/:phone', async(req, res)=>{
        const params:AuthSchema.UpdateAuthParams = {
            fullName: req.body.fullName,
            password: req.body.password,
            role: req.body.role,
        }
        const doc = await authCOntroller.UpdateAuth(req.params.phone, params);
        if(doc.success !== true){
           return SendErr(false, String(doc.message), res);
        }
        return SendSuccess(true, MessageUpdateSuccess('tài khoản'), doc, res)
    })

    // delete user
    router.delete('/delete/:_id', async(req, res)=>{
        const doc:any = await authCOntroller.DeleteAuth(req.params._id);
      return SendSuccess(true, MessageDeleteSuccess('tài khoản'), doc, res)
    })

    router.post('/login', async(req, res)=>{
        const user:any = await authCOntroller.Login(req.body.username);
        if(user){
            const checkPass = await bcrypt.compare(req.body.password, user.password);
            if(checkPass){
                const accesstoken = jwt.sign({userId:user._id}, typeof process.env.ACCESS_TOKEN)
                const data = {"Họ và tên":user.fullName, "SĐT":user.phone, "Tên đăng nhập":user.username};
               return SendResult(true, 'Thông tin tài khoản!', data, accesstoken, res);
            }else {
              return SendErr(false, Wrong('Mật khẩu'), res);
            }
        }else {
           return SendErr(false, DoesNotExits('Tài khoản'), res);
        }
    })

    router.get('/edit/:_id', async(req, res)=>{
        const user = await authCOntroller.GetAuth(req.params._id);
        if(!user){
           return SendErr(false, DoesNotExits('Tài khoản'), res);
        }
       return SendResult(true, 'Thông tin tài khoản!', user, ' ', res);
    })

    return router;
}   

export {
    NewAuthAPI
}