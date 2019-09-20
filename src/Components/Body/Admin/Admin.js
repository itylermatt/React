import React, {Component} from 'react';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Loader from '../../Loader/Loader';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import UserAuth from './UserAuth/UserAuth';
import AddUser from './AddUser/AddUser';
import EditUser from './EditUser/EditUser';
import AddDevice from "./AddDevice/AddDevice";
import axios from "axios";
import urls from '../../../urls/url';
import DeleteDevice from './DeleteDevice/DeleteDevice';
import PingDevices from './PingDevices/PingDevices';
import Maps from '../../../hoc/Maps/Maps';
import DailyReport from './DailyReport/DailyReport';
import ls from 'local-storage';

class Admin extends Component{

    state={
        key: "removeUser",
        users:null,
        token : null,
    };

    componentDidMount() {
        let token = ls.get('token');
        this.setState({token:token});
        axios.get(urls.url("admin"),{params:{token:token}}).then(res=>{
            this.setState({users:res.data.users});
        }).catch(err=>console.log(err));
    }

    refresh = ()=>{
        this.setState({users:null});
        axios.get(urls.url("admin"),{params:{token:this.state.token}}).then(res=>{
            // console.log("admin returned: \n",res.data);
            this.setState({users:res.data.users});
        }).catch(err=>console.log(err));
    };

    render() {
        switch (this.props.access) {
            case "Guard":
                // alert("Guard" );
                return(<div><h1>No Access</h1></div>);
            case "No User Group":
                // alert("No User");
                return(<div><h1>No Access</h1></div>);

            default:

        }
        return(
            <Auxilliary>
                <div style={{paddingTop : "7.4%"}}>
                    <Tabs activeKey={this.state.key} id="controlled-tab-example"
                    onSelect={key=>this.setState({key:key})}
                    >
                        <Tab eventKey="userAuth" title="User Authentication">
                            {this.state.users?<UserAuth {...this.state} refresh={this.refresh}/>: <Loader/>}
                        </Tab>
                        <Tab eventKey="addUser" title="Add User">
                            {this.state.users?<AddUser {...this.state}  refresh={this.refresh}/>:<Loader/>}
                        </Tab>
                        <Tab eventKey="removeUser" title="Edit User">
                            {this.state.users?<EditUser {...this.state} refresh={this.refresh}/>: <Loader/>}
                        </Tab>
                        <Tab eventKey="addDevice" title="Add Device">
                            {this.state.users?<AddDevice {...this.state} refresh={this.refresh}/>: <Loader/>}
                        </Tab>
                        <Tab eventKey={"removeDevice"} title={"Remove Device"}>
                            {this.state.users?<DeleteDevice {...this.state} refresh={this.refresh}/>:<Loader/>}
                        </Tab>
                        <Tab eventKey={"Ping"} title={"Device Status"}>
                            {this.state.users?<PingDevices/>:<Loader/>}
                        </Tab>
                        {/*<Tab eventKey={"Report"} title={"Daily Report"}>*/}
                        {/*    {this.state.users?<DailyReport/>:<Loader/>}*/}
                        {/*</Tab>*/}
                    </Tabs>
                </div>
            </Auxilliary>
        );
    }
}
export default Admin;