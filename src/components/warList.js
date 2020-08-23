import React, { useEffect } from 'react'
import { Grid, Typography, CardActionArea, CardMedia, GridList, CircularProgress } from '@material-ui/core'
import { withRouter } from 'react-router';
import '../sass/index.scss';
import baseImage from '../assets/images/upbackground.png';
import { Header, Footer, WarClock, localConstants } from './';
import { clanActions } from '../store/actions';
import { Rating } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux';

function WarList({ history }) {

    const { currentWar } = useSelector(state => state.clan);
    const dispatch = useDispatch();

    const handleImageClick = (props) => (event) => {
        console.log('image clicked');
        console.log('currentWar: ' + currentWar.clan.name);
    }

    useEffect(() => {

        let clanTag = localStorage.getItem(localConstants.CLAN_TAG);
        dispatch(clanActions.getCurrentWar(clanTag));

    }, [dispatch])

    function WarName() {
        return (
            <Grid container direction={"row"} justify={"space-around"} style={{ marginBottom: '40px', marginTop: '40px' }} item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid>
                    <Typography variant="h4">[war name]</Typography>
                </Grid>

                {currentWar && currentWar.state ?
                    <Grid container direction={"column"} justify={"center"} alignContent={"center"}>
                        <Grid container direction={"row"} justify={"center"}>
                            <Typography>war clock:</Typography>
                        </Grid>
                    </Grid>
                    :
                    null
                }
            </Grid>
        )
    }

    function ClanInfo() {
        return (
            <Grid container className="col_info_row" justify="space-around" item xs={12} sm={12} md={12} lg={12} xl={12}>

                <Grid style={{ marginTop: '20px' }} item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Grid container direction={"row"} justify={"center"}>
                        {currentWar && currentWar.clan.name ?
                            <Typography variant="h6">{currentWar.clan.name} - lvl {currentWar.clan.clanLevel}</Typography>
                            :
                            <Typography>loading...</Typography>}
                    </Grid>
                    <Grid container direction={"row"} justify={"center"}>
                        {currentWar && currentWar.clan.attacks ?
                            <Typography>
                                attacks: {currentWar.clan.attacks} |
                            stars: {currentWar.clan.stars} |
                            percentage: {currentWar.clan.destructionPercentage}
                            </Typography>
                            :
                            <Typography>no attacks</Typography>}
                    </Grid>
                </Grid>

                <Grid style={{margin: '20px'}} className="hidden_container" container justify={"center"} item xs={2} sm={2} md={2} lg={2} xl={2}>
                    <Grid container direction={"row"} justify={"center"}></Grid>
                    <Grid className="dark fire">
                        <p className="Blazing">VS</p>
                    </Grid>
                </Grid>

                <Grid style={{ marginBottom: '20px' }} item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Grid container direction={"row"} justify={"center"}>
                        {currentWar && currentWar.opponent.name ?
                            <Typography variant="h6">{currentWar.opponent.name} - lvl {currentWar.opponent.clanLevel}</Typography>
                            :
                            <Typography>loading...</Typography>}
                    </Grid>
                    <Grid container direction={"row"} justify={"center"}>
                        {currentWar && currentWar.opponent.attacks ?
                            <Typography> attacks: {currentWar.opponent.attacks} | stars: {currentWar.opponent.stars} | percentage: {currentWar.opponent.destructionPercentage}</Typography>
                            :
                            <Typography>no attacks</Typography>}
                    </Grid>
                </Grid>

            </Grid>
        )
    }

    function MemberList() {

        let list = [];


        function getName(tag, clan) {
            let findPlayer = null;

            if (clan === 'opponent') {
                findPlayer = currentWar.opponent.members.find(player => player.tag === tag);
            }
            else {
                findPlayer = currentWar.clan.members.find(player => player.tag === tag);
            }

            console.log('name found: ' + findPlayer.name);
            return (findPlayer.name);
        }

        if (currentWar.clan.members > currentWar.opponent.members) {
            list = currentWar.clan.members;
        }
        else {
            list = currentWar.opponent.members;
        }

        function getRow(item, index) {
            return (
                <Grid container direction={"row"} justify={"space-around"} style={{ margin: 'auto' }} item xs={12} sm={12} md={12} lg={12} xl={12}>

                    {currentWar.clan.members[index] ?
                        <Grid container direction={"column"} item xs={5} sm={5} md={5} lg={5} xl={5}>

                            <Grid container direction={"row"}>

                                <Grid container direction={"row"} item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography variant="h6">{currentWar.clan.members[index].name}</Typography>
                                </Grid>

                                <Grid style={{ paddingRight: '10px' }} container direction={"column"} item xs={12} sm={12} md={12} lg={8} xl={8}>
                                    <CardActionArea onClick={handleImageClick()}>
                                        <CardMedia
                                            component="img"
                                            alt="base img"
                                            image={baseImage}
                                            title="base image"
                                        />
                                    </CardActionArea>
                                </Grid>

                                <Grid container direction={"column"} item xs={12} sm={12} md={12} lg={4} xl={4}>
                                    {currentWar.clan.members[index].attacks ?
                                        <Grid>
                                            <Grid container direction={"row"} item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Typography>Attacks: </Typography>
                                            </Grid>
                                            {currentWar.clan.members[index].attacks.map((attack, index) => {
                                                return (
                                                    <Grid key={index} container direction={"column"} item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                        <Typography>{getName(attack.defenderTag, 'opponent')}:</Typography>
                                                        <Rating value={attack.stars} max={3} readOnly />
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                        :
                                        <Grid container direction={"row"} item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Typography>no attacks yet</Typography>
                                        </Grid>
                                    }

                                </Grid>

                            </Grid>

                        </Grid>
                        :
                        null
                    }

                    {currentWar.opponent.members[index] ?
                        <Grid container direction={"column"} item xs={5} sm={5} md={5} lg={5} xl={5}>

                            <Grid container direction={"row-reverse"} >

                                <Grid container direction={"row"} justify={"flex-end"} item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography variant="h6">{currentWar.opponent.members[index].name}</Typography>
                                </Grid>

                                <Grid style={{ paddingLeft: '10px' }} container direction={"column"} item xs={12} sm={12} md={12} lg={8} xl={8}>
                                    <CardActionArea onClick={handleImageClick()}>
                                        <CardMedia
                                            component="img"
                                            alt="base img"
                                            image={baseImage}
                                            title="base image"
                                        />
                                    </CardActionArea>
                                </Grid>

                                <Grid container direction={"column"} item xs={12} sm={12} md={12} lg={4} xl={4}>
                                    {currentWar.opponent.members[index].attacks ?
                                        <Grid>
                                            <Grid container direction={"row"} justify={"flex-end"} item xs={12} sm={12} md={12} lg={12} xl={12}><Typography>Attacks: </Typography></Grid>
                                            {item.attacks.map((attack, index) => {
                                                return (
                                                    <Grid key={index} container direction={"row"} justify={"flex-end"} item xs={12} sm={12} md={6} lg={12} xl={12}>
                                                        <Typography>{getName(attack.defenderTag, 'clan')}:</Typography>
                                                        <Rating value={attack.stars} max={3} readOnly />
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                        :
                                        <Grid container direction={"row"} justify={"flex-end"} item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Typography>no attacks yet</Typography>
                                        </Grid>
                                    }

                                </Grid>

                            </Grid>
                        </Grid>
                        :
                        null
                    }

                </Grid>
            )

        }


        return (
            <Grid item xs={10} sm={10} md={10} lg={10} xl={10} container direction={"column"} justify={"center"}>

                <ClanInfo />

                <GridList cellHeight={'auto'} style={{ height: '50vh', width: '100%' }} cols={1}>
                    {list.map((item, index) => {
                        return (
                            <Grid key={index} style={{ paddingBottom: '4vmin' }}>
                                {getRow(item, index)}
                            </Grid>
                        )
                    })}
                </GridList>

            </Grid>
        )
    }

    return (

        <Grid>
            <Header />

            <Grid container direction={"column"} alignContent={"center"} style={{ marginTop: '15vh', marginBottom: '5vh' }}>

                {/* war name & clock */}
                <WarName />

                {/* member list */}
                <Grid container direction={"column"} alignContent={"center"}>
                    {currentWar ?
                        <MemberList />
                        :
                        <CircularProgress color="secondary" />
                    }
                </Grid>
            </Grid>

            <Footer />
        </Grid>
    )
}


export default withRouter(WarList);