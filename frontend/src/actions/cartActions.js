import axios from 'axios';
import { ADD_CART_ITEM, DELETE_CART_ITEM,SAVE_SHIPPING_ADDRESS, SAVE_PAYMENT_METHOD } from '../constants/cartConstants';

export const addTocart = (id,qty) => {
    return async (dispatch,getState) => {
        const { data } = await axios.get(`/api/product/${id}`);

        dispatch({
            type:ADD_CART_ITEM,
            payload:{
                product:data._id,
                name:data.name,
                price:data.price,
                image:data.image,
                countInStock:data.countInStock,
                qty
            }
        });

        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
    } 
}

export const removeFromCart = (id) => {
    return async (dispatch,getState) => {
        dispatch({
            type:DELETE_CART_ITEM,
            payload:id
        })
        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
    }
}

export const saveShippingAddress = (data) => {
    return async (dispatch,getState) => {
        dispatch({
            type:SAVE_SHIPPING_ADDRESS,
            payload:data
        })
        localStorage.setItem("shippingAddress",JSON.stringify(getState().cart.shippingAddress));
    }
}

export const savePaymentMethod = (pm) => {
    return async (dispatch,getState) => {
        dispatch({
            type:SAVE_PAYMENT_METHOD,
            payload:pm
        })
        localStorage.setItem("paymentMethod",JSON.stringify(getState().cart.paymentMethod));
    }
}