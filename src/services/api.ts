import axiosInstance from "./axiosInstance";



export const get = async (apiUrl: string) => {
    return axiosInstance.get(apiUrl);
}

