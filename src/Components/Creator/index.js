import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InputAdornment from '@material-ui/core/InputAdornment';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import PublicIcon from '@material-ui/icons/Public';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import './creator.css';

export default class Question extends Component {

    state = {
        title: "",
        text1: "",
        text2: "",
        image1Name: "",
        image2Name: "",

        searchString: "",
        results: [],
        uriOption1: "https://images.unsplash.com/photo-1560363199-a1264d4ea5fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
        uriOption2: "https://images.unsplash.com/photo-1570871303513-6faf999850fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80",
        uriOption3: "https://images.unsplash.com/photo-1572324755260-ec8c3e7fae29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=237&q=80",
        uriOption4: "https://images.unsplash.com/photo-1518823526-0df532eb95a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
        unsplashUri1: "",
        unsplashUri2: "",

        open1: false,
        open2: false
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submit = e => {

    }

    handleClickOpen = (openIndex) => {
        console.log(openIndex);
        if(openIndex === 1) {
            this.setState({
                open1: true
            })
        } else {
            this.setState({
                open2: true
            })
        }
    }

    handleClose = (openIndex) => {
        console.log(openIndex);
        if(openIndex === 1) {
            this.setState({
                open1: false
            })
        } else {
            this.setState({
                open2: false
            })
        }
    }

    search = () => {
        console.log("you searched for >" + this.state.searchString + "<");
        var fetchString = 'https://api.unsplash.com/search/photos?page=1&query=' + this.state.searchString;
        console.log("url: >" + fetchString + "<");


        fetch(fetchString, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'Authorization': 'Bearer 8b227e84043e03edfc04b0314134dd779c95415f5ca8a8564fb3a9f23174587c'
            }
        })
            .then((res) => this.processResponse(res));
    }

    processResponse = (response) => {
        if (response.status === 200) {
            response.json().then(data => {
                this.setState({
                    results: data.results,
                    uriOption1: data.results[0].urls.small,
                    uriOption2: data.results[1].urls.small,
                    uriOption3: data.results[2].urls.small,
                    uriOption4: data.results[3].urls.small,
                });
            });
        }
    }

    searchTextFieldKeyPressed = (e) => {
        if (e.keyCode === 13) {
            this.search();
        }
    }

    selectUnsplashUri1 = (uriToSet) => {
        console.log("urlToSet: >" + uriToSet + "<");

        this.setState({
            unsplashUri1: uriToSet,
            text1: uriToSet
        }, function () {
            console.log("unsplashUri1: >" + this.state.unsplashUri1 + "<")
            console.log(this.state.uriOption1);
            console.log(this.state.uriOption2);
            console.log(this.state.uriOption3);
            console.log(this.state.uriOption4);
            this.handleClose(1);
        });
    }

    selectUnsplashUri2 = (uriToSet) => {
        console.log("urlToSet: >" + uriToSet + "<");

        this.setState({
            unsplashUri2: uriToSet,
            text2: uriToSet
        }, function () {
            console.log("unsplashUri2: >" + this.state.unsplashUri2 + "<")
            console.log(this.state.uriOption1);
            console.log(this.state.uriOption2);
            console.log(this.state.uriOption3);
            console.log(this.state.uriOption4);
            this.handleClose(2);
        });
    }

    image1SelectedHandler = e => {
        console.log("image1: " + e.target.files[0]);
        this.setState({
            text1: e.target.files[0].name,
            image1Name: e.target.files[0].name
        });
    }

    image2SelectedHandler = e => {
        console.log("image2:" + e.target.files[0]);
        this.setState({
            text2: e.target.files[0].name,
            image2Name: e.target.files[0].name
        });
    }

    checkBeforeSubmission = e => {
        console.log("right before");
        console.log(this.state.image1Name);
        if(this.state.text1 !== this.state.image1Name)
            document.getElementById("image1Uploader").value = "";
        if(this.state.text2 !== this.state.image2Name)
            document.getElementById("image2Uploader").value = "";
    }

    render() {
        return (
            <div className='holder'>
                <Card className="creator" raised>
                    <form onSubmit={this.checkBeforeSubmission}>
                        <CardHeader title="Create a ToT" />
                        <br />
                        <TextField
                            className="questionTitle"
                            label="This or That"
                            variant="outlined"
                            name='title'
                            value={this.state.title}
                            onChange={e => this.onChange(e)}
                        />
                        <br />
                        <TextField
                            className="option1"
                            label="Option 1"
                            variant="outlined"
                            name='text1'
                            value={this.state.text1}
                            onChange={e => this.onChange(e)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end' >
                                        <input name="image1" onChange={this.image1SelectedHandler} accept="image/*" className="fileInput" id="image1Uploader" type="file" />
                                        <label htmlFor="image1Uploader">
                                            <Tooltip title="Upload image">
                                                <IconButton aria-label="upload image" component="span">
                                                    <ImageSearchIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </label>
                                        <Tooltip title="Select image from Unsplash">
                                            <IconButton aria-label="select image from unsplash" component="span" onClick={this.handleClickOpen.bind(this, 1)}>
                                                <PublicIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Dialog
                                            open={this.state.open1}
                                            onClose={this.handleClose.bind(this, 1)}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">{"This: Search for an image on Unsplash"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>lol1</DialogContentText>
                                                <TextField
                                                    name="searchString"
                                                    value={this.state.searchString}
                                                    onChange={e => this.onChange(e)}
                                                    id="standard-basic" label="Type here"
                                                    onKeyDown={this.searchTextFieldKeyPressed} />
                                                <Button onClick={this.search} color="primary">Search</Button>
                                                <br /><br />
                                                <GridList id="gridList1">
                                                    <GridListTile>
                                                        <img onClick={this.selectUnsplashUri1.bind(this, this.state.uriOption1)} src={this.state.uriOption1} alt="imageOption1" />
                                                    </GridListTile>
                                                    <GridListTile>
                                                        <img onClick={this.selectUnsplashUri1.bind(this, this.state.uriOption2)} src={this.state.uriOption2} alt="imageOption2" />
                                                    </GridListTile>
                                                    <GridListTile>
                                                        <img onClick={this.selectUnsplashUri1.bind(this, this.state.uriOption3)} src={this.state.uriOption3} alt="imageOption3" />
                                                    </GridListTile>
                                                    <GridListTile>
                                                        <img onClick={this.selectUnsplashUri1.bind(this, this.state.uriOption4)} src={this.state.uriOption4} alt="imageOption4" />
                                                    </GridListTile>
                                                </GridList>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={this.handleClose.bind(this, 1)} color="primary">
                                                    Close
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <br />
                        <Typography variant="caption">
                            or
                        </Typography>
                        <br />
                        <br />
                        <TextField
                            className="option2"
                            label="Option 2"
                            variant="outlined"
                            name='text2'
                            value={this.state.text2}
                            onChange={e => this.onChange(e)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end' >
                                        <input name="image2" onChange={this.image2SelectedHandler} accept="image/*" className="fileInput" id="image2Uploader" type="file" />
                                        <label htmlFor="image2Uploader">
                                        <Tooltip title="Upload image">
                                                <IconButton aria-label="upload image" component="span">
                                                    <ImageSearchIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </label>
                                        <Tooltip title="Select image from Unsplash">
                                            <IconButton aria-label="select image from unsplash" component="span" onClick={this.handleClickOpen.bind(this, 2)}>
                                                <PublicIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Dialog
                                            open={this.state.open2}
                                            onClose={this.handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">{"That: Search for an image on Unsplash"}</DialogTitle>
                                            <DialogContent>
                                                <TextField
                                                    name="searchString"
                                                    value={this.state.searchString}
                                                    onChange={e => this.onChange(e)}
                                                    id="standard-basic" label="Type here"
                                                    onKeyDown={this.searchTextFieldKeyPressed} />
                                                <Button onClick={this.search} color="primary">Search</Button>
                                                <br /><br />
                                                <GridList id="gridList2">
                                                    <GridListTile>
                                                        <img onClick={this.selectUnsplashUri2.bind(this, this.state.uriOption1)} src={this.state.uriOption1} alt="imageOption1" />
                                                    </GridListTile>
                                                    <GridListTile>
                                                        <img onClick={this.selectUnsplashUri2.bind(this, this.state.uriOption2)} src={this.state.uriOption2} alt="imageOption2" />
                                                    </GridListTile>
                                                    <GridListTile>
                                                        <img onClick={this.selectUnsplashUri2.bind(this, this.state.uriOption3)} src={this.state.uriOption3} alt="imageOption3" />
                                                    </GridListTile>
                                                    <GridListTile>
                                                        <img onClick={this.selectUnsplashUri2.bind(this, this.state.uriOption4)} src={this.state.uriOption4} alt="imageOption4" />
                                                    </GridListTile>
                                                </GridList>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={this.handleClose.bind(this, 2)} color="primary">
                                                    Close
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <br />
                        <div className="colorPanel">
                            <FiberManualRecordIcon className="colorChoice" />
                            <FiberManualRecordIcon className="colorChoice" />
                            <FiberManualRecordIcon className="colorChoice" />
                            <FiberManualRecordIcon className="colorChoice" />
                        </div>

                        <br />
                        <Button type="submit" value="Submit" variant="contained" color="primary" onClick={e => this.submit(e)}>
                            Submit
                        </Button>
                    </form>
                </Card>
            </div>

        )
    }
}
