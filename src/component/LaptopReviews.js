import React from "react";
import { Card, Col, Row } from "react-bootstrap";


const LaptopReviews = (props) =>{
    /* const ProductID = props.ProductId; */
    const reviews = props.Reviews;
    let reviewData = null;

    if(reviews)
    {
        reviewData = reviews.map((review,ind)=>{
            return <Card key={ind} >
                <Card.Header>
                    <Row className="d-flex gap-1">
                        <Col md={6} lg={6}>
                            {review.ClientName}
                            <br/>
                            {review.AddedDate}
                        </Col>    
                        <Col md={6} lg={6} className="text-right">
                        </Col>    
                    </Row>    
                </Card.Header> 
                <Card.Body>
                    <Row>
                        <Card.Text>
                            {review.Pros}
                        </Card.Text>
                    </Row>
                </Card.Body>
            </Card>
        });
    }
   
    return (
        <div>
           {reviewData}
        </div>
    );

}

export default LaptopReviews;