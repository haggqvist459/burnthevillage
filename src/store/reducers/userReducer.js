import { userConstants, localConstants } from '../../components/utils/constants';


const initState = {
    playerTag: null,
    player: null,
    clan: null,
    error: null,
    isFetching: false,
}

function userReducer(state = initState, action) {
    switch (action.type) {

        case userConstants.USER_REQUEST:

            return {
                isFetching: true,
            };

        case userConstants.USER_FAILED:

            return {
                error: userConstants.USER_FAILED,
                isFetching: false,
            };

        case userConstants.USER_SUCCESS:

            localStorage.removeItem(localConstants.PLAYER);
            localStorage.setItem(localConstants.PLAYER, JSON.stringify(action.player));
            localStorage.removeItem(localConstants.CLAN_TAG);
            localStorage.setItem(localConstants.CLAN_TAG, action.player.clan.tag.slice(1));

            return {
                ...state,
                player: action.player,
                isFetching: false,
            };

        case userConstants.USER_UPDATE:
            return {};

        default:
            return state
    }
}

export default userReducer;