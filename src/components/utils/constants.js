//localStorage constants
export const localConstants = { 
    
    PLAYER: 'player',
    PLAYER_TAG: 'playerTag',
    VIEW_PLAYER: 'viewPlayer',

    CLAN: 'clan',
    CLAN_TAG: 'clanTag',
    CLAN_MEMBERS: 'clanMembers',
    CURRENT_WAR: 'currentWar',
} 

//google cloud function constants (used to make API calls)
export const cloudConstants = {

    PLAYER_BY_TAG: 'https://australia-southeast1-burnthevillage.cloudfunctions.net/playerByTag/',
    CLAN_BY_TAG: 'https://australia-southeast1-burnthevillage.cloudfunctions.net/clanByTag/',
    CURRENT_WAR: 'https://australia-southeast1-burnthevillage.cloudfunctions.net/currentWar/',
    BIG_FETCH: 'https://australia-southeast1-burnthevillage.cloudfunctions.net/bigFetchByPlayerTag/',
}

// store constants
export const clanConstants = { 

    CLAN_REQUEST: 'CLAN_REQUEST',
    CLAN_SUCCESS: 'CLAN_SUCCESS',
    CLAN_UPDATE: 'CLAN_UPDATE',
    CLAN_FAILED: 'CLAN_FAILED',

    WAR_REQUEST: 'WAR_REQUEST',
    WAR_SUCCESS: 'WAR_SUCCESS',
    WAR_UPDATE: 'WAR_UPDATE',
    WAR_FAILED: 'WAR_FAILED',
}

export const userConstants = { 
    
    USER_REQUEST: 'USER_REQUEST',
    USER_SUCCESS: 'USER_SUCCESS',
    USER_UPDATE: 'USER_UPDATE',
    USER_FAILED: 'USER_FAILED',
}

export const authConstants = {

    AUTH_FAILED: 'AUTH_FAILED',
    SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
    SIGNUP_REQUEST: 'SIGNUP_REQUEST',
    USER_SIGNIN: 'USER_SIGNIN',
    USER_RESET_PASSWORD: 'USER_RESET_PASSWORD',
    USER_CHANGE_PASSWORD: 'USER_CHANGE_PASSWORD',
}

export const errors = {

    CLAN_FAILED: 'notFound',
    WAR_FAILED: 'notFound',
    USER_FAILED: 'notFound',
    TAG_FAILED: 'notFound',
}