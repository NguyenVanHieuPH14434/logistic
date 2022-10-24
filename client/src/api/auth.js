import instance from "./instance"

const login = async(data) => {
    const url = 'auth/login';
    const da = await instance.post(url, data);
    return da;
}

const findUser = async(data) => {
    const url = `auth/edit/${data}`;
    const doc = await instance.get(url);
    return doc
}

const register = async(data) => {
    const url = 'auth/create';
    return data = await instance.post(url, data);
}

export {
    login,
    register,
    findUser
}