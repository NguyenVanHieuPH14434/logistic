import dayjs from 'dayjs';
import { AuthSchema } from './auth';
import { AuthModel } from './auth.model';
import bcrypt from 'bcryptjs';
export class AuthController {
    constructor (private model : AuthModel) {}

    async init () {}

    async ListAuth () {
        return this.model.ListAuth();
    }

    async GetAuth (_id:string) {
        const doc = await this.model.GetAuth(_id);
        return doc;
    }

    async CreateAuth (params:AuthSchema.CreateAuthParams){

        const now = dayjs()
        const nowFormat = now.format('DD/MM/YYYY');

        const hashPassword = await bcrypt.hash(params.password, 8);
        const user : AuthSchema.Auth = {
            _id: AuthSchema.Generate.NewIdAuth(),
            username: params.username,
            phone: params.phone,
            fullName: params.fullName,
            role: params.role,
            password: hashPassword,
            delete: 0,
            ctime: nowFormat,
            utime: nowFormat,
            dtime: nowFormat
        }

        await this.model.CreateAuth(user);
        return user;
    }

    async UpdateAuth (_id:string, params:AuthSchema.UpdateAuthParams){
        const now = dayjs()
        const nowFormat = now.format('DD/MM/YYYY');

        const user = {...params};
        user.utime = nowFormat;
        if(params.fullName || params.phone){
            user.fullName = params.fullName;
            user.phone = params.phone;
        }

        await this.model.UpdateAuth(_id, user);
        return user;
    }

    async DeleteAuth (_id:string) {
        const now = dayjs()
        const nowFormat = now.format('DD/MM/YYYY');
        const doc = await this.model.DeleteAuth(_id, nowFormat);
        return doc;
    }

    async Login (username:string) {
        const doc = await this.model.Login(username);
        return doc;
    }
}