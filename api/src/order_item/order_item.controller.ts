import { OrderItemModel } from "./order_item.model";
import dayjs from "dayjs";
import { Order_item_Schema } from "./order_item";
import { Commons } from "../common/common";


export class OrderItemController {
    constructor(private model:OrderItemModel){}
    
    async init () {}

    async CreateOrderItem (_id:string,params:any){
        const now = dayjs();
        const  nowFormat = now.format('DD/MM/YYYY');
        const  nowFormatIMG = now.format('DDMMYYYY');
        const orderItem :Order_item_Schema.Order_item = params.map((item:any)=>({
                _id: Order_item_Schema.Generate.NewOrderItemId(),
                order_id: _id,
                product_name: item.product_name,
                product_link: item.product_link,
                product_image: Commons.folderImageOrder + nowFormatIMG + '_' + item.product_image,
                attribute: item.attribute,
                quantity: item.quantity,
                product_price: item.product_price,
                note: item.note,
                maVanDon:item.maVanDon,
                soKien:item.soKien,
                kgM3:item.kgM3,
                donGia:item.donGia,
                phuPhi:item.phuPhi,
                typeMoney:item.typeMoney,
                total_price: item.total_price,
                ship:item.ship?item.ship:'',
                ne_price:item.ne_price?item.ne_price:0,
                group:item.group?item.group:'',
                product_code:item.product_code?item.product_code:'',
                product_supplier:item.product_supplier?item.product_supplier:'',
                delivery_date:item.delivery_date?item.delivery_date:'', //ngày giao hàng dự kiến
                type_title:item.type_title?item.type_title:'', // tên loại
                type_code: item.type_code?item.type_code:'',
                about_the_warehouse: item.about_the_warehouse?item.about_the_warehouse:" " , //hàng về kho: X=>đã về
                ctime: nowFormat,
                utime: nowFormat
        }));

         await this.model.CreateOrderItem(orderItem);
       return orderItem;
    }

    async UpdateOrderItem (params:any) {
        const now = dayjs();
        const  nowFormat = now.format('DD/MM/YYYY');
        const  nowFormatIMG = now.format('DDMMYYYY');
        for (let i = 0; i < params.length; i++) {
            let orderItem = params[i];
            // orderItem.product_image = params[i].product_image?Commons.folderImageOrder + nowFormatIMG + '_' + params[i].product_image:params[i].product_image;
            orderItem.utime = nowFormat
            orderItem.total_price = orderItem.ne_price*orderItem.quantity;
           await this.model.UpdateOrderItem(orderItem);
        }
        return params;
    }

    async ListOrderItem (_id:string){
        return this.model.ListOrderItem(_id);
    }

    async ListItemByOrder (_id:any) {
        return await this.model.ListItemByOrder(_id);
      }
  
}