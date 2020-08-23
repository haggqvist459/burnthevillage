import { clanConstants, localConstants } from '../../components/utils/constants';


const initState = {
    clanTag: null,
    clan: null,
    memberList: null,
    currentWar: null,
    error: null,
}

function clanReducer(state = initState, action) {
    switch (action.type) {

        case clanConstants.CLAN_REQUEST:
            return {
                clanTag: action.clanTag
            };
        case clanConstants.CLAN_FAILED:
            return {
                error: clanConstants.CLAN_FAILED,
            };
        case clanConstants.CLAN_SUCCESS:

            localStorage.setItem(localConstants.CLAN, JSON.stringify(action.clan));
            localStorage.setItem(localConstants.CLAN_MEMBERS, JSON.stringify(action.clan.memberList));
            return {
                ...state,
                clan: action.clan,
                memberList: action.clan.memberList
            };
        case clanConstants.CLAN_UPDATE:
            return {};

        case clanConstants.WAR_REQUEST:
            return {
                ...state,
                clanTag: action.clanTag,
            };
        case clanConstants.WAR_FAILED:
            return {
                error: clanConstants.WAR_FAILED,
            };
        case clanConstants.WAR_SUCCESS: 

            localStorage.setItem(localConstants.CURRENT_WAR, JSON.stringify(action.currentWar));
            return {
                ...state,
                currentWar: action.currentWar,
            };   
        case clanConstants.WAR_UPDATE: {
            return {};
        }

        default:
            return state
    }
}

export default clanReducer;