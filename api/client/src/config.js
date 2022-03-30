import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://daffodil-blog.herokuapp.com/api/",
})