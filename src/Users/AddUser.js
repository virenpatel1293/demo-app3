import React from "react";
import { Button, Card, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";

const AddUser = () => {

    const formAddUser = () => {
    };

    return(
        <Container>
            <Card className="mt-5">
                <Card.Header>
                    <h4>Add User</h4>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={formAddUser}>
                        <FormGroup className="mb-3" controlId="formBasicUsername">
                            <FormLabel>Username</FormLabel>
                            <FormControl type="text"  placeholder="Enter your Username" />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formBasicAge">
                            <FormLabel>Age</FormLabel>
                            <FormControl type="number" min='1'  placeholder="Enter Your Age"></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-4">
                            <Button type="submit" variant="primary">
                                Add User
                            </Button>
                        </FormGroup>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );

}

export default AddUser;