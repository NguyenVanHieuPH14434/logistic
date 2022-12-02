import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL+"/api"
});


export default instance

export const LOCAL_TOKEN = 'adskl';
