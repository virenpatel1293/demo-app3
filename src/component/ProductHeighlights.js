import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const ProductHeighlights = (props) => {
    let high = props.high
    return ( 
    <Card.Text className="overflow-hidden" style={{maxHeight:'122px'}}>
        <ListGroup variant="primary" className="p-0 m-0">
        {high.split("|").map(highlight => <ListGroupItem  className="m-0" style={{fontSize:'12px', padding:'5px'}} dangerouslySetInnerHTML={{ __html: highlight }} />)}
        </ListGroup>
    </Card.Text>);
}

export default ProductHeighlights;