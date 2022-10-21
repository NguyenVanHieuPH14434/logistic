import instance from "./instance"

const Login = async(data) => {
    const url = 'auth/login';
    return data = await instance.post(url, data);
}
const Register = async(data) => {
    const url = 'auth/create';
    return data = await instance.post(url, data);
}

export {
    Login,
    Register
}