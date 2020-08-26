import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import '../sass/index.scss';
import { Header, Footer, localConstants } from './';
import { makeStyles, GridList, GridListTile, GridListTileBar, IconButton, Grid, Typography, CardMedia, CardActionArea } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { clanActions } from '../store/actions';
import { RandomProfileImage } from './utils/randomProfileImage'

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

    function GetCol(member, index) {

        return (
            <Grid container direction={"row"} justify={"space-between"} >

                <Grid container direction={"column"} item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <CardActionArea onClick={() => handleClick(member.tag)}>
                        <CardMedia
                            component="img"
                            alt="base img"
                            image={RandomProfileImage()}
                            title="profile"
                        />
                    </CardActionArea>
                </Grid>

                <Grid container direction={"column"} justify={'center'} item xs={7} sm={7} md={7} lg={7} xl={7}>
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
                    <GridList cellHeight={'auto'} style={{ height: '50vh', width: '80%' }} cols={2}>
                        {memberList && memberList.map((member, index) => (
                            <Grid key={index} container direction={"column"} justify={"space-between"} style={{ marginBottom: '10px' }} item xs={12} sm={12} md={6} lg={6} xl={6}>
                                {GetCol(member, index)}
                            </Grid>
                        ))}
                    </GridList>
                </Grid>

            </Grid>
            <Footer />
        </Grid>
    )
}

export default withRouter(MemberList);
