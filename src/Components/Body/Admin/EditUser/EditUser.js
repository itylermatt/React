import React , {Component} from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import urls from './../../../../urls/url';
import Auxilliary from '../../../../hoc/Auxilliary/Auxilliary';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Loader from "../../../Loader/Loader";
import ls from 'local-storage';

class EditUser extends  Component{

    state={
        users:null,
        load:false,
        token:null,
        saveButtonView :false,
    };

    componentDidMount() {
        let token = ls.get('token');
        this.setState({users:this.props.users, token:token, saveButtonView : false});
    }

    handleDelete=(index)=>{
        this.setState({load:true});
        axios.delete(urls.url("admin"),{params:{
            username:this.state.users[index].username,
            authenticated:this.state.users[index].authenticated,
            estate:this.state.users[index].estate,
            admin:this.state.users[index].admin,
            guard:this.state.users[index].guard,
            ultrasense:this.state.users[index].ultrasense,
            type:"deleteUser",
            token : ls.get("token"),
            }}).then(()=>{
            this.setState({load:false});
            this.props.refresh();
        }).catch(err=>{console.log(err)});
    };

    handleEdit = (index)=>{
        this.setState({load:true});
        const node  = ReactDOM.findDOMNode(this);
        if(node instanceof HTMLElement){
            const authenticated = node.querySelector((".authenticated"+index.toString())).checked;
            const admin = node.querySelector((".admin"+index.toString())).checked;
            const admins = node.querySelector((".admin"+index.toString())).placeholder;
            const ultrasense = node.querySelector((".ultrasense"+index.toString())).checked;
            const guard = node.querySelector((".guard"+index.toString())).checked;
            // alert(
            //     "the following attributes have to be true :" + authenticated +  ","+ admin + "," + ultrasense + "," + guard + admins
            // );
            axios.post(urls.url("admin"),{
                type: "updateUser",
                authenticated  : authenticated,
                admin : admin,
                userId : admins,
                ultrasense: ultrasense,
                guard: guard,
                token : ls.get("token"),
            }).then((res)=>{
                this.setState({load:false});
                this.props.refresh();
            }).catch(err=>console.log(err));
        }
        // let item = "authenticated"+index;
        // console.log(this.refs.item);
    };

    handleSuspend = (index)=>{
        this.setState({load:true});
        const node  = ReactDOM.findDOMNode(this);
        if(node instanceof HTMLElement){

            const authenticated = false;

            const
                admin=
                node.querySelector((".admin"+index.toString())).checked;
            const admins = node.querySelector((".admin"+index.toString())).placeholder;
            const ultrasense = node.querySelector((".ultrasense"+index.toString())).checked;
            const guard = node.querySelector((".guard"+index.toString())).checked;
            // alert(
            //     "the following attributes have to be true :" + authenticated +  ","+ admin + "," + ultrasense + "," + guard + admins
            // );
            axios.post(urls.url("admin"),{
                type: "updateUser",
                authenticated  : authenticated,
                admin : admin,
                userId : admins,
                ultrasense: ultrasense,
                guard: guard,
                token : ls.get("token"),
            }).then((res)=>{
                this.setState({load:false});
                this.props.refresh();
            }).catch(err=>console.log(err));
        }
    };

    allowSave = ()=>this.setState({saveButtonView : true});

    render() {
        if(this.state.load)
            return <Loader/>;
        let users = this.state.users? this.state.users.map((item,index)=>{
            return(
                <tr key={index}>
                    <td>{item.username}</td>
                    {/*<td><input type={"checkbox"} defaultChecked={item.authenticated? "checked":null} placeholder={true} className={"authenticated"+ index}/></td>*/}
                    {/*<td>{item.admin?"yes": "no"}</td>*/}
                    <td><input type={"checkbox"} defaultChecked={item.admin} className={"admin"+index} placeholder={item._id}  onClick={this.allowSave} /></td>
                    {/*<td>{item.guard?"yes": "no"}</td>*/}
                    <td><input type={"checkbox"} defaultChecked={item.guard} className={"guard"+index} onClick={this.allowSave}/></td>
                    {/*<td>{item.ultrasense?"yes": "no"}</td>*/}
                    <td><input type={"checkbox"} defaultChecked={item.ultrasense} className={"ultrasense" + index} onClick={this.allowSave}/></td>
                    <td><Button variant={this.state.saveButtonView?"success" : 'light'} onClick={()=>this.handleEdit(index)} disabled={!this.state.saveButtonView}  >Save</Button></td>
                    <td><Button variant={"warning"} onClick={()=>this.handleSuspend(index)}>Suspend</Button></td>
                    <td><Button variant={"danger"} onClick={()=>this.handleDelete(index)}>Remove</Button></td>
                </tr>
            );
        }): null;
        return(
            <Auxilliary>
                <div>
                    <Table responsive="sm">
                        <thead>
                        <tr>
                            <th>Name</th>
                            {/*<th>Authenticated</th>*/}
                            {/*<th>Estate</th>*/}
                            <th>Admin</th>
                            <th>Guard</th>
                            <th>Ultrasense App</th>
                            <th> </th>
                            <th> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {users}
                        </tbody>
                    </Table>
                </div>
            </Auxilliary>
        );
    }
}

export default EditUser;