import { combineReducers } from 'redux';
import clanReducer from './clanReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    clan: clanReducer,
    user: userReducer,
});

export default rootReducer;