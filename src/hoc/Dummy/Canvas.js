import React,{Component} from 'react';
// let CanvasJSReact = require("../../assets/canvasjs.react");
import CanvasJSReact from '../../assets/canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Canvas extends Component{

    render() {
        const options = {
            title : {text : "Basic Chart Form"},
            data: [{
                type : "column",
                dataPoints: [
                    {label : "apple", y : 10},
                    {label : "orange", y : 15},
                    {label : "chete", y : 19},
                ]
            }],
        };

        return(<div>
            <CanvasJSChart  options={options}/>
            hello
        </div>);
    }
}
export default Canvas;