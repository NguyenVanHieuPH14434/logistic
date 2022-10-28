import instance from "./instance"

const login = async(data) => {
    const url = '/auth/login';
    const res = await instance.post(url, data);
    return res;
}

const Register = async(data) => {
    const url = '/auth/create';
    return data = await instance.post(url, data);
}

export {
    login,
    Register,

}