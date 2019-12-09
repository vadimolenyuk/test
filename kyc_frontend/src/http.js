import axios from "axios"

const HTTP = axios.create({
    baseURL: process.env.VUE_APP_API_AUTH_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    }
})

export default HTTP