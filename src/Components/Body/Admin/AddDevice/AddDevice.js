import React , {Component} from "react";
import Auxilliary from '../../../../hoc/Auxilliary/Auxilliary';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import urls from '../../../../urls/url';
import Loader from '../../../Loader/Loader';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import ls from 'local-storage';

const detectionTypes = [
    {label:"Human",value:1},
    {label:"Boat",value:2},
    {label:"Car",value:3},
    {label:"bicycle",value:4},
    {label:"chair",value:5}
];

const deviceTypes =[
    {label: "Camera", value:1},
    {label: "Switch", value:2},
    {label: "Antenna", value:3},
    // {label: "", value:4},
];

class AddDevice extends Component{

    state={
        token : null,
        name: "",
        location:"",
        address:"",
        longitude:0,
        latitude:0,
        type : "",
        load:false,
        detect:"",
        devices : [
            {
                value : 1,
                label : "No Devices"
            }
        ],
        dependency : [],
        // spin : false,
    };

    animatedComponents = makeAnimated();

    setDefaultFields = ()=>{
        this.setState({
            name : "", location: "", address: "", longitude : "",
            latitude : "", type : "", load : false, detect : "",
            devices : [{value : 1, label: "No Devices for Dependency"}],
        });
    };

    componentDidMount() {
        let token = ls.get('token');
        let tempDevices = [];
        this.setState({load: true, token :token});
        axios.get(urls.url("users"),{params: {
            type : "devices",
                token:token,
            }}).then((res)=>{
                console.log("Add devices got a response back now");
                if(res.data === null){
                    this.setState({devices :[], load:false});
                }else{
                    res.data.devices.map((item,index)=>{
                        tempDevices.push({
                            label : item,
                            value : index + 1,
                        });
                        return null;
                    });
                    this.setState({devices : [...tempDevices],load:false});
                }
        }).catch((err)=>{
            console.log(err);
        });
    }

    handleChange=(e,type)=>{
        switch(type){
            case "Name":
                this.setState({name:e.target.value});
                break;
            case "Location":
                this.setState({location:e.target.value});
                break;
            case "Ip":
                this.setState({address:e.target.value});
                break;
            case "long":
                this.setState({longitude:e.target.value});
                break;
            case "lat":
                this.setState({latitude:e.target.value});
                break;
            case "Type":
                // alert(JSON.parse(e));
                this.setState({type: e});
                break;
            case "TDetect":
                this.setState({detect: e});
                break;
            case "image":
                console.log(e.target.files[0]);
                // alert(JSON.parse(JSON.stringify(JSON.parse(e.target.files[0]))));
                axios.post(urls.url("uploadImage"),{token:ls.get("token")}).then(res=>{
                    alert("data returned" + JSON.stringify(res));
                });
                break;
            case "Dependency":
                // alert(e);
                let dep = [...this.state.dependency];
                dep.push(e);
                this.setState({dependency : dep});
                break;
            default:
                alert("unknown entry...");
        }
    };

    handleFormSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state.dependency);
        if(this.state.name ==="" || this.state.type === "" ||
            this.state.detect === "" || this.state.location === "" ||
            this.state.address=== "" || this.state.latitude===0 || this.state.longitude===0
        ){
            alert("Please Fill in all fields");
            this.setDefaultFields();
            return null;
        }
        this.setState({load:true});
        axios.post(urls.url("admin"),{
            name:this.state.name,
            location:this.state.location,
            address:this.state.address,
            type:"device",
            deviceType: this.state.type,
            lat:this.state.latitude,
            long:this.state.longitude,
            detect : this.state.detect,
            dependency : this.state.dependency,
            token:ls.get("token"),
        }).then(res=>{
            console.log("we are done.\n",res.data);
            this.setState({load:false, name:"", location: "", address:"", type:"", deviceType:"", lat:0,long:0});
            this.props.refresh();
        }).catch(err=>console.log(err));
    };

    render() {
     if(this.state.load)
         return <Loader/>;
     return(
         <Auxilliary>
             <Form onSubmit={e=>this.handleFormSubmit(e)}>
                     <div style={{marginTop:"2rem"}}>

                         <Form.Group as={Row} controlId="formHorizontalText">
                             <Form.Label column sm={2}>
                                 Name
                             </Form.Label>
                             <Col sm={10}>
                                 <Form.Control type="text" placeholder="Device Name"
                                               value={this.state.name}
                                               onChange={e=>this.handleChange(e,"Name")}
                                 />
                             </Col>
                         </Form.Group>
                         <Form.Group as={Row} controlId="formHorizontalText">
                             <Form.Label column sm={2}>
                                 Device Type
                             </Form.Label>
                             <Col sm={10}>
                                 <Select
                                     options={deviceTypes}
                                     onChange={e=>{this.handleChange(e,"Type")}}
                                     placeholder={"Device Type"}
                                 />
                             </Col>
                         </Form.Group>
                         <Form.Group as={Row} controlId="formHorizontalText">
                             <Form.Label column sm={2}>
                                 Detection Type
                             </Form.Label>
                             <Col sm={10}>
                                 <Select options={detectionTypes} isSearchable placeholder={"Human"} onChange={e=>this.handleChange(e,"TDetect")}/>
                             </Col>
                         </Form.Group>
                         <Form.Group as={Row} controlId="formHorizontalText">
                             <Form.Label column sm={2}>
                                 Device Dependency
                             </Form.Label>
                             <Col sm={10}>
                                 <Select
                                     options={this.state.devices}
                                     isSearchable placeholder={"Add Dependency"}
                                     onChange={e=>this.handleChange(e,"Dependency")}
                                     isMulti
                                     className={"basic-multi-select"}
                                     classNamePrefix={"select"}
                                     components={this.animatedComponents}
                                 />
                             </Col>
                         </Form.Group>
                         <Form.Group as={Row} controlId="formHorizontalText">
                             <Form.Label column sm={2}>
                                 Location
                             </Form.Label>
                             <Col sm={10}>
                                 <Form.Control type="text" placeholder="Device Location"
                                               value={this.state.location}
                                               onChange={e=>this.handleChange(e,"Location")}
                                 />
                             </Col>
                         </Form.Group>

                         <Form.Group as={Row} controlId="formHorizontalText">
                             <Form.Label column sm={2}>
                                 IP
                             </Form.Label>
                             <Col sm={10}>
                                 <Form.Control type="text" placeholder="Device IP Address"
                                               value={this.state.address}
                                               onChange={e=>this.handleChange(e,"Ip")}
                                 />
                             </Col>
                         </Form.Group>
                         <Form.Group as={Row} controlId="formHorizontalText">
                             <Form.Label column sm={2}>
                                 Latitude
                             </Form.Label>
                             <Col sm={10}>
                                 <Form.Control type="text" placeholder="Google Maps Latitude"
                                               value={this.state.latitude}
                                               onChange={e=>this.handleChange(e,"lat")}
                                 />
                             </Col>
                         </Form.Group>
                         <Form.Group as={Row} controlId="formHorizontalText">
                             <Form.Label column sm={2}>
                                 Longitude
                             </Form.Label>
                             <Col sm={10}>
                                 <Form.Control type="text" placeholder="Google maps Longitude"
                                               value={this.state.longitude}
                                               onChange={e=>this.handleChange(e,"long")}
                                 />
                             </Col>
                         </Form.Group>

                     </div>
                     <Button variant="primary" type={"submit"}>Submit</Button>
                     <Button variant="success" type={"button"}>Clear</Button>
             </Form>
         </Auxilliary>
     );
 }
}
export default AddDevice;