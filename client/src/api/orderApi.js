import instance from "./instance"

const createOrder = async(data) => {
    const url = 'order/create';
    await instance.post(url, data);
}
const uploadFiles = async(data) => {
    const url = 'orderItem/create';
    await instance.post(url, data);
}

export {
    createOrder,
    uploadFiles
}