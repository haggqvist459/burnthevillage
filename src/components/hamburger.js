import React, { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';
import clsx from 'clsx';
import { AuthContext } from './';
import { List, Divider, ListItem, ListItemIcon, ListItemText, Menu, withStyles, makeStyles } from '@material-ui/core'
import { Info, AccountCircle, Home, AddCircle } from '@material-ui/icons';

const useStyles = makeStyles({
  // list: {
  //   width: 250,
  // },
  // fullList: {
  //   width: 'auto',
  // },
  link: {
    textDecoration: "none",
    color: "#101820",
    fontWeight: "bold",
  },
  menuButton: {
    color: "white",
  },
  drawer: {
    height: "calc(100% - 15vh",
    top: "15vh",
  },

});

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #101820',
    marginTop: "5px",
    // backgroundColor: "transparent",
  },
})((props) => (
  <Menu
    elevation={5}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const Hamburger = () => {
  const classes = useStyles();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  
  const [state, setState] = useState({
    left: false
  });
  const { currentUser } = useContext(AuthContext);
  //drawer stuff, not in use
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };


  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if(hamburgerOpen){
      setHamburgerOpen(false)
    } else {
      setHamburgerOpen(true)
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    if(hamburgerOpen){
      setHamburgerOpen(false)
    } else {
      setHamburgerOpen(true)
    }
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
            <AccountCircle fontSize="large" color="primary" />
          </ListItemIcon>
          {currentUser ? 
            <Link to="/profile" rel="noopener noreferrer" className={classes.link}>
            <ListItemText>
              Profile
            </ListItemText>
          </Link>
          :
          <Link to="/signin" rel="noopener noreferrer" className={classes.link}>
            <ListItemText>
              Sign In
            </ListItemText>
          </Link>}

        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <Home fontSize="large" color="primary" />
          </ListItemIcon>
          <NavLink to="/" rel="noopener noreferrer" className={classes.link}>
            <ListItemText>
              Home
            </ListItemText>
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AddCircle fontSize="large" color="primary" />
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
            <Info fontSize="large" color="primary" />
          </ListItemIcon>
          <NavLink to="/about" rel="noopener noreferrer" className={classes.link}>
            <ListItemText>
              About
            </ListItemText>
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Info fontSize="large" color="primary" />
          </ListItemIcon>
          <NavLink to="/contact" rel="noopener noreferrer" className={classes.link}>
            <ListItemText>
              Contact
            </ListItemText>
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Info fontSize="large" color="primary" />
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
            <HamburgerMenu
              width={32}
              height={24}
              strokeWidth={3}
              rotate={0}
              color="white"
              borderRadius={0}
              isOpen={hamburgerOpen}
              // menuClicked={toggleDrawer(anchor, true)}
              menuClicked={handleClick}
            />
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className={classes.Menu}
            >

              {list(anchor)}
            </StyledMenu>


            {/* <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              classes={{ docked: moreClasses.paper }}
            >

            </Drawer> */}
          </div>
        ))}
      </div>
    </div>
  );
}


export default Hamburger;