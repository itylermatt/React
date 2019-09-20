import React, {Component} from 'react';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import Loader from '../../Loader/Loader';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import url from '../../../urls/url'
import {FaLocationArrow} from 'react-icons/fa'
import {Link,NavLink,} from 'react-router-dom';
import Maps from '../../../hoc/Maps/Maps';
import './Cameras.css';
import ls from 'local-storage';

class Cameras extends Component{

    state= {
        cameras:null,
        alive:null,
        show:false,
        DeviceName:null,
        DeviceLocation:null,
        DeviceIp:null,
        markers:{},
        modalIndex:0,
        load : true,
        token: null,
    };

    handleHide=()=>{
        this.setState({show:false});
    };

    handleModal = ()=>{
        this.setState({show:true});
    };

    componentDidMount() {
        let token = ls.get('token');
        this.setState({token : token});
        axios.get(url.url("devices"),{
            params:{hello:"world", token : token}
        }).then(res=>{
            // console.log("Component did mount cameras.js");
            if(res.data.cameras === null){
                this.setState({load: false})
            }
            else{
                this.setState({cameras:res.data.devices,alive:res.data.alive, load : false});
            }
        }).catch(err=>{alert("got an error\n"+ err); console.log("inside error")});
    }

    // handleModalChange = (e, type)=>{
    //     if(type==="Name"){
    //         console.log("name change to :\n");
    //         console.log(e.target.value);
    //         this.setState({DeviceName: e.target.value});
    //     }else if(type==="Location"){
    //         console.log("location change to :\n");
    //         console.log(e.target.value);
    //         this.setState({DeviceLocation: e.target.value});
    //     }else if(type==="Ip"){
    //         console.log("ip change to :\n");
    //         console.log(e.target.value);
    //         this.setState({DeviceIp: e.target.value});
    //     }else{
    //         console.log("\ndont know what came through\n");
    //     }
    // };

    openLocation=(index)=>{
        // this.props.history.push("/Chat");
        this.setState(prev=>{return {show:!prev.show, modalIndex: index}});
    };

    render() {
        let temp =this.state.cameras?[...this.state.cameras] : null;
        let online = this.state.alive ?[...this.state.alive]: null;
        let index = this.state.modalIndex? this.state.modalIndex:0;
        let mod =!this.state.cameras?null: (
            <Modal
                size={"lg"}
                show={this.state.show}
                onHide={this.handleHide}
                className={"modalItem large"}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Camera Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        style={{width:"200px",height:"320px"}}
                    >
                        <Maps
                            style={{width:"100px"}}
                            lat={temp[index].latitude}
                            long={temp[index].longitude}
                            title={temp[index].camera_location}
                            name={temp[index].camera_name}
                            online={online[index]}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        );

        const cams =temp? temp.map((item,index)=>{
            return(
                <Auxilliary>
                <Card className={"Card"} key={index} style={{borderRadius:"15px"}}>
                    <Card.Header>{item.camera_name}</Card.Header>
                    <Card.Img variant="top" src={"https://cctvdirect.co.uk/CCTVDirect/media/CCTV-Direct-Media/UNV-IP-PTZS.jpg?ext=.jpg"} className={"image"}/>
                    <Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <div>
                                    {item.camera_location}
                                    <div>
                                        <FaLocationArrow onClick={()=>this.openLocation(index)}/>
                                        <span style={{
                                                backgroundColor:this.state.alive[index]?"green": "red",borderRadius:"50%",display:"flex",height:"15px",width:"15px",
                                                flexDirection: "row", alignSelf: "flex-start",position:"absolute",right: "15px",bottom: "23px"
                                            }}
                                        />
                                        <span style={{
                                            position:"absolute", right:"1px", bottom:"1px", margin:'0', padding:'0',border:'0'
                                        }}>
                                            <p style={{margin:'0'}}>{this.state.alive[index]? "online" : "offline"}</p>
                                        </span>
                                    </div>
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>
                </Auxilliary>
            );
        }):null;

        const noItem = this.state.cameras===null || this.state.cameras.length===0?<div>
            No Devices
        </div> : null;

        return(
            <Auxilliary>
                {this.state.load===false?
                <Auxilliary>
                    <div className={"cView"}>
                        {noItem}
                        {cams}
                        {mod}
                    </div>
                    <div className={"addDevice"}>
                    </div>
                </Auxilliary>
                    : <Loader> </Loader>}
            </Auxilliary>
        );
    }
}
export default Cameras;

///TODO : Cameras just loading when there is no devices listed