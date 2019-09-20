import React, {Component} from "react";
import urls from '../../../../urls/url';
import axios from 'axios';
import './PingDevices.css';
import Maps from '../../../../hoc/Maps/Maps';
import {ListGroup, Accordion, Card} from 'react-bootstrap';
import ls from 'local-storage';

class PingDevices extends Component{

    state={
        devices:[],
        isAlive:[],
        fetched : false,
        collapse : -1,
        token:null,
    };

    componentDidMount() {
        let token = ls.get('token');
        this.setState({token:token});
        axios.get(urls.url("devices"),{params:{type:"ping", token:token}}).then(res=>{
            if(res.data.devices === null){
                this.setState({fetched:true});
            }else{
                this.setState({devices:[...res.data.devices],isAlive:[...res.data.alive], fetched : true});
            }
        }).catch(e=>console.log(e));
    }

    toggleCollapsible=(index)=>{
        // alert("Collapsible toggled with: " + index);
        let colll = this.state.collapse;
        if(index === colll){
            this.setState({collapse : -1});
        }
        else{
            this.setState({collapse : (index)});
        }
    };

    render() {
        let listView = !this.state.devices? null:
        this.state.devices.map((item,index)=>{
            return <ListGroup.Item action style={{height:"50px", marginLeft : 'auto'}} className={"listTile"} key={index}>
                <div style={{position:"absolute", left:'0',marginLeft:"20px"}}>{item.camera_name}</div>
                <div style={{position:'absolute', right:'0',marginRight: "10px"}}>
                    {this.state.isAlive[index]===true? "online" : "offline"}
                    <span style={{
                        backgroundColor:this.state.isAlive[index]===true?"green": "red",borderRadius:"50%",display:"flex",height:"15px",width:"15px",
                        flexDirection: "row", alignSelf: "flex-start",position:"absolute",right: "15px",bottom: "20px"
                    }}
                    />
                </div>
            </ListGroup.Item>
        });
        let acc = !this.state.devices? null :
            this.state.devices.map((item, index)=>{
                let cName = "coll" +index.toString() ;
                let num = 0 ;
                num = index;
                // alert( " index : " + index + "  collapseState : " + this.state.collapse);
                return(
                    index !== this.state.collapse?
                        <div style={{width: "100%", height:"60px"}} onClick={()=>this.toggleCollapsible(index)} key={index}>
                            <button className={"collaps"}>
                                {item.camera_name}
                                <p style={{float: "right", height: "10px"}}>+</p>
                            </button>
                            <div className={"collapseContent"} style={{backgroundColor : "green"}}>
                                ---This Hides Content---
                            </div>
                        </div>:
                        <div style={{width: "100%"}} onClick={()=>this.toggleCollapsible(index)} key={index}>
                            <button className={"collaps"}>
                                {item.camera_name}
                                <p style={{float: "right", height: "10px"}}>-</p>
                            </button>
                            <div className={"showContent"} id={cName} ref={cName}>
                                <ListGroup style={{width: "100%"}}>
                                {
                                    item.dependency.map((res, count)=>{
                                        // alert("dependency found:\n  --->"+ JSON.stringify(JSON.parse(res));
                                        return res.map((item,index)=>{
                                            let i = 0;
                                            for( ; i < this.state.devices.length; i ++){
                                                if(this.state.devices[i].camera_name === item.label){
                                                    break;
                                                }
                                            }
                                            let on = this.state.isAlive[i];
                                            // alert(" here's the item:\n --->" + JSON.stringify(item));
                                            return(
                                               // <div key={index}>
                                                    <ListGroup.Item action style={{height:"50px", marginLeft : 'auto'}} className={"listTile"} key={index}>
                                                        <div style={{position:"absolute", left:'0',marginLeft:"20px"}}>{item.label}</div>
                                                        <div style={{position:'absolute', right:'0',marginRight: "10px"}}>
                                                            {
                                                            }
                                                            {on===true? "online" : "offline"}
                                                            <span style={{
                                                                backgroundColor:on===true?"green": "red",borderRadius:"50%",display:"flex",height:"15px",width:"15px",
                                                                flexDirection: "row", alignSelf: "flex-start",position:"absolute",right: "15px",bottom: "20px"
                                                            }}
                                                            />
                                                        </div>
                                                    </ListGroup.Item>
                                             //   </div>
                                            );
                                        })
                                    })
                                }
                                </ListGroup>
                            </div>
                        </div>
                );
            });
        let list = <ListGroup style={{width:"100%"}}>
            {listView}
        </ListGroup>;
        if(!this.state.devices.length && !this.state.fetched){
            return(
                <div>
                    Please wait...
                </div>
            );
        }else if(!this.state.devices.length && this.state.fetched){
            return <div>
                No Devices
            </div>;
        }else{
            return (
                <React.Fragment style={{width:"70%",height:'100%'}}>
                    <div style={{width:"50%", height:"800px", display:"flex", position:"absolute", left:'0',}}>
                    <Maps
                        style={{width:"100%", height: "100%"}}
                        lat={-25.74594}
                        long={27.807254}
                        blue={this.state.isAlive}
                        markers={this.state.devices}
                    />
                    </div>
                    <div className={"Acc"}>
                        {acc}
                    </div>
                </React.Fragment>
            );
        }
    }
}
export default PingDevices;