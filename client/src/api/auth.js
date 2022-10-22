import instance from "./instance"

const login = async(data) => {
    const url = 'auth/login';
    return data = await instance.post(url, data);
}

const register = async(data) => {
    const url = 'auth/create';
    return data = await instance.post(url, data);
}

export {
    login,
    register
}