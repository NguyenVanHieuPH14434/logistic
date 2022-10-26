import instance from "./instance"

const createOrder = async(data) => {
    const url = 'order/create';
    const res = await instance.post(url, data);
    return res;
}
const uploadFiles = async(data) => {
    const url = 'orderItem/create';
    await instance.post(url, data);
}

export {
    createOrder,
    uploadFiles
}