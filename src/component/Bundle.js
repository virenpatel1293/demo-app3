import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FcCollapse, FcExpand } from "react-icons/fc";
var _ = require("lodash");


const Bundle = (props) =>{
    let bundle = props.bundle;
    let isOpen = props.isOpen;
    const [open, toggleOpen] = useState(isOpen);
    const [icon,toggleIcon] = useState(<FcCollapse/>);
    let crypto = require("crypto");

    const stripHtml = (str) => { return str.replace(/(<([^>]+)>)/ig, '') };
    const cardClick = (title,price,bundleId) =>{
        console.log("Card Clicked ",title,price,bundleId);
        props.onBundleSelection({
            "BundleId":bundleId,
            "Title":title,
            "Price":price
        });
    }

    const setBundles = (setBundles) =>{
        return setBundles.map((bundle) => {
            let cardClass =  (props.selectedBundleItems != null ? (_.filter(props.selectedBundleItems, item => item.BundleId === bundle.BundleID && item.Title === stripHtml(bundle.Title)).length > 0 ? "border-danger" : (bundle.IsDefault === 1  && _.filter(props.selectedBundleItems,item=>item.BundleId === bundle.BundleID).length === 0 ? "border-danger" : "" )) : (bundle.IsDefault === 1 ? "border-danger" : "" ));   
            return <div className="col-lg-3 col-md-4 col-sm-6 col-6 p-2"  key={crypto.randomBytes(5).toString('hex')}>
                        <Card className={"h-100 "+cardClass} onClick={() => cardClick(stripHtml(bundle.Title),bundle.Price,bundle.BundleID)}>
                            <Card.Body>
                                <Row className="d-inline-flex">
                                    <Col md={4}>
                                        <img src={bundle.ImageUrl} className="img-fluid"></img>
                                    </Col>
                                    <Col md={8}>
                                        <p className="flex-sm-fill">{stripHtml(bundle.Title)}</p>
                                        <h5>R {bundle.Price}</h5>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
         });   
         
    }
    
    const clickToggle = () => {
        if(open){
            console.log(open);
            toggleOpen(false);
            toggleIcon( <FcExpand/>);
        }
        else
        {
            console.log(open);
            toggleOpen(true);
            toggleIcon( <FcCollapse/>);
        }
    }

    return (
        <details  key={crypto.randomBytes(4).toString('hex')} open={open} className="border-dark border-2">
            <summary className="d-flex row p-2 me-2 ms-2" onClick={clickToggle}  style={{border:"1px  solid gray", borderRadius:"10px"}}>
                <Row className="d-flex">
                    <Col>
                        <b>{bundle.BundleTitle}</b> {bundle.SelectedOption = _.first(_.filter(bundle.Bundles.map(
                                    ( bundle) => {
                                        return (props.selectedBundleItems != null) ?
                                        (_.filter(props.selectedBundleItems, item => item.BundleId === bundle.BundleID && item.Title === stripHtml(bundle.Title)).length > 0 ? stripHtml(bundle.Title) : (bundle.IsDefault === 1  && _.filter(props.selectedBundleItems,item=>item.BundleId === bundle.BundleID).length === 0 ? stripHtml(bundle.Title) : "" ))
                                        : (bundle.IsDefault === 1 ? stripHtml(bundle.Title) : "" )
                                    })), item => item.trim().legth > 0)
                        }
                            
                    </Col>
                    <Col className="text-right">
                        {icon}
                    </Col>
                </Row>
            </summary>
            <div className="d-flex flex-wrap">
                {setBundles(bundle.Bundles)}
            </div>
        </details>
    );

}


export default Bundle;