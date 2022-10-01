import React from "react";
import { Badge, Card } from "react-bootstrap";
import ProductHeighlights from "./ProductHeighlights";

const ProductCard= (props)=>{

    return (
        <Card style={{ width: '18rem' }}>
            <div style={{height:'250px' }} className="d-flex align-items-center justify-content-center">
                <Card.Img variant="" className="p-3" src={'https://www.evetech.co.za/'+props.product.product_img_url} />
            </div>
            <Card.Body className="p-2">
                <Card.Title className="overflow-hidden text-center text-bg-light p-1 rounded-2" style={{maxHeight:'40px', fontSize:'15px', fontWeight:'600'}}>{props.product.product_name}</Card.Title>
                {props.product.high && <ProductHeighlights high={props.product.high}/> }
                <Card.Footer className="text-center">
                    <Badge bg="secondary" style={{fontSize:'18px'}} className="w-100 mt-2 mb-2">
                        R {props.product.product_price} <small style={{fontSize:'11px'}}>Inc. VAT</small>
                    </Badge>
                    <a className="btn btn-primary w-100" href={props.product.product_url}>More Info</a>
                </Card.Footer>
            </Card.Body>
        </Card>
    );

}


export default ProductCard