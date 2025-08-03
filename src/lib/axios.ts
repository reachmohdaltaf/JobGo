import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api", //apne backend ka url
    withCredentials: true
})

export default axiosInstance