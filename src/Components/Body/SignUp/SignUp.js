import React , {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class SignUp extends Component{
 render() {
     return(
         <Form>
             <Form.Group as={Row} controlId="formHorizontalEmail">
                 <Form.Label column sm={2}>
                     Email
                 </Form.Label>
                 <Col sm={10}>
                     <Form.Control type="email" placeholder="Email" />
                 </Col>
             </Form.Group>

             <Form.Group as={Row} controlId="formHorizontalPassword">

                 <Form.Label column sm={2}>
                     Password
                 </Form.Label>

                 <Col sm={10}>
                     <Form.Control type="password" placeholder="Password" />
                 </Col>
             </Form.Group>
             <fieldset>

             </fieldset>
             <Form.Group as={Row} controlId="formHorizontalCheck">
                 <Col sm={{ span: 10, offset: 2 }}>
                     <Form.Check label="Remember me" />
                 </Col>
             </Form.Group>

             <Form.Group as={Row}>
                 <Col sm={{ span: 10, offset: 2 }}>
                     <Button type="submit">Sign in</Button>
                 </Col>
             </Form.Group>
         </Form>
     );
 }
}
export default SignUp;