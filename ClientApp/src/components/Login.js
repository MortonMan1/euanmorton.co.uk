import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../services/AuthService'


export class Login extends Component {
    constructor(props) {
        super(props);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.login = this.login.bind(this);
        this.guestlogin = this.guestlogin.bind(this);

        // Don't call this.setState() here!
        this.state = {
            username: "",
            password: "",
        };
    }

    componentDidMount() {
       // this.getData();

        
    }

    static displayName = Login.name;

    login() {
        AuthService.login(this.state.username, this.state.password);
    }

    guestlogin() {
        console.log("not yet a thing matey");
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(event) {
        this.login();
        event.preventDefault();
    }

    
    render() {
    return (
      <div>
            <h1>Welcome to euanmorton.co.uk!</h1>
            <div className="div1">
                <h5>Here we have the login...</h5>
            </div>
            <div className="div1">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <div className="div1">
                <button onClick={this.login}>Login</button>
            </div>
            <div className="div1">
                <button onClick={this.guestlogin}>Continue as guest</button>
            </div>
      </div>
    );
    }

}