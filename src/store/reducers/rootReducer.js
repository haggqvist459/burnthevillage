import { combineReducers } from 'redux';
import clanReducer from './clanReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    clan: clanReducer,
    user: userReducer,
});

export default rootReducer;