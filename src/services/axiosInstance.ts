import axios from "axios";
import https from 'https'

// import { ServerHelper } from "../common/serverHelper";

// יצירת אינסטנס של Axios
console.log(process.env.NEXT_PUBLIC_REACT_APP_BASE_URL);

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

// הוספת אינטרספטור לבקשות (requests)
// axiosInstance.interceptors.request.use(
//     function (config) {

//          if (config.headers['adminToken']!==undefined) 
//         {
//             if (config.method?.toUpperCase() === 'GET' || config.method?.toUpperCase() === 'POST') {
//                 const contentUrl = config.url?.toUpperCase().split('?CONTENT=')[1];
//                 const hasParams = config.url && config.url.includes('?');
//                 const separator = hasParams ? '&' : '?';
          
//                 config.url = `${config.url}${separator}adminToken=${config.headers['adminToken']}`;
//             }
//         }
//         return config;
//     },
//     function (error: any) {
//         return Promise.reject(error);
//     }
// );



export default axiosInstance;
