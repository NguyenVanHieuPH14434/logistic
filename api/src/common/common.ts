import multer from 'multer';

export namespace Commons {
    export const fileStore = multer.diskStorage({
        destination:(req, file, cb)=>{
            cb(null, './src/public')
        },
        filename:(req, file, cb)=>{
            cb(null, file.originalname)
        }
    });

    export const upload = multer({storage:fileStore});


    export const newToDate = (reqToDate:string) =>{
        let day = reqToDate.split('/')[0];
        let month = reqToDate.split('/')[1];
        let year = reqToDate.split('/')[2];
        let newDay = String(Number(day) +1);
        return newDay + '/' + month + '/' + year;
    }
    
}

