import React,{Component} from 'react';
import "./HomePage.css";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import logo from "../../assets/images/UltLogo.png";
import { FaVideo,FaExclamation,FaHeartbeat,FaInfo,FaAddressCard,FaUser, FaBars} from 'react-icons/fa';
import { BrowserRouter as Router, Route, /*Link*/ } from "react-router-dom";
import {NavLink} from 'react-router-dom';
import Admin from '../Body/Admin/Admin';
import Cameras from '../Body/Cameras/Cameras';
import ContactUs from '../Body/Contact Us/ContactUs';
import CardDetections from '../Body/Detections/CardView/CardDetections';
import DeviceStatus from '../Body/DeviceStatus/DeviceStatus';
import Sidebar from "react-sidebar";
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import ListView from '../Body/Detections/ListView/ListView';

class HomePage extends Component{

    state = {
        sidebarOpen: false,
        blink:false,
        display: "none",

    };

    onSetSidebarOpen=()=>{

        this.setState({sidebarOpen: !this.state.sidebarOpen,display: this.state.display==="none"?"flex":"none"});
    };

    componentDidMount() {
        // let trial = this.props.cred();
        // console.log(trial.password, trial.username);
        setInterval(()=>{
            // this.setState({blink:true});
            console.log("background services");
        },3000);
    }

    render() {
        let grow = 28;
        return(
            <Router>
                <div className={"Navv"} style={{display: this.state.display}}>
                <Sidebar
                    children={null}
                    sidebar={
                        <Auxilliary>
                        <Navbar bg="dark">
                            <Navbar.Brand><img src={logo} className={"logo"} alt={"missingimg"}/></Navbar.Brand>
                        </Navbar>
                        <Navbar bg="dark" variant="dark" className={"ity large nav"} justify={"true"}>
                            <div className={"sideIcon"}>
                                <NavLink className={"logo_text"} to="/cameras" activeStyle={{ color: 'red' }} onClick={this.onSetSidebarOpen}>
                                    <div className={"iconItem"}>
                                        <FaVideo  className={"icon"} size={grow}/>
                                        Cameras
                                    </div>
                                </NavLink>
                                <NavLink className={"logo_text"} to="/detections" activeStyle={{ color: 'red' }} onClick={this.onSetSidebarOpen}>
                                    <div className={"iconItem"}>
                                        <FaExclamation  className={"icon"} size={grow}/>
                                        Detections
                                    </div>
                                </NavLink >
                                <NavLink className={"logo_text"} to="/deviceStatus" activeStyle={{ color: 'red' }} onClick={this.onSetSidebarOpen}>
                                    <div className={"iconItem"}>
                                        <FaHeartbeat  className={this.state.blink?"icon blink":"icon"} size={grow}/>
                                        Device Status
                                    </div>
                                </NavLink>
                                <NavLink className={"logo_text"} to={"/Admin"} activeStyle={{ color: 'red' }} onClick={this.onSetSidebarOpen}>
                                    <div className={"iconItem"}>
                                        <FaInfo  className={"icon"} size={grow}/>
                                        Admin
                                    </div>
                                </NavLink>
                                <NavLink className={"logo_text"} to="/ContactUs" activeStyle={{ color: 'red' }} onClick={this.onSetSidebarOpen}>
                                    <div className={"iconItem"}>
                                        <FaAddressCard className={"icon"} size={grow}/>
                                        Contact US
                                    </div>
                                </NavLink>
                                <a className={"logo_text"} href="/" onClick={this.props.change}>
                                    <div className={"iconItem"}>
                                        <FaUser  className={"icon"} size={grow}/>
                                        Sign Out
                                    </div>
                                </a>
                            </div>

                        </Navbar>
                        </Auxilliary>
                    }
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{ sidebar: { backgroundColor: "white"} }}
                >

                </Sidebar>
                </div>

            <Navbar expand bg="dark" variant="dark" className={"ity large justify-content-center nav"} justify={"true"}>
                <div className={"large sideMenu"}>
                <FaBars  onClick={() => this.onSetSidebarOpen(true)} className={"menuIcon"}/>
                <Navbar bg="dark">
                    <Navbar.Brand><img src={logo} className={"logo"} alt={"missingimg"}/></Navbar.Brand>
                </Navbar>
                </div>
                <Nav className={"Navigate"}>
                    <NavLink className={"logo_text"} to="/cameras" activeStyle={{ color: 'red' }}>
                    <div className={"iconItem"}>
                        <FaVideo  className={"icon"} size={grow}/>
                            Cameras
                    </div>
                    </NavLink>
                    <NavLink className={"logo_text"} to="/detections" activeStyle={{ color: 'red' }}>
                    <div className={"iconItem"}>
                        <FaExclamation  className={"icon"} size={grow}/>
                       Detections
                    </div>
                    </NavLink >
                    <NavLink className={"logo_text"} to="/deviceStatus" activeStyle={{ color: 'red' }}>
                    <div className={"iconItem"}>
                        <FaHeartbeat  className={"icon"} size={grow}/>
                        Device Status
                    </div>
                    </NavLink>
                    <Navbar.Brand className={"Brand"}><img src={logo} className={"logo"} alt={"missingimg"}/></Navbar.Brand>
                    <NavLink className={"logo_text"} to={"/Admin"} activeStyle={{ color: 'red' }}>
                    <div className={"iconItem"}>
                        <FaInfo  className={"icon"} size={grow}/>
                        Admin
                    </div>
                    </NavLink>
                    <NavLink className={"logo_text"} to="/ContactUs" activeStyle={{ color: 'red' }}>
                    <div className={"iconItem"}>
                        <FaAddressCard className={"icon"} size={grow}/>
                        Contact US
                    </div>
                    </NavLink>
                    <a className={"logo_text"} href="/" onClick={this.props.change}>
                    <div className={"iconItem"}>
                        <FaUser  className={"icon"} size={grow}/>
                        Sign Out
                    </div>
                    </a>
                </Nav>

            </Navbar>
            <Route path="/" exact component={Cameras}/>
            <Route path="/ContactUs" exact component={ContactUs}/>
            <Route path="/Admin"  exact render={(props)=><Admin {...props}/>}/>
            <Route path="/deviceStatus" exact  component={DeviceStatus}/>
            <Route path="/detections" exact  component={CardDetections}/>
            <Route path="/cameras"  exact component={Cameras}/>
            <Route path="/home" exact  component={CardDetections}/>
            <Route path="/listView" exact  component={ListView}/>
            </Router>
        );
    }
}
export default HomePage;