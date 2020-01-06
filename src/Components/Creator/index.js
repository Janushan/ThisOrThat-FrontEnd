import React, { Component } from 'react';
import axios from 'axios';
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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import './creator.css';

export default class Question extends Component {

    state = {
        title: "",
        text1: "",
        text2: "",
        unsplashUrl1: "",
        unsplashUrl2: "",
        isSponsored: false,
        image1: null,
        image2: null,

        searchString: "",
        results: [],
        image1Url: "",
        image2Url: "",
        urlOption1: "https://images.unsplash.com/photo-1560363199-a1264d4ea5fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
        urlOption2: "https://images.unsplash.com/photo-1570871303513-6faf999850fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80",
        urlOption3: "https://images.unsplash.com/photo-1572324755260-ec8c3e7fae29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=237&q=80",
        urlOption4: "https://images.unsplash.com/photo-1518823526-0df532eb95a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",

        open1: false,
        open2: false
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submit = e => {
        console.log("right before");
        console.log(this.state.image1Name);
        if (this.state.text1 !== this.state.image1Name)
            document.getElementById("image1Uploader").value = "";
        if (this.state.text2 !== this.state.image2Name)
            document.getElementById("image2Uploader").value = "";

        const fd = new FormData();
        fd.append('title', this.state.title);
        fd.append('text1', this.state.text1);
        fd.append('text2', this.state.text2);
        if (this.state.image1 !== null) {
            fd.append('image1', this.state.image1, this.state.image1.name);
        } else {
            if (this.state.unsplashUrl1 !== "") {
                fd.append('unsplashUrl1', this.state.unsplashUrl1);
            }
        }

        if (this.state.image2 !== null) {
            fd.append('image2', this.state.image2, this.state.image2.name);
        } else {
            if (this.state.unsplashUrl2 !== "") {
                fd.append('unsplashUrl2', this.state.unsplashUrl2);
            }
        }

        var option1Object = {
            text: this.state.text1
        };
        if(this.state.unsplashUrl1 !== "") {
            option1Object.imageURL = this.state.unsplashUrl1;
        }
        var option2Object = {
            text: this.state.text2
        };
        if(this.state.unsplashUrl2 !== "") {
            option2Object.imageURL = this.state.unsplashUrl2;
        }
        if(localStorage.getItem('userId')== "5e1297ca9f463f4ca9b7bc89"){
            this.setState({isSponsored:true});
        }
        try {
            axios({method:'post', url:'https://thisorthat-260419.appspot.com/api/questions', data: {
                questionText: this.state.title,
                option1: option1Object,
                option2: option2Object,
                userID: this.props.userId,
                isSponsored: this.state.isSponsored
            }, headers: {}, withCredentials:true
            })
            .then(res => {
                console.log(res);
                console.log("ToT posted.")
                if(this.state.isSponsored==true){
                    window.location.href = '/voucher';
                }else{
                    window.location.href = '/totsubmit';
                }
            });
        } catch (e) {
            alert("Something went wrong!");
            window.location.href = '/totsubmit';
        }
    }

    handleClickOpen = (openIndex) => {
        console.log(openIndex);
        if (openIndex === 1) {
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
        if (openIndex === 1) {
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
                    urlOption1: data.results[0].urls.small,
                    urlOption2: data.results[1].urls.small,
                    urlOption3: data.results[2].urls.small,
                    urlOption4: data.results[3].urls.small,
                });
            });
        }
    }

    searchTextFieldKeyPressed = (e) => {
        if (e.keyCode === 13) {
            this.search();
        }
    }

    selectUnsplashUrl1 = (urlToSet) => {
        console.log("urlToSet: >" + urlToSet + "<");

        this.setState({
            unsplashUrl1: urlToSet,
            image1Url: urlToSet,
            image1: null
        }, function () {
            console.log("unsplashUrl1: >" + this.state.unsplashUrl1 + "<")
            console.log(this.state.urlOption1);
            console.log(this.state.urlOption2);
            console.log(this.state.urlOption3);
            console.log(this.state.urlOption4);
            this.handleClose(1);
        });
    }

    selectUnsplashUrl2 = (urlToSet) => {
        console.log("urlToSet: >" + urlToSet + "<");

        this.setState({
            unsplashUrl2: urlToSet,
            image2Url: urlToSet,
            image2: null
        }, function () {
            console.log("unsplashUrl2: >" + this.state.unsplashUrl2 + "<")
            console.log(this.state.urlOption1);
            console.log(this.state.urlOption2);
            console.log(this.state.urlOption3);
            console.log(this.state.urlOption4);
            this.handleClose(2);
        });
    }

    image1SelectedHandler = e => {
        console.log("image1: " + e.target.files[0]);
        this.setState({
            image1Url: URL.createObjectURL(e.target.files[0]),
            image1: e.target.files[0],
            unsplashUrl1: ""
        });
    }

    image2SelectedHandler = e => {
        console.log("image2:" + e.target.files[0]);
        this.setState({
            image2Url: URL.createObjectURL(e.target.files[0]),
            image2: e.target.files[0],
            unsplashUrl2: ""
        });
    }

    render() {
        return (
            <div className='wrapper'>
                <Card className="loginCard" raised>
                    <div>
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
                                                        <img onClick={this.selectUnsplashUrl1.bind(this, this.state.urlOption1)} src={this.state.urlOption1} alt="imageOption1" />
                                                    </GridListTile>
                                                    <GridListTile>
                                                        <img onClick={this.selectUnsplashUrl1.bind(this, this.state.urlOption2)} src={this.state.urlOption2} alt="imageOption2" />
                                                    </GridListTile>
                                                    <GridListTile>
                                                        <img onClick={this.selectUnsplashUrl1.bind(this, this.state.urlOption3)} src={this.state.urlOption3} alt="imageOption3" />
                                                    </GridListTile>
                                                    <GridListTile>
                                                        <img onClick={this.selectUnsplashUrl1.bind(this, this.state.urlOption4)} src={this.state.urlOption4} alt="imageOption4" />
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
                        <img className="image" src={this.state.image1Url} alt="Preview 1" />
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
                                                        <img onClick={this.selectUnsplashUrl2.bind(this, this.state.urlOption1)} src={this.state.urlOption1} alt="imageOption1" />
                                                    </GridListTile>
                                                    <GridListTile>
                                                        <img onClick={this.selectUnsplashUrl2.bind(this, this.state.urlOption2)} src={this.state.urlOption2} alt="imageOption2" />
                                                    </GridListTile>
                                                    <GridListTile>
                                                        <img onClick={this.selectUnsplashUrl2.bind(this, this.state.urlOption3)} src={this.state.urlOption3} alt="imageOption3" />
                                                    </GridListTile>
                                                    <GridListTile>
                                                        <img onClick={this.selectUnsplashUrl2.bind(this, this.state.urlOption4)} src={this.state.urlOption4} alt="imageOption4" />
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
                        <img className="image" src={this.state.image2Url} alt="Preview 2" />
                        <br /><br />
                        <Button onClick={this.submit} value="Submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </div>
                </Card>
            </div>
        )
    }
}
