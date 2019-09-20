import React,{Component, lazy , Suspense} from 'react';
import Auxilliary from '../../../../hoc/Auxilliary/Auxilliary';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CardDetections.css';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import {FaBars, FaThLarge} from "react-icons/fa";
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from "react-bootstrap/Form";
import Loader from '../../../Loader/Loader';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Spinner from 'react-bootstrap/Spinner';
import url from "../../../../urls/url";
import Chat from '../../Chat/Chat';
import Autocomplete from '../../../../hoc/Autocomplete/Autocomplete';
// import LazyLoad from 'react-lazy-load';
import Img from 'react-image';
import ls from 'local-storage';
import {NAMES} from './FalseDetectionsList';
import Select from "react-select";

const LazyLoad = lazy(()=>import('react-lazy-load'));

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
        modalText:"",
        modalInput:"Enter Object",
        verified:false,
        // filter:null,
        filter:"today",
        customModal:null,
        fromDate:null,
        fromTime:null,
        toDate:null,
        toTime:null,
        spin:false,
        overlay:false,
        chatTextArea:false,
        showDetectionModal : false,
        detectionNumber:0,
        probe:true,
        counter:0,
        maxCounter: 20,
        quickSpin : false,
        token: null,
        renderDetect : null,
        rend : null,
        interval : null,
        currentButton : "today",
    };
    pageRef = React.createRef();
    sideRef = React.createRef();

    submitCustomDate = ()=>{
        if(this.state.fromDate ===null|| this.state.fromTime===null||this.state.toDate===null||this.state.toTime===null){
            alert("Please Fill in all fields");
            return;
        }
        this.setState({spin:true,overlay:false});
        axios.get(url.url("gallery"),{params:{
                date:"custom",
                when:{
                    from:this.state.fromDate,
                    to:this.state.toDate,
                    time:this.state.toTime,
                },
                token: this.state.token,
            }}).then((res)=>{
            this.setState({mount:true,detections:[...res.data.detections], alerts: [...res.data.alerts],locate:[...res.data.locate],spin:false,});
        }).catch(err=>console.log(err));
    };

    changeCustomDate = (e,type)=>{
        if(type==="fromDate") {
            this.setState({fromDate:e.target.value});
        }else if(type==="fromTime") {
            this.setState({fromTime:e.target.value});
        }else if(type==="toDate") {
            this.setState({toDate:e.target.value});
        }else if(type==="toTime") {
            this.setState({toTime:e.target.value});
        }else{}
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
               // return nextState!==this.state || nextProps!==this.props;
        // alert(JSON.stringify(nextProps));
        return true;
    }

    verify=(index)=>{
        this.setState({
            quickSpin: true,
        });
        let rend = this.state.alerts[index];
        let id = rend._id;
        let idd = "Human";
        let reff = this.state.locate[index];
        let doc = id;
        let username = this.props.username;
        axios.post(url.url("gallery"),{id:idd, ref:reff, docName:doc,username:username,time:new Date(),token : this.state.token}).then(res=>
        {
            this.handleDate(this.state.filter);
        this.setState({quickSpin: false});
        });
        this.setState({verified:!this.state.verified});
    };

    handleModalSubmit = ()=>{
        this.setState({quickSpin : true});
        let modNum = this.state.modalNumber;
        let rend = this.state.tempAlerts[this.state.modalNumber];
        let idd = this.state.modalText;
        let reff = this.state.tempLocate[modNum];
        let doc = rend._id;
        axios.post(url.url("gallery"),{id:idd,ref:reff,docName:doc, username:this.props.username, time:new Date(), token : this.state.token}).then(
            (res)=>{
                let temp = this.state.show;
                this.setState({show:!temp, quickSpin : false});
                this.handleDate(this.state.filter);
        }).catch(
            err=>console.log(err)
        );
    };

    handleModal = (e,type)=>{
        switch (type) {
            case "clear":
                this.setState({modalText:""});
                break;
            case "ref":
                console.log(e);
                this.setState({modalText:e.target.value});
                break;
            case "refSelect":
                // alert(JSON.stringify(e))
                this.setState({modalText : e.label});
                break;
            default:
                console.log("change value to : ",e.target.value);
                this.setState({modalText:e.target.value});
        }
    };

    handleDisplay = ()=>{
        console.log("display changing");
        let temp = this.state.display;
        this.setState({display:!temp});
    };

    handleHide = ()=>{
        let temp = this.state.show;
        this.setState({show:!temp});
    };

    handleClick = (index)=>{
        let tempAlerts = this.state.alerts;
        let tempDetections = this.state.detections;
        let tempLocate = this.state.locate;
        let rend = tempAlerts[index];
        this.setState({show:!this.state.show,modalText:"",modalNumber:index,tempAlerts: tempAlerts, tempDetections:tempDetections,tempLocate:tempLocate, rend :  rend});
    };

    showImageDetection = (index)=>{
        // alert("Modal called here");
      let tmp = this.state.showDetectionModal;
      let renderDetect = this.state.alerts[index];
      this.setState({showDetectionModal : !tmp,detectionNumber:index, renderDetect : renderDetect});
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        // alert(JSON.stringify(nextProps ));
        // alert(JSON.stringify(this.props ));
        if(this.props.handleChat!==nextProps.handleChat || this.props.num!== nextProps.num) {
            // alert("we are in" + this.props.handleChat);
            if (nextProps.handleChat){
                this.handleChat(nextProps.num);
                if(nextProps.num===0){
                    this.setState({chatTextArea:false});
                }else{
                    this.setState({chatTextArea:true});
                }
                // alert("data gotten");
            }
        }
    }

    componentDidMount() {

        // console.log(this.props);
        this.mount = this.state.mount;
        let token = ls.get('token');
        this.setState({token:token});

        if(this.mount===false){

            axios.get(url.url("gallery"),{params:{token:token}}).then(res=>{
                console.log(res);
                if(res.data.alerts === null){
                    this.setState({detections:[], alerts: [],locate:[],mount:true});
                }else{
                    this.setState({detections:[...res.data.detections], alerts: [...res.data.alerts],locate:[...res.data.locate],mount:true});
                }
                this.pageRef.current.style.paddingTop = "2%";
                this.mount=true;
            }).catch(err=>console.log(err));
        }else{}

        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.interval = setInterval(()=>{
            let fill = this.state.filter;
            if(this.mount===true && this.state.probe){
                if(fill==="today"){
                    // console.log("filter is set to : " , this.state.filter );
                    axios.get(url.url("gallery"),{params:{
                            date:this.state.filter
                        }}).then((res)=>{
                            if(res.data.detections === null || res.data.alerts=== null || res.data.locate === null){
                                // this.setState({detections:[], alerts: [],locate:[]});
                            }else{
                                this.setState({mount:true,detections:[...res.data.detections], alerts: [...res.data.alerts],locate:[...res.data.locate]});
                            }
                    }).catch(err=>console.log(err));
                }
            }
        },5000);
    }

    handleDate = (when)=>{
        if(when !== "today"){
            this.setState({spin:true,filter:when,mount:false,probe:false, currentButton  : when});
            clearInterval(this.state.interval);
        }
        else
            this.setState({spin:true,filter: when,mount:false,probe:true, currentButton : when});
        this.mount = false;
        axios.get(url.url("gallery"),{params:{
                date:when,
                token : this.state.token,
            }}).then((res)=>{
            // res.data.map(item=>{
            //     console.log(JSON.stringify(item));
            //     return null;
            // });
            // console.log(res);
            this.mount=true;
            this.setState({mount:true,detections:[...res.data.detections], alerts: [...res.data.alerts],locate:[...res.data.locate],filter:when,spin:false});
            // console.log('our new filter is :\n',this.state.filter);
        }).catch(err=>console.log(err));
    };

    componentWillUnmount() {
        console.log("component unmounting now...(Card Detections.js)");
        this.mount = false;
    }

    handleModalButton = (item)=>{
        this.setState({modalText:item,modalInput:item});
    };

    overlayShow = ()=>{
        this.setState({overlay:true});
    };

    handleChat = (num)=>{
        this.sideRef.current.style.width = num + "px";
        this.pageRef.current.style.marginLeft = num + "px";
    };

    detectionModalToggle = ()=>{
        let tmp = this.state.showDetectionModal;
        this.setState({showDetectionModal : !tmp});
    };

    handleButtonChange = (button)=>this.setState({currentButton : button});

    render() {
        let spinner = <Spinner animation="grow"/>;
        let tempAlerts = this.state.alerts;
        let modNum = this.state.modalNumber;

        let rend =this.state.tempAlerts? this.state.tempAlerts[modNum]:0;
        let renderDetect =tempAlerts? tempAlerts[this.state.detectionNumber]:0;
        console.log(" render Detect :  " , renderDetect);
        // console.log("Modal Detection : ", this.state.showDetectionModal);
        // let detection = renderDetect ===0 || renderDetect === null || renderDetect=== undefined ? null: (
        if(this.state.locate && this.state.detectionNumber){
            // alert(this.state.locate[this.state.detectionNumber]);
            alert(process.cwd());
        }

        let detection = this.state.renderDetect ===0 || this.state.renderDetect === null || this.state.renderDetect=== undefined ? null: (
            <Modal
                size="lg"
                show={this.state.showDetectionModal}
                onHide={this.detectionModalToggle}
                aria-labelledby="example-modal-sizes-title-lg"
                className={"modalItem"}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {this.state.renderDetect.camera_location !== undefined? this.state.renderDetect.camera_location : "unknown"}
                        - {this.state.renderDetect.camera_name? this.state.renderDetect.camera_name : "unknown camera"}
                        {/*{renderDetect.camera_location !== undefined? renderDetect.camera_location : "unknown"} - {renderDetect.camera_name? renderDetect.camera_name : "unknown camera"}*/}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Img
                        // src={"data:image/jpg;base64,"+renderDetect.image_ref}
                        src={"data:image/jpg;base64,"+this.state.renderDetect.image_ref}
                        style={{width:"100%"}}
                    />
                    {/*<h5>IMG</h5>*/}
                    {/*<img*/}
                    {/*    src={"http:\\localhost:3000" +this.state.locate[this.state.detectionNumber]}*/}
                    {/*    style={{width:"100%"}}*/}
                    {/*    alt={"image missing"}*/}
                    {/*/>*/}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );

        let modal =(
            <Modal  show={this.state.show} onHide={this.handleHide} className={"modalItem"}>
                <Modal.Header closeButton>
                    <Modal.Title style={{textAlign:"center"}}>{rend.camera_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Img src={"data:image/jpg;base64,"+rend.image_ref} className={"modalImage"} alt={"missing"}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <h6>Please select or input detection</h6>
                                {
                                    this.state.tempDetections?this.state.tempDetections.map((item,index)=>{
                                        return (
                                            <Button key={index} style={{borderRadius:"10px"}} variant={"outline-info"} onClick={()=>this.handleModalButton(item.type)}>{item.type}</Button>
                                        );
                                    }):null
                                }
                            </InputGroup.Prepend>
                        </InputGroup>
                        <InputGroup>
                            <div style={{width:"100%"}}>
                            <Select
                                style={{width:"100%"}}
                                options={NAMES}
                                onChange={e=>{this.handleModal(e,"refSelect")}}
                                placeholder={"False Detections Dropdown"}
                            />
                                <label htmlFor={"typing"}>Type Here</label>
                            <input type={"text"} id={"typing"} value={this.state.modalText} onChange={(e)=>{this.handleModal(e, "ref")}}
                                style={{width:"80%"}}
                            />
                            </div>
                        </InputGroup>
                        <br/>
                        <Button variant="success" onClick={this.handleModalSubmit}>Ok</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        );
        let sideNavChat = (
            <div ref ={this.sideRef} className={"sidenav"}>
                <Chat chatTextArea={this.state.chatTextArea} username={this.props.username} scroll={this.props.scroll}/>
            </div>
        );
        let temp = this.state.alerts;

        const listItems = temp? temp.map((item,index)=>{
            // item.image_date = new Date(item.image_date + 2*60*60*1000);
            item.image_date = new Date(item.image_date);
            let imageDetect = "data:image/jpg;base64,"+item.image_ref ;

            let hours = item.image_date.getHours()<10?"0" + (item.image_date.getHours()).toString() + ":" : (item.image_date.getHours()).toString()+ ":";
            let minutes =item.image_date.getMinutes()<10?"0" + item.image_date.getMinutes().toString() + ":" : item.image_date.getMinutes().toString()+ ":";
            let seconds =item.image_date.getSeconds()<10?"0" + item.image_date.getSeconds().toString() : item.image_date.getSeconds().toString();

            let date = item.image_date.getDate()<10? "0" + item.image_date.getDate().toString(): item.image_date.getDate().toString();
            let month = item.image_date.getMonth()+1<10? "0" + (item.image_date.getMonth()+1).toString(): (item.image_date.getMonth()+1).toString() ;
            let fullYear = item.image_date.getFullYear()<10? "0" + item.image_date.getFullYear().toString(): item.image_date.getFullYear().toString();
            if(index >= this.state.maxCounter){
                return null;
            }

            return(
                <Auxilliary key={index}>
                <Alert key={index} variant={"dark"} style={{width:"100%",height:"80px",margin:"1px",borderRadius:'20px'}}>
                    <div style={{float:"left"}}>
                        <Alert.Link to="#">{item.camera_location} - {item.camera_name}</Alert.Link>
                    </div>
                    <br/>
                    <div style={{float:"left"}}>
                        <div>
                            {
                                date+"\\"+month+"\\"+ fullYear
                                + "       "+
                                hours+minutes+seconds+ "\t\t -Human Detected"
                            }
                            <a href={"#"} onClick={()=>this.showImageDetection(index)}>
                                <Img className={'thumbnail'} src={imageDetect} alt={"Detection"}/>
                            </a>
                        </div>
                    </div>
                </Alert>
                </Auxilliary>
            );
        }):null;

        const items =temp? temp.map((item,index)=>{
            let url = "data:image/jpg;base64,"+item.image_ref ;
            // item.image_date = item.image_date + "";
            item.image_date = new Date(item.image_date);

            let hours = item.image_date.getHours()<10?"0" + item.image_date.getHours() + ":" : item.image_date.getHours()+ ":";
            let minutes =item.image_date.getMinutes()<10?"0" + item.image_date.getMinutes() + ":" : item.image_date.getMinutes()+":";
            let seconds =item.image_date.getSeconds()<10?"0" + item.image_date.getSeconds() : item.image_date.getSeconds();

            let date = item.image_date.getDate()<10? "0" + item.image_date.getDate(): item.image_date.getDate();
            let month = item.image_date.getMonth()+1<10? "0" + (item.image_date.getMonth()+1): (item.image_date.getMonth()+1) ;
            let fullYear = item.image_date.getFullYear()<10? "0" + item.image_date.getFullYear(): item.image_date.getFullYear();
            if(index === this.state.maxCounter){
                return(
                    <div className={"seeMore"} onClick={()=>this.setState({maxCounter:(this.state.maxCounter + 10)})} style={{zIndex : 100}} key={index}>
                        See more ...
                    </div>);
            }else if(index > this.state.maxCounter){
                return null;
            }
            return(
                this.state.quickSpin ? <Loader /> :
                <Card className={"Card"} key={index} style={{borderRadius: "15px"}}>
                    <Card.Header><p style={{textAlign: 'center'}}>{item.camera_name}</p></Card.Header>
                 <Suspense fallback={<Loader/>}>
                       <LazyLoad>
                        <Img
                            onClick={()=>this.showImageDetection(index)}
                            src={url}
                            className="img-fluid img"
                            alt="dsvdv"
                        />
                       </LazyLoad>
                 </Suspense>
                    {/*<Card.Img variant="top" src={"data:image/jpg;base64"+item.image_ref} className={"image"}/>*/}
                    <Card.Body style={{zIndex:5}}>
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
                            </ListGroupItem>
                            <ListGroupItem>
                                <div style={{float:"center"}}>
                                    <p style={{textAlign: "center"}}>{item.camera_location}</p>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <div align={"center"}>
                                    <ButtonGroup aria-label="Basic example">
                                        <Button variant={item.checked?"primary":"success"}
                                                disabled={item.checked}
                                                onClick={()=>this.verify(index)}
                                        >
                                            {item.checked?"Verified":"Human"}
                                        </Button>
                                        <Button variant={item.checked?"primary":"danger"}
                                                disabled={item.checked}
                                                onClick={()=>this.handleClick(index)}
                                        >
                                            {item.checked?item.type: "Other"}
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>
            );
        }):null;


        const popover = (
            <Popover id="popover-basic" title="Please Enter a custom date" style={{width:"750px"}}>
                <label htmlFor="from">From Date</label>
                <input type={"date"} id={"from"} style={{float:"right"}} onChange={(e)=>this.changeCustomDate(e,"fromDate")}/>
                <label htmlFor="from">From Time</label>
                <input type={"time"} style={{float:"right"}} onChange={(e)=>this.changeCustomDate(e,"fromTime")}/>
                <br/>
                <label htmlFor="to">To Date</label>
                <input type={"date"} id={"to"} style={{float:"right"}} onChange={(e)=>this.changeCustomDate(e,"toDate")}/>
                <br/>
                <label htmlFor="from">To Time</label>
                <input type={"time"} style={{float:"right"}} onChange={(e)=>this.changeCustomDate(e,"toTime")}/>
                <br/>
                <Button type={"button"} style={{align:"center",display:"flex",position: "absolute"}} onClick={this.submitCustomDate}>Submit</Button>
            </Popover>
        );
        if(this.state.spin)
            return(<div style={{
                position : "absolute",
                top : "50%",
                bottom : "50%",
                left : "50%",
                right : "50%"
            }}><Loader/></div>);

     return(

         <Auxilliary >
             {this.state.detections?
                 <Auxilliary>
                 <div ref={this.pageRef} className={"pageRef"}>
                     {this.state.spin?spinner:null}
                     {sideNavChat}
                 {/*<div className={"listIcon"} style={{paddingTop: this.props.num?"3%": "0"}}>*/}
                 <div className={"listIcon"}>
                    <div style={{float:"left", padding:"9% 0 10px"}}>
                        {
                            this.state.display?
                                <FaBars style={{margin:"0 20px"}} onClick={this.handleDisplay}/>:
                                <FaThLarge style={{margin:"0 20px"}} onClick={this.handleDisplay}/>
                        }
                        <Button type={"button"} variant={"outline-danger"} onClick={()=>{this.handleDate("today")}}
                                style={{border : this.state.currentButton === "today" ? '3px solid red':null}}
                        >
                            {this.state.currentButton === "today"? <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />:null}
                            LIVE FEED
                        </Button>
                        <Button variant={ "outline-success"} onClick={()=>{this.handleDate("24hour")}}
                            style={{border : this.state.currentButton === "24hour" ? '3px solid green':null}}
                        >
                            {/*<span style={{borderRadius:"50%", backgroundColor: 'green' }}> 24 </span>*/}
                            24hr
                        </Button>
                        <Button
                            variant={"outline-success"} onClick={()=>{this.handleDate("yesterday")}}
                            style={{border : this.state.currentButton === "yesterday" ? '3px solid green':null}}
                        >Yesterday</Button>
                        <Button
                            variant={"outline-success"} onClick={()=>{this.handleDate("week")}}
                            style={{border : this.state.currentButton === "week" ? '3px solid green':null}}
                        >Last Week</Button>
                        <Button
                            variant={"outline-success"} onClick={()=>{this.handleDate("3week")}}
                            style={{border : this.state.currentButton === "3week" ? '3px solid green':null}}
                        >Last 3 weeks</Button>
                        <Button
                            variant={"outline-success"} onClick={()=>{this.handleDate("100")}}
                            style={{border : this.state.currentButton === "100" ? '3px solid green':null}}
                        >Latest 100</Button>
                        <OverlayTrigger trigger="click" placement="right" overlay={popover} show={false}>
                            <Button
                                variant={"outline-success"} onClick={this.overlayShow}
                                style={{border : this.state.currentButton === "custom" ? '3px solid green':null}}
                            >Custom</Button>
                        </OverlayTrigger>
                    </div>
                 </div>
                     {/*<br/>*/}
                     {/*<br/>*/}
                     {/*<br/>*/}
                     {!this.state.display===true?
                         <Auxilliary>
                             <br/>
                             <br/>e.target
                             <div className={"ListView"}>
                                {listItems}
                                {detection}
                             </div>
                         </Auxilliary>
                         :<div className={'cardView'} style={{display: this.state.display?"flex":"none"}}>
                             {items}
                             {modal}
                             {detection}
                         </div>}
                 </div>
                 </Auxilliary>
                     :<Loader> </Loader>
             }
         </Auxilliary>
     );
 }
}

export default CardDetections;

///TODO : have item show which feed we on e.g Live or yesterday
///TODO : have Live feed run on component did mount
