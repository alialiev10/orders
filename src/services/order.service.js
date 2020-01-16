import apiService from "./api.service";
import API_URLS from "../constants/api-url.constant";

const getOrder = (filter = '') => {
    return apiService.get(API_URLS.ORDER, { filter })
};

const getOrderPosition = (id) => {
    return apiService.get(API_URLS.ORDER_BY_ID(id))
};


const orderService = {
    getOrder,
    getOrderPosition,
};

export default orderService;
