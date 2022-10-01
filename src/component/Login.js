import React from "react";
import { Button, Card, Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";

const Login = (props) =>{

    

    return(
        <Container className="mt-5">
            <Card>
                <Card.Header> Login </Card.Header>
                <Card.Body>
                    <Form>
                        <FormGroup className="mb-3" controlId="formBasicUsername">
                            <FormLabel>Username</FormLabel>
                            <FormControl type="text" placeholder="Enter Username" />
                        </FormGroup>

                        <FormGroup className="mb-3" controlId="formBasicPassword">
                            <FormLabel>Username</FormLabel>
                            <FormControl type="Password" placeholder="Enter Password" />
                        </FormGroup>
                        
                        <div className="flex-row">
                            <Button variant="primary" className="me-3">
                                Login
                            </Button>
                            <Button variant="primary">
                                Cancel
                        </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );

    
}

export default Login;