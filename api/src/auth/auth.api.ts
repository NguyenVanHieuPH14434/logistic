import { verifyToken } from './../middleware/verifyToken';
import bcrypt from 'bcryptjs';
import { AuthController } from './auth.controller';
import * as express from 'express';
import jwt from 'jsonwebtoken';
import { AuthSchema } from './auth';
function NewAuthAPI (authCOntroller: AuthController) {
    const router = express.Router();

    router.get('/', verifyToken, async(req:any, res)=>{
        try {
            const user = await authCOntroller.GetAuth(req.userId);
            if (!user) return res.json({ success: false, message: "User not found" })
           return res.json({ success: true, user:{'username':user.fullName}});
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "Incorrect server error" })
        }
    })

    router.get('/list', verifyToken, async(req, res)=>{
        const docs = await authCOntroller.ListAuth();
        return res.json(docs);
    });

    router.post('/create', async(req, res)=> {
        const params:AuthSchema.CreateAuthParams = {
            username: req.body.username,
            phone: req.body.phone,
            fullName: req.body.fullName,
            role: "user",
            password: req.body.password
        }

        const doc = await authCOntroller.CreateAuth(params);
        return res.json(doc);
    })

   

    router.post('/update/:_id', async(req, res)=>{
        const params:AuthSchema.UpdateAuthParams = {
            phone: req.body.phone,
            fullName: req.body.fullName,
        }

        const doc = await authCOntroller.UpdateAuth(req.params._id, params);
        return res.json(doc);
    })

    router.delete('/delete/:_id', async(req, res)=>{
        const doc:any = await authCOntroller.DeleteAuth(req.params._id);
        return res.json({
            'status':200,
            'message':"Delete Success!"
        })
    })

    router.post('/login', async(req, res)=>{
        const user:any = await authCOntroller.Login(req.body.username);
        if(user){
            const checkPass = await bcrypt.compare(req.body.password, user.password);
            if(checkPass){
                const accesstoken = jwt.sign({userId:user._id}, typeof process.env.ACCESS_TOKEN)
                return res.json({
                    'status':true,
                    "message":"Thong tin user!",
                    "token":accesstoken,
                    "data": user
                    // "data": [{"Ho va ten":user.fullName, "SDT":user.phone, "Ten dang nhap":user.username}]
                })
            }else {
                return res.json({
                    'status':false,
                    "message":"Mat khau khong dung!",
                    "data": []
                })
            }
        }else {
            return res.json({
                'status':false,
                "message":"Tai khoan khong ton tai!",
                "data": []
            })
        }
    })

    router.get('/edit/:_id', async(req, res)=>{
        const user = await authCOntroller.GetAuth(req.params._id);
        if(!user){
            return res.json({success:false, message:"User not found!"})
        }

        return res.json({success:true, message:"User detail!", user:user})
    })

    return router;
}   

export {
    NewAuthAPI
}