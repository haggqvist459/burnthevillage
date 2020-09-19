import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import '../sass/index.scss';
import { Header, Footer, localConstants } from './';
import { Grid, Typography } from '@material-ui/core'



const ViewPlayer = ({ history }) => {

    const [player, setPlayer] = useState(JSON.parse(localStorage.getItem(localConstants.VIEW_PLAYER)));

    useEffect(() => {
        setPlayer(JSON.parse(localStorage.getItem(localConstants.VIEW_PLAYER)));
    }, []);

    return (
        <Grid className="wrapper">

            <Header />

            <Grid className="content">

                <Grid className="profile_container">
                    <Grid className="profile_container__profile_row">

                        <Grid className="profile_container__profile_row__profile_box">

                            <Grid className="profile_container__profile_row__profile_picture">

                            </Grid>

                            <Grid className="profile_container__profile_row__profile_fields">
                                <Typography className="profile_container__profile_row__profile_fields__name">
                                    {player.name}
                                </Typography>
                                <Typography className="profile_container__profile_row__profile_fields__clan">
                                </Typography>
                            </Grid>

                        </Grid>

                    </Grid>

                    <Grid className="profile_container__bio_row">
                        <Typography variant="h3">Bio:</Typography>
                        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget metus et elit tempus imperdiet.
                        Nunc facilisis cursus mi, vel consectetur dolor pretium ac.
                        Nulla pellentesque, elit id feugiat vestibulum, libero sem finibus sapien, in elementum augue lorem non eros.
                    Vestibulum dolor ex, semper hendrerit quam at, viverra efficitur est.</Typography>
                    </Grid>

                </Grid>

            </Grid>
            
            <Footer />

        </Grid>
    )
}

export default withRouter(ViewPlayer);

