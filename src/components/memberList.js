import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import '../sass/index.scss';
import { Header, Footer, localConstants } from './';
import { makeStyles, GridList, GridListTile, GridListTileBar, ListSubheader, IconButton, Grid } from '@material-ui/core';
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
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));



const MemberList = ({ history }) => {

    const classes = useStyles();
    const { memberList } = useSelector(state => state.clan);
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


    return (
        <Grid>
            <Header />

            <Grid className="list_container">

            <Grid className={classes.root}>
                    <GridList cellHeight={180} className={classes.gridList}>
                        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                            <ListSubheader component="div">Members</ListSubheader>
                        </GridListTile>
                        {memberList && memberList.map((member, index) => (
                            <GridListTile key={index}>
                            <img src={RandomProfileImage()} alt="profile" />;
                                <GridListTileBar
                                    title={member.name}
                                    subtitle={<span>tag: {member.tag}</span>}
                                    actionIcon={
                                        <IconButton aria-label={`info about ${member.name}`} className={classes.icon} onClick={() => handleClick(member.tag)}>
                                            <Info />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </Grid>

            </Grid>
            <Footer />
        </Grid>
    )
}

export default withRouter(MemberList);
