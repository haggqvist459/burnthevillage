import React, { useState, useEffect } from 'react';
import '../sass/pages/profile.scss';
import Header from './header/header';
import Footer from './footer/footer';
import { withRouter } from 'react-router';


const ViewPlayer = ({ history }) => {

    const [playerTag, setPlayerTag] = useState();
    const [playerObject, setPlayerObject] = useState({});

    useEffect(() => {

        setPlayerTag(JSON.parse('viewPlayer'));

        async function setPlayerData() {
            const player = await fetch('https://australia-southeast1-burnthevillage.cloudfunctions.net/playerByTag/', {
                method: "GET",
                headers: {
                    playerTag: playerTag,
                }
            })
            
            const response = await player.json();
            setPlayerObject(response);

            console.log(response);
        }

        try {
            setPlayerData();
        } catch (error) {
            console.log(error);
        }

    }, [playerTag]);

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
                            <p className="profile_container__profile_row__profile_fields__clan">

                                {playerObject.clan.name ? playerObject.clan.name : "loading.. "}


                            </p>
                        </div>

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

export default withRouter(ViewPlayer);

