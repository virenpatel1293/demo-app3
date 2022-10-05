import React from 'react';
import { Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AskQuestion(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Got a question? We're happy to help!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Please provide your name and email address. Your telephone number is optional.</h6>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Name"  required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Your Email" required/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicContact">
                <Form.Label>Contact No.</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Contact No."  required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicQuestion">
                <Form.Label>Question</Form.Label>
                <Form.Control as="textarea" placeholder='Enter Your Question' rows={4} required/>
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

export default AskQuestion;

