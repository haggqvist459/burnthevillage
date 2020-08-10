//localStorage constants
export const local_constants = { 
    
    LOCAL_PLAYER: 'player',
    LOCAL_PLAYER_TAG: 'playerTag',
    VIEW_PLAYER: 'viewPlayer',

    LOCAL_CLAN: 'clan',
    LOCAL_CLAN_TAG: 'clanTag',
    LOCAL_CLAN_MEMBERS: 'clanMembers',

    LOCAL_CURRENT_WAR: 'currentWar',
}

//google cloud function constants (used to make API calls)
export const gcloud_constants = {

    PLAYER_BY_TAG: 'https://australia-southeast1-burnthevillage.cloudfunctions.net/playerByTag/',
    CLAN_BY_TAG: 'https://australia-southeast1-burnthevillage.cloudfunctions.net/clanByTag/',
    CURRENT_WAR: 'https://australia-southeast1-burnthevillage.cloudfunctions.net/currentWar/',
    BIG_FETCH: 'https://australia-southeast1-burnthevillage.cloudfunctions.net/bigFetchByPlayerTag/',
}

