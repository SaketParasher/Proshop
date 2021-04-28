import { ADD_CART_ITEM, DELETE_CART_ITEM, SAVE_SHIPPING_ADDRESS, SAVE_PAYMENT_METHOD } from '../constants/cartConstants';

export const cartReducer = (state={cartItems:[], shippingAddress:{}, paymentMethod:''},action) => {
    switch (action.type) {
        case ADD_CART_ITEM:
            const item = action.payload;
            const itemExists = state.cartItems.find(c => c.product === item.product);
            if(itemExists){
                const cItems = state.cartItems.map(ci => ci.product === item.product ? item : ci);
                return {...state,cartItems:cItems}
            }else{
                return {...state,cartItems:[...state.cartItems,item]}
            }

        case DELETE_CART_ITEM:
            return {
                ...state,
                cartItems:state.cartItems.filter(x => x.product !== action.payload)
            }

        case SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress:action.payload}

        case SAVE_PAYMENT_METHOD:
            return {...state, paymentMethod:action.payload}
    
        default:
            return state;
    }
}