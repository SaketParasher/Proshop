import { 
        LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGOUT,
        REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,
        DETAILS_USER_REQUEST, DETAILS_USER_SUCCESS, DETAILS_USER_FAIL,
        UPDATE_PROFILE_USER_REQUEST, UPDATE_PROFILE_USER_SUCCESS, UPDATE_PROFILE_USER_FAIL,
        RESET_USER_UPDATE_PROFILE
 } from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return { loading:true }

        case LOGIN_USER_SUCCESS:
            return { loading:false, loggedInUser:action.payload}

        case LOGIN_USER_FAIL:
            return { loading:false, error:action.payload }

        case LOGOUT:
            return {}
    
        default:
            return state;
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return { loading:true }

        case REGISTER_USER_SUCCESS:
            return { loading:false, loggedInUser:action.payload}

        case REGISTER_USER_FAIL:
            return { loading:false, error:action.payload }
    
        default:
            return state;
    }
}

export const userDetailsReducer = (state = { user:{} }, action) => {
    switch (action.type) {
        case DETAILS_USER_REQUEST:
            return { ...state,loading:true }

        case DETAILS_USER_SUCCESS:
            return { loading:false, user:action.payload}

        case DETAILS_USER_FAIL:
            return { loading:false, error:action.payload }
    
        default:
            return state;
    }
}

export const userUpdateProfileReducer = (state = { }, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_USER_REQUEST:
            return { ...state,loading:true }

        case UPDATE_PROFILE_USER_SUCCESS:
            return { loading:false, ...action.payload,success:true}

        case UPDATE_PROFILE_USER_FAIL:
            return { loading:false, error:action.payload }

        case RESET_USER_UPDATE_PROFILE:
            return {}
    
        default:
            return state;
    }
}

