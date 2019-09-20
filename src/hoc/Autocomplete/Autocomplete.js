import React,{Component,Fragment} from 'react';
import PropTypes from "prop-types";
import Downshift from 'downshift';

const items = [
    {value: 'bicycle'},
    {value: 'car'},
    {value: 'motorbike'},
    {value: 'aeroplane'},
    {value: 'bus'},
    {value: 'train'},
    {value: 'truck'},
    {value: 'boat'},
    {value: 'traffic light'},
    {value: 'fire hydrant'},
    {value: 'stop sign'},
    {value: 'parking meter'},
    {value: 'bench'},
    {value: 'bird'},
    {value: 'cat'},
    {value: 'dog'},
    {value: 'horse'},
    {value: 'sheep'},
    {value: 'cow'},
    {value: 'elephant'},
    {value: 'bear'},
    {value: 'zebra'},
    {value: 'giraffe'},
    {value: 'backpack'},
    {value: 'umbrella'},
    {value: 'handbag'},
    {value: 'tie'},
    {value: 'suitcase'},
    {value: 'frisbee'},
    {value: 'skis'},
    {value: 'snowboard'},
    {value: 'sports ball'},
    {value: 'kite'},
    {value: 'baseball bat'},
    {value: 'baseball glove'},
    {value: 'skateboard'},
    {value: 'surfboard'},
    {value: 'tennis racket'},
    {value: 'bottle'},
    {value: 'wine glass'},
    {value: 'cup'},
    {value: 'fork'},
    {value: 'knife'},
    {value: 'spoon'},
    {value: 'bowl'},
    {value: 'banana'},
    {value: 'apple'},
    {value: 'sandwich'},
    {value: 'orange'},
    {value: 'broccoli'},
    {value: 'carrot'},
    {value: 'hot dog'},
    {value: 'pizza'},
    {value: 'donut'},
    {value: 'cake'},
    {value: 'chair'},
    {value: 'sofa'},
    {value: 'pottedplant'},
    {value: 'bed'},
    {value: 'diningtable'},
    {value: 'toilet'},
    {value: 'tvmonitor'},
    {value: 'laptop'},
    {value: 'mouse'},
    {value: 'remote'},
    {value: 'keyboard'},
    {value: 'cell phone'},
    {value: 'toothbrush'},
    {value: 'hair drier'},
    {value: 'teddy bear'},
    {value: 'scissors'},
    {value: 'person'},
    {value: 'vase'},
    {value: 'clock'},
    {value: 'book'},
    {value: 'refrigerator'},
    {value: 'sink'},
    {value: 'toaster'},
    {value: 'oven'},
    {value: 'microwave'},
];


class Autocomplete extends Component {

    valueRef = React.createRef();
    state={
        value:"",
    };
render(){
        return(
            <Downshift
                onChange={
                    selection =>{
                        console.log(selection ? `You selected ${selection.value}` : 'Selection Cleared');
                        this.props.onChange(this.valueRef,"ref");
                    }
                }
                itemToString={item => (item ? item.value : '')}
            >
                {({
                      getInputProps,
                      getItemProps,
                      getLabelProps,
                      getMenuProps,
                      isOpen,
                      inputValue,
                      highlightedIndex,
                      selectedItem,
                  }) => (
                    <div style={{width:"100%"}}>
                        {this.props.modalText ===""?
                            <input
                                {...getInputProps()}
                                ref={this.valueRef}
                                placeholder={"Enter an object"}
                                style={{width:"100%"}}
                            />
                        :<input
                                {...getInputProps()}
                                value={this.props.modalText}
                                ref={this.valueRef} placeholder={"Enter an object"}
                                style={{width:"100%"}}
                            />
                        }
                        <div>
                            Did you type object correctly?
                            <div style={{float:"right"}}>
                            <button style={{borderRadius:"3px",}} onClick={()=>this.props.onChange(this.valueRef,"ref")}>yes</button>
                            <button style={{borderRadius:"3px",}} onClick={()=>{this.valueRef="";this.props.onChange(this.valueRef,"clear")}}>clear</button>
                            </div>
                        </div>
                        <ul {...getMenuProps()}>
                            {isOpen
                                ? items
                                    .filter(item => !inputValue || item.value.includes(inputValue))
                                    .map((item, index) => (
                                        <li
                                            {...getItemProps({
                                                key: item.value,
                                                index,
                                                item,
                                                style: {
                                                    backgroundColor:
                                                        highlightedIndex === index ? 'lightgray' : 'white',
                                                    fontWeight: selectedItem === item ? 'bold' : 'normal',
                                                },
                                            })}
                                        >
                                            {item.value}
                                        </li>
                                    ))
                                : null}
                        </ul>
                    </div>
                )}
            </Downshift>
        );
}
}
export default Autocomplete;