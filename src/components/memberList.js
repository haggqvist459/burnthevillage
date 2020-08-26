import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import '../sass/index.scss';
import { Header, Footer, local_constants } from './';
import { makeStyles, GridList, GridListTile, GridListTileBar, ListSubheader, IconButton } from '@material-ui/core';
import { Info } from '@material-ui/icons';



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
        setList(JSON.parse(localStorage.getItem(local_constants.LOCAL_CLAN_MEMBERS)))

    }, [])

    const handleClick = (tag) => {
        let viewPlayer = list.find(player => player.tag === tag)
        localStorage.removeItem(local_constants.VIEW_PLAYER);
        localStorage.setItem(local_constants.VIEW_PLAYER, JSON.stringify(viewPlayer));

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
                                            <Info />
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
