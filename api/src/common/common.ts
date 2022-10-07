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
    
}