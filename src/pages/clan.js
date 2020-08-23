import React, { useEffect, useCallback } from 'react';
import { withRouter } from "react-router";
import '../sass/index.scss';
import { Header, Footer, localConstants } from '../components';
import { Button, Badge, Grid, Typography, LinearProgress } from '@material-ui/core';
import { Group } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { clanActions } from '../store/actions';

const Clan = ({ history }) => {

    const { clan, currentWar } = useSelector(state => state.clan);
    const dispatch = useDispatch();

    const handleListClick = useCallback(async event => {
        event.preventDefault();

        try {
            history.push('/memberList');
        } catch (error) {
            alert(error);
        }

    }, [history]);

    const handleWarClick = useCallback(async event => {
        event.preventDefault();

        try {
            history.push('/warList');
        } catch (error) {
            alert(error);
        }
    }, [history])

    useEffect(() => {

        let clanTag = localStorage.getItem(localConstants.CLAN_TAG);
        dispatch(clanActions.getClan(clanTag));
        dispatch(clanActions.getCurrentWar(clanTag));

    }, [dispatch])


    return (
        <Grid className="wrapper">

            <Header />

            <Grid className="content">

                <Grid className="clan_container">
                    <Grid className="clan_container__profile_row">

                        <Grid className="clan_container__clan_row__clan_box">

                            <Grid className="clan_container__clan_row__clan_picture">

                            </Grid>

                            <Grid className="clan_container__clan_row__clan_fields">

                                <Grid>
                                    {clan && clan.name ?
                                        <Typography variant="h6" className="clan_container__clan_row__clan_fields__name">
                                            {clan.name}
                                        </Typography>
                                        :
                                        <LinearProgress color="primary" />
                                    }
                                </Grid>

                                <Grid>
                                    {clan && clan.members ?
                                        <Grid>
                                            <Button style={{ textTransform: 'none', padding: '0' }}> <Typography onClick={handleListClick} variant="h6">Members</Typography></Button>
                                            <Badge badgeContent={clan.members} color="secondary">
                                                <Group color="primary" style={{ paddingLeft: '10' }} />
                                            </Badge>
                                        </Grid>
                                        :
                                        <LinearProgress color="primary" />
                                    }
                                </Grid>
                               
                                <Grid>
                                    {currentWar && currentWar.state ?
                                        <Grid>
                                            <Button style={{ textTransform: 'none', padding: '0' }} onClick={handleWarClick}>
                                                <Typography variant="h6">{currentWar.state}</Typography>
                                            </Button>
                                        </Grid>
                                        :
                                        <Grid>

                                            <Button style={{ textTransform: 'none', padding: '0' }} disabled>
                                                <Typography variant="h6">war status.. </Typography>
                                            </Button>
                                        </Grid>
                                    }
                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid className="clan_container__clan_row__edit_clan">
                            <Typography>edit clan</Typography>
                        </Grid>

                    </Grid>

                    <Grid className="clan_container__bio_row">
                        <Typography variant="h6">Description:</Typography>
                        {clan && clan.description ?
                            <Typography>{clan.description}</Typography>
                            :
                            <LinearProgress color="primary" />
                        }
                    </Grid>

                </Grid>

            </Grid>

            <Footer />

        </Grid>
    )
}

export default withRouter(Clan);

