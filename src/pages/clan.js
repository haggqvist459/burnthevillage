import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from "react-router";
import '../sass/index.scss';
import { Header, Footer, ClanByTag, CurrentWar, local_constants } from '../components';
import { IconButton, CircularProgress, Badge } from '@material-ui/core';
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


    useEffect(() => {

        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 100);

        const fetchData = async () => {

            await ClanByTag().then(() => {
                setClanObject(JSON.parse(localStorage.getItem(local_constants.constants.LOCAL_CLAN)));
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
            setLoad(false);
        }

        return () => {
            clearInterval(timer);
        };

    }, [])


    return (
        <div>
            <Header />

            <div className="clan_container">
                <div className="clan_container__profile_row">

                    <div className="clan_container__clan_row__clan_box">

                        <div className="clan_container__clan_row__clan_picture">

                        </div>

                        <div className="clan_container__clan_row__clan_fields">

                            <div>
                                {load ?
                                    <CircularProgress id="loader" variant="static" value={progress} />
                                    :
                                    <p className="clan_container__clan_row__clan_fields__name">
                                        {clanObject.name}
                                    </p>}
                            </div>

                            <div>
                                {load ?
                                    <CircularProgress id="loader" variant="static" value={progress} />
                                    :
                                    <IconButton onClick={handleListClick} >
                                        Members
                                        <Badge badgeContent={clanObject.members} color="secondary">
                                            <Group color="primary" />
                                        </Badge>
                                    </IconButton>}
                            </div>
                            <div>
                                {load ?
                                    <CircularProgress id="loader" variant="static" value={progress} />
                                    :
                                    <div>
                                        {currentWar ? <div>not in war</div> : <p>wars, not yet implemented</p>}
                                    </div>
                                }

                            </div>

                        </div>

                    </div>

                    <div className="clan_container__clan_row__edit_clan">
                        <p>edit clan</p>
                    </div>

                </div>

                <div className="clan_container__bio_row">
                    <h3>Description:</h3>
                    {load ?
                        <CircularProgress id="loader" variant="static" value={progress} />
                        :
                        <p>{clanObject.description}</p>}
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default withRouter(Clan);

