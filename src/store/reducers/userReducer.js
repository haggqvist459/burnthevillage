import { userConstants, localConstants } from '../../components/utils/constants';


const initState = {
    playerTag: null,
    player: null,
    clan: null,
    error: null,
}

function userReducer(state = initState, action) {
    switch (action.type) {

        case userConstants.USER_REQUEST:

            localStorage.setItem(localConstants.PLAYER_TAG, JSON.stringify(action.playerTag));
            return {
                playerTag: action.playerTag
            };
        case userConstants.USER_FAILED:
            return {
                error: userConstants.USER_FAILED,
            };
        case userConstants.USER_SUCCESS:

            localStorage.setItem(localConstants.PLAYER, JSON.stringify(action.player));
            localStorage.setItem(localConstants.CLAN_TAG, action.player.clan.tag.slice(1));
            return {
                ...state,
                player: action.player,
            };
        case userConstants.USER_UPDATE:
            return {};

        default:
            return state
    }
}

export default userReducer;