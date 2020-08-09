import React, { useState, useEffect, useCallback } from 'react';
import GroupIcon from '@material-ui/icons/Group';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { withRouter } from "react-router";
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import '../sass/components/memberList.scss'

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { LOCAL_CLAN_MEMBERS, VIEW_PLAYER } from '../cloudFunctions';


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

    const [list, setList] = useState([]);
    const classes = useStyles();

    useEffect(() => {

        console.log('memberList from localStorage');
        setList(JSON.parse(localStorage.getItem(LOCAL_CLAN_MEMBERS)))
        console.log(list);

    }, [])

    const handleClick = (tag) => {
        let viewPlayer = list.find(player => player.tag === tag)
        localStorage.removeItem(VIEW_PLAYER);
        localStorage.setItem(VIEW_PLAYER, JSON.stringify(viewPlayer));

        try {
            history.push('/viewPlayer');
        }
        catch (error) {
            alert(error);
        }
    }

   

    return (
        <div>
            <Header />


            <div className="list_container">

                <div className={classes.root}>
                    <GridList cellHeight={180} className={classes.gridList}>
                        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                            <ListSubheader component="div">Members</ListSubheader>
                        </GridListTile>
                        {list.map((member, index) => (
                            <GridListTile key={index}>
                                {/* <img src={tile.img} alt={tile.title} /> */}
                                <GridListTileBar
                                    title={member.name}
                                    subtitle={<span>tag: {member.tag}</span>}
                                    actionIcon={
                                        <IconButton aria-label={`info about ${member.name}`} className={classes.icon} onClick={() => handleClick(member.tag)}>
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default withRouter(MemberList);
