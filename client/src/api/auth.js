import instance from "./instance"

const login = async(data) => {
    const url = 'auth/login';
    return data = await instance.post(url, data);
}
// const uploadFiles = async(data) => {
//     const url = 'orderItem/create';
//     await instance.post(url, data);
// }

export {
    login,
    // uploadFiles
}