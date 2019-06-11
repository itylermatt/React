import React,{Component} from 'react';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";


class Modal extends Component{

    handleHide = ()=>{
        let temp = this.props.show;
        this.setState({show:!temp});
    };

    render() {
        return(
            <Auxilliary>
                <Modal  show={this.props.show==="true"} onHide={this.handleHide} className={"modalItem"}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{textAlign:"center"}}>rend.camera_name</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <img src="data:image/jpg;base64,https://google.com" className={"modalImage"} alt={"missing"}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    {
                                        this.state.detections?this.state.detections.map((item,index)=>{
                                            return (
                                                <Button key={index} variant={"outline-info"}>{item.type}</Button>
                                            );
                                        }):null
                                    }
                                </InputGroup.Prepend>
                                <FormControl aria-describedby="basic-addon1" placeholder={"Enter new"}/>
                            </InputGroup>
                            <br/>
                            <Button variant="success">Ok</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </Auxilliary>
        );
    }
}
export default Modal;