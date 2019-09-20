import React, {Component} from 'react';
import Auxilliary from '../../../../hoc/Auxilliary/Auxilliary';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Loader from '../../../Loader/Loader';
import urls from "../../../../urls/url";
import ls from 'local-storage';
import ReactDOM from "react-dom";
import {Modal} from 'react-bootstrap';
class UserAuth extends Component{

    state={
        users:null,
        load:false,
        token:null,
        saveButtonView :false,
        criticalAction : false,
        index : null,
    };

    componentDidMount() {
        let token = ls.get('token');
        this.setState({users:this.props.users, token:token, saveButtonView : false});
    }

    handleDelete=()=>{
        let index = this.state.index;
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
            this.setState({load:false, criticalAction : false});
            this.props.refresh();
        }).catch(err=>{console.log(err)});
    };

    verifyCriticalAction = (index)=>{
        this.setState({index : index, criticalAction : true});
    };

    handleClose = ()=>{
        this.setState({criticalAction : false});
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


    allowSave = ()=>this.setState({saveButtonView : true});

    render() {
        // let temp = this.state.people;
        // let people =temp? temp.map((item,index)=>{
        //     if(!item.authenticated){
        //         return (
        //             <tr key={index}>
        //                 <td>{item.username}</td>
        //                 <td>{item.admin?
        //                     <span style={{
        //                     backgroundColor:"green",borderRadius:"50%",display:"flex",height:"15px",width:"15px",
        //                     marginLeft:"50%"
        //                     }}
        //                     />:
        //                     <span style={{
        //                         backgroundColor:"red",borderRadius:"50%",display:"flex",height:"15px",width:"15px",
        //                         marginLeft:"50%"
        //                     }}
        //                     />
        //                 }</td>
        //                 <td>{item.guard?
        //                     <span style={{
        //                         backgroundColor:"green",borderRadius:"50%",display:"flex",height:"15px",width:"15px",
        //                         marginLeft:"50%"
        //                     }}
        //                     />:
        //                     <span style={{
        //                         backgroundColor:"red",borderRadius:"50%",display:"flex",height:"15px",width:"15px",
        //                         marginLeft:"50%"
        //                     }}
        //                     />}
        //                 </td>
        //                 <td>{item.ultrasense?
        //                     <span style={{
        //                         backgroundColor:"green",borderRadius:"50%",display:"flex",height:"15px",width:"15px",
        //                         marginLeft:"50%"
        //                     }}
        //                     />:
        //                     <span style={{
        //                         backgroundColor:"red",borderRadius:"50%",display:"flex",height:"15px",width:"15px",
        //                         marginLeft:"50%"
        //                     }}
        //                     />
        //                 }</td>
        //
        //                 <td><Button variant={"success"}>Authenticate</Button></td>
        //                 <td><Button variant={"danger"}>Reject</Button></td>
        //             </tr>
        //         );
        //     }else{return null;}
        // }):null;
        // return(
        //     <Auxilliary>
        //         <div>
        //             <Table responsive="sm">
        //                 <thead>
        //                 <tr>
        //                     <th>Name</th>
        //                     <th>Admin</th>
        //                     <th>Guard</th>
        //                     <th>Ultrasense</th>
        //                     <th> </th>
        //                     <th> </th>
        //                 </tr>
        //                 </thead>
        //                 <tbody>
        //                 {people}
        //                 </tbody>
        //             </Table>
        //         </div>
        //     </Auxilliary>

        let criticalAction = (
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Critical Action</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure you want to delete </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="primary" onClick={this.handleDelete}>Yes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        );

        let deleteUser = (
            <Modal show={this.state.criticalAction} onHide={this.handleClose} style={{zIndex : 10000}}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete User ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleDelete}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>
        );

        if(this.state.load)
            return <Loader/>;
        let users = this.state.users? this.state.users.map((item,index)=>{
            return(
                <tr key={index}>
                    <td>{item.username}</td>
                    <td><input type={"checkbox"} defaultChecked={item.authenticated? "checked":null} placeholder={true} className={"authenticated"+ index}
                        onClick={this.allowSave}
                    /></td>
                    <td><input type={"checkbox"} defaultChecked={item.admin} className={"admin"+index} placeholder={item._id}  onClick={this.allowSave} /></td>
                    <td><input type={"checkbox"} defaultChecked={item.guard} className={"guard"+index} onClick={this.allowSave}/></td>
                    <td><input type={"checkbox"} defaultChecked={item.ultrasense} className={"ultrasense" + index} onClick={this.allowSave}/></td>
                    <td><Button variant={this.state.saveButtonView?"success" : 'light'} onClick={()=>this.handleEdit(index)} disabled={!this.state.saveButtonView}  >Save</Button></td>
                    <td><Button variant={"danger"} onClick={()=>this.verifyCriticalAction(index)}>Remove</Button></td>
                </tr>
            );
        }): null;
        return(
            <Auxilliary>
                {deleteUser}
                <div>
                    <Table responsive="sm">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Authenticated</th>
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
export default UserAuth;

///TODO : Users shown are authenticated already