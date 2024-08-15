import axios from "axios";


const baseAPIService = axios.create({
    baseURL: "http://localhost:8080",
})


export default baseAPIService;