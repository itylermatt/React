import React , {Component} from 'react';
import {Bar, Chart, HorizontalBar} from 'react-chartjs-2';
import axios from 'axios';
import urls from  '../../urls/url';
import Loader from '../../Components/Loader/Loader';
import Select from "react-select";


class Dummy extends Component{
    // componentDidMount() {
    //     axios.get(urls.url("users")).then(res=>{
    //         let users = [];
    //         let clicksCount = [];
    //         let clicksPercentage = [];
    //         let undetectedCount = [];
    //         let undetectedPercentage = [];
    //
    //         res.data.users.map((item,index)=>{
    //             users.push(item.username);
    //             let percentage = ((res.data.clicks[index]/ res.data.totalDetections)*100).toFixed(2);
    //             let count = res.data.clicks[index];
    //             if(Number.isNaN(percentage))
    //                 percentage = 0 ;
    //             if(Number.isNaN(count))
    //                 count = 0;
    //             clicksCount.push(count);
    //             clicksPercentage.push(percentage);
    //             return null;
    //         });
    //
    //         clicksCount.map((item, index)=>{
    //             let percentage = (((res.data.totalDetections - clicksCount[index])/ res.data.totalDetections)*100).toFixed(2);
    //             let count = res.data.totalDetections - clicksCount[index] ;
    //
    //             if(isNaN(percentage)){
    //                 // console.log(" percentage NAN");
    //                 percentage = 0;
    //             }
    //
    //             if(isNaN(count)){
    //                 // console.log(" count NAN ");
    //                 count = 0;
    //             }
    //             undetectedCount.push(count);
    //             undetectedPercentage.push(percentage);
    //             return null;
    //         });
    //
    //         this.setState({
    //             data:{
    //                 labels : [...users],
    //                 datasets: [{
    //                     stack : "stack",
    //                     label : res.data.label,
    //                     backgroundColor:  "rgb(255,99,132)",
    //                     borderColor : 'rgb(255,99,132)',
    //                     data: [...clicksCount],
    //                 },{
    //                     stack : "stack",
    //                     label: "Detections unacknowledged",
    //                     fillColor: ["rgba(0,10,220,0.5)","rgba(220,0,10,0.5)","rgba(220,0,0,0.5)","rgba(120,250,120,0.5)" ],
    //                     strokeColor: "rgba(220,220,220,0.8)",
    //                     highlightFill: "rgba(220,220,220,0.75)",
    //                     highlightStroke: "rgba(220,220,220,1)",
    //                     data: [...undetectedCount]
    //                 },
    //                 ],
    //             },
    //             loaded : true,
    //             options : {
    //                 scales : {
    //                     xAxes : [{
    //                         barPercentage : 1.0,
    //                         scaleLabel : {
    //                             display : true,
    //                             labelString : "User"
    //                         },gridLines : {
    //                             display : false,
    //                             drawBorder : true,
    //                         }
    //                     }],
    //                     yAxes : [{
    //                         scaleLabel :{
    //                             display: true,
    //                             labelString : "Percentage(%)"
    //                         },gridLines : {
    //                             display : false,
    //                             drawBorder : true,
    //                         }
    //                     }]
    //                 }
    //             },
    //             undetectedCount,
    //             undetectedPercentage,
    //             clicksCount,
    //             clicksPercentage,
    //             users,
    //             label : res.data.label,
    //         });
    //     });
    // }
    //
    // state = {
    //     datasets:null,
    //     temp:null,
    //     loaded : false,
    //     orient : "horizontal",
    //     type : "count",
    //     startDate: new Date("2019/04/04"),
    //     date : new Date(),
    // };
    //
    // handleChange = (e)=>{
    //     switch(e.label){
    //         case "horizontal":
    //             this.setState({orient : "horizontal"});
    //             break;
    //         case "vertical":
    //             this.setState({orient : 'vertical'});
    //             break;
    //         case "count":
    //             this.setState({type : "count",data:{
    //                     labels : [...this.state.users],
    //                     datasets: [{
    //                         stack : "stack",
    //                         label : this.state.label,
    //                         backgroundColor: "rgb(255,99,132)",
    //                         borderColor : 'rgb(255,99,132)',
    //                         data: [...this.state.clicksCount],
    //                     },{
    //                         stack : "stack",
    //                         label: "Detections unacknowledged",
    //                         fillColor: ["rgba(0,10,220,0.5)","rgba(220,0,10,0.5)","rgba(220,0,0,0.5)","rgba(120,250,120,0.5)" ],
    //                         strokeColor: "rgba(220,220,220,0.8)",
    //                         highlightFill: "rgba(220,220,220,0.75)",
    //                         highlightStroke: "rgba(220,220,220,1)",
    //                         data: [...this.state.undetectedCount]
    //                     },
    //                     ],
    //                 },options : {
    //                     responsive : true,
    //                     scales : {
    //                         xAxes : [{
    //                             barPercentage : 1.0,
    //                             scaleLabel : {
    //                                 display : true,
    //                                 labelString : "User"
    //                             },gridLines : {
    //                                 display : false,
    //                                 drawBorder : true,
    //                             }
    //                         }],
    //                         yAxes : [{
    //                             scaleLabel :{
    //                                 display: true,
    //                                 labelString : "Count(No of Detections)"
    //                             },gridLines : {
    //                                 display : false,
    //                                 drawBorder : true,
    //                             }
    //                         }]
    //                     }
    //                 }
    //             });
    //             break;
    //         case "percentage":
    //             this.setState({type : "percentage",data:{
    //                     labels : [...this.state.users],
    //                     datasets: [{
    //                         stack : "stack",
    //                         label : this.state.label,
    //                         backgroundColor:  "rgb(255,99,132)",
    //                         borderColor : 'rgb(255,99,132)',
    //                         data: [...this.state.clicksPercentage],
    //                     },{
    //                         stack : "stack",
    //                         label: "Detections unacknowledged",
    //                         fillColor: ["rgba(0,10,220,0.5)","rgba(220,0,10,0.5)","rgba(220,0,0,0.5)","rgba(120,250,120,0.5)" ],
    //                         strokeColor: "rgba(220,220,220,0.8)",
    //                         highlightFill: "rgba(220,220,220,0.75)",
    //                         highlightStroke: "rgba(220,220,220,1)",
    //                         data: [...this.state.undetectedPercentage]
    //                     },
    //                     ],
    //                 },options : {
    //                     scales : {
    //                         xAxes : [{
    //                             barPercentage : 1.0,
    //                             scaleLabel : {
    //                                 display : true,
    //                                 labelString : "User"
    //                             },
    //                             gridLines : {
    //                                 display : false,
    //                                 drawBorder : true,
    //                             }
    //                         }],
    //                         yAxes : [{
    //                             scaleLabel :{
    //                                 display: true,
    //                                 labelString : "Percentage(%)"
    //                             },
    //                             gridLines : {
    //                                 display : false,
    //                                 drawBorder : true,
    //                             }
    //                         }]
    //                     }
    //                 }
    //             });
    //             break;
    //         default:
    //             break;
    //     }
    //
    // };
    //
    // handleDateChange = (e)=>{
    //     this.setState({loaded: false});
    //     axios.post(urls.url("users"),{date : e.target.value}).then(res=>{
    //         let users = [];
    //         let clicksCount = [];
    //         let clicksPercentage = [];
    //         let undetectedCount = [];
    //         let undetectedPercentage = [];
    //
    //         res.data.users.map((item,index)=>{
    //             users.push(item.username);
    //             let percentage = ((res.data.clicks[index]/ res.data.totalDetections)*100).toFixed(2);
    //             console.log("percentage returning ===>", percentage," --- from", res.data.clicks[index] ,"/", res.data.totalDetections);
    //             let count = res.data.clicks[index];
    //             if(isNaN(percentage))
    //                 percentage = 0 ;
    //             if(isNaN(count))
    //                 count = 0;
    //             clicksCount.push(count);
    //             clicksPercentage.push(percentage);
    //             return null;
    //         });
    //
    //         clicksCount.map((item, index)=>{
    //             let percentage = (((res.data.totalDetections - clicksCount[index])/ res.data.totalDetections)*100).toFixed(2);
    //             let count = res.data.totalDetections - clicksCount[index] ;
    //             if(isNaN(percentage))
    //                 percentage = 0 ;
    //             if(isNaN(count))
    //                 count = 0;
    //             undetectedCount.push(count);
    //             undetectedPercentage.push(percentage);
    //             return null;
    //         });
    //         console.log("undetected Count ---" ,undetectedCount);
    //         console.log("undetected Percentage ---",undetectedPercentage);
    //         console.log("clicks Count ---",clicksCount);
    //         console.log("clicks Percentage ---",clicksPercentage);
    //         // console.log(undetectedCount);
    //         this.setState({ date : new Date(res.data.date),
    //             data:{
    //                 labels : [...users],
    //                 datasets: [{
    //                     stack : "stack",
    //                     label : res.data.label,
    //                     backgroundColor:  "rgb(255,99,132)",
    //                     borderColor : 'rgb(255,99,132)',
    //                     data: [...clicksCount],
    //                 },{
    //                     stack : "stack",
    //                     label: "Detections unacknowledged",
    //                     fillColor: ["rgba(0,10,220,0.5)","rgba(220,0,10,0.5)","rgba(220,0,0,0.5)","rgba(120,250,120,0.5)" ],
    //                     strokeColor: "rgba(220,220,220,0.8)",
    //                     highlightFill: "rgba(220,220,220,0.75)",
    //                     highlightStroke: "rgba(220,220,220,1)",
    //                     data: [...undetectedCount]
    //                 },
    //                 ],
    //             },
    //             loaded : true,
    //             options : {
    //                 scales : {
    //                     xAxes : [{
    //                         barPercentage : 1.0,
    //                         scaleLabel : {
    //                             display : true,
    //                             labelString : "User"
    //                         },gridLines : {
    //                             display : false,
    //                             drawBorder : true,
    //                         }
    //                     }],
    //                     yAxes : [{
    //                         scaleLabel :{
    //                             display: true,
    //                             labelString : "Percentage(%)"
    //                         },gridLines : {
    //                             display : false,
    //                             drawBorder : true,
    //                         }
    //                     }]
    //                 }
    //             },
    //             undetectedCount,
    //             undetectedPercentage,
    //             clicksCount,
    //             clicksPercentage,
    //             users,});
    //     }).catch(e=>{
    //         console.log(e);
    //     });
    // };

    render() {

        // let orientationOptions = [
        //     {label:"horizontal",value:1},
        //     {label:"vertical",value:2},
        // ];
        // let typeOptions = [
        //     {label : 'percentage', value : 1},
        //     {label : 'count', value : 2},
        // ];

        return(
            // !this.state.loaded ? <Loader/>:
            // <div style={{height: "50%", width:"50%"}}>
            //     {this.state.orient === 'horizontal'?
            //         <HorizontalBar data={this.state.data} options={this.state.ooptions} />
            //         :
            //         <Bar data={this.state.data} options={this.state.options}/>
            //     }
            //     <div style={{width: '400px'}}>
            //         <Select options={orientationOptions} isSearchable placeholder={"Orientation"} onChange={e=>this.handleChange(e)}/>
            //     </div>
            //     <div style={{width: '400px'}}>
            //         <Select options={typeOptions} isSearchable placeholder={"Type"} onChange={e=>this.handleChange(e)}/>
            //     </div>
            //     <div style={{width: "400px", textAlign : "center"}}>
            //         <label htmlFor={"detection"}>Detections From :
            //             &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            //             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            //         </label>
            //         <input type={"date"} onChange={this.handleDateChange} placeholder={this.state.date} name={"detection"}/>
            //     </div>
            // </div>
            <di>Hello World</di>
        );
    }
}
export default Dummy;