import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";

import logo from "../../Assets/logo.jpg";
import "./header.css";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

export default function Header({ isLoggedIn, changeIsLoggedIn }) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    ></Menu>
  );

  let fullNavBar;

  if (isLoggedIn === true) {
    fullNavBar = (
      <React.Fragment>
        <div className="headerButtonContainer headerVertLine">
          <Button
            className="headerButton leftHeaderButton"
            onClick={function() {
              window.location.href = "/feed";
            }}
          >
            Feed
          </Button>
          <Button
            className="headerButton"
            onClick={function() {
              window.location.href = "/creator";
            }}
          >
            Create
          </Button>
        </div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <IconButton
            color="inherit"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={function() {
                handleClose();
                window.location.href = "/profile";
              }}
            >
              My profile
            </MenuItem>
            <MenuItem
              onClick={function() {
                handleClose();
                changeIsLoggedIn(false);
                window.location.href = "/login";
              }}
            >
              Log out
            </MenuItem>
          </Menu>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.grow}>
      <AppBar className="AppBar" position="static">
        <Toolbar disableGutters={true} variant="dense">
          <Button
            className="headerButton headerTitle"
            onClick={function() {
              window.location.href = "/feed";
            }}
          >
            <img alt="this or that logo" className="headerLogo" src={logo} />
            This or That
          </Button>
          {fullNavBar}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
