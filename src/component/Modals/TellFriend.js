import React from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";

const TellFriend = (props) =>{
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Tell A Friend
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Please provide your name and email address. Your telephone number is optional.</h6>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Name"  required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Your Email" required/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Recipients Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Recipients Email" required/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Check inline label="We periodically sends out our special promotions by email. Please check this box if you want to receive them." name="chkSubscribe" type='checkbox' id='inline-check-1' />
                <Row className="text-center p-3">
                    <Button type='submit' className='btn btn-dark'> Send Now</Button>
                </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
           {/*  <Button onClick={props.onHide}>Close</Button> */}
          </Modal.Footer>
        </Modal>
      );


}

export default TellFriend;