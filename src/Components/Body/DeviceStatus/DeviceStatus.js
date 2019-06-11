import React , {Component} from 'react';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
class DeviceStatus extends Component{
    _isMounted = false;
    state={
        devices:null,
        isAlive:null,
    };

    componentDidMount() {
        this._isMounted=true;
        axios.get("http://192.168.8.109:3000/devices").then((res)=>{
            console.log("got the following response\n",res);
            if(this._isMounted){this.setState({devices:res.data.devices,isAlive:res.data.alive});}
        }).catch(err=>{console.log(err)});

    }

    componentWillUnmount() {
        this._isMounted=false
    }

    render() {
        let res = this.state.isAlive?this.state.isAlive: null;
        let devices = this.state.devices?this.state.devices.map(
            (item,index)=>{
                return(
                    <Alert  variant={res[index]?"success": "danger"} key={index} className={"device"}>
                        {res[index]?
                            <div >
                                {item.device_name + " ("+ item.device_ip + ")  is "}
                            On</div>:
                            <div >
                                {item.device_name + " ("+ item.device_ip + ") "}
                                Off
                            </div>}
                    </Alert>
                );
            }): null;



        return(
            <Auxilliary>
                {this.state.devices?<div>
                    {devices}
                </div>:<div>Loading</div>}
            </Auxilliary>
        );
    }
}

export default DeviceStatus;