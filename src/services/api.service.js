import axios from 'axios';

const baseURL = 'http://127.0.0.1:8080/';

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.response.use((response) => {
    return response.data;
});

const get = (url, params) => {
    let urlWithParams = url;

    if (params) {
        urlWithParams += '?';
        Object.entries(params)
            .forEach(([key, value]) => {
                if (!value) {
                    return;
                }

                urlWithParams += `&${key}=${value}`
            })
    }

    return axiosInstance.get(urlWithParams);
};

const apiService = {
    get
};

export default apiService;
