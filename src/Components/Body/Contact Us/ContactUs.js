import React , {Component} from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './ContactUs.css';

class ContactUs extends Component{

    controlSubmit=(e)=>{
        e.preventDefault();
    };

    render() {
        return(
            <div className={'Contact'}>
                <Form onSubmit={e=>this.controlSubmit(e)}>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            First  Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Name" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Last Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Last Name" />
                        </Col>
                    </Form.Group>
                    <fieldset>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>
                    </fieldset>
                    <Form.Group as={Row} controlId="formHorizontalCheck">
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 8, offset: 2 }}>
                            <Button type="submit" className={"button"}>Send</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}
export default ContactUs;