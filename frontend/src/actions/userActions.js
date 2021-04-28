import { 
    LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGOUT,
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,
    DETAILS_USER_REQUEST, DETAILS_USER_SUCCESS, DETAILS_USER_FAIL,
    UPDATE_PROFILE_USER_REQUEST, UPDATE_PROFILE_USER_SUCCESS, UPDATE_PROFILE_USER_FAIL,
    RESET_USER_UPDATE_PROFILE
} from '../constants/userConstants';
import axios from 'axios';

export const login = (email,password) => {
    return async (dispatch,getState) => {
        try {
            dispatch({type:LOGIN_USER_REQUEST});

            const config = {
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const { data } = await axios.post('/api/user/login',{email,password},config);
            
            //localStorage.setItem('loginTime',Date.now());
            dispatch({
                type:LOGIN_USER_SUCCESS,
                payload:data
            })
            localStorage.setItem('currentUser',JSON.stringify(getState().userLogin.loggedInUser));

        } catch (error) {
            dispatch({
                type:LOGIN_USER_FAIL,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })   
        }
    }
}

export const register = (name,email,password) => {
    return async (dispatch,getState) => {
        try {
            dispatch({type:REGISTER_USER_REQUEST});

            const config = {
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const { data } = await axios.post('/api/user/register',{name,email,password},config);
            dispatch({
                type:REGISTER_USER_SUCCESS,
                payload:data
            });

            dispatch({
                type:LOGIN_USER_SUCCESS,
                payload:data
            });

            localStorage.setItem('currentUser',JSON.stringify(getState().userLogin.loggedInUser));

        } catch (error) {
            dispatch({
                type:REGISTER_USER_FAIL,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })   
        }
    }
}

export const getUserDetails = (id) => {
    return async (dispatch,getState) => {
        try {
            dispatch({type:DETAILS_USER_REQUEST});
            const { userLogin: { loggedInUser }} = getState();

            const config = {
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${loggedInUser.token}`
                }
            }
            const { data } = await axios.get(`/api/user/${id}`,config);
            dispatch({
                type:DETAILS_USER_SUCCESS,
                payload:data
            });

        } catch (error) {
            dispatch({
                type:DETAILS_USER_FAIL,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })   
        }
    }
}

export const updateUserProfile = (user) => {
    return async (dispatch,getState) => {
        try {
            dispatch({type:UPDATE_PROFILE_USER_REQUEST});
            const { userLogin: { loggedInUser }} = getState();

            const config = {
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${loggedInUser.token}`
                }
            }
            const { data } = await axios.put(`/api/user/profile`,user,config);
            dispatch({
                type:UPDATE_PROFILE_USER_SUCCESS,
                payload:data
            });

            dispatch({
                type:DETAILS_USER_SUCCESS,
                payload:data
            });

            dispatch({
                type:LOGIN_USER_SUCCESS,
                payload:data
            });

            setTimeout(() => {
                dispatch({
                    type:RESET_USER_UPDATE_PROFILE,
                })
            },3500)

        } catch (error) {
            dispatch({
                type:UPDATE_PROFILE_USER_FAIL,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })   
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        localStorage.removeItem("currentUser");
       // localStorage.removeItem("loginTime");
        dispatch({type:LOGOUT})
    }
}