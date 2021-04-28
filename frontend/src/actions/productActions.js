import { PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST,
         PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS
 } from '../constants/productConstants';
import axios from 'axios';

export const listProducts = () => {
    return async (dispatch) => {
        try {
            dispatch({type:PRODUCT_LIST_REQUEST});
            const response = await axios.get("/api/product");
            dispatch({type:PRODUCT_LIST_SUCCESS,payload:response.data});
        } catch (error) {
            dispatch({
                type:PRODUCT_LIST_FAIL,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })
            
        }
    }
}

export const productDetails = (id) => {
    return async (dispatch) => {
        try {
            dispatch({type:PRODUCT_DETAILS_REQUEST});
            const response = await axios.get(`/api/product/${id}`);
            dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:response.data});
        } catch (error) {
            dispatch({
                type:PRODUCT_DETAILS_FAIL,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}