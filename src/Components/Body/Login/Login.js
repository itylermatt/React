import React, {Component} from 'react';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Navbar from "react-bootstrap/Navbar";
import logo from "../../../assets/images/UltLogo.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from 'axios';

class Login extends Component{
    state={
        username:"",
        password:'',
    };
    _isMounted= true;

    handleSubmit=(e)=>{
        console.log("sending data:\n", this.state.username , "\n",this.state.password);
        this.props.credentials(this.state.username,this.state.password);
        axios.post("http://192.168.8.109:3000/",{password:this.state.password,username:this.state.username}).then(res=>{
            console.log("we have a response\n", res.data);
            if(res.data.done===true && this._isMounted){
                this.props.change();
            }
        }).catch(err=>console.log(err));
        console.log("submit pressed");
        e.preventDefault();
    };

    componentWillUnmount() {
        this._isMounted=false;
    }

    handleChange = (e,type)=>{
        if(type==="u"){
            this.setState({username:e.target.value});
        }else if(type==="p"){
            this.setState({password:e.target.value});
        }
        console.log("user : ", this.state.username);
        console.log("p/w : ", this.state.password);
    };
    render() {
        return(
                <Auxilliary className={"bod"}>
                <header>
                    <Navbar bg="dark" variant="dark" className={"ity large justify-content-center nav"} justify={"true"}>
                        <Navbar.Brand className={"Login"}><img src={logo} className={"login"} alt={"missingimg"}/>
                        </Navbar.Brand>
                    </Navbar>
                </header>
                    <div className={"loginForm fadeIn first"}>
                    <Form onSubmit={(e)=>{this.handleSubmit(e)}}>
                        <Form.Group controlId="formBasicEmail" >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username/email" autoFocus ref={this.state.username}
                                onChange={(e)=>this.handleChange(e,"u")}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={this.state.password}
                                          onChange={(e)=>this.handleChange(e,"p")}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                        <Button variant="success" type="submit">
                            SignUp
                        </Button>
                    </Form>
                    </div>
                <div className={"Foot"}>
                    <div>
                        <img src={logo} className={"login"} alt={"missingimg"}/>
                    </div>
                </div>
                </Auxilliary>
        );
    }
}

export default Login;