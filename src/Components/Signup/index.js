import React, {Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import './styles.css';


export default class Signup extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    usernameCheck:[],
    usernameError:false,
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  changeUser = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if(e.target.value.length===0){
      this.setState({usernameError:false});
    }
    else if(e.target.value.length>0 && e.target.value.length<5){
      this.setState({usernameError:true});
    }
    else{
      // axios.post('', {
      //     username: e.target.value
      // })
      // .then(response => {
      //     this.setState({usernameCheck:response.data});
      //     if(this.state.usernameCheck.length===1){
      //       this.setState({usernameError:true});
      //     }else{
      //       this.setState({usernameError:false});
      //     }
      // })
    }
    
  };

  onSubmit = e => {
    e.preventDefault();
    var alphanumeric = /^[0-9a-zA-Z]+$/;
    var number= /\d/;
    var lowercasePassword= this.state.password.toLowerCase();
    var alertString="";
    if( this.state.userName=== "" || this.state.email=== "" || this.state.password=== "" || this.state.confirmPassword=== ""){
      alertString+="You must complete all fields";
    }
    else{
      if(this.state.userName.length < 5){
        alertString+="Username must be at least five(5) characters\n";
      }
      if((alphanumeric.test(this.state.userName)===false) || (alphanumeric.test(this.state.password)===false)){
        alertString+="Username and password fields can only contain alphanumeric characters !\n";
      }
      if(this.state.password.length < 7){
        alertString+="Password must be at least seven(7) characters!\n";
      }
      if (this.state.password !==  this.state.confirmPassword ){
        alertString+="Passwords do not match!\n";
      }
      if(lowercasePassword.localeCompare(this.state.password)===0){
        alertString+="Password must contain an Uppercase character!\n";
      }
      if(number.test(this.state.password)===false){
        alertString+="Password must contain a number!\n";
      }
    }
    if(alertString==="" && (this.state.usernameError===false)){
      //  axios.post('', {
      //     username: this.state.userName,
      //     email: this.state.email,
      //     passwd: this.state.password
      //   })
      //   .then(response => {
      //     localStorage.setItem('user', this.state.userName);
      //     // this.props.history.push("/<homepage>"); add in path to home page here
      //   })
    }else{
      if(this.state.usernameError===true){
        alertString+="Username is already taken!"
      }
      alert(alertString);
    }
  };

  render() {

    return (
      <div>
        <div className="signupPage" >
          <Card className="signupCard" raised>
            <form className="signup">
              <CardHeader 
                title="Signup"
              />
              <TextField
                name="userName"
                label="Username"
                className="usernamefield"
                value={this.state.userName}
                onChange={e => this.changeUser(e)}
                error={this.state.usernameError}
              />
              <br />
              <TextField
                name="email"
                label="Email"
                value={this.state.email}
                onChange={e => this.change(e)}
                type="email"
              /><br />
              <TextField
                name="password"
                label="Password"
                value={this.state.password}
                onChange={e => this.change(e)}
                type="password"
              /><br />
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                value={this.state.confirmPassword}
                onChange={e => this.change(e)}
                type="password"
                className="requirements"
              />
              <br/>
              <br/>
              <Tooltip className="userTip" 
                title="Usernames: Must be unique and a minimum of 5 alphanumeric characters Passwords: At least 7 alphanumeric characters, an
                Uppercase character and a Number." 
                interactive 
              >
                <Button className="requirements" >Requirements</Button>
              </Tooltip>
              <Button variant="contained" color="primary" onClick={e => this.onSubmit(e)} >
                Submit
              </Button>  
              <br/>
              <Typography variant="overline" className="" color="textSecondary" gutterBottom>
                  Already have an Account?
              </Typography>
              {/* add in navigation to login page */}
              <Typography variant="overline"  color="primary"  gutterBottom>
                &nbsp;Login
              </Typography>
            </form>
          </Card>
        </div>
      </div>
    );
  }
}
