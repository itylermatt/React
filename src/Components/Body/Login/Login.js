import React, {Component} from 'react';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Navbar from "react-bootstrap/Navbar";
import logo from "../../../assets/images/UltLogo.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import url from '../../../urls/url';
import Loader from "../../Loader/Loader";
import ls from 'local-storage';
import {NotificationContainer , NotificationManager} from 'react-notifications';
import EmergencyCHat from "./EmergencyChat";

class Login extends Component{
    state={
        estate:"",
        username:"",
        password:"",
        retypePassword:"",
        signUp:false,
        spin:false,
        admin:null,
        guard:null,
        ultrasense:null,
        shake:false,
        loadUp: false,
        loadIn:false,
        token : null,
        emergency:false,
    };
    _isMounted= true;

    componentWillUpdate(nextProps, nextState, nextContext) {

    }

    showSpinner = ()=>{
        this.setState({spin:true});
    };

    handleSignUp = ()=>{
        this.setState({signUp:true});
    };

    handleSubmit=(e)=>{
        this.setState({loadUp : true});
        axios.post(url.url(""),{password:this.state.password,username:this.state.username}).then(res=>{
            this.setState({loadUp : false});
            if(res.data.done===true && this._isMounted){
                this.props.credentials(this.state.username , this.state.password, res.data.user);
                ls.set("token", res.data.token);
                this.props.change();
            }else{
                // alert("wrong credentials entered");
                this.setState({shake:false});
                this.setState({spin:false,username: "",password:"",shake:true});
            }
        }).catch(err=>console.log(err));
        e.preventDefault();
    };

    componentWillUnmount() {
        this._isMounted=false;
    }

    handleChange = (e,type)=>{
        switch(type){
            case "u":
                this.setState({username:e.target.value});
                // {NotificationManager.info("Hello World")}
                break;
            case "p":
                this.setState({password:e.target.value});
                break;
            case "r" :
                this.setState({retypePassword:e.target.value});
                break;
            case "e":
                this.setState({estate:e.target.value});
                break;
            case "guard":
                this.setState({guard:e.target.checked});
                break;
            case "ultrasense":
                this.setState({ultrasense:e.target.checked});
                break;
            case "admin":
                this.setState({admin:e.target.checked});
                break;
            default:
                alert("Undefined Reference")
        }
    };

    handleSignUpForm=(e)=>{
        e.preventDefault();
        this.setState({loadUp:true});
        if(this.state.password==="" || this.state.retypePassword==="" || this.state.password ==="" || this.state.password!==this.state.retypePassword){
            if(this.state.password!==this.state.retypePassword || this.state.password===""){
                alert("Please Retype Your Passwords");
            }else{
                alert("Please fill in all fields");
            }
            this.setState({loadUp:false});
            return ;
        }
        let data = {
            username:this.state.username,
            password: this.state.password,
            estate:this.state.estate,
            guard:this.state.guard===null?false:this.state.guard,
            admin:this.state.admin===null?false:this.state.admin,
            ultrasense:this.state.ultrasense===null?false:this.state.ultrasense,
            authenticated:false,
        };
        console.log(data);

        axios.post(url.url("signUp"),{
            data
        }).then(res=>{
            if(res.data.done===false){
                alert("username exists...");
            }else{
                alert("User has been signed up... Contact Admin for Authentication");
            }
            this.setState({username:null,password:null,retypePassword:null,estate:null,guard:null,ultra:null,admin:null, loadUp:false});
        }).catch((e)=>{console.log(e)});
    };
    render() {
        if(this.state.loadUp){
            return <Loader />;
        }
        let signup = (
            this.state.loadUp? <Loader/>:
            <div className={"loginForm fadeIn first"}>
                <Form onSubmit={(e)=>{this.handleSignUpForm(e)}} style={{height:"100px;"}}>
                    <Form.Group controlId="formBasicEmail" style={{margin:"0"}}>
                        <div>
                            <Form.Label >Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username/email" autoFocus ref={this.state.username}
                                      onChange={(e)=>this.handleChange(e,"u")}
                                          autoComplete="email"
                            />
                        </div>
                    </Form.Group>

                    <Form.Group style={{margin:"0"}} controlId="formBasicPassword">
                        <Form.Label >Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={this.state.password}
                                      onChange={(e)=>this.handleChange(e,"p")}
                                      autoComplete="new-password"
                        />
                    </Form.Group>

                    <Form.Group style={{margin:"0"}} controlId="formBasicPassword">
                        <Form.Label >Retype Password</Form.Label>
                        <Form.Control type="password" placeholder="Retype Password" ref={this.state.retypePassword}
                                      onChange={(e)=>this.handleChange(e,"r")}
                                      autoComplete="new-password"
                        />
                    </Form.Group>


                    <Form.Group style={{margin:"0"}}>
                        <input type={"checkbox"} id={"Admin"} onChange={(e)=>this.handleChange(e,"admin")}/>
                        <label htmlFor={"Admin"} >Admin</label>
                        <input type={"checkbox"} id={"Guard"} onChange={(e)=>this.handleChange(e,"guard")}/>
                        <label htmlFor={"Guard"}>Guard</label>
                        <input type={"checkbox"} id={"Ultrasense"} onChange={(e)=>this.handleChange(e,"ultrasense")}/>
                        <label htmlFor={"Ultrasense"}>Ultrasense App</label>
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        SignUp
                    </Button>
                    <Button variant="danger" type="button"  onClick={()=>this.setState({signUp:false})}>
                        Cancel
                    </Button>
                </Form>
            </div>
        );
        if(this.state.emergency){
            return(<EmergencyCHat />);
        }
        return(
                <body className={"bod"}
                      style={
                          {
                              // backgroundImage:"url(https://marketinginsidergroup.com/wp-content/uploads/2018/01/artificial-intelligence-2228610_640.jpg)",
                              // backgroundImage:"url("+ ai + ")",
                              // zIndex: "-100",
                              // filter:"blur(1px)",
                              // grayScale:"90%",
                          }
                      }>
                <Auxilliary>
                <header>
                    <Navbar bg="dark" variant="dark" className={"ity large justify-content-center nav"} justify={"true"} style={{height:"15%"}}>
                        <Navbar.Brand className={"Login"}>
                            <img src={logo} className={"login"} alt={"missingimg"} style={{height:"60px",marginTop:"10px"}}/>
                        </Navbar.Brand>
                    </Navbar>
                </header>
                    {!this.state.signUp?
                     <div className={this.state.shake!==true?"loginForm fadeIn first":"loginForm shake" } style={{
                         backgroundColor:"white",position:"absolute",zIndex: "1000",fontWeight:"bold",
                     }}>
                    <Form onSubmit={(e)=>{this.handleSubmit(e)}}>
                        <Form.Group controlId="formBasicEmail" >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username/email" autoFocus value={this.state.username}
                                onChange={(e)=>this.handleChange(e,"u")}
                                          autoComplete="email"
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.state.password}
                                          onChange={(e)=>this.handleChange(e,"p")}
                                          autoComplete="new-password"
                            />
                        </Form.Group>
                        <Button variant= {this.state.password!=="" ? "primary":"light"} type="submit" onClick={this.showSpinner} disabled={this.state.password===""} style={{border : '1px solid #aaa'}}>
                            {this.state.spin?
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />:null}
                            LogIn
                        </Button>
                        <Button
                            variant="success"
                            type="button"
                            onClick={this.handleSignUp}
                            value={"SignUp"}
                            as={"input"}
                        />
                        <p
                            onClick={()=>this.setState({emergency :true})}
                            style={{display:'flex', right:'0', bottom:'0', position:"absolute", color:'red', cursor :'pointer'}}
                        >Log Issue &nbsp;&nbsp;&nbsp;&nbsp; </p>
                    </Form>
                    </div>:
                        <div>
                            {signup}
                        </div>}
                <div className={"Foot"} style={{height:"60px"}}>
                    <div>
                        <img src={logo} className={"login"} alt={"missingimg"} style={{height:"60px",}}/>
                    </div>
                </div>
                </Auxilliary>
                </body>
        );
    }
}
export default Login;
