import React,{Component} from 'react';
import Auxilliary from '../../../../hoc/Auxilliary/Auxilliary';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CardDetections.css';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import {FaBars} from "react-icons/fa";
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';

class CardDetections extends Component{

    date = new Date().getTime();
    mount = false;
    state={
        modalNumber:0,
        show:false,
        detections:null,
        alerts:null,
        locate:null,
        mount:false,
        display:true,
    };

    handleDisplay = ()=>this.setState({display:!this.state.display});

    handleHide = ()=>{
        let temp = this.state.show;
        this.setState({show:!temp});
    };

    handleClick = (index)=>{
        console.log(" item clicked : ", index);
        this.setState({show:!this.state.show,modalNumber:index});
    };

    componentDidMount() {
        this.mount = this.state.mount;
        if(this.mount===false){
            axios.get("http://192.168.8.109:3000/gallery").then(res=>{
                // console.log("got a response\n",res.data.alerts);
                this.setState({detections:[...res.data.detections], alerts: [...res.data.alerts],locate:[...res.data.locate]});
                console.log("state detections: \n,",this.state.detections);
                console.log("rendering");
            }).catch(err=>console.log(err));
        }else{
            // this.mount = false;
            console.log("not rerendering");
        }

    }

    handleDate = (when)=>{
        // alert("hello world");
        console.log("when came through as : \n",when);
        axios.get("http://192.168.8.109:3000/gallery",{params:{
            date:when
        }}).then((res)=>{
            console.log(res);
            // console.log("got a response\n",res.data.alerts);
            this.setState({mount:true,detections:[...res.data.detections], alerts: [...res.data.alerts],locate:[...res.data.locate]});
            // console.log("state alerts: \n,",this.state.alerts);
        }).catch(err=>console.log(err));
    };

    render() {
        let modNum = this.state.modalNumber;
        let rend =this.state.alerts? this.state.alerts[modNum]:0;
        console.log("rend is : ", rend);
        let modal =(
            <Modal  show={this.state.show} onHide={this.handleHide} className={"modalItem"}>
                <Modal.Header closeButton>
                    <Modal.Title style={{textAlign:"center"}}>{rend.camera_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <img src={"data:image/jpg;base64,"+rend.image_ref} className={"modalImage"} alt={"missing"}/>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <div>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                {
                                    this.state.detections?this.state.detections.map((item,index)=>{
                                        return (
                                            <Button key={index} variant={"outline-info"}>{item.type}</Button>
                                        );
                                    }):null
                                }
                            </InputGroup.Prepend>
                            <FormControl aria-describedby="basic-addon1" placeholder={"Enter new"}/>
                        </InputGroup>

                        <br/>
                        <Button variant="success">Ok</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        );

        let temp = this.state.alerts;

        const listItems = temp? temp.map((item,index)=>{
            item.image_date = new Date(item.image_date);

            let hours = item.image_date.getHours()<10?"0" + item.image_date.getHours() : item.image_date.getHours()+ ":";
            let minutes =item.image_date.getMinutes()<10?"0" + item.image_date.getMinutes() : item.image_date.getMinutes()+ ":";
            let seconds =item.image_date.getSeconds()<10?"0" + item.image_date.getSeconds() : item.image_date.getSeconds();

            let date = item.image_date.getDate()<10? "0" + item.image_date.getDate(): item.image_date.getDate();
            let month = item.image_date.getMonth()+1<10? "0" + (item.image_date.getMonth()+1): (item.image_date.getMonth()+1) ;
            let fullYear = item.image_date.getFullYear()<10? "0" + item.image_date.getFullYear(): item.image_date.getFullYear();

            return(
                <Auxilliary>
                <Alert key={index} variant={"dark"} style={{width:"100%",height:"80px",margin:"1px",borderRadius:'20px'}}>
                    <div style={{float:"left"}}>
                        <Alert.Link to="#">{item.camera_location}</Alert.Link>
                    </div>
                    <br/>
                    <div style={{float:"left"}}>
                        <div>{
                            hours+minutes+seconds
                            + "       "+
                            date+"\\"+month+"\\"+ fullYear+ "-Human Detected"
                        }</div>
                    </div>
                </Alert>
                </Auxilliary>
            );
        }):null;

        const items =temp? temp.map((item,index)=>{
            let url = "data:image/jpg;base64,"+item.image_ref ;
            item.image_date = new Date(item.image_date);

            let hours = item.image_date.getHours()<10?"0" + item.image_date.getHours() : item.image_date.getHours()+ ":";
            let minutes =item.image_date.getMinutes()<10?"0" + item.image_date.getMinutes() : item.image_date.getMinutes()+ ":";
            let seconds =item.image_date.getSeconds()<10?"0" + item.image_date.getSeconds() : item.image_date.getSeconds();

            let date = item.image_date.getDate()<10? "0" + item.image_date.getDate(): item.image_date.getDate();
            let month = item.image_date.getMonth()+1<10? "0" + (item.image_date.getMonth()+1): (item.image_date.getMonth()+1) ;
            let fullYear = item.image_date.getFullYear()<10? "0" + item.image_date.getFullYear(): item.image_date.getFullYear();

            return(
                <Card className={"Card"} key={index} style={{borderRadius: "15px"}}>
                    <Card.Header>{item.camera_name}</Card.Header>
                    <img
                        src={url}
                        className="img-fluid img"
                        alt="dsvdv"
                    />
                    {/*<Card.Img variant="top" src={"data:image/jpg;base64"+item.image_ref} className={"image"}/>*/}
                    <Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <div style={{float:"left"}}>
                                    {hours+
                                    minutes+
                                    seconds}
                                </div>
                                <div style={{float: "right"}}>
                                    {
                                        date +"\\"+  month +"\\"+ fullYear
                                    }
                                </div>
                                <br/>
                                <div style={{float:"left"}}>
                                    {item.camera_location}
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button variant="primary">Human</Button>
                                <Button variant="danger" onClick={()=>this.handleClick(index)}>Not Human</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>
            );
        }):null;

     return(
         <Auxilliary >
             {this.state.detections?
                 <Auxilliary>
                 <div className={"listIcon"}>
                    <div style={{float:"left", padding:"15px 10px"}}>
                        <FaBars style={{margin:"0 20px"}} onClick={this.handleDisplay}/>
                        <Button type={"button"} variant={"outline-danger"} onClick={()=>{this.handleDate("today")}} >today</Button>
                        <Button variant={"outline-danger"} onClick={()=>{this.handleDate("24hour")}}>24hr</Button>
                        <Button variant={"outline-danger"} onClick={()=>{this.handleDate("yesterday")}}>Yesterday</Button>
                        <Button variant={"outline-danger"} onClick={()=>{this.handleDate("week")}}>Last Week</Button>
                        <Button variant={"outline-danger"} onClick={()=>{this.handleDate("3week")}}>Last 3 weeks</Button>
                        <Button variant={"outline-danger"} onClick={()=>{this.handleDate("100")}}>Latest 100</Button>
                        <Button variant={"outline-danger"} onClick={()=>{this.handleDate("100")}}>Custom</Button>
                        {/*<Dropdown styl={{}}>*/}
                        {/*    <Dropdown.Toggle variant="success" id="dropdown-basic">*/}
                        {/*        Dropdown Button*/}
                        {/*    </Dropdown.Toggle>*/}
                        {/*    <Dropdown.Menu>*/}
                        {/*        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
                        {/*    </Dropdown.Menu>*/}
                        {/*</Dropdown>*/}
                    </div>
                 </div>
                     <br/>
                     <br/>
                     <br/>
                 <div className={'cardView'} style={{display: this.state.display?"flex":"none"}}>
                     {items}
                     {modal}
                 </div>
                     {!this.state.display?
                         <Auxilliary >
                             <br/>
                             <br/>
                             {listItems}
                         </Auxilliary>
                         :null}

                 </Auxilliary>
                     :<div>Loading...</div>}
         </Auxilliary>
     );
 }
}

export default CardDetections;