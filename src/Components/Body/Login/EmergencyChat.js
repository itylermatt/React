import React from 'react';
import Header from '../../Head/Header';
import Footer from '../../Foot/Footer';
import Firestore from '../../../hoc/Firestore/Firestore';
import {MessageBox, ChatItem, MessageList, Input, ChatList} from "react-chat-elements/";
import 'react-chat-elements/dist/main.css';
import {Modal,Button} from 'react-bootstrap';


class EmergencyChat extends React.Component{
    db = Firestore.firestore();
    chat = null;
    state={
        messages : [],
        message : "",
        show : true,
        dataSource :[],
        username: '',
    };

    componentDidMount() {
        // this.subscription = this.db.collection("EmergencyChat").doc().orderBy("Time", "desc").onSnapshot((snapshot)=>{
        this.subscription = this.db.collection("EmergencyChat").orderBy("Time", "desc").onSnapshot((snapshot)=>{
            // console.log("Data just came through for emergency chat ===>", snapshot.docChanges());

            this.fetchMessages().then();
            // alert("Message");
        });
    }

    fetchMessages = async()=>{
        return new Promise((resolve, reject)=>{
            this.setState({dataSource : []});
            // let tmp = [];
            this.db.collection("EmergencyChat").orderBy("Time","desc").get().then(res=>{
                res.forEach(item=>{
                    let tempItem = {...item.data()};
                    // tmp.push(tempItem);
                    // console.log("Time is : ===>   ",tempItem.Time.toDate());
                    this.state.dataSource.push({
                        position: this.state.username === tempItem.User ? 'right': 'left',
                        type: 'text',
                        title: tempItem.User,
                        text: tempItem.Message,
                        date: tempItem.Time.toDate(),
                    });
                });
                this.setState({username:this.props.username,messages:this.state.messages});
                // console.log(tmp);
                resolve();
            }).catch(e=>{
                console.log(e);
                reject();
            });
        });
    };

    componentWillUnmount() {
        this.subscription();
    }

    sendMessage = (message)=>{
        if(!this.state.message || this.state.message === ""){
            alert("There is no message to send");
            return ;
        }
        if(!this.state.username || this.state.username === ""){
            alert("please reload page");
            return ;
        }
        // alert("username : " + this.state.username + "\nMessage : " + this.state.message );
        this.db.collection("EmergencyChat").add({
            Message : this.state.message,
            User : this.state.username,
            Time : new Date(),
        }).then(res=>{
            this.setState({message : ""});
            // this.refs.input.clear();
        });
    };

    messageOnChange = (e)=>{
        this.setState({message : e.target.value});
    };

    handleClose = ()=>{
        if(!this.state.username  || this.state.username === ""){
            alert("Please Fill In your details");
        }
        else {
            this.fetchMessages().then(()=>{
                this.setState({show : false});
            });
        }
    };

    changeUser = (e)=>{
        this.setState({username : e.target.value});
    };

    render() {

        let chatItem = (
            <div style={{height: '100%', width : '100%', overflow : 'auto'}}>
                <MessageList
                    className='message-list'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={this.state.dataSource}
                />
            </div>
        );

        let chatInput = (
            <div  style={{position:"absolute", bottom : "7%", width:"100%", height : 'fill-content',}} >
                <input type={"text"} placeholder={"Type your message here"} value={this.state.message} style={{width:'97%', height:'40px' }} onChange={this.messageOnChange}/>
                <Button style={{display : 'flex', float : 'right', width:'3%', borderRadius : '3px' }} onClick={this.sendMessage}>Send</Button>
            </div>
        );

        let getName = (
            <Modal show={this.state.show} onHide={()=>{}}>
                <Modal.Header closeButton>
                    <Modal.Title><div style={{position:'absolute', left:"35%"}}>Ultra Chat</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Please Enter Your Name so we may identify you (Reload the page when you are done)</h5>
                    <label htmlFor={"inputname"} >User Name</label>
                    <input type={"text"} onChange={this.changeUser} style={{width: '80%'}} id={"inputname"} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleClose}>
                        Enter
                    </Button>
                </Modal.Footer>
            </Modal>
        );

        return(
            <React.Fragment>
                <Header/>
                {/*{chat}*/}
                <div style={{height:'76%', width : '100%', display :'flex'}}>
                    {chatItem}
                </div>
                {chatInput}
                {getName}
                <Footer/>
            </React.Fragment>);
    }
}
export default EmergencyChat;
