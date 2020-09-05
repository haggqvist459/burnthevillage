import { clanConstants, cloudConstants, errors, localConstants } from '../../components/utils/constants';

export const clanActions = {
    getClan,
    getCurrentWar,
}


function getClan(clanTag) {

    return async dispatch => {

        dispatch(request({ clanTag }));

        if (!clanTag) {
            console.log('clan tag undefined.. ');
            dispatch(failure({ error: errors.CLAN_FAILED }));
        }
        else {

            // fetch clan & dispatch success
            if (localStorage.getItem(localConstants.CLAN) == null) {
                async function getClan() {

                    try {
                        console.log('fetching clan.. ');
                        await fetch(cloudConstants.CLAN_BY_TAG, {
                            method: "GET",
                            headers: {
                                clanTag: clanTag,
                            }
                        })
                            .catch(function (error) {

                                console.log('error fetching clan.. ');
                                console.log(error);
                                throw new Error(clanConstants.CLAN_FAILED);
                            })
                            .then(function (result) {
                                return result.json();
                            })
                            .then(function (result) {

                                if (result.reason === errors.CLAN_FAILED) {
                                    throw new Error(clanConstants.CLAN_FAILED);
                                }
                                else {

                                    console.log('returning clan: ');
                                    const clan = result;
                                    console.log(clan);
                                    dispatch(success(clan));
                                }
                            })
                    } catch (error) {
                        console.log(error);
                        dispatch(failure(error));
                    }
                }

                try {
                    return await getClan().then(() => {
                        console.log('clan action complete');
                    });
                } catch (error) {
                    console.log(error);
                    dispatch(failure(error));
                }
            }
            else {
                const clan = JSON.parse(localStorage.getItem(localConstants.CLAN));
                dispatch(success(clan));
            }
        }
    }

    function request(clanTag) { return { type: clanConstants.CLAN_REQUEST, clanTag } }
    function success(clan) { return { type: clanConstants.CLAN_SUCCESS, clan } }
    function failure(error) { return { type: clanConstants.CLAN_FAILED, error } }
}

function getCurrentWar(clanTag) {

    return async dispatch => {

        dispatch(request({ clanTag }));

        if (!clanTag) {
            console.log('action tag undefined.. ');
            dispatch(failure({ error: errors.WAR_FAILED }));
        }
        else {

            if (localStorage.getItem(localConstants.CURRENT_WAR) == null) {
                // fetch current war & dispatch success
                async function getCurrentWar() {

                    try {
                        console.log('fetching current war.. ');

                        await fetch(cloudConstants.CURRENT_WAR, {
                            method: "GET",
                            headers: {
                                clanTag: clanTag,
                            }
                        })
                            .catch(function (error) {

                                console.log('error fetching current war.. ');
                                console.log(error);
                                throw new Error(clanConstants.WAR_FAILED);
                            })
                            .then(function (result) {
                                return result.json();
                            })
                            .then(function (result) {

                                if (result.reason === errors.CLAN_FAILED) {
                                    throw new Error(clanConstants.CLAN_FAILED);
                                }
                                else {

                                    console.log('current war fetch complete, results: ');
                                    const currentWar = result;
                                    console.log(currentWar);
                                    dispatch(success(currentWar));
                                }

                            });
                    } catch (error) {
                        console.log(error);
                    }
                }

                try {
                    return await getCurrentWar().then(() => {
                        console.log('war fetch exit');
                    });
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }
            else {
                const currentWar = JSON.parse(localStorage.getItem(localConstants.CURRENT_WAR));
                dispatch(success(currentWar));
            }

        }
    }

    function request(clanTag) { return { type: clanConstants.WAR_REQUEST, clanTag } }
    function success(currentWar) { return { type: clanConstants.WAR_SUCCESS, currentWar } }
    function failure(error) { return { type: clanConstants.WAR_FAILED, error } }
}