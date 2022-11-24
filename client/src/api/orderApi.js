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

const listOrder = async(userId) => {
    const url = `/order/list/${userId}?type=order`;
    const res = await instance.get(url)
    return res;
}

const deltailOrder = async(orderId) => {
    const url = `/order/detailOrder/${orderId}?type=order`;
    const res = await instance.get(url)
    return res;
}

const updaterOrder = async(orderId, data) => {
    const url = `/order/update/${orderId}`;
    return await instance.post(url, data);
}

const listAllOrder = async() => {
    const url = `/order/listAll/order`;
    return await instance.get(url)
}

const listOrderByUser = async(userId) => {
    const url = `/order/list/${userId}?type=order`;
    return await instance.get(url)
}

const exportExcel = (type) => {
    return window.location.href = `http://localhost:9000/api/order/export/${type}`
}


export {
    createOrder,
    uploadFiles,
    listOrder,
    deltailOrder,
    updaterOrder,
    listAllOrder,
    listOrderByUser,
    exportExcel
}