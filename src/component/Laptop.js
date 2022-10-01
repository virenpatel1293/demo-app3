import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import QtyBox from "../UI/QtyBox";
import LaptopGallery from "./LaptopGallery";

const Laptop = () => {
    const [laptop, setLaptop] = useState({});
    const params= useParams();
    const navigate = useNavigate();
    let ProductId = 0;
    ProductId = parseInt(params.ProductId);

    useEffect(()=>{
        if(isNaN(ProductId)){
            navigate("/");
        }
        else{
            const fetchData = async ()=>{
                const prods = await fetch(`http://localhost:5000/laptopById/${ProductId}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept' : 'application/json'
                    }
                })
                .then(res=>res.json());
                setLaptop(prods.result[0]);
            }    

            fetchData();
        }
    },[])

    const RenderHTML = (props) => (<span dangerouslySetInnerHTML={{__html:props.HTML}}></span>)
    
    return (
        <Container fluid>
           <div className="wrapper p-2">
                <Row>
                    <Col lg={5} md={6} sm={6} xs={12}>
                       {/*  <LaptopGallery ProductId={ProductId}/> */}
                        <Image className="hidden" src={laptop.manuurl}></Image>
                    </Col>
                    <Col lg={5} md={6} sm={6} xs={12}>
                        <Row>
                            <Col>
                                <RenderHTML  HTML={laptop.Des} />
                            </Col>
                        </Row>
                        <Row className="mt-1">
                        <Col md={8} xs={12}>
                                <p  style={{fontSize:'13px'}}>  {laptop.SKU} </p>
                        </Col>
                        <Col md={4} xs={12}>
                        </Col>
                        </Row>
                    </Col>
                    <Col lg={2} md={12} sm={12} xs={12}>
                        {/* Pricing Section */}
                        <Row className="text-right">
                            <span className="f-12">List Price</span>
                            <span><s>R {laptop.OldPrice}</s></span>
                            <span className="f-12">Discounted Price</span>
                            <span>R {laptop.Price}</span>
                            <span className="f-12 text-black-50">Save {laptop.per}%</span>
                            <span className="f-12 mt-1 fw-bold">Note: price include 15% V.A.T</span>
                            <span className="f-12 text-black-50">Discount only available when paying by Instant EFT or EFT *</span>
                        </Row>
                        <Row>
                            <Col>
                                <QtyBox />
                            </Col>
                            <Col>

                            </Col>
                        </Row>
                        {/* Pricing Section */}
                    </Col>
                </Row>
                <Row>
                <Col md={10} sm={12} xs={12}>
                        <RenderHTML  HTML={laptop.DynamicOverview} />
                </Col>
                <Col md={2} sm={12} xs={12}>

                </Col>
                </Row>
            </div>
        </Container>
    );

}

export default Laptop;