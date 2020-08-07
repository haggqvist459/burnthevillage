import React, { useState } from "react";
import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import HamburgerMenu from 'react-hamburger-menu';
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
  link: {
    textDecoration: "none",
    color: "#101820",
    fontWeight: "bold",
  },
  menuButton: {
    color: "white",
  },
});

const Hamburger = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false
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
            <AccountCircleIcon fontSize="large" color="primary" />
          </ListItemIcon>
          <Link to="/profile" rel="noopener noreferrer" className={classes.link}>
            <ListItemText>
              Profile
            </ListItemText>
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <HomeIcon fontSize="large" color="primary" />
          </ListItemIcon>
          <NavLink to="/" rel="noopener noreferrer" className={classes.link}>
            <ListItemText>
              Home
            </ListItemText>
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AddCircleIcon fontSize="large" color="primary" />
          </ListItemIcon>
          <NavLink to="/upload" rel="noopener noreferrer" className={classes.link}>
            <ListItemText>
              Upload
            </ListItemText>
          </NavLink>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <InfoIcon fontSize="large" color="primary" />
          </ListItemIcon>
          <NavLink to="/about" rel="noopener noreferrer" className={classes.link}>
            <ListItemText>
              About
            </ListItemText>
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InfoIcon fontSize="large" color="primary" />
          </ListItemIcon>
          <NavLink to="/contact" rel="noopener noreferrer" className={classes.link}>
            <ListItemText>
              Contact
            </ListItemText>
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InfoIcon fontSize="large" color="primary" />
          </ListItemIcon>
          <NavLink to="/terms" rel="noopener noreferrer" className={classes.link}>
            <ListItemText>
              Terms of Usage
          </ListItemText>
          </NavLink>
        </ListItem>
      </List>
    </div>
  );


  return (
    <div>
      <div>
        {["left"].map(anchor => (
          <div key={anchor}>
            {/* <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
              onClick={toggleDrawer(anchor, true)}
            >
              <MenuIcon style={{ fontSize: "3rem" }}/>
            </IconButton> */}

            <HamburgerMenu
                width={32}
                height={24}
                strokeWidth={3}
                rotate={0}
                color="white"
                borderRadius={0}
                menuClicked={toggleDrawer(anchor, true)}
              />
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