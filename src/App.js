import React, {Component} from 'react';
import './App.css';
import HomePage from "./Components/HomePage/HomePage";
import Login from './Components/Body/Login/Login';
// import Dummy from './hoc/Dummy/Accordion';

class App extends Component {
    state={
        loggedIn:false,
        password:null,
        username:null,
        access:null,
        lat:-25.751140,
        long:28.217423,
    };

    componentDidMount() {
        // console.log("App.js comp did mount\n",this.state.username,"\n", this.state.password);
    }

    logCred=()=>{
        return {
            password:this.state.password,
            username:this.state.username,
        };
    };

    changeState = ()=>this.setState({loggedIn:!this.state.loggedIn,});
    credentials = (us,pw,access)=>{
        let tempAccess;
        if(access.ultrasense === true || access.ultrasense === "true"){
            tempAccess = "Ultrasense";
        }else if(access.admin === true || access.admin === "true"){
            tempAccess = "Admin";
        }else if(access.guard === true || access.guard === "true"){
            tempAccess = "Guard";
        }else{
            tempAccess = "No User Group";
        }
        this.setState({password:pw, username:us,access:tempAccess});
        // alert(us + pw + JSON.stringify(access));
    };

    render() {
        return (
            // <React.Fragment className={"App"}>
            <React.Fragment>
                 {
                     this.state.loggedIn?
                         <HomePage cred={this.logCred} username={this.state.username} access={this.state.access} />
                         :
                        <Login change={this.changeState} credentials={(us,pw,access)=>this.credentials(us,pw,access)}/>

                 }
            </React.Fragment>
             //<Dummy />
        );
    }
}
export default App;
