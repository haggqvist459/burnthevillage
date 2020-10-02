import React, { useEffect, useCallback, useState } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import '../sass/index.scss';
import { Header, Footer, localConstants, firebase, UploadHistory } from '../components';
import { CircularProgress, Grid, Typography, Button, Badge, CardActionArea, GridList, IconButton, makeStyles } from '@material-ui/core';
import { clanActions, userActions } from '../store/actions';
import { Group, GridOff } from '@material-ui/icons';
import GetProfileImage from '../components/utils/getProfileImage';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '80%',
        height: '10vh',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    topicField: {
        cssLabel: {
            color: 'green'
        },
        outline: {
            borderWidth: '1px',
            borderColor: '#00AEB3 !important'
        },
    }
}));

const Profile = ({ history }) => {

    const auth = firebase.auth();
    const dispatch = useDispatch();
    const { clan } = useSelector(state => state.clan);
    const { player, uploadHistory, tagList } = useSelector(state => state.user);
    const classes = useStyles();

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
        localStorage.removeItem(localConstants.UPLOAD_HISTORY);
        auth.signOut();
    }

    useEffect(() => {

        dispatch(userActions.getUserTags(localStorage.getItem(localConstants.DISPLAY_NAME))).then(function () {
            dispatch(userActions.getUploadHistory(localStorage.getItem(localConstants.DISPLAY_NAME)))
            dispatch(userActions.getUser(localStorage.getItem(localConstants.PLAYER_TAG))).then(function () {
                dispatch(clanActions.getClan(localStorage.getItem(localConstants.CLAN_TAG)))
            })
        })

    }, [dispatch]);

    function TagList() {
        return (
            <Grid container direction={'row'} style={{ marginTop: '10px' }}>

                <Grid container direction={'row'} justify={'center'} item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant={'h6'}>tags</Typography>
                </Grid>

                <GridList cellHeight={10} className={classes.gridList} cols={1}>
                    {tagList.map((tag, index) => (
                        <Grid container direction={'row'} key={index}>
                            <Grid>
                                <Typography>{tag}</Typography>

                            </Grid>
                        </Grid>
                    ))}
                </GridList>

            </Grid>
        )
    }

    return (
        <Grid className="wrapper">

            <Header />

            <Grid className="content">

                <Grid container direction={'row'} justify={'space-around'} style={{ minHeight: '70vh' }} item xs={12} sm={12} md={12} lg={12} xl={12}>

                    {/* first row with profile picture and user information */}
                    <Grid container direction={'row'} justify={'space-around'} item xs={12} sm={12} md={5} lg={5} xl={5} style={{ marginTop: '5vh' }}>
                        <Grid container direction={'column'} item xs={5} sm={5} md={5} lg={5} xl={5} style={{ marginRight: '10px' }}>
                            <CardActionArea onClick={signOut} style={{ textAlign: 'right' }}>
                                <GetProfileImage number={5} />
                            </CardActionArea>
                        </Grid>
                        <Grid container direction={'column'} item xs={5} sm={5} md={5} lg={5} xl={5}>
                            <Grid style={{ marginBottom: '10px' }}>
                                {localStorage.getItem(localConstants.DISPLAY_NAME) ?
                                    <Typography variant="h6" style={{ textAlign: 'center' }}>{localStorage.getItem(localConstants.DISPLAY_NAME)}</Typography>
                                    :
                                    <CircularProgress color="secondary" />
                                }
                            </Grid>
                            <Grid style={{ marginBottom: '10px' }}>
                                {tagList && tagList ?
                                    <TagList />
                                    :
                                    <CircularProgress color="secondary" />
                                }
                            </Grid>
                            <Grid style={{ marginBottom: '10px' }}>
                            <Typography variant="h6" style={{ textAlign: 'center' }}>clan</Typography>
                                {clan && clan.name ?
                                    <Button style={{ textTransform: 'none', padding: '0', alignSelf: 'center' }} onClick={handleClanClick}>
                                        <Typography variant="h6">{clan.name}</Typography>
                                        <Badge badgeContent={clan.members} color="secondary">
                                            <Group color="primary" />
                                        </Badge>
                                    </Button>
                                    :
                                    <Grid>
                                        {player && player.clan ?
                                            <Button style={{ textTransform: 'none', padding: '0' }} disabled>
                                                <Typography variant="h6">{player.clan.name}</Typography>
                                                <Badge badgeContent={0} color="secondary">
                                                    <Group color="primary" style={{ paddingLeft: '10' }} />
                                                </Badge>
                                            </Button>
                                            :
                                            <Button style={{ textTransform: 'none', padding: '0' }} disabled>
                                                <Typography variant="h6">loading clan.. </Typography>
                                                <Badge badgeContent={0} color="secondary">
                                                    <Group color="primary" style={{ paddingLeft: '10' }} />
                                                </Badge>
                                            </Button>
                                        }
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* second row with list of user upload history */}
                    <Grid container direction={'row'} justify={'space-evenly'} item xs={12} sm={12} md={6} lg={6} xl={6} style={{ marginTop: '5vh' }}>
                        <Typography variant={'h6'} style={{ marginBottom: '30px' }}>uploads</Typography>
                        <Grid container direction={'column'} item xs={12} sm={12} md={12} lg={12} xl={12} style={{ height: '100%' }}>
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


