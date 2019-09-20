import React,{Component, lazy, Suspense} from 'react';
import "./HomePage.css";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import logo from "../../assets/images/UltLogo.png";
import { FaVideo,FaExclamation,FaEnvelope,FaInfo,FaCommentAlt,FaUser, FaBars} from 'react-icons/fa';
import { BrowserRouter as Router, Route, /*Link*/ } from "react-router-dom";
import {NavLink} from 'react-router-dom';
// import Admin from '../Body/Admin/Admin';
// import Cameras from '../Body/Cameras/Cameras';
import ContactUs from '../Body/Contact Us/ContactUs';
// import CardDetections from '../Body/Detections/CardView/CardDetections';
// import Chat from '../Body/Chat/Chat';
import Sidebar from "react-sidebar";
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
// import ListView from '../Body/Detections/ListView/ListView';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import url from '../../urls/url';
import Firestore from "../../hoc/Firestore/Firestore";
import Maps from "../../hoc/Maps/Maps";
import ls from 'local-storage';
import Loader from "../Loader/Loader";

const Cameras = lazy(()=>import('../Body/Cameras/Cameras'));
const CardDetections  = lazy(()=>import("../Body/Detections/CardView/CardDetections"));
const Admin = lazy(()=>import("../Body/Admin/Admin"));
const Chat = lazy(()=>import("../Body/Chat/Chat"));
const ListView = lazy(()=>import("../Body/Detections/ListView/ListView"));

class HomePage extends Component{

    state = {
        nav : true,
        sidebarOpen: false,
        blink:false,
        display: "none",
        load:true,
        handleChat:false,
        chatWidth:0,
        chat:false,
        messages:[],
        chatBlinker:false,
        mounted:false,
        adminActive:false,
        camerasActive:false,
        detectionsActive:false,
        scroll : false,
        token : null,
    };

    ref = React.createRef();

    activeIcon = (icon)=>{
        switch (icon) {
            case "cameras":
                this.setState({adminActive:false,camerasActive:true,detectionsActive:false,});
                break;
            case "detections":
                this.setState({adminActive:false,camerasActive:false,detectionsActive:true,});
                break;
            case "admin":
                this.setState({adminActive:true,camerasActive:false,detectionsActive:false,});
                break;
            default:
                alert("unknown link...");
        }
    };

    handleChat=(num)=>{
        this.ref.current.style.marginLeft=num+ " px";
        this.setState({handleChat:true,chatWidth:num,chat:!this.state.chat, scroll : true});
        // alert("state changed: " + JSON.stringify(this.state));
        if(this.state.chat===true){
            this.setState({chatWidth:0,scroll:false});
        }
        // alert("state changed: " + JSON.stringify(this.state));
        // alert("butoon clicked\n"+JSON.stringify(this.state) + "\n"+num );

    };

    onSetSidebarOpen=()=>{
        this.setState({sidebarOpen: !this.state.sidebarOpen,display: this.state.display==="none"?"flex":"none"});
    };

    componentDidMount() {
        this.setState({mounted:true, token : this.props.token});
        setInterval(()=>{
            let blinker = false;
            console.log("background services");
            axios.get(url.url("devices"), {params:{
                    token : ls.get("token"),
                }}).then((res)=>{
                console.log("got the following response\n",res);
                res.data.devices.map((item,index)=>{
                    if(!res.data.alive[index]){
                        blinker=true;
                    }
                    return null;
                });
                this.setState({blink:blinker});
            }).catch(err=>{console.log(err)});

            // const db = Firestore.firestore();
            // db.collection("Messages").get().then(res=>{
            //     res.forEach(item=>{
            //         this.state.messages.push(item.data());
            //     });
            // });
            // this.state.messages.map(item=>{
            //     if(item.newChat===true){
            //         this.setState({chatBlikner:true});
            //     }
            //     return null;
            // });

        },10000);
    }

    logOut = ()=>{
        ls.clear();
    };

    render() {
        let grow = 45;
        return(
            <Router>
                <div className={"Navv"} style={{display: this.state.display,height:"10px"}} ref={this.ref}>
                <Sidebar
                    children={null}
                    sidebar={
                        <Auxilliary>
                        <Navbar bg="dark">
                            <Navbar.Brand><img src={logo} className={"logo"} alt={"missingimg"}/></Navbar.Brand>
                        </Navbar>
                        <Navbar bg="dark" variant="dark" className={" large nav"} justify={"true"}>
                            <div className={"sideIcon"}>
                                <NavLink className={"logo_text"} to="/cameras" activeStyle={{color:'red'}} onClick={this.onSetSidebarOpen}>
                                    <div className={"iconItem"}>
                                        <FaVideo  className={this.state.blink?"icon blinkerss":"icon"} size={grow}/>
                                        Cameras
                                    </div>
                                </NavLink>
                                <NavLink className={"logo_text"} to="/detections" activeStyle={{color:'red',}} onClick={this.onSetSidebarOpen}>
                                    <div className={"iconItem"}>
                                        <FaExclamation  className={"icon"} size={grow}/>
                                        Detections
                                    </div>
                                </NavLink >
                                <NavLink className={"logo_text"} to="/Chat" activeStyle={{color:'red'}} onClick={this.onSetSidebarOpen}>
                                    <div className={"iconItem"}>
                                        <FaEnvelope  className={this.state.chatBlinker?"icon blink":"icon"} size={grow}/>
                                        Chat
                                    </div>
                                </NavLink>
                                <NavLink className={"logo_text"} to={"/Admin"} activeStyle={{color:'red'}} onClick={this.onSetSidebarOpen}>
                                    <div className={"iconItem"}>
                                        <FaInfo  className={"icon"} size={grow}/>
                                        Admin
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
            <div>
            <Navbar expand bg="dark" variant="dark" className={"ity large justify-content-center nav"} justify={"true"} style=
                {{zIndex : 10000,position : 'fixed', display: !this.state.nav ? "none" : null, scroll : "smooth"}}
            >
                <div className={"large sideMenu"}>
                <FaBars  onClick={() => this.onSetSidebarOpen(true)} className={"menuIcon"}/>
                <Navbar bg="dark">
                    <Navbar.Brand><img src={logo} className={"logo"} alt={"missingimg"}/></Navbar.Brand>
                </Navbar>
                </div>
                {/*<NavLink to={"/Chat"}>*/}
                <div  style={{}}>
                    <div style={
                        {

                        position: "absolute", top: 0, left : 0,
                    }} onClick={()=>this.handleChat(450)} className={this.state.chatBlinker?"chatIcon blinkerss":" chatIcon"}>
                        <FaCommentAlt/>
                        Chat
                    </div>
                {/*</Button>*/}
                </div>
                {/*<NavLink/>*/}
                <Nav className={"Navigate"}>

                    {/*<NavLink to={"/Chat"}>*/}
                    {/*    <div style={*/}
                    {/*        {*/}

                    {/*            position: "absolute", top: 0, left : 0,*/}
                    {/*        }} onClick={()=>this.handleChat(450)} className={this.state.chatBlinker?"chatIcon blinkerss":" chatIcon"}>*/}
                    {/*        <FaCommentAlt/>*/}
                    {/*        Chat*/}
                    {/*    </div>    */}
                    {/*</NavLink>*/}

                    <NavLink className={"logo_text"} to="/cameras" activeStyle={{color: 'red',margin:"0 5px",}}>
                    <div className={"iconItem "} onClick={()=>{this.activeIcon("cameras")}}>
                        <FaVideo  className={this.state.blink?" icon blinkerss red":"iconItem"} size={grow} style={{color:this.state.camerasActive?"red":null}}/>
                            Cameras
                    </div>
                    </NavLink>
                    <NavLink className={"logo_text"} to="/detections" activeStyle={{color: 'red',margin:"0 5px",}}>
                    <div className={"iconItem"} onClick={()=>{this.activeIcon("detections")}}
                        style={{paddingBottom : '10px'}}
                    >
                        <FaExclamation  className={"iconItem"} size={grow} style={
                            {marginLeft:"20px" ,color:this.state.detectionsActive?"red":null} }/>
                       Detections
                    </div>
                    </NavLink >


                    <Navbar.Brand className={"Brand"}><img src={logo} className={"logo"} alt={"missingimg"}/></Navbar.Brand>


                    <NavLink className={"logo_text"} to={"/Admin"} activeStyle={{color: 'red',margin:"0 5px",}}>
                    <div className={"iconItem"} onClick={()=>{this.activeIcon("admin")}}>
                        <FaInfo  className={"iconItem"} size={grow} style={{marginLeft:"10px",color:this.state.adminActive?"red":null}}/>
                        Admin
                    </div>
                    </NavLink>
                    <a className={"logo_text"} href="/" onClick={this.state.logOut}>
                    <div className={"iconItem"}>
                        <FaUser  className={"iconItem"} size={grow} style={{marginLeft:"15px"}}/>
                        Sign Out
                    </div>
                    </a>
                        <p className={"logo_text define"}>Welcome, {this.props.username} ({this.props.access}) &nbsp;&nbsp;&nbsp;&nbsp; </p>
                </Nav>
            </Navbar>
            </div>
                <Route path="/" exact  render={(props)=><Suspense fallback={<Loader> </Loader>}><CardDetections scroll={this.state.scroll} handleChat={this.state.handleChat} num={this.state.chatWidth} username={this.props.username} {...props}/> </Suspense> }/>
                <Route path="/Admin"  exact render={(props)=><Suspense fallback={<Loader> </Loader>}><Admin {...this.props} username={this.props.username} {...props} access={this.props.access} /> </Suspense> }/>
                <Route path="/Chat"  render={(props)=><Suspense fallback={<Loader> </Loader>}><Chat handleChat={this.state.handleChat} num={this.state.chatWidth} {...props} /> </Suspense> }/>
                <Route path="/detections" exact  render={(props)=><Suspense fallback={<Loader> </Loader>}><CardDetections scroll={this.state.scroll} handleChat={this.state.handleChat} num={this.state.chatWidth} username={this.props.username} {...props}/> </Suspense> }  />
                {/*<Route path="/cameras"  exact render={(props)=><Cameras {...props} token={this.props.token}/>} />*/}
                <Route path="/cameras"  exact render={(props)=><Suspense fallback={<Loader> </Loader>}><Cameras {...props} token={this.props.token}/></Suspense>} />
                <Route path="/listView" exact  render={(props)=><Suspense fallback={<Loader> </Loader>}><ListView {...props} /> </Suspense>}/>
            </Router>
        );
    }
}

export default HomePage;
