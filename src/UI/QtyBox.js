import React, { useState } from "react";
import { Button, FormControl, Row } from "react-bootstrap";

const QtyBox = () => {
    const [qty,setQty] = useState(1);

    const qtyIncrease = ()=>{
        setQty((prevQty)=>{
            return (prevQty+1 < 21 ? prevQty+1 : prevQty);   
       });
    }

    const qtyDecrease = ()=>{
        setQty((prevQty)=>{
             return (prevQty-1 > 0 ? prevQty-1 : prevQty);   
        });
    }

    const qtyChange = () =>{
        
    }

    return (
        <Row>
            <div className="d-inline-flex">
                <Button type="button" onClick={qtyDecrease}>-</Button>
                <FormControl type="number" min={1} max={20} value={qty} onChange={qtyChange}/>
                <Button type="button" onClick={qtyIncrease}>+</Button>
            </div>
        </Row>
    );

}

export default QtyBox;