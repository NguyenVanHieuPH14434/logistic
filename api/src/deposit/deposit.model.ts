import { MongoDB } from "../lib/mongodb";

export class DepositModel {
    constructor(private db:MongoDB){}

    async init () {}

    private col_deposit = this.db.collection('deposit_item');

    async ListDeposit () {
        const docs = await this.col_deposit.find().toArray();
        return docs;
    }

    async CreateDeposit (deposit:any) {
        const doc = await this.col_deposit.insertMany(deposit);
        return doc;
    }
}