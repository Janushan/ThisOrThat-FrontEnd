import React, { useState, useEffect } from "react";
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProfileToT from '../ProfileToT';
import Avatar from '@material-ui/core/Avatar';

import './profile.css';
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
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    useEffect(() => {
        getToTs();
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
        console.log({profile})
    };

    const cancel= (e) =>  {
        setProfile(false);
    };

    const save= (e) =>  {
        setProfile(false);
    };

    const  URL= (e) =>  {
        setURL(e.target.value);
    };

    const profileName= (e) =>  {
        setName(e.target.value);
    };

    return (
        <div className="profilePage">
            <Button className="profileCard" onClick={e => onClick(e)}> 
                <Avatar>  
                    <AccountCircleIcon/> 
                </Avatar>
                <Typography>
                    Profile
                </Typography>
            </Button>
            <br/>
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
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
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
                <Typography variant="h5" display="block" gutterBottom >
                    Profile Picture
                </Typography>
                <br/>
                <TextField
                    name="url"
                    label="Image URL"
                    variant="outlined"
                    className=""
                    value={url}
                    fullWidth={true}
                    onChange={(e) => URL(e)}
                />
                 <img className="profileImage" src={url} alt="Preview" />
                 <br/><br/>
                 <Typography variant="h5" display="block" gutterBottom >
                    Profile Name
                 </Typography>
                 <br/>
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
                <Button onClick={e => cancel(e)} color="primary">
                    Cancel
                </Button>
                <Button onClick={e => save(e)} color="primary">
                    Save
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}