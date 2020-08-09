import React, { useState, useEffect, useCallback } from 'react';
import '../sass/pages/clanpage.scss';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { withRouter } from "react-router";
import { ClanByTag, CurrentWar, LOCAL_CLAN, LOCAL_CLAN_MEMBERS, LOCAL_CURRENT_WAR } from '../cloudFunctions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IconButton } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import Badge from '@material-ui/core/Badge';

const ClanPage = ({ history }) => {

    const [clanObject, setClanObject] = useState();
    const [currentWar, setCurrentWar] = useState();
    const [loadClan, setLoadClan] = useState(true);
    const [loadWar, setLoadWar] = useState(true);
    const [progress, setProgress] = useState(0);
    const [noWar, setNoWar] = useState(true);

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
                setClanObject(JSON.parse(localStorage.getItem(LOCAL_CLAN)));
            }).then(() => {
                // setClanMembers(JSON.parse(localStorage.getItem(LOCAL_CLAN_MEMBERS)));
                setLoadClan(false);
            });

            await CurrentWar().then(() => {
                setCurrentWar(JSON.parse(localStorage.getItem(LOCAL_CURRENT_WAR)));

            }).then(() => {

                setLoadWar(false);
            })
        };

        if (loadWar) {
            fetchData();
        }

        return () => {
            clearInterval(timer);
        };

    }, [loadWar])


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
                                {loadClan ?
                                    <CircularProgress id="loader" variant="static" value={progress} />
                                    :
                                    <p className="clan_container__clan_row__clan_fields__name">
                                        {clanObject.name}
                                    </p>}
                            </div>

                            <div>
                                {loadClan ?
                                    <CircularProgress id="loader" variant="static" value={progress} />
                                    :
                                    <IconButton onClick={handleListClick} >
                                    Members
                                        <Badge badgeContent={clanObject.members} color="secondary">
                                            <GroupIcon color="primary" />
                                        </Badge>
                                    </IconButton>}
                            </div>
                            <div>
                                {loadWar ?
                                    <CircularProgress id="loader" variant="static" value={progress} />
                                    :
                                    <div>
                                        <p>wars, not yet implemented</p>
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
                    {loadClan ?
                        <CircularProgress id="loader" variant="static" value={progress} />
                        :
                        <p>{clanObject.description}</p>}
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default withRouter(ClanPage);

