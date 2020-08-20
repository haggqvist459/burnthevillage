import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from "react-router";
import '../sass/index.scss';
import { Header, Footer, ClanByTag, CurrentWar, local_constants } from '../components';
import { Button, CircularProgress, Badge, Grid, Typography } from '@material-ui/core';
import { Group } from '@material-ui/icons';

const Clan = ({ history }) => {

    const [clanObject, setClanObject] = useState();
    const [currentWar, setCurrentWar] = useState();
    const [load, setLoad] = useState(true);
    const [progress, setProgress] = useState(0);

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

        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 100);

        const fetchData = async () => {

            await ClanByTag().then(() => {
                setClanObject(JSON.parse(localStorage.getItem(local_constants.LOCAL_CLAN)));
            });

            await CurrentWar().then(() => {
                setCurrentWar(JSON.parse(localStorage.getItem(local_constants.LOCAL_CURRENT_WAR)));
            });
        };

        if (!localStorage.getItem(local_constants.LOCAL_CLAN)) {
            fetchData().then(() => {
                setLoad(false);
            }).catch(function (error) {
                console.log(error);
            });
        }
        else {
            setClanObject(JSON.parse(localStorage.getItem(local_constants.LOCAL_CLAN)));
            setCurrentWar(JSON.parse(localStorage.getItem(local_constants.LOCAL_CURRENT_WAR)));
            setLoad(false);
        }

        return () => {
            clearInterval(timer);
        };

    }, [])


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
                                    {load ?
                                        <CircularProgress id="loader" variant="static" value={progress} />
                                        :
                                        <Typography variant="h6" className="clan_container__clan_row__clan_fields__name">
                                            {clanObject.name}
                                        </Typography>}
                                </Grid>

                                <Grid>
                                    {load ?
                                        <CircularProgress id="loader" variant="static" value={progress} />
                                        :
                                        <Grid>
                                        <Button style={{ textTransform: 'none', padding: '0'}}> <Typography onClick={handleListClick} variant="h6">Members</Typography></Button>
                                            <Badge badgeContent={clanObject.members} color="secondary">
                                                <Group color="primary" style={{paddingLeft: '10'}}/>
                                            </Badge>
                                        </Grid>
                                    }
                                </Grid>
                                <Grid>
                                    {load ?
                                        <CircularProgress id="loader" variant="static" value={progress} />
                                        :
                                        <Grid>
                                            {currentWar.state === 'preparation' ? 
                                            <Button style={{ textTransform: 'none', padding: '0'}} onClick={handleWarClick}><Typography variant="h6">Current war</Typography></Button>
                                            : 
                                            <Typography variant="h6">not in war</Typography> 
                                            }
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
                        {load ?
                            <CircularProgress id="loader" variant="static" value={progress} />
                            :
                            <Typography>{clanObject.description}</Typography>}
                    </Grid>

                </Grid>

            </Grid>

            <Footer />

        </Grid>
    )
}

export default withRouter(Clan);

