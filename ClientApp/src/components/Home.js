import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';



//const PrivateRoute = ({ component: Component, ...rest }) => {


export class Home extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
           
        };
    }

    componentDidMount() {
       // this.getData();

        
    }

    static getThermo(forecasts) {
        return (
            <div>
                {forecasts}
            </div>
        );
    }



    static displayName = Home.name;
    
    

    onSubmit = () => {
        return <Redirect to="/calander/" />
    }
    
    render() {
    return (
      <div>
            <h1>Welcome to euanmorton.co.uk!</h1>
            <div className="div1">
                <h5></h5>
            </div>
      </div>
    );
    }

}