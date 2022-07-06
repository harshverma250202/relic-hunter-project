import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_SUCCESS,
    USER_CHECK_REQUEST,
    USER_CHECK_SUCCESS,
    USER_CHECK_FAILURE,
    LOG_OUT_REQUEST,
} from './loginType'



export const userCheckRequest = () => {

    return {
        type: USER_CHECK_REQUEST
    }


}

export const userCheckSuccess = (user) => {
    console.log(user)
    return {
        type: USER_CHECK_SUCCESS,
        payload: user
    }
}

export const userCheckFailure = (error) => {
    return {
        type: USER_CHECK_FAILURE,
    }
}

export const loginRequest = () => {

    return {
        type: LOG_IN_REQUEST,
    }

}

export const loginSuccess = (currentUser) => {

    return {
        type: LOG_IN_SUCCESS,
        payload:{
            token:currentUser.token,
            user:currentUser.user,
        }
    }
}

export const loginFailure = (error) => {

    return {
        type: LOG_IN_FAILURE,
    }
}


export const logoutRequest=()=>{

    return {
        type:LOG_OUT_REQUEST,
    }
}

export const logoutSuccess = () => {
    return {
        type: LOG_OUT_SUCCESS
    }
}










