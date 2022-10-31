import instance from "./instance";

const createDeposit = async(data) => {
    const url = '/order/deposit/create';
    const res = await instance.post(url, data);
    return res
}

const uploadFilesDeposit = async(data) => {
    const url = 'orderItem/depo/create';
    await instance.post(url, data);
}

const deltailDeposit = async(orderId) => {
    const url = `/order/detailOrder/${orderId}?type=deposit`;
    const res = await instance.get(url)
    return res;
}

export {
    createDeposit,
    uploadFilesDeposit,
    deltailDeposit
}