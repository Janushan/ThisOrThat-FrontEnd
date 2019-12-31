import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
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
        <Button
          onClick={function() {
            window.location.href = "/question";
          }}
        >
          Feed
        </Button>
        <Button
          onClick={function() {
            window.location.href = "/join";
          }}
        >
          Join
        </Button>
        <Button
          onClick={function() {
            window.location.href = "/creator";
          }}
        >
          Create
        </Button>
        <Button
          onClick={function() {
            window.location.href = "/profile";
          }}
        >
          Profile
        </Button>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <Button onClick={() => changeIsLoggedIn(false)}>Logout</Button>
          <IconButton
            color="inherit"
            onClick={function() {
              window.location.href = "/profile";
            }}
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
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.grow}>
      <AppBar className="AppBar" position="static">
        <Toolbar disableGutters={true} variant="dense">
          <Typography className={classes.title} variant="h6" noWrap>
            This or That
          </Typography>
          {fullNavBar}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
