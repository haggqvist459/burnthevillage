import React, { useState, useEffect, useCallback } from 'react';
import '../sass/pages/profile.scss';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import firebase from '../components/firebase/config';
import { withRouter } from 'react-router';


const Profile = ({ history }) => {

    const [playerTag, setPlayerTag] = useState("2L29QJY9");
    const [playerObject, setPlayerObject] = useState({});
    const [clanObject, setClanObject] = useState({});

    const handleClanClick = useCallback(async event => {
        event.preventDefault();

        try {
            history.push('/clan');
        } catch (error) {
            alert(error);
        }

    }, [history]);

    useEffect(() => {

        async function setPlayerData() {
            const player = await fetch('https://australia-southeast1-burnthevillage.cloudfunctions.net/playerByTag/', {
                method: "GET",
                headers: {
                    playerTag: playerTag,
                }
            })
            
            const response = await player.json();
            setPlayerObject(response);
            setClanObject(response.clan);
            var tag = response.clan.tag;
            var noBracketTag = tag.slice(1);
            localStorage.setItem('clanTag', noBracketTag);

            console.log(response);
        }

        try {
            setPlayerData();
        } catch (error) {
            console.log(error);
        }

    }, [playerTag]);


    const signOut = () => {
        firebase.auth().signOut()
    }

    return (
        <div>
            <Header />

            <div className="profile_container">
                <div className="profile_container__profile_row">

                    <div className="profile_container__profile_row__profile_box">

                        <div className="profile_container__profile_row__profile_picture">

                        </div>

                        <div className="profile_container__profile_row__profile_fields">
                            <p className="profile_container__profile_row__profile_fields__name">
                                {playerObject.name ? playerObject.name : "loading.. "}
                            </p>
                            <p className="profile_container__profile_row__profile_fields__clan" onClick={handleClanClick}>

                                {clanObject.name ? clanObject.name : "loading.. "}


                            </p>
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

