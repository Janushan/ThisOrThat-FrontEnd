import React, { useState, useEffect } from "react";
import axios from "axios";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ProfileToT from "../ProfileToT";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import Created from "../Created";
import "./profile.css";
import { TextField } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(0, 0, 0, 0.001)",
    width: 500
  }
}));

export default function Profile(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [profileToTs, setProfileToTs] = useState([]);
  const [savedToTs, setSavedToTs] = useState([]);
  const [userID, setUserID] = useState(0);
  const [profile, setProfile] = useState(false);
  const [url, setURL] = useState("");
  const [name, setName] = useState("");
  const [profilename, setProfileName] = useState("Profile");
  const [profileIcon, setProfileIcon] = useState(
    "https://image.flaticon.com/icons/svg/1738/1738760.svg"
  );
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [user, setUser] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    created();
    saved();
    getUser();
    // getToTs();
  }, []);

  const getUser = async () => {
    axios({
      method: "get",
      url: "https://thisorthat-260419.appspot.com/api/me",
      withCredentials: true
    }).then((response) => {
      console.log(response);
      setUser(response.data);
      setName(response.data.name);
    });
  };

  const created = async () => {
    console.log("https://thisorthat-260419.appspot.com/api/created");
    axios({
      method: "get",
      url: "https://thisorthat-260419.appspot.com/api/created",
      withCredentials: true
    }).then((response) => {
      console.log(response);
      if (response.data.length >= 1) {
        setProfileToTs(response.data);
      } else {
        setProfileToTs([]);
      }
    });
  };

  const saved = async () => {
    console.log("https://thisorthat-260419.appspot.com/api/saved");
    axios({
      method: "get",
      url: "https://thisorthat-260419.appspot.com/api/saved",
      withCredentials: true
    }).then((response) => {
      console.log(response);
      if (response.data.length >= 1) {
        setSavedToTs(response.data);
      } else {
        setSavedToTs([]);
      }
    });
  };

  const onClick = (e) => {
    setProfile(true);
  };

  const cancel = (e) => {
    setName(profilename);
    setURL(profileIcon);
    setProfile(false);
  };

  const save = (e) => {
    setProfileName(name);
    setProfileIcon(url);
    setProfile(false);
  };

  const URL = (e) => {
    setURL(e.target.value);
  };

  const profileName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="profilePage">
      <Grid
        container
        alignContent="space-between"
        className="profileCard"
        direction="row"
      >
        <Grid item justify="center">
          <Grid container>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
            <Typography className="profileName">{name}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton
            secondary
            className="editpProfileButton"
            onClick={(e) => onClick(e)}
          >
            <CreateIcon />
          </IconButton>
        </Grid>
      </Grid>
      <br />
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Your ToTs" {...a11yProps(0)} />
            <Tab label="Saved" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ul className="listOfMyToTs">
              {profileToTs.map((info) => (
                <Created
                  title={info.questionText}
                  option1={info.option1.text}
                  option2={info.option2.text}
                  image1={info.option1.imageURL}
                  image2={info.option2.imageURL}
                  votes1={info.option1.numberOfVotes}
                  votes2={info.option2.numberOfVotes}
                  totalVotes={
                    info.option1.numberOfVotes + info.option2.numberOfVotes
                  }
                />
              ))}
              {/* <ProfileToT getQuestionState={props.getQuestionState} /> */}
            </ul>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Created
              title="Location"
              option1="Fordham"
              option2="NewJersey"
              votes1="1"
              votes2="1"
              totalVotes="2"
            />
            <ul className="listOfSavedToTs">
              {/* {savedToTs.map(info => (
                                <Card className="savedToTs" raised>
                                    <Created
                                        title={info.questionText}
                                        option1={info.option1.text}
                                        option2={info.option2.text}
                                        votes1={info.option1.numberOfVotes}
                                        votes2={info.option2.numberOfVotes}
                                        totalVotes={info.option1.numberOfVotes+info.option2.numberOfVotes}
                                    />
                                </Card>
                            ))} */}
              {/* <ProfileToT getQuestionState={props.getQuestionState} /> */}
            </ul>
          </TabPanel>
        </SwipeableViews>
      </div>
      <Dialog
        open={profile}
        onClose={handleChange}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update Profile"}</DialogTitle>
        <DialogContent>
          <Typography>Profile Picture</Typography>
          <br />
          <TextField
            name="url"
            label="Image URL"
            variant="outlined"
            className=""
            value={url}
            fullWidth={true}
            onChange={(e) => URL(e)}
          />
          <img className="editProfileImage" src={url} alt="Preview" />
          <br />
          <br />
          <Typography>Profile Name</Typography>
          <br />
          <TextField
            name="name"
            label="Profle Name"
            variant="outlined"
            className=""
            value={name}
            fullWidth={true}
            onChange={(e) => profileName(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => cancel(e)} color="secondary">
            Cancel
          </Button>
          <Button onClick={(e) => save(e)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
