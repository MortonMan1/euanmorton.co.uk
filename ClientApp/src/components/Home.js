import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Home extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            loading: true,
            thermocondata: [],
            heatingToggleText: "init",
            heatingStatus: "init",
            currentTemp: null
        };
        this.getHeating = this.getHeating.bind(this);
        this.getTemperature = this.getTemperature.bind(this);
        this.heatingToggle = this.heatingToggle.bind(this);
        this.heatingOn = this.heatingOn.bind(this);
        this.heatingOff = this.heatingOff.bind(this);
        this.getHeating();
        this.getTemperature();

        //this.interval = setInterval(
        //    this.getTemperature
        //, 10000);
        
        //clearInterval(this.interval);
    }

    componentDidMount() {
        this.getData();
    }

    static getThermo(forecasts) {
        return (
            <div>
                {forecasts}
            </div>
        );
    }



    static displayName = Home.name;
    
    getHeating() {
        fetch("http://192.168.0.13:8080/api/getHeatingStatus")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('Heating result: \n', result);
                    this.setState({ heatingStatus: result.message })
                },
                (error) => {
                    console.log('Looks like there was a problem: \n', error);
                })
    }

    getTemperature() {
        fetch("http://192.168.0.13:8080/api/getTemperature")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ currentTemp: result.temperature })
                },
                (error) => {
                    console.log('Looks like there was a problem getting temperature: \n', error);
                })
    }

    heatingToggle() {
        fetch("http://192.168.0.13:8080/api/toggleHeatingPin")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ heatingToggleText: result.message })
                },
                (error) => {
                    console.log('Looks like there was a problem: \n', error);
                })
    }

    heatingOn() {
        fetch("http://192.168.0.13:8080/api/heatingOn")
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.result) {
                        this.setState({ heatingStatus: result.message })
                    }
                    
                },
                (error) => {
                    console.log('Looks like there was a problem: \n', error);
                })
    }

    heatingOff() {
        fetch("http://192.168.0.13:8080/api/heatingOff")
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.result) {
                        this.setState({ heatingStatus: result.message })
                    }
                },
                (error) => {
                    console.log('Looks like there was a problem: \n', error);
                })
    } 

    onSubmit = () => {
        return <Redirect to="/calander/" />
    }
    
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Home.renderForecastsTable(this.state.thermocondata);

    return (
      <div>
            <h1>Welcome to euanmorton.co.uk!</h1>
            <div className="div1">
                <h5>Heating status</h5>
                <p>{this.state.heatingStatus}</p>
                <p>Current temp: <span>{this.state.currentTemp}</span></p>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <button onClick={this.heatingToggle}>ToggleHeating</button>
                        <button onClick={this.heatingOn}>Heating On</button>
                        <button onClick={this.heatingOff}>Heating Off</button>
                    </div>
                </div>
            </div>
            

            <div>
                <p>{this.state.heatingToggleText}</p>
            </div>
            <div>
                <p>{this.state.heatingToggleText}</p>
            </div>
            <div>
                {contents}
            </div>
      </div>
    );
    }


    async getData() {
        const response = await fetch('/api/thermo/getTest');
        console.log("nbew response thermo", response);
        const data = await response.json();
        console.log("nbew data thermo", data);
        this.setState({ thermocondata: data, loading: false });
    }
    
}
/*
                //<button onClick={() => history.push('/Calendar')}>Calendar</button>
    var oldContent = "< p > Welcome to your new single - page application, built with poo and:</p >
    <ul>
        <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
        <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
        <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
    </ul>
    <p>To help you get started, we have also set up:</p>
    <ul>
        <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
        <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
        <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
    </ul>
    <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>";
    */