import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import './styles.css'

export default class Login extends Component {
  state = {
    userName: "",
    password: "",
    validated:0,
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    if( this.state.userName=== "" || this.state.password=== "" ){
      alert("You must complete all fields");
    }
    else{
      // axios.post('', {
      // username: this.state.userName,
      // passwd: this.state.password
      // })
      // .then(response => {
      //   this.setState({ validated: response.data})
      //   if(this.state.validated===1){
      //     localStorage.setItem('user',this.state.userName);
      //     // this.props.history.push("/<homepage>"); add in path to home page here
      //   }else{
      //     alert("Wrong Credentials");
      //     this.setState({ password: ""});
      //   }
      // })
      
      this.props.changeIsLoggedIn(true);
    }
    
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <Card className="loginCard" raised>
            <form className="login">
              <CardHeader  
                title="Login"
              />
              <TextField
                name="userName"
                label="Username"
                value={this.state.firstName}
                onChange={e => this.change(e)}
              />
              <br />
              <TextField
                name="password"
                label="Password"
                value={this.state.password}
                onChange={e => this.change(e)}
                type="password"
              />
              <br/><br/>
              <Button variant="contained" color="primary" onClick={e => this.onSubmit(e)}>
                  Login
              </Button>
              <br/>
              <Typography variant="overline" className="" color="textSecondary" gutterBottom>
                  Don't have an Account?
              </Typography>
              <Link to="/signup">Sign Up</Link>
            </form>
          </Card>
        </div>
      </div>
    );
  }
}