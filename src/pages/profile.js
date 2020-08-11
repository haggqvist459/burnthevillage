import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router';
import '../sass/index.scss';
import { Header, Footer, PlayerByTag, ClanByTag, CurrentWar, local_constants, firebase } from '../components';
import { CircularProgress, Grid, Typography } from '@material-ui/core';


const Profile = ({ history }) => {

    const auth = firebase.auth();
    const [playerObject, setPlayerObject] = useState(JSON.parse(localStorage.getItem(local_constants.LOCAL_PLAYER)));
    const [load, setLoad] = useState(false);

    const handleClanClick = useCallback(async event => {
        event.preventDefault();

        try {
            history.push('/clan');
        } catch (error) {
            alert(error);
        }

    }, [history]);

    const signOut = () => {
        auth.signOut();
    }

    useEffect(() => {

        const fetchClan = async () => {
            await ClanByTag();
            await CurrentWar();
        }

        //no clan in localStorage, try fetch from API
        if (!localStorage.getItem(local_constants.LOCAL_CLAN)) {
            fetchClan().then(function () {
                if (!playerObject) {
                    setLoad(true);
                    const fetchPlayer = async () => {
                        await PlayerByTag().then(function () {
                            setPlayerObject(JSON.parse(localStorage.getItem(local_constants.LOCAL_PLAYER)));
                        }).catch(function (error) {
                            console.log(error);
                        })
                    }

                    try {
                        fetchPlayer().catch(function (error) {
                            console.log(error);
                            setLoad(false);
                        })
                    } catch (error) {
                        console.log(error);
                        setLoad(false);
                    }
                }
                else {
                    setLoad(false);
                }
            }).catch(function (error) {
                console.log(error)
                setLoad(false);
            })
        }

    }, [playerObject]);

    return (
        <Grid className="wrapper">

            <Header />

            <Grid className="content">

                <Grid className="profile_container">
                    <Grid className="profile_container__profile_row">

                        <Grid className="profile_container__profile_row__profile_box">

                            <Grid onClick={signOut} className="profile_container__profile_row__profile_picture">

                            </Grid>

                            <Grid className="profile_container__profile_row__profile_fields">

                                {load ?
                                    <Grid>
                                        <CircularProgress color="secondary" />
                                    </Grid>
                                    :
                                    <Grid className="profile_container__profile_row__profile_fields__clan">
                                        {playerObject.name ? <Typography variant="h6">{playerObject.name}</Typography> : null}
                                    </Grid>
                                }

                                {load ?
                                    <Grid>
                                        <CircularProgress color="secondary" />
                                    </Grid>
                                    :
                                    <Grid className="profile_container__profile_row__profile_fields__clan">
                                        {playerObject.clan ? <Typography onClick={handleClanClick} variant="h6">{playerObject.clan.name}</Typography> : <Typography>no clan</Typography>}
                                    </Grid>
                                }

                                <Typography className="profile_container__profile_row__profile_fields__upload_history" variant="h6">
                                    Upload history
                                </Typography>
                            </Grid>

                        </Grid>

                        <Grid className="profile_container__profile_row__edit_profile">
                            <Typography>edit profile</Typography>
                        </Grid>

                    </Grid>

                    <Grid className="profile_container__bio_row">
                        <Typography variant="h3">Bio:</Typography>
                        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget metus et elit tempus imperdiet.
                        Nunc facilisis cursus mi, vel consectetur dolor pretium ac.
                        Nulla pellentesque, elit id feugiat vestibulum, libero sem finibus sapien, in elementum augue lorem non eros.
                    Vestibulum dolor ex, semper hendrerit quam at, viverra efficitur est.</Typography>
                    </Grid>

                </Grid>
            
            </Grid>

            <Footer />

        </Grid>
    )
}

export default withRouter(Profile);

