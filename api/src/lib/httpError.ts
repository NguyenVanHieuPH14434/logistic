
const CheckExits = (key:string) => {
    return `${key} đã tồn tại!`;
}

const SamePassword = ()=>{
    return 'Xác nhận mật khẩu không đúng!';
}

const DoesNotExits = (key:string) => {
    return `${key} không tồn tại!`
}

const Wrong = (key:string) => {
    return `${key} không đúng!`
}

const SendResult = (type:boolean, message:string, data:any, token:null|string, res:any) => {
    return res.json({
        success:type,
        message:message,
        token:token,
        data:data
    })
}

const SendErr = (type:boolean, message:string, res:any) => {
    return res.json({
        success:type,
        message:message,
    })
}

const SendSuccess = (type:boolean, message:string, data:any, res:any) => {
    return res.json({
        success:type,
        message:message,
        data:data
    })
}

const MessageDeleteSuccess = (key:string) => {
    return `Xóa ${key} thành công!`;
}

const MessageUpdateSuccess = (key:string) => {
    return `Cập nhật ${key} thành công!`;
}

const MessageCreateSuccess = (key:string) => {
    return `Thêm mới ${key} thành công!`;
}


export {
    CheckExits,
    SamePassword,
    DoesNotExits,
    Wrong,
    SendResult,
    SendErr,
    MessageDeleteSuccess,
    SendSuccess,
    MessageUpdateSuccess,
    MessageCreateSuccess
}