import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import '../sass/index.scss';
import { Header, Footer, local_constants } from './';



const ViewPlayer = ({ history }) => {

    const [player, setPlayer] = useState(JSON.parse(localStorage.getItem(local_constants.VIEW_PLAYER)));

    useEffect(() => {
        setPlayer(JSON.parse(localStorage.getItem(local_constants.VIEW_PLAYER)));
    }, []);

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
                                {player.name}
                            </p>
                            <p className="profile_container__profile_row__profile_fields__clan">
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

