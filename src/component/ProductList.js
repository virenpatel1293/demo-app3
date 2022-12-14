import React from "react";
import { Spinner } from "react-bootstrap";
import ProductCard from "./ProductCard";

const ProductList = (props) =>{
    let parentClass = 'row';
    let crypto = require("crypto");
    let prodData = <div className=" d-flex align-items-center justify-content-center" style={{ height:'280px'}}> 
            <Spinner animation="border" variant="warning"/>
        </div>;

    if(props.data.length > 0){
        parentClass = 'd-inline-flex gap-3';
        prodData = props.data.map((laptop) => <ProductCard product={laptop} key={crypto.randomBytes(5).toString('hex')} />);
    }

    return (
        <div className={parentClass}>
             {prodData}
        </div>
    );
};

export default ProductList;