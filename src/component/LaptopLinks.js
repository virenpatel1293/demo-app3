import React, { useState } from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LaptopLinks = (props) =>{
    const links = props.links;
    const brand = props.brand;
    const navigate = useNavigate();
    let linksData=null;

    /* const btnLinkClick = (pid) => {
        navigate(`/details/${pid}`);
    } */

    if(links.length > 0)
    {
        linksData = links.map((link,ind)=>{
                return <ListGroupItem key={ind} className="p-0 mt-1 mb-1 text-center">
                   <a  title={link.title} href={`/details/${link.pid}`} style={{cursor:"-moz-grab"}}  className="w-100 pt-2 pb-2 fw-bold btn btn-dark" > {link.title}</a>
                </ListGroupItem>    
            })
    }
    else{

    }

    return (
        <Card>
            <Card.Header className="text-center fw-bold">
                This {brand} Laptop Is Avaiable In The Following Configurations:
            </Card.Header>
            <Card.Body>
                <ListGroup>
                   {linksData}
                </ListGroup>
            </Card.Body>
        </Card>
    );

}

export default LaptopLinks;