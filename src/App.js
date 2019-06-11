import React, {Component} from 'react';
import './App.css';
import HomePage from "./Components/HomePage/HomePage";
import Login from './Components/Body/Login/Login';

class App extends Component {
    state={
        loggedIn:false,
        password:null,
        username:null,
    };

    componentDidMount() {
        // console.log("App.js comp did mount\n",this.state.username,"\n", this.state.password);
    }
    logCred=()=>{
        // console.log(this.state.username, "\n", this.state.password);
        return {
            password:this.state.password,
            username:this.state.username,
        };
    };
    changeState = ()=>this.setState({loggedIn:!this.state.loggedIn});
    credentials = (us,pw)=>{
        this.setState({password:pw, username:us});
        // console.log("App.js has : \n", this.state.username,"\n",this.state.password);
        // console.log("App.js has : \n", us,"\n",pw);
    };
    render() {
        return (
            <div className={"App"}>
                {this.state.loggedIn?<HomePage cred={this.logCred}/>:<Login change={this.changeState} credentials={(us,pw)=>this.credentials(us,pw)}/>}
            </div>
        );
    }
}
export default App;
