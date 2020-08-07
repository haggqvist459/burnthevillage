import React, { useState, useEffect, useCallback } from 'react';
import GroupIcon from '@material-ui/icons/Group';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { withRouter } from "react-router";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';


function MemberList(props) {

    const [empty, setEmpty] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {

        console.log('memberList localstorage clan');
        console.log(props.list);

        if (props.list) {
            setEmpty(false);
        }

    }, [props.list])

    

    const handleMemberClick = useCallback(async event => {
        
        localStorage.setItem('viewPlayerTag', event.target.value);
        console.log('event tag ' + event.target.value);

        try {
            props.history.push('/viewPlayer');
        }
        catch (error) {
            alert(error);
        }

    }, [props.history]);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            {empty ?
                <div>
                    <p>No members yet</p>
                </div>
                :
                <List>
                    <ListItem button onClick={handleClick}>
                        <ListItemText primary="Members" />
                        <ListItemIcon>
                            <Badge badgeContent={props.list.length} color="secondary">
                                <GroupIcon color="primary" />
                            </Badge>
                        </ListItemIcon>
                    </ListItem>
                    <Divider />
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {props.list.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <ListItem button onClick={() => handleMemberClick(item.tag)}>
                                            <ListItemText primary={item.name} />
                                            <ListItemIcon>
                                                <NavigateNextIcon />
                                            </ListItemIcon>
                                        </ListItem>
                                        <Divider />
                                    </div>
                                )
                            })}
                        </List>
                    </Collapse>
                </List>
            }
        </div>
    )
}

export default withRouter(MemberList);
