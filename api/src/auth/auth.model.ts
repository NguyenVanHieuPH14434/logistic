import { MongoDB } from "../lib/mongodb";
import { AuthSchema } from "./auth";

export class AuthModel {
    constructor (private db : MongoDB) {}

    async init () {}

    private cls_user = this.db.collection('user');

    async ListAuth () {
        const docs = await this.cls_user.find().toArray();
        return docs;
    }

    async GetAuth (_id:string){
        const doc = await this.cls_user.findOne({_id:_id});
        return doc;
    }

    async CreateAuth (user:AuthSchema.CreateAuthParams){
        const doc = await this.cls_user.insertOne(user);
        return doc;
    }

    async UpdateAuth (_id:string, user:AuthSchema.UpdateAuthParams){
        const doc = this.cls_user.updateOne({_id:_id}, {$set:user});
        return doc;
    }

    async DeleteAuth (_id:string, dtime:string){
        const doc = await this.cls_user.updateOne({_id:_id}, {$set:{delete:1, dtime:dtime}});
        return doc;
    }

    async Login (username:string) {
        const doc = await this.cls_user.findOne({$or: [{username:username}, {phone:username}]});
        return doc;
    }
}