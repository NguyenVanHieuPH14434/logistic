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

const listOrder = async(userId) =>{
    const url = `/order/list/${userId}`;
    const res = await instance.get(url)
    return res;
}
const detailOrder = async(orderId) =>{
    const url = `/order/detailOrder/${orderId}`;
    const res = await instance.get(url)
    return res;
}

export {
    createOrder,
    uploadFiles,
    listOrder,
    detailOrder,
}