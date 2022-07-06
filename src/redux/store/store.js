import { applyMiddleware,createStore,combineReducers } from "redux";
import authentication from '../login/loginReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const rootReducer=combineReducers({
    auth:authentication,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk) ));
export default store