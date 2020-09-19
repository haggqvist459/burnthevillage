import { userConstants, cloudConstants, errors, localConstants, firestoreConstants } from '../../components/utils/constants';
import { firebase } from '../../components';
import moment from 'moment';

export const userActions = {
    getUser,
    getUploadHistory,
    getUserTags,
}

// google cloud fetch
function getUser(playerTag) {

    return async dispatch => {

        dispatch(request({ playerTag }));

        if (!playerTag) {
            console.log('user tag undefined.. ');
            dispatch(failure({ error: errors.USER_FAILED }));
        }
        else {

            // fetch player & dispatch success
            if (localStorage.getItem(localConstants.PLAYER) == null) {
                async function getPlayer() {

                    try {
                        console.log('fetching user.. ');
                        await fetch(cloudConstants.PLAYER_BY_TAG, {
                            method: "GET",
                            headers: {
                                playerTag: playerTag,
                            }
                        })
                            .catch(function (error) {

                                console.log('error fetching user.. ');
                                console.log(error);
                                throw new Error(userConstants.USER_FAILED);
                            })
                            .then(function (result) {
                                return result.json();
                            })
                            .then(function (result) {

                                if (result.reason === errors.USER_FAILED) {
                                    console.log('result reason')
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
                        console.log('user action complete');
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

// firestore fetch upload history
function getUploadHistory(displayName) {

    const db = firebase.firestore();
    // upload history collection reference
    const uploadHistoryRef = db.collection(firestoreConstants.USER_COLLECTION).doc(displayName).collection(firestoreConstants.UPLOAD_HISTORY);

    // list of uploads
    let uploadCollection = [];

    return async dispatch => {

        dispatch(request({ displayName }));

        if (!displayName) {
            console.log('display name undefined.. ');
            dispatch(failure({ error: errors.UPLOAD_HISTORY_FAILED }));
        }
        else {

            // fetch upload history from firestore
            if (localStorage.getItem(localConstants.UPLOAD_HISTORY) == null) {

                try {

                    // get upload history collection
                    const uploadHistoryRes = await uploadHistoryRef.get()

                    // iterate every upload document to get list of matches
                    const listUploadMatches = uploadHistoryRes.docs.map(async doc => {

                        // upload history match reference
                        const uploadMatchRef = doc.ref.collection(firestoreConstants.UPLOAD_MATCHES);

                        // new list of matches every iteration of uploads
                        let uploadMatches = [];

                        // get matching bases
                        await uploadMatchRef.get()
                            .catch(function (error) {
                                console.log(error);
                                throw new Error(errors.UPLOAD_HISTORY_FAILED);
                            })
                            .then(function (matchSnap) {
                                // iterate every match document, push to list of matches
                                matchSnap.forEach(async function (match) {

                                    let matchRes = {
                                        imageUrl: match.data().imageUrl,
                                        matchPercentage: match.data().matchPercentage,
                                    };
                                    uploadMatches.push(matchRes);
                                })
                            })
                        // store upload with list of matching bases
                        let upload = {
                            createdAt: moment(doc.data().createdAt.toDate()).calendar(),
                            imageUrl: doc.data().imageUrl,
                            uploadMatches: uploadMatches
                        }
                        // push upload to list of uploads
                        uploadCollection.push(upload);
                    })

                    // wait for iterator to finish
                    await Promise.all(listUploadMatches);

                    // send upload collection to reducer
                    console.log('list length: ', uploadCollection.length);
                    dispatch(success(uploadCollection));

                } catch (error) {
                    console.log('get upload history error: ' + error);
                    return error;
                }
            }
            else {
                uploadCollection = JSON.parse(localStorage.getItem(localConstants.UPLOAD_HISTORY));
                dispatch(success(uploadCollection));
            }
        }

    }

    function request(displayName) { return { type: userConstants.USER_REQUEST, displayName } }
    function success(uploadCollection) { return { type: userConstants.UPLOAD_HISTORY, uploadCollection } }
    function failure(error) { return { type: userConstants.USER_FAILED, error } }
}

// firestore fetch player tags
function getUserTags(displayName) {

    const db = firebase.firestore();
    // upload history collection reference
    const tagCollectionRef = db.collection(firestoreConstants.USER_COLLECTION).doc(displayName).collection(firestoreConstants.TAG_COLLECTION);

    return async dispatch => {
        dispatch(request(displayName));

        if (!displayName) {
            console.log('display name undefined.. ');
            dispatch(failure({ error: errors.TAG_COLLECTION_FAILED }));
        }
        else {

            // fetch tag collection from firestore
            if (localStorage.getItem(localConstants.TAG_COLLECTION) == null) {

                try {

                    // get tag collection
                    const tagCollectionRes = await tagCollectionRef.get();
                    let tags = [];
                    // iterate every tag document and push to list
                    tagCollectionRes.docs.map(async doc => {
                        let tag = doc.id;
                        console.log('tag found', doc.id)
                        tags.push(tag);
                    })

                    dispatch(success(tags));

                } catch (error) {
                    console.log('get tag collection error: ' + error);
                    return error;
                }
            }
            else {
                let tags = JSON.parse(localStorage.getItem(localConstants.TAG_COLLECTION));
                dispatch(success(tags));
            }
        }
    }

    function request(displayName) { return { type: userConstants.USER_REQUEST, displayName } }
    function success(tags) { return { type: userConstants.TAG_COLLECTION, tags } }
    function failure(error) { return { type: userConstants.USER_FAILED, error } }
}