import dayjs from 'dayjs';
import multer from 'multer';
import EXCEL from 'exceljs';

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


  // export
  export const exportData = (data:any, setHeaderColumns:any, res:any, nameExcel:string)=>{
       const wb = new EXCEL.Workbook();
        const ws = wb.addWorksheet(nameExcel)
       
        
        // ws.mergeCells('A1', 'B1');
        // ws.mergeCells()
        // ws.getCell('A1').value = 'Client List';
   
        ws.getCell('A1').numFmt = '0.00%';

        // Apply styles to worksheet columns
        ws.columns = [
          { header: 'Id', key: 'id', width: 10 },
          { header: 'Name', key: 'name', width: 32, style: { font: { name: 'Arial Black' } } },
          { header: 'D.O.B.', key: 'DOB', width: 10, style: { numFmt: 'dd/mm/yyyy' } }
        ];
        
        // Set Row 2 to Comic Sans.
        ws.getCell('A1').font = {
          name: 'Arial Black',
          color: { argb: 'f0f000' },
          family: 2,
          size: 14,
          italic: true
        };
        ws.getCell('A1').fill = {
          type: 'pattern',
         pattern:'solid',
			  fgColor:{ argb:'f0f000' }
                // bgColor:{argb:'#FF0000'}
        };

        // ws.autoFilter = {
        //   from: 'A1',
        //   to: 'H1',
        // }
        // ....
        
        // ws.columns = setHeaderColumns;


        // let counter = 1;
        
        
        // data.forEach((item:any)=>{
        //   item.s_no = counter;
        //     // ws.addRow(sheeet);
        //     // const imageId = wb.addImage({
        //     //   filename: `${PRODUCT_IMAGE_PATH}/${product.image}`,
        //     //   extension: 'jpeg',
        //     // });
        //     ws.addRow(item);
        //     ws.getRow(counter).eachCell((cell)=>{
        //       cell.style.font = { size: 12, bold: true }
        //       cell.style.alignment = { horizontal: "right" }
        //       cell.style.border = {
        //           top: { style: "medium" },
        //           bottom: { style: "medium" },
        //           left: { style: "medium" },
        //           right: { style: "medium" },
        //       }
        //     });
        //     counter++;
        // })


        ws.getRow(1).font = {
          name: 'Times New Roman',
          // family: 4,
          size: 16,
          underline: false,
          bold: true  
        };

        ws.getRow(data.length + 1).eachCell((cell)=>{
          cell.style.font = { size: 12, bold: true }
          cell.style.alignment = { horizontal: "right" }
          cell.style.border = {
              top: { style: "medium" },
              bottom: { style: "medium" },
              left: { style: "medium" },
              right: { style: "medium" },
          }
        });


        res.setHeader("Content-Type", "apllication/vnd.openxmlformats-officedocument.spreadsheatml.sheet")
        res.setHeader("Content-Disposition", `attachment;filename=${nameExcel}.xlsx`);
        return wb.xlsx.write(res).then(() => {
            res.status(200);
        })  

}

    
}
