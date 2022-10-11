import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const ProductHeighlights = (props) => {
    let high = props.high;
    let crypto = require("crypto");

    return ( 
    <div className="overflow-hidden" style={{maxHeight:'122px'}}>
        <ListGroup variant="primary" className="p-0 m-0">
        {high.split("|").map((highlight) => <ListGroupItem  className="m-0" style={{fontSize:'12px', padding:'5px'}} key={crypto.randomBytes(10).toString('hex')} dangerouslySetInnerHTML={{ __html: highlight }} />)}
        </ListGroup>
    </div>);
}

export default ProductHeighlights;