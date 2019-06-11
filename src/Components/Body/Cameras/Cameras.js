import React, {Component} from 'react';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
class Cameras extends Component{

    state= {
        cameras:null,
        show:false,
    };

    handleModal = ()=>{
        this.setState({show:true});
    };

    componentDidMount() {
        axios.get("http://192.168.8.109:3000/devices",{
            params:{hello:"world"}
        }).then(res=>{

            this.setState({cameras:res.data.devices});
        }).catch(err=>{alert("got an error\n"+ err); console.log("inside error")});
    }

    render() {
        let temp = this.state.cameras;
        const cams =temp? temp.map((item,index)=>{
            return(
                <Card className={"Card"} key={index} style={{borderRadius:"15px"}}>
                    <Card.Header>{item.device_name}</Card.Header>
                    <Card.Img variant="top" src={"https://cctvdirect.co.uk/CCTVDirect/media/CCTV-Direct-Media/UNV-IP-PTZS.jpg?ext=.jpg"} className={"image"}/>
                    <Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>{item.device_descript}</ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>
            );
        }):null;

        return(
            <Auxilliary>

                <Modal  show={this.state.show} onHide={this.handleHide} className={"modalItem"}>
                    <Modal.Header closeButton>
                        <Modal.Title>ADD DEVICE</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            FORM
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="success">Submit</Button>
                        <Button variant="success">Cancel</Button>
                    </Modal.Footer>
                </Modal>

                {this.state.cameras?
                <Auxilliary>
                    <div className={"cardView"}>
                        {cams}
                    </div>
                    <div className={"addDevice"}>
                        <Button variant={"secondary"} onClick={this.handleModal} className={"btn-block"} >Add Device</Button>
                    </div>
                </Auxilliary>
                    : <div>Loading...</div>}
            </Auxilliary>
        );
    }
}
export default Cameras;