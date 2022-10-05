import React from "react";
import { Accordion } from "react-bootstrap";
import LaptopSpecDetails from "./LaptopSpecDetails";

const LaptopSpec = (props) =>{
    const specs = props.Specs;
    let specData=null;
    
    if(specs){
        specData = specs.map((spec,ind)=>{
            return  <Accordion.Item eventKey={ind} key={ind}>
                <Accordion.Header>{spec.Spec}</Accordion.Header>
                <Accordion.Body>
                    <LaptopSpecDetails SpecDetails={JSON.parse(spec.Specifications)}/>
                </Accordion.Body>
            </Accordion.Item>
        });
    }

    return (
        <Accordion defaultActiveKey="0">
            {specData}
        </Accordion>
    );

}

export default LaptopSpec;