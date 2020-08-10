import React, { useState, useEffect, useCallback } from 'react';
import '../sass/pages/profile.scss';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { withRouter } from 'react-router';
import { PlayerByTag, ClanByTag, CurrentWar, LOCAL_PLAYER, LOCAL_CLAN } from '../cloudFunctions';
import CircularProgress from '@material-ui/core/CircularProgress';


const Profile = ({ history }) => {

    const [playerObject, setPlayerObject]= useState(JSON.parse(localStorage.getItem(LOCAL_PLAYER)));
    const [load, setLoad] = useState(false);

    const handleClanClick = useCallback(async event => {
        event.preventDefault();

        try {
            history.push('/clan');
        } catch (error) {
            alert(error);
        }

    }, [history]);

    useEffect(() => {

        const fetchClan = async () => {
            await ClanByTag();
            await CurrentWar();
        }

        if(!localStorage.getItem(LOCAL_CLAN)) {
            fetchClan().then(function () {
                if(!playerObject) {
                    setLoad(true);
                    const fetchPlayer = async () => {
                        await PlayerByTag().then(function () {
                            setPlayerObject(JSON.parse(localStorage.getItem(LOCAL_PLAYER)));
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
        <div>
            <Header />

            <div className="profile_container">
                <div className="profile_container__profile_row">

                    <div className="profile_container__profile_row__profile_box">

                        <div onClick={signOut} className="profile_container__profile_row__profile_picture">

                        </div>

                        <div className="profile_container__profile_row__profile_fields">

                        {load ?
                                <div>
                                <CircularProgress color="secondary" />
                                </div>
                                :
                                <div className="profile_container__profile_row__profile_fields__clan">
                                    {playerObject.name ? <div>{playerObject.name}</div> : null}
                                </div>
                            }

                        {load ?
                                <div>
                                <CircularProgress color="secondary" />
                                </div>
                                :
                                <div className="profile_container__profile_row__profile_fields__clan">
                                    {playerObject.clan ? <div onClick={handleClanClick}>{playerObject.clan.name}</div> : <div>no clan</div>}
                                </div>
                            }

                            <p className="profile_container__profile_row__profile_fields__upload_history">
                                Upload history
                                </p>
                        </div>

                    </div>

                    <div className="profile_container__profile_row__edit_profile">
                        <p>edit profile</p>
                    </div>

                </div>

                <div className="profile_container__bio_row">
                    <h3>Bio:</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget metus et elit tempus imperdiet.
                    Nunc facilisis cursus mi, vel consectetur dolor pretium ac.
                    Nulla pellentesque, elit id feugiat vestibulum, libero sem finibus sapien, in elementum augue lorem non eros.
                    Vestibulum dolor ex, semper hendrerit quam at, viverra efficitur est.</p>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default withRouter(Profile);

