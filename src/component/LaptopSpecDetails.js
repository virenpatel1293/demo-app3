import React from "react";
import { Col, ListGroup } from "react-bootstrap";

const LaptopSpecDetails = (props) =>{
    const specDetails = props.SpecDetails;
    let details = null;

    if(specDetails)
    {
        details = specDetails.map((sDetails,ind)=>{
          return  <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start p-1 border-0" 
                key={ind}
            >
                <Col className="ms-2" md={4} sm={6}>
                    <h6 className="">{sDetails.SpecDetail}</h6>
                </Col>
                <Col md={8} sm={6} className="text-left p-0" bg="primary">
                    {sDetails.Opt}
                </Col>
            </ListGroup.Item>
        });
    }

    return (
        <ListGroup as="ol" >
            {details}
        </ListGroup>
    );

}

export default LaptopSpecDetails;