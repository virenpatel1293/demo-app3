import React from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LaptopLinks = (props) =>{
    const links = props.links;
    const brand = props.brand;
    const actProductId = props.ProductId;
    const navigate = useNavigate();
    let linksData=null;

    const btnLinkClick = (pid) => {
        navigate(`/details/${pid}`);
    }

    if(links.length > 0)
    {
        /* href={`/details/${link.pid}`}  */
        linksData = links.map((link,ind)=>{
                let btnClass = "w-100 pt-2 pb-2 fw-bold btn "+ (link.pid === actProductId ? "btn-danger" : "btn-dark");
                return <ListGroupItem key={ind} className="p-0 mt-1 mb-1 text-center">
                   <Button  title={link.title} onClick={()=> btnLinkClick(link.pid)} style={{cursor:"-moz-grab"}}  className={btnClass} > {link.title}</Button>
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