import {  createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from  'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducer';
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdate:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer
});

const initialCart = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []; 
const initialUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null; 
const initialShippingAddress = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}; 
const initialPaymentMethod = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : ''; 

const initialState = {
    cart:{ cartItems:initialCart, shippingAddress:initialShippingAddress, paymentMethod:initialPaymentMethod },
    userLogin:{ loggedInUser:initialUser }
};
const middleware = [thunk];

const store = createStore( reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
