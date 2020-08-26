import React, { useState, useEffect } from 'react'
import { Grid, Typography, CardActionArea, CardMedia, GridList } from '@material-ui/core'
import { StarBorder, StarRate } from '@material-ui/icons';
import { withRouter } from 'react-router';
import '../sass/index.scss';
import baseImage from '../assets/images/upbackground.png';
import { Header, Footer, local_constants, WarClock } from './';
import moment from 'moment';

function WarList({ history }) {

    const [currentWar, setCurrentWar] = useState();
    const [prepare, setPrepare] = useState('preparation');

    useEffect(() => {
        setCurrentWar(JSON.parse(localStorage.getItem(local_constants.LOCAL_CURRENT_WAR)));
    }, [prepare])

    const handleImageClick = (props) => (event) => {
        console.log('image clicked');
        console.log('currentWar: ' + currentWar.clan.name);
    }

    function togglePrepare() {

        if (prepare === 'preparation') {
            setPrepare('war');
            console.log('toggle prepare: ' + prepare)
        }
        else {
            setPrepare('preparation');
            console.log('toggle prepare: ' + prepare)
            console.log(moment(currentWar.endTime).format('MM-DD-YYYY'));
        }

    }

    return (

        <Grid>
            <Header />

            <Grid container direction={"column"} alignContent={"center"} style={{ marginTop: '15vh', marginBottom: '5vh' }}>

                {/* war name & clock */}
                <Grid container direction={"row"} justify={"space-around"} style={{ marginBottom: '40px', marginTop: '40px' }} item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid><Typography variant="h4" onClick={togglePrepare}>[war name]</Typography></Grid>

                    {currentWar ?
                        <Grid container direction={"column"} justify={"center"} alignContent={"center"}>
                            <Grid container direction={"row"} justify={"center"}>
                                <Typography>preparations started: {moment(currentWar.preparationStartTime).format('DD-MM-YYYY')}</Typography>
                            </Grid>

                            <Grid container direction={"row"} justify={"center"}>

                                <WarClock startTime={moment(currentWar.endTime).format('MM-DD-YYYY')} />
                            </Grid>
                        </Grid>
                        :
                        null
                    }

                </Grid>

                {/* clan info */}
                <Grid container className="col_info_row" item xs={12} sm={12} md={12} lg={12} xl={12}>

                    <Grid style={{ marginBottom: '20px' }} item xs={12} sm={8} md={4} lg={4} xl={4}>
                        <Grid container direction={"row"} justify={"center"}>
                            {currentWar ? <Typography variant="h6">{currentWar.clan.name} - lvl {currentWar.clan.clanLevel}</Typography> : <Typography>loading...</Typography>}
                        </Grid>
                        <Grid container direction={"row"} justify={"center"}>
                            {currentWar ? <Typography> attacks: {currentWar.clan.attacks} | stars: {currentWar.clan.stars} | percentage: {currentWar.clan.destructionPercentage}</Typography> : <Typography>loading...</Typography>}
                        </Grid>
                    </Grid>

                    <Grid className="hidden_container" container justify={"center"} item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Grid container direction={"row"} justify={"center"}></Grid>
                        <Grid className="dark fire">
                            <p className="Blazing">VS</p>
                        </Grid>
                    </Grid>

                    <Grid style={{ marginBottom: '20px' }} item xs={12} sm={8} md={4} lg={4} xl={4}>
                        <Grid container direction={"row"} justify={"center"}>
                            {currentWar ? <Typography variant="h6">{currentWar.opponent.name} - lvl {currentWar.opponent.clanLevel}</Typography> : <Typography>loading...</Typography>}
                        </Grid>
                        <Grid container direction={"row"} justify={"center"}>
                            {currentWar ? <Typography> attacks: {currentWar.opponent.attacks} | stars: {currentWar.opponent.stars} | percentage: {currentWar.opponent.destructionPercentage}</Typography> : <Typography>loading...</Typography>}
                        </Grid>
                    </Grid>

                </Grid>

                {/* member lists */}
                <Grid container direction={"row"} justify="space-around" style={{ margin: 'auto' }} item xs={12} sm={12} md={12} lg={12} xl={12}>

                    <Grid container direction={"column"} justify={"flex-start"} item xs={6} sm={5} md={5} lg={5} xl={5}>
                        {currentWar ?
                            <Grid container direction={"column"}>
                                <GridList cellHeight={'auto'} style={{ height: '70vh', width: '100%' }} cols={1}>

                                    {currentWar.clan.members.map((item, index) => (

                                        <Grid container direction={"row"} key={index} className="row_to_col">

                                            <Grid container direction={"column"} style={{ padding: "5px" }} item xs={12} sm={12} md={6} lg={8} xl={8}>
                                                <CardActionArea onClick={handleImageClick()}>
                                                    <CardMedia
                                                        component="img"
                                                        alt="base img"
                                                        image={baseImage}
                                                        title="base image"
                                                    />
                                                </CardActionArea>
                                            </Grid>

                                            {prepare === "preparation" ?
                                                null
                                                :
                                                <Grid container direction={"column"} style={{ padding: "5px" }} justify={"space-between"} alignContent={'center'} item xs={11} sm={11} md={5} lg={3} xl={3}>

                                                    <Grid container direction={"row"}>
                                                        <Grid container direction={"row"}>
                                                            <Typography>Attack 1: </Typography>
                                                            <StarRate /><StarBorder /><StarBorder />
                                                        </Grid>
                                                        <Grid container direction={"row"}>
                                                            <Typography>[opponent name]</Typography>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container direction={"row"}>
                                                        <Grid container direction={"row"}>
                                                            <Typography>Attack 2: </Typography>
                                                            <StarRate /><StarRate /><StarRate />
                                                        </Grid>
                                                        <Grid container direction={"row"}>
                                                            <Typography>[opponent name]</Typography>
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                            }

                                            <Grid container direction={"row"} style={{ padding: "5px" }} item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Typography variant="h6">{item.name}</Typography>
                                            </Grid>

                                        </Grid>

                                    ))}

                                </GridList>
                            </Grid>
                            :
                            <Typography>loading members..</Typography>
                        }

                    </Grid>

                    <Grid container direction={"column"} justify={"flex-end"} item xs={6} sm={5} md={5} lg={5} xl={5}>
                        {currentWar ?
                            <Grid container direction={"column"}>
                                <GridList cellHeight={'auto'} style={{ height: '70vh', width: '100%' }} cols={1}>

                                    {currentWar.opponent.members.map((item, index) => (

                                        <Grid container key={index} className='rev_to_col'>

                                            <Grid container direction={"column"} style={{ padding: "5px" }} item xs={12} sm={12} md={6} lg={8} xl={8}>
                                                <CardActionArea onClick={handleImageClick()}>
                                                    <CardMedia
                                                        component="img"
                                                        alt="base img"
                                                        image={baseImage}
                                                        title="base image"
                                                    />
                                                </CardActionArea>
                                            </Grid>

                                            {prepare === "preparation" ?
                                                null
                                                :
                                                <Grid container direction="column" justify={"space-between"} item xs={12} sm={12} md={5} lg={3} xl={3}>

                                                    <Grid container direction={"row"}>
                                                        <Grid container direction={"row"} justify={"flex-end"}>
                                                            <Typography>Attack 1: </Typography>
                                                            <StarRate /><StarBorder /><StarBorder />
                                                        </Grid>
                                                        <Grid container direction={"row"} justify={"flex-end"}>
                                                            <Typography>[opponent name]</Typography>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container direction={"row"}>
                                                        <Grid container direction={"row"} justify={"flex-end"}>
                                                            <Typography>Attack 2: </Typography>
                                                            <StarRate /><StarRate /><StarRate />
                                                        </Grid>
                                                        <Grid container direction={"row"} justify={"flex-end"}>
                                                            <Typography>[opponent name]</Typography>
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                            }

                                            <Grid container direction={"row-reverse"} style={{ padding: "5px" }} item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Typography variant="h6">{item.name}</Typography>
                                            </Grid>


                                        </Grid>

                                    ))}

                                </GridList>
                            </Grid>
                            :
                            <Typography>loading members..</Typography>
                        }
                    </Grid>

                </Grid>

            </Grid>

            <Footer />
        </Grid>
    )
}


export default withRouter(WarList);