import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, IconButton, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import InfoIcon from "@material-ui/icons/Info";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const Hamburger = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <NavLink to="/profile" rel="noopener noreferrer"> Profile </NavLink>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <NavLink to="/" rel="noopener noreferrer"> Home </NavLink>
        </ListItem><ListItem>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <NavLink to="/upload" rel="noopener noreferrer"> Upload </NavLink>
        </ListItem>
      <Divider />
      <ListItem>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <NavLink to="/about" rel="noopener noreferrer"> About </NavLink>
        </ListItem><ListItem>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <NavLink to="/contact" rel="noopener noreferrer"> Contact </NavLink>
        </ListItem><ListItem>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <NavLink to="/terms" rel="noopener noreferrer"> Terms of Usage </NavLink>
        </ListItem>
      </List>
    </div>
  );


  return (
    <div>
      <div>
        {["left"].map(anchor => (
          <div key={anchor}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(anchor, true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Hamburger;