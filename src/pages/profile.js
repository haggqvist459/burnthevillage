import React, { useState, useEffect, useCallback } from 'react';
import '../sass/pages/profile.scss';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { withRouter } from 'react-router';
import { PlayerByTag, LOCAL_PLAYER } from '../cloudFunctions';
import CircularProgress from '@material-ui/core/CircularProgress';


const Profile = ({ history }) => {

    const [playerObject, setPlayerObject] = useState({});
    const [load, setLoad] = useState(true);
    const [progress, setProgress] = useState(0);

    const handleClanClick = useCallback(async event => {
        event.preventDefault();

        try {
            history.push('/clan');
        } catch (error) {
            alert(error);
        }

    }, [history]);

    useEffect(() => {

        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 100);

        const fetchData = async () => {
            await PlayerByTag().then(() => {
                setPlayerObject(JSON.parse(localStorage.getItem(LOCAL_PLAYER)));
            }).then(() => {
                setLoad(false);
            });
        };

        if (load) {
            fetchData();
        }

        return () => {
            clearInterval(timer);
        };

    }, [load])

    return (
        <div>
            <Header />

            <div className="profile_container">
                <div className="profile_container__profile_row">

                    <div className="profile_container__profile_row__profile_box">

                        <div className="profile_container__profile_row__profile_picture">

                        </div>

                        <div className="profile_container__profile_row__profile_fields">

                            {load ?
                                <div>
                                    <CircularProgress id="loader" variant="static" value={progress} />
                                </div>
                                :
                                <div className="profile_container__profile_row__profile_fields__clan" onClick={handleClanClick}>
                                    {playerObject.name}
                                </div>
                            }


                            {load ?
                                <div>
                                    <CircularProgress id="loader" variant="static" value={progress} />
                                </div>
                                :
                                <div className="profile_container__profile_row__profile_fields__clan" onClick={handleClanClick}>
                                    {playerObject.clan.name}
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

