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
    const [profileToTs, setProfileToTs]= useState([]);
    const [savedToTs, setSavedToTs]= useState([]);
    const [userID, setUserID]=useState(0);
    const [profile, setProfile]= useState(false);
    const [url, setURL]= useState("");
    const [name, setName]= useState("");
    const [profilename, setProfileName]= useState("Profile");
    const [profileIcon, setProfileIcon]= useState("https://image.flaticon.com/icons/svg/1738/1738760.svg");
    const [userId, setUserId]=useState(localStorage.getItem('userId'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getToTs();
  }, []);

  const getToTs = async () => {
    //might need checks for empty responses
    // const user= async () => {
    //     const result = await axios.get('https://thisorthat-260419.appspot.com/api/users/me');
    //     console.log(result);
    //     setUserID(result.data);
    // };
    const fetchProfileToTs = async () => {
      const result = await axios.post(
        "https://thisorthat-260419.appspot.com/api/users/ /created",
        {
          userID: { userID }
        }
      );
      setProfileToTs(result.data);
    };
    const fetchSavedToTs = async () => {
      const result = await axios.post(
        "https://thisorthat-260419.appspot.com/api/ /saved",
        {
          userID: { userID }
        }
      );
      setSavedToTs(result.data);
    };
    fetchProfileToTs();
    fetchSavedToTs();
  };

    useEffect(() => {
        created();
        saved();
        // getToTs();
    }, []);

    const created = async () => {
        console.log(userId);
        console.log('https://thisorthat-260419.appspot.com/api/created');
        axios.get('https://thisorthat-260419.appspot.com/api/created',{withCredentials:true})
        .then((response) => {
            console.log(response);
            setProfileToTs(response.data);
        });
    };

    const saved = async () => {
        axios.get('https://thisorthat-260419.appspot.com/api/saved',{withCredentials:true})
        .then((response) => {
            console.log(response);
            setSavedToTs(response.data);
        });
    };

    // const getToTs = async () => {
    //     console.log('ID'+ userId+ "<>");
    //     const fetchProfileToTs = async () => {
    //         const result = await axios.get(
    //           'https://thisorthat-260419.appspot.com/api/users/'+userId+'/created');
    //         console.log(result);
    //         setProfileToTs(result.data);
    //     };
    //     const fetchSavedToTs = async () => {
    //         const result = await axios.get(
    //           'https://thisorthat-260419.appspot.com/api/'+userId+'/saved');
    //         console.log(result);
    //         setSavedToTs(result.data);
    //     };
    //     fetchProfileToTs();
    //     fetchSavedToTs();
    //     console.log(profileToTs);
    //     console.log(savedToTs);
    // };

    const onClick= (e) =>  {
        setProfile(true);
    };

    const cancel= (e) =>  {
        setName(profilename);
        setURL(profileIcon);
        setProfile(false);
    };

    const save= (e) =>  {
        setProfileName(name);
        setProfileIcon(url);
        setProfile(false);
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
            <Typography className="profileName">
              Profile Name Goes Here
            </Typography>
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
            className="profileTabs"
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Your ToTs" {...a11yProps(0)} />
            <Tab label="Saved" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <ul className="listOfMyToTs">
            {/* {profileToTs.map(info => (
                                <Card className="myToTs" raised>
                                    <ProfileToT
                                        title={info.Title}
                                        votes={info.Votes}
                                    />
                                </Card>
                            ))} */}
            <ProfileToT getQuestionState={props.getQuestionState} />
          </ul>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ul className="listOfSavedToTs">
            {/* {savedToTs.map(info => (
                                <Card className="savedToTs" raised>
                                    <ProfileToT
                                        title={info.Title}
                                        votes={info.Votes}
                                    />
                                </Card>
                            ))} */}
            <ProfileToT getQuestionState={props.getQuestionState} />
          </ul>
        </TabPanel>
      </div>
      <Dialog open={profile} onClose={handleChange}>
        <DialogTitle>{"Update Profile"}</DialogTitle>
        <DialogContent>
          <Typography className="profileDialogHeader">
            Profile Picture
          </Typography>
          <TextField
            name="url"
            label="Image URL"
            variant="outlined"
            className=""
            value={url}
            fullWidth={true}
            onChange={(e) => URL(e)}
          />
          <Grid className="creatorImageContainer profileImageContainer">
            <img className="creatorImage" src={url} alt="" />
          </Grid>
          <br />
          <br />
          <Typography className="profileDialogHeader">Profile Name</Typography>
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
