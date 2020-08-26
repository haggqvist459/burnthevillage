import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import '../sass/index.scss';
import { Header, Footer, localConstants, firebase } from '../components';
import { CircularProgress, Grid, Typography, Button, Badge, CardActionArea, CardMedia } from '@material-ui/core';
import { clanActions, userActions } from '../store/actions';
import { Group } from '@material-ui/icons';
import { RandomProfileImage } from '../components/utils/randomProfileImage';


const Profile = ({ history }) => {

    const auth = firebase.auth();
    const dispatch = useDispatch();
    const { clan } = useSelector(state => state.clan);
    const { player } = useSelector(state => state.user);

    const handleClanClick = useCallback(async event => {
        event.preventDefault();

        try {
            history.push('/clan');
        } catch (error) {
            alert(error);
        }

    }, [history]);

    const signOut = () => {
        localStorage.removeItem(localConstants.CLAN);
        localStorage.removeItem(localConstants.CLAN_MEMBERS);
        localStorage.removeItem(localConstants.PLAYER_TAG);
        localStorage.removeItem(localConstants.CURRENT_WAR);
        localStorage.removeItem(localConstants.PLAYER);
        localStorage.removeItem(localConstants.CLAN_TAG);
        auth.signOut();
    }

    useEffect(() => {

        let clanTag = localStorage.getItem(localConstants.CLAN_TAG);
        let playerTag = localStorage.getItem(localConstants.PLAYER_TAG);

        dispatch(clanActions.getClan(clanTag));
        dispatch(userActions.getUser(playerTag))

    }, [dispatch]);

    return (
        <Grid className="wrapper">

            <Header />

            <Grid className="content">

                <Grid className="profile_container">
                    <Grid className="profile_container__profile_row">

                        <Grid className="profile_container__profile_row__profile_box">

                            <Grid  className="profile_container__profile_row__profile_picture">
                                <CardActionArea onClick={signOut}>
                                    <CardMedia
                                        component="img"
                                        alt="base img"
                                        image={RandomProfileImage()}
                                        title="profile"
                                    />
                                </CardActionArea>
                            </Grid>

                            <Grid className="profile_container__profile_row__profile_fields">

                                {player && player.name ?
                                    <Grid className="profile_container__profile_row__profile_fields__clan">
                                        <Typography variant="h6">{player.name}</Typography>
                                    </Grid>
                                    :
                                    <Grid>
                                        <CircularProgress color="secondary" />
                                    </Grid>
                                }

                                {clan && clan.name ?
                                    <Grid>
                                        <Button style={{ textTransform: 'none', padding: '0' }} onClick={handleClanClick}>
                                            <Typography variant="h6">{clan.name}</Typography>
                                        </Button>
                                        <Badge badgeContent={clan.members} color="secondary">
                                            <Group color="primary" style={{ paddingLeft: '10' }} />
                                        </Badge>
                                    </Grid>
                                    :
                                    <Grid>
                                        {player && player.clan ?
                                            <Grid>
                                                <Button style={{ textTransform: 'none', padding: '0' }} disabled>
                                                    <Typography variant="h6">{player.clan.name}</Typography>
                                                </Button>
                                                <Badge badgeContent={0} color="secondary">
                                                    <Group color="primary" style={{ paddingLeft: '10' }} />
                                                </Badge>
                                            </Grid>
                                            :
                                            <Grid>
                                                <Button style={{ textTransform: 'none', padding: '0' }} disabled>
                                                    <Typography variant="h6">loading clan.. </Typography>
                                                </Button>
                                                <Badge badgeContent={0} color="secondary">
                                                    <Group color="primary" style={{ paddingLeft: '10' }} />
                                                </Badge>
                                            </Grid>
                                        }

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

                    </Grid>

                </Grid>

            </Grid>

            <Footer />

        </Grid>
    )
}

export default withRouter(Profile);

