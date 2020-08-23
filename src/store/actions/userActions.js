import { userConstants, cloudConstants, errors, localConstants } from '../../components/utils/constants';

export const userActions = {
    getUser,
}


function getUser(playerTag) {

    return async dispatch => {

        dispatch(request({ playerTag }));

        if (!playerTag) {
            console.log('action tag undefined.. ');
            dispatch(failure({ error: errors.USER_FAILED }));
        }
        else {

            // fetch player & dispatch success
            if (localStorage.getItem(localConstants.PLAYER) == null) {
                async function getPlayer() {

                    try {
                        console.log('fetching clan.. ');
                        await fetch(cloudConstants.PLAYER_BY_TAG, {
                            method: "GET",
                            headers: {
                                playerTag: playerTag,
                            }
                        })
                            .catch(function (error) {

                                console.log('error fetching clan.. ');
                                console.log(error);
                                throw new Error(userConstants.USER_FAILED);
                            })
                            .then(function (result) {
                                return result.json();
                            })
                            .then(function (result) {

                                if (result.reason === errors.USER_FAILED) {
                                    throw new Error(userConstants.USER_FAILED);
                                }
                                else {

                                    console.log('returning user: ');
                                    const player = result;
                                    console.log(player);
                                    dispatch(success(player));
                                }
                            })
                    } catch (error) {
                        console.log(error);
                        dispatch(failure(error));
                    }
                }

                try {
                    return await getPlayer().then(() => {
                        console.log('clan action complete');
                    });
                } catch (error) {
                    console.log(error);
                    dispatch(failure(error));
                }
            }
            else {
                const player = JSON.parse(localStorage.getItem(localConstants.PLAYER));
                dispatch(success(player));
            }
        }
    }

    function request(playerTag) { return { type: userConstants.USER_REQUEST, playerTag } }
    function success(player) { return { type: userConstants.USER_SUCCESS, player } }
    function failure(error) { return { type: userConstants.USER_FAILED, error } }
}
