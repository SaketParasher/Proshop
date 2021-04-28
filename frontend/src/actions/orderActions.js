import {
     ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
     ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL
} from '../constants/orderConstants';
import axios from 'axios';

export const createOrder = (order) => {
    return async (dispatch,getState) => {
        try {
            const { userLogin: { loggedInUser }} = getState();
            dispatch({type:ORDER_CREATE_REQUEST});

            const config = {
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${loggedInUser.token}`
                }
            }
            const { data } = await axios.post('/api/order',order,config);
            dispatch({
                type:ORDER_CREATE_SUCCESS,
                payload:data
            });

        } catch (error) {
            dispatch({
                type:ORDER_CREATE_FAIL,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })   
        }
    }
}

export const getOrderDetails = (id) => {
    return async (dispatch,getState) => {
        try {
            const { userLogin: { loggedInUser }} = getState();
            dispatch({type:ORDER_DETAILS_REQUEST});

            const config = {
                headers:{
                    Authorization:`Bearer ${loggedInUser.token}`
                }
            }
            const { data } = await axios.get(`/api/order/${id}`,config);
            dispatch({
                type:ORDER_DETAILS_SUCCESS,
                payload:data
            });

        } catch (error) {
            dispatch({
                type:ORDER_DETAILS_FAIL,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })   
        }
    }
}