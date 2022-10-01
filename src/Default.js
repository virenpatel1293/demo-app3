import React from "react";
import { Container, Stack } from "react-bootstrap";
import ProductDeals from "./component/ProductDeals";


const Default = () =>{

    return (
        <Container className="mb-5">
            <Stack gap={4}>
                <div className="bg-light border rounded-3 p-2 mt-3 mb-3">
                    <ProductDeals QueryId="222" DealTitle="PC Deals" />
                </div>
                
                <div className="bg-light border rounded-3 p-2 mt-3 mb-3">
                    <ProductDeals QueryId="209" DealTitle="Component Deals" />
                </div>

                <div className="bg-light border rounded-3 p-2 mt-3 mb-3">
                    <ProductDeals QueryId="177" DealTitle="Laptop Deals" />
                </div>
            </Stack>
        </Container>
    );

}

export default Default;
