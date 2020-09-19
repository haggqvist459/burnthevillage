import { localConstants, authConstants, firestoreConstants } from '../../components/utils/constants';
import { firebase } from '../../components';
import { userActions } from './userActions';

export const authActions = {
    signupUser,
}

function signupUser(playerTag, username, email, password) {

    const db = firebase.firestore();
    const newUser = {
        playerTag: playerTag,
        username: username,
        email: email,
        password: password,
    }

    return async dispatch => {

        await dispatch(userActions.getUser(newUser.playerTag));
        dispatch(request())

        if (localStorage.getItem(localConstants.PLAYER)) {
            console.log('player found, valid tag');

            try {
                //first in chain, create user and give displayName = username (will be used later to connect user to firestore)
                await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
                    .then(() => {
                        const user = firebase.auth().currentUser;
                        return user.updateProfile({
                            displayName: newUser.username
                        })
                    })
                    .catch(function (error) {
                        console.log(error);
                        dispatch(failure(true));
                    })

                //send email verification
                await firebase.auth().currentUser.sendEmailVerification()
                    .catch(function (error) {
                        console.log(error);
                        dispatch(failure(true));
                    });

                db
                    .collection(firestoreConstants.USER_COLLECTION)
                    .doc(newUser.username)
                    .set({
                        playertag: newUser.playerTag,
                        username: newUser.username,
                        role: 'user',
                        createdAt: new Date(),
                        profilePicture: Math.floor(Math.random() * 43),
                    })
                    .then(() => {
                        console.log('user stored');
                        dispatch(success(newUser))
                    }).catch(function (error) {
                        console.log(error);
                        dispatch(failure(true));
                    })
            } catch (error) {
                console.log(error);
                console.log(error);
                dispatch(failure(true));
            }
        }
        else {
            console.log('player not found, invalid tag');
            dispatch(failure(true));
        }
    }

    function request() { return { type: authConstants.SIGNUP_REQUEST } }
    function success(newUser) { return { type: authConstants.SIGNUP_SUCCESS, newUser } }
    function failure(error) { return { type: authConstants.AUTH_FAILED, error } }
}