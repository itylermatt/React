import React, {Component} from 'react';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from "react-bootstrap/Button";


class Admin extends Component{

    state={
        people:null,
    };

    componentDidMount() {
        console.log("finding props: ", this.props);
        axios.get("http://192.168.8.109:3000/userAuth").then((res)=>{
            console.log("response received");
            console.log(res);
        }).catch(err=>console.log(err));
    }

    render() {
        let temp = this.state.people;
        let people =temp? temp.map((item,index)=>{
            return (
                <tr>
                    <td>{item.username}</td>
                    <td>{item.authenticated}</td>
                    <td>{item.estate}</td>
                    <td>{item.guard}</td>
                    <td>{item.ultrasense}</td>
                    <td><Button variant={"success"}>Submit</Button></td>
                    <td><Button variant={"danger"}>Reject</Button></td>
                </tr>
            );
        }):null;
        return(
            <Auxilliary>
                <div>
                    <Table responsive="sm">
                        {people}
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Estate</th>
                            <th>Admin</th>
                            <th>Guard</th>
                            <th>Ultrasense</th>
                            <th> </th>
                            <th> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {people}
                        </tbody>
                    </Table>
                </div>
            </Auxilliary>
        );
    }
}

export default Admin;