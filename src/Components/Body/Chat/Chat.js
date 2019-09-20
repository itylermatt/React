import React , {Component} from 'react';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Firestore from '../../../hoc/Firestore/Firestore';
import "./Chat.css";
import user from '../../../assets/images/no.jpg';
import {MessageList} from "react-chat-elements";
class Chat extends Component{
    db = Firestore.firestore();
    state={
        messages:[],
        displayMessages:[],
        username:"Unknown",
        textMessage:"",
        scrolled : false,
        dataSource : [],
    };
    ref = React.createRef();
    scrollRef= React.createRef();

    scrolltoView =()=>{
        if(this.bottom){
            // this.bottom.scrollIntoView({behavior:"smooth", block: "start"});
            // this.bottom.scrollTop += 1;
        }
    };

    componentWillUnmount() {
        this.subscription();
    }

    componentDidMount() {

        this.subscription = this.db.collection("Messages").orderBy("Time", "desc").onSnapshot((snapshot)=>{
            // alert("receiving info");
            this.setState({dataSource : []});
            this.db.collection("Messages").orderBy("Time","desc").get().then(res=>{
                res.forEach(item=>{
                    let tempItem = {...item.data()};

                    this.state.dataSource.push({
                        position: this.props.username === tempItem.Name ? 'right': 'left',
                        type: 'text',
                        title: tempItem.Name,
                        text: tempItem.Message,
                        date: tempItem.Time,
                    });
                });
                // this.setState({username:this.props.username,messages:this.state.messages});
                this.setState({username:this.props.username});
            });
        });
        // console.log("my current refs are: ");
         if(this.props.scroll && !this.scrolled){
             this.scrolltoView();
             this.setState({scrolled : true});
         }
         // setInterval(()=>{
         //     this.db.collection("Messages").orderBy("Time", "desc").get().then(
         //         res=>{
         //             let tMessages = [];
         //             res.forEach(item=>{
         //                 tMessages.push(item.data());
         //             });
         //             this.setState({messages : [...tMessages]});
         //         }
         //     );
         // },2000);

    }
    componentWillUpdate(nextProps, nextState, nextContext) {
    //     if(this.props.handleChat!==nextProps.handleChat){
    //     }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // this.scrolltoView();
        if(this.props.scroll && !prevProps.scroll){
            this.scrolltoView();
        }else{
        }
    }

    handleText=(e)=>{
        this.setState({textMessage:e.target.value});
    };
    handleMessage=()=>{ 
        if(this.state.textMessage!==""){
            this.db.collection("Messages").add({
                Message:this.state.textMessage,
                Name: this.props.username,
                Notify:true,
                Time:new Date().getTime(),
            }).then(res=>{
                this.setState({messages:[],displayMessages:[], textMessage : ""});
                // this.db.collection("Messages").orderBy("Time","desc").get().then(res=>{
                //     res.forEach(item=>{
                //         this.state.messages.push(item.data());
                //     });
                //     this.setState({username:this.props.username, messages : this.state.messages});
                // });
            }).catch(e=>console.log(e));
        }
    };

    render() {

        // if(this.state.messages.length === 0){
        if(this.state.dataSource.length === 0){
            return(
                <div>
                    No Messages
                </div>
            );
        }
        let scroll = false;

        let tempMessages = !this.state.messages.empty? this.state.messages.map((item,index)=>{
            let timeStamp = null;

            if(item.Name!==this.state.username){
                return(
                    <div
                        key={index}
                        className={"bubbleLeft"} >
                        <img src={user} alt={"Avatar"} style={{height:"30px",width:"30px",position:"absolute", left:0, borderRadius:"50%"}}/>
                        <p style={{position: "absolute", left:"32px", color:"#00b2b2"}}>{item.Name}</p>
                        <p style={{wordBreak: "wrap", width:"100%", paddingTop:"30px",}}>{item.Message}</p>
                    </div>
                );
            }else{
                return(
                    <div className={"bubbleRight"}  key={index}>
                        <img src={user} alt={"Avatar"} style={{height:"30px",width:"30px",position:"absolute", right:0,borderRadius:"50%"}}/>
                        <p style={{position: "absolute", right:"32px", color:"#00b2b2"}}>{item.Name}</p>
                        <p style={{wordBreak: "wrap", width:"100%", paddingTop:"30px"}}>{item.Message}</p>
                    </div>
                );
            }
        }): null;
        let len = tempMessages.length;
        // tempMessages.push((<div ref={(el)=>{this.bottom = el;}} style={{height :"20px"}} > </div>));
        tempMessages[tempMessages.length -5] = (<div ref={(el)=>{this.bottom = el;}} style={{height :"20px"}} > </div>);

        let chat = (
            <div className="chat-message" style={this.props.chatTextArea?{position:"absolute"}:{display:"none"}}>
                <textarea name="message-to-send" id="message-to-send" placeholder="Type your message"
                          rows="3" onChange={e=>this.handleText(e)}>
                </textarea>
                <button className={"button"} onClick={this.handleMessage}>Send</button>

            </div>
        );

        let chatitems = (
            <MessageList
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={this.state.dataSource}
            />
        );

        return(
            <Auxilliary>
                <div className={"wrap"} >
                {/*{tempMessages}*/}
                    {chatitems}
                    <div style={{height : '120px'}}> </div>
                </div>
                <div>
                    {chat}
                </div>
            </Auxilliary>
        );

    }
}

export default Chat;