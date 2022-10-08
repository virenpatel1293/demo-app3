import React from "react";
import { Accordion, ListGroup, ListGroupItem } from "react-bootstrap";
import LaptopSpecDetails from "./LaptopSpecDetails";

const LaptopSpec = (props) =>{
    const specs = props.Specs;
    let crypto = require("crypto");
    let specData=null;
    
    if(specs){
        specData = specs.map((spec,ind)=>{
            return  <ListGroup key={crypto.randomBytes(5).toString('hex')}>
                        <ListGroupItem variant="secondary" className="fw-bolder fs-5">{spec.Spec}</ListGroupItem>
                        <LaptopSpecDetails SpecDetails={JSON.parse(spec.Specifications)}/>
                    </ListGroup>
        });
    }

    return (
        <Accordion defaultActiveKey="0">
            {specData}
        </Accordion>
    );

}

export default LaptopSpec;