import { authConstants, errors } from '../../components/utils/constants';


const initState = {
    playerTag: null,
    auth: false,
    user: null,
    error: null,
}

function userReducer(state = initState, action) {
    switch (action.type) {

        case errors.TAG_FAILED:
            return {
                error: action.error,
            };

        case authConstants.AUTH_FAILED:
            return {
                error: action.error,
            };

        case authConstants.SIGNUP_REQUEST:
            return {
                error: false
            }

        case authConstants.SIGNUP_SUCCESS:
            return {
                user: action.newUser
            };

        case authConstants.USER_SIGNIN:
            return {

            };

        case authConstants.USER_RESET_PASSWORD:
            return {

            };

        case authConstants.USER_CHANGE_PASSWORD:
            return {

            };

        default:
            return state;
    }
}

export default userReducer;