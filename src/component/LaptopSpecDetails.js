import React from "react";
import { Badge, ListGroup } from "react-bootstrap";

const LaptopSpecDetails = (props) =>{
    const specDetails = props.SpecDetails;
    let details = null;

    if(specDetails)
    {
        details = specDetails.map((sDetails,ind)=>{
          return  <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                key={ind}
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{sDetails.SpecDetail}</div>
                </div>
                <h6 bg="primary">
                {sDetails.Opt}
                </h6>
            </ListGroup.Item>
        });
    }

    return (
        <ListGroup as="ol" numbered>
            {details}
        </ListGroup>
    );

}

export default LaptopSpecDetails;