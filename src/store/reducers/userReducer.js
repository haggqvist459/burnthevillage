import { userConstants, localConstants } from '../../components/utils/constants';


const initState = {
    playerTag: null,
    player: null,
    clan: null,
    uploadHistory: null,
    tagList: null,
    error: null,
    isFetching: false,
    progress: null,
}

function userReducer(state = initState, action) {
    switch (action.type) {

        case userConstants.USER_REQUEST:

            return {
                ...state,
                isFetching: true,
            };

        case userConstants.USER_FAILED:

            return {
                ...state,
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

        case userConstants.UPLOAD_HISTORY:

            localStorage.removeItem(localConstants.UPLOAD_HISTORY);
            localStorage.setItem(localConstants.UPLOAD_HISTORY, JSON.stringify(action.uploadCollection));
            return {
                ...state,
                uploadHistory: action.uploadCollection
            };

        case userConstants.TAG_COLLECTION:

            localStorage.removeItem(localConstants.TAG_COLLECTION);
            localStorage.setItem(localConstants.TAG_COLLECTION, JSON.stringify(action.tags));
            return {
                ...state,
                tagList: action.tags
            }
        
        case userConstants.PROGRESS: 
            return{
                ...state,
                progress: action.progress
            }
        default:
            return state
    }
}

export default userReducer;