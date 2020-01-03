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
import ProfileToT from '../ProfileToT'
import './profile.css';

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

export default function Profile() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [profileToTs, setProfileToTs]= useState([]);
    const [savedToTs, setSavedToTs]= useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    useEffect(() => {
        getToTs();
    }, []);

    const getToTs = async () => {
        //might need checks for empty responses
        const fetchProfileToTs = async () => {
            const result = await axios.post(
              '', {}
            );
            setProfileToTs(result.data);
        };
        const fetchSavedToTs = async () => {
            const result = await axios.post(
              '', {}
            );
            setSavedToTs(result.data);
        };
        fetchProfileToTs();
        fetchSavedToTs();
    };

    return (
        <div className="profilePage">
            <Card className="profileCard">
                <CardHeader title="Profile" /> 
            </Card>
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
                            <ProfileToT/>
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
                            <ProfileToT/>
                        </ul>
                    </TabPanel>
                </SwipeableViews>
            </div>
        </div>
    );
}