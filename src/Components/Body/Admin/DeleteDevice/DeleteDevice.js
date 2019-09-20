import React, {Component} from 'react';
import axios from 'axios';
import urls from '../../../../urls/url';
import './DeleteDevice.css';
import Table from "react-bootstrap/Table";
import Auxilliary from "../../../../hoc/Auxilliary/Auxilliary";
import Button from 'react-bootstrap/Button';
import Loader from "../../../Loader/Loader";
import ls from 'local-storage';

class DeleteDevice extends Component{

    state={
        devices:[],
        load:false,
        fetched : false,
        token:null,
    };

    componentDidMount() {
        let token = ls.get('token');
        axios.get(urls.url("admin"),{params:{type: "devices",token:token}}).then(res=>{
            this.setState({devices:[...res.data.devices],fetched : true});
        }).catch(e=>console.log(e));
    }

    removeDevice=(index)=>{
        // alert("trying to remove :\n"+ JSON.stringify(this.state.devices[index]));
        this.setState({load:true});
        axios.delete(urls.url("admin"),{params:{type:"deleteDevice",item:this.state.devices[index],token:ls.get("token")}}).then(res=>{
            this.setState({load:false});
            this.props.refresh();
        }).catch(e=>console.log(e));
    };

    render() {
        if(this.state.load)
            return <Loader/>;
        let re = <div>Loading...</div>;
        if(this.state.devices.length>0){
            re=this.state.devices.map((item,index)=>{
                console.log(item);
                return(
                    <tr key={index} >
                        <td>{item.camera_name}</td>
                        <td>{item.camera_location}</td>
                        <td>{item.camera_ip}</td>
                        <Button variant={"danger"} onClick={()=>this.removeDevice(index)}>Remove</Button>
                    </tr>
                );
            });
        }else if(this.state.devices.length === 0 && this.state.fetched){
            re = <div>No Devices</div>;
        }else{}
        return (
            <Auxilliary>
                <div>
                    <Table responsive="sm">
                        <thead>
                        <tr>
                            <th>Device Name</th>
                            <th>Device Location</th>
                            <th>Device Address</th>
                            <th> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {re}
                        </tbody>
                    </Table>
                </div>
            </Auxilliary>
        );
    }
}
export default DeleteDevice;