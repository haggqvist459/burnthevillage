import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import '../sass/index.scss';
import { Header, Footer, localConstants, firebase, UploadHistory } from '../components';
import { CircularProgress, Grid, Typography, Button, Badge, CardActionArea } from '@material-ui/core';
import { clanActions, userActions } from '../store/actions';
import { Group } from '@material-ui/icons';
import RandomProfileImage from '../components/utils/randomProfileImage';


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

        dispatch(userActions.getUser(localStorage.getItem(localConstants.PLAYER_TAG))).then(function () {
            dispatch(clanActions.getClan(localStorage.getItem(localConstants.CLAN_TAG)))
        })

        dispatch(userActions.getUploadHistory(localStorage.getItem(localConstants.DISPLAY_NAME)))
        dispatch(userActions.getUserTags(localStorage.getItem(localConstants.DISPLAY_NAME)))

    }, [dispatch]);

    function TagList() {
        
    }

    return (
        <Grid className="wrapper">

            <Header />

            <Grid className="content">

                <Grid container direction={'row'} justify={'space-around'}>

                    {/* first row with profile picture and user information */}
                    <Grid container direction={'row'} justify={'space-evenly'} item xs={12} sm={12} md={4} lg={4} xl={4} style={{ marginTop: '5vh' }}>

                        <Grid container direction={'column'} item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <CardActionArea onClick={signOut} style={{ textAlign: 'center' }}>
                                <RandomProfileImage />
                            </CardActionArea>
                        </Grid>

                        <Grid container direction={'column'} item xs={6} sm={6} md={6} lg={6} xl={6}>

                            <Grid container direction={'row'}>

                                {localStorage.getItem(localConstants.DISPLAY_NAME) ?
                                    <Grid>
                                        <Typography variant="h6">{localStorage.getItem(localConstants.DISPLAY_NAME)}</Typography>
                                    </Grid>
                                    :
                                    <Grid>
                                        <CircularProgress color="secondary" />
                                    </Grid>
                                }
                            </Grid>

                            <Grid container direction={'row'}>

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

                            </Grid>

                        </Grid>
                        
                        <Grid container direction={'row'} justify={'center'} item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Typography variant={'h6'}>my tags</Typography>
                                
                        </Grid>

                    </Grid>

                    {/* second row with list of user upload history */}
                    <Grid container direction={'row'} justify={'space-evenly'} item xs={12} sm={12} md={6} lg={6} xl={6} style={{ marginTop: '5vh' }}>
                        <Grid container direction={'column'} item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <UploadHistory />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <Footer />

        </Grid>
    )
}

export default withRouter(Profile);


