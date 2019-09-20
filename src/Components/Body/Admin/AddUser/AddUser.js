import React , {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import urls from '../../../../urls/url';
import ls from 'local-storage';

class AddUser extends Component{

    state = {
        username:"",
        password:"",
        retypePassword:"",
        estate:"",
        admin:false,
        guard:false,
        ultrasense:false,
        file: null,
        token : null,
        loading:false,
    };

    resetValues = ()=>{
        this.setState({
            username:"",
            password:"",
            retypePassword:"",
            estate:"",
            admin:false,
            guard:false,
            ultrasense:false,
            file: null,
            loading:false,
        });
    };

    componentDidMount() {
        let token = ls.get('token');
        this.setState({token:token});
    }

    handleChange = (e,type)=>{
        switch(type){
            case "u":
                this.setState({username:e.target.value});
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
            case "photo":
                this.setState({file : e.target.files[0]});
                break;
            default:
                alert("Undefined Reference")
        }
    };

    handleForm = (e)=>{
        e.preventDefault();
        if(this.state.username===""){
            alert("please fill in all fields");
            return;
        }
        if(this.state.password !== this.state.retypePassword || this.state.password===""){
            alert("Passwords do not match");
            return;
        }

        let send = {
            username: this.state.username,
            password: this.state.password,
            // estate:this.state.estate,
            estate:"default",
            guard:this.state.guard,
            admin:this.state.admin,
            ultrasense:this.state.ultrasense,
            authenticated:true,
            type:"addUser",
            token:ls.get("token"),
        };
        this.setState({loading:true});
        axios.post(urls.url("admin"),send).then(
            res=>{
                if(res.data.sent ===false)
                    alert("Either User exists or something went wrong... Please try again!");
                else
                    alert("User has been added");
                this.resetValues();
                console.log('got back a response');
                this.props.refresh();
            }
        ).catch(e=>{console.log(e);})
    };

    render() {

        if(this.state.loading === true){
            return(<div>Loading...</div>);
        }
        return(

            <div style={{margin: "50px"}}>
                <Form onSubmit={e=>this.handleForm(e)}>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            User
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control  type={"text"} placeholder={"Enter Username"}
                                           onChange={e=>this.handleChange(e,'u')}
                                           autoFocus
                                           value={this.state.username}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Password"
                                          onChange={e=>this.handleChange(e,'p')}
                                          value={this.state.password}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Retype Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Retype Password"
                                          onChange={e=>this.handleChange(e,'r')}
                                          value={this.state.retypePassword}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group style={{margin:"0 14%", float:"left",}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type={"checkbox"} id={"Admin"} onChange={(e)=>this.handleChange(e,"admin")} checked={this.state.admin}/>
                        <label htmlFor={"Admin"} >Admin</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type={"checkbox"} id={"Guard"} onChange={(e)=>this.handleChange(e,"guard")} checked={this.state.guard}/>
                        <label htmlFor={"Guard"}>Guard</label>
                        <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Access To?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type={"checkbox"} id={"Ultrasense"} onChange={(e)=>this.handleChange(e,"ultrasense")} checked={this.state.ultrasense}/>
                        <label htmlFor={"Ultrasense"}>Ultrasense App</label>
                    </Form.Group>
                    <br/>
                    <Button type={"submit"} style={{float : "left", marginTop : "40px", marginLeft :"4%"}}> Submit</Button>
                </Form>
            </div>

        );
    }
}

export default AddUser;

///TODO : Adding user just says loading after