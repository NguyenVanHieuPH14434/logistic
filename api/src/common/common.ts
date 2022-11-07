import dayjs from 'dayjs';
import multer from 'multer';

const now = dayjs();
const nowFormat = now.format('DDMMYYYY');
export namespace Commons {

    const pathDirname = './src/public/images/';
    export const folderImageOrder = 'public/images/order/';
    export const folderImageDeposit = 'public/images/deposit/';

    export const fileStore = multer.diskStorage({
        destination:(req, file, cb)=>{
            cb(null, './src/public')
        },
        filename:(req, file, cb)=>{
            cb(null, file.originalname)
        }
    });

    export const upload = multer({storage:fileStore});


    // upload 
    export const upload1 = (folder:any) => {
        return multer({
            storage: multer.diskStorage({
              destination: function (req, file, cb) {
                const path = `${pathDirname}${folder}`;
                cb(null, path);
              },
        
              // By default, multer removes file extensions so let's add them back
              filename: function (req, file, cb) {
                cb(null, nowFormat + '_' +file.originalname);
              }
            }),
          })
    }


    // date +1 day
    export const newToDate = (reqToDate:string) =>{
        let day = reqToDate.split('/')[0];
        let month = reqToDate.split('/')[1];
        let year = reqToDate.split('/')[2];
        let newDay = String(Number(day) +1);
        return newDay + '/' + month + '/' + year;
    }

    // set name type 
    export const setNameType = (type:string) => {
      let newType = '';
      if(type == 'order'){
        newType =  'đơn hàng';
      }
      if(type == 'deposit'){
          newType =  'đơn ký gửi';
      }
      return newType;
  }

    
}
