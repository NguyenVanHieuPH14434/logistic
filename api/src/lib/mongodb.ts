import {MongoClient} from "mongodb"

export {Db as MongoDB} from 'mongodb';

export const enum MongoErrorCodes {
    Duplicate = 11000
}

const opt = {
    useNewUrlParser: true,
useUnifiedTopology: true,
}

async function Connect(url:string){
    const client = new MongoClient(url);

    return await client.connect(); 
}

export const MongoCommon = {
    Connect
}