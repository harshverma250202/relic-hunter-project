import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    USER_CHECK_REQUEST,
    USER_CHECK_SUCCESS,
    USER_CHECK_FAILURE,

} from './loginType'



const initialState = {
    user: null,
    token: localStorage.getItem('token')
        ? localStorage.getItem('token')
        : null,
    loading: false,
    isAuthenticated: false,




}


const authenticationReducer = (state = initialState, action) => {


    switch (action.type) {



        case USER_CHECK_REQUEST:
            return {
                ...state,
                loading: true,
               

            };

        case USER_CHECK_FAILURE:
            localStorage.removeItem('token')
            return {
         
                loading: false,
                user: null,
                isAuthenticated: false,
                token: null,
            


            };
        case USER_CHECK_SUCCESS:

            return {
                ...state,
                loading: false,
                user: action.payload,
                isAuthenticated: true,
                

            }

        case LOG_IN_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
                
            }

        case LOG_IN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            console.log(action.payload)
            return {
                
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,

                
            }

        case LOG_IN_FAILURE:
            return {
                ...state,
                loading: false,
                user: null,
                isAuthenticated: false,
                
                
            }

        case LOG_OUT_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
                

            };


        case LOG_OUT_FAILURE:
            localStorage.removeItem('token')
            return {
                ...state,
                loading: false,
                user: null,
                isAuthenticated: false,
               
            };


        case LOG_OUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                token: null,

            }
        default: return state
    }


}

export default authenticationReducer