import React, { useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import '../sass/index.scss';
import { Header, Footer, localConstants, Loaders } from './';
import { makeStyles, GridList, Grid, Typography, CardActionArea } from '@material-ui/core';
import { clanActions } from '../store/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '80vw',
        height: 450,
        justifyContent: 'center'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

const MemberList = ({ history }) => {

    const RandomProfileImage = lazy(() => import('./utils/randomProfileImage'));
    const classes = useStyles();
    const { memberList, clan } = useSelector(state => state.clan);
    const dispatch = useDispatch();

    const handleClick = (tag) => {
        let viewPlayer = memberList.find(player => player.tag === tag)

        localStorage.removeItem(localConstants.VIEW_PLAYER);
        localStorage.setItem(localConstants.VIEW_PLAYER, JSON.stringify(viewPlayer));

        try {
            history.push('/viewPlayer');
        }
        catch (error) {
            alert(error);
        }
    }

    useEffect(() => {

        let clanTag = localStorage.getItem(localConstants.CLAN_TAG);
        dispatch(clanActions.getClan(clanTag));

    }, [dispatch])

    function GetCell(member, index) {

        return (
            <Grid container direction={"column"} justify={'space-between'} style={{ height: 'auto' }} item xs={12} sm={12} md={12} lg={12} xl={12}>

                <Suspense fallback={Loaders.MemberListLoader()}>
                    <Grid container direction={"row"}>
                        <CardActionArea onClick={() => handleClick(member.tag)}>
                            <Grid container justify={'center'} style={{ minHeight: '20vh' }}>
                                <RandomProfileImage />
                            </Grid>
                        </CardActionArea>
                    </Grid>
                </Suspense>


                <Grid container direction={"row"} justify={'center'}>
                    <Typography variant="h6">{member.name}</Typography>
                </Grid>

            </Grid>
        )
    }


    return (
        <Grid>
            <Header />

            <Grid className="list_container">

                <Grid className={classes.root}>
                    <Grid container direction={"row"} justify={"center"} style={{ marginBottom: '30px' }} item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography variant="h3">{clan && clan.name}</Typography>
                    </Grid>
                    <GridList cellHeight={'auto'} style={{ height: '50vh', width: '80%' }}>
                        <Grid container direction={'row'} item xs={12} sm={12} md={12} lg={12} xl={12}>
                            {memberList && memberList.map((member, index) => {
                                return (
                                    <Grid key={index} container direction={"column"} justify={"space-between"} style={{ marginBottom: '10px' }} item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        {GetCell(member, index)}
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </GridList>
                </Grid>
            </Grid>
            
            <Footer />
        </Grid>
    )
}

export default withRouter(MemberList);
