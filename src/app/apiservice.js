import axios from 'axios'

export const httpClient = axios.create({
    baseURL: "192.168.0.174:8080", withCredentials: true, headers: {                  
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization", 
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
        "Content-Type": "application/json;charset=UTF-8"                   
    }
})

    class ApiService{

        constructor(apiurl){
            this.apiurl = apiurl;
        }

        static registrarToken(token){
            if(token){
                httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
            }
        }

        post(url, objeto){
            const  requestUrl = `${this.apiurl}${url}`
            return httpClient.post(requestUrl, objeto);
        }

        put(url, objeto){
            const  requestUrl = `${this.apiurl}${url}`
            return httpClient.put(requestUrl, objeto);
        }

        delete(url) {
            const  requestUrl = `${this.apiurl}${url}`
            return httpClient.delete(requestUrl)
        }

        get(url){
            const  requestUrl = `${this.apiurl}${url}`
            return httpClient.get(requestUrl)
        }
    }

export default ApiService;