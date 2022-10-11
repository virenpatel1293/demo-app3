import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import QtyBox from "../UI/QtyBox";
import LaptopBundles from "./LaptopBundles";
import LaptopGallery from "./LaptopGallery";
import LaptopLinks from "./LaptopLinks";
import LaptopReviews from "./LaptopReviews";
import LaptopSpec from "./LaptopSpec";
import {FcCurrencyExchange, FcLike, FcQuestions, FcShare} from 'react-icons/fc';
import AskQuestion from "./Modals/AskQuestion";
import TellFriend from "./Modals/TellFriend";
var _ = require("lodash");

const Laptop = () => {
    const params= useParams();
    const navigate = useNavigate();
    let crypto = require("crypto");

    const [laptop, setLaptop] = useState({});
    const [stockBg, setStockBg] = useState('success');
    const [stockStatus, setStockStatus] = useState('In Stock');
    /* const [adCart,setAdCart] = useState(true);
    const [divNotify,setDivNotify] = useState(false); */
    const [cartElements,setCartElements] = useState(null);
    const [similarLinks, setSimilarLinks] = useState([]);
    const [brand, setBrand] = useState('');
    const [specification, setSpecification] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [bundles,setBundles] = useState(null);
    const [totalPrice,setTotalPrice] = useState(0);

    /* Modals */
    const [askQuestionShow, setAskQuestionShow] = useState(false);
    const [tellFriendShow, setTellFriendShow] = useState(false);
    const [selectedBundleItems, setSelecetecBundleItems] = useState([]);

    let ProductId = 0;
    ProductId = parseInt(params.ProductId);
    const [gallery,setGallery] = useState({});
    const [galleryData, setGalleryData] = useState([
        {
          original: '',
          thumbnail: '',
        },]);

    useEffect(()=>{
        if(isNaN(ProductId)){
            navigate("/");
        }
        else{
            /* Gallery Logic */
            let galleryImages=[];

            const getGallery = async (imgUrl)=>{
                const prods = await fetch(`http://localhost:5000/laptopGalleryById/${ProductId}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept' : 'application/json'
                    }
                })
                .then(res=>res.json());
                let gall = prods.result[0];

                /* Set Images to gallery */
                setGallery(prevGallery => {
                    prevGallery = gall;

                    try
                    {
                        let images = gall.ImageGallery.split("|").map(image => {
                            return `https://www.evetech.co.za/${image}`;
                        });
                        /* let imageThumb = gall.ImageGalleryThumb.split("|").map(image => {
                            return `https://www.evetech.co.za/${image}`;
                            });
                        */
                        
                        galleryImages.push({
                            original:  imgUrl,
                            thumbnail: imgUrl,
                        });

                        for(let i=0;i<images.length ; i++) {
                            galleryImages.push({
                                "original" : images[i],
                                "thumbnail":  images[i]
                            });
                        }

                        /* Set Images to gallery data */
                        setGalleryData(prevGalleryData => {
                            prevGalleryData = galleryImages;
                            return galleryImages;            
                        }); 
                    }
                    catch(e){
                        
                    }

                    return prevGallery;            
                });
            }   
            /* Gallery Logic */

            const getSimilarLinks = async (linkid) => {
                const linksData = await fetch(`http://localhost:5000/laptopSimilarLinks/${linkid}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept' : 'application/json'
                    }
                })
                .then(res=>res.json());
                let links = linksData.result;
                setSimilarLinks(prevLink =>{
                    prevLink = links;
                    return prevLink
                });
                setBrand(prevBrand=>{
                    prevBrand = laptop.Brand;
                    return prevBrand;
                });
            }

            /* 
               Getting Similar Links Mehtods
             */

            const getSpecification= async(npid)=>{
                const specs = await fetch(`http://localhost:5000/laptopSpecifications/${npid}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept' : 'application/json'
                    }
                }).then(res=>res.json());
                let specsAll = specs.result;
                setSpecification(prevSpec => {
                    prevSpec = specsAll;
                    return specsAll
                });
            };

            /* 
               Getting Specificaitons Method
             */

            const getReviews= async(npid,linkId,rstatus)=>{
                const reviewsData = await fetch(`http://localhost:5000/laptopReviews/${npid}/${linkId}/${rstatus}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                    }
                }).then(res=>res.json());

                let reviewsAll =reviewsData.result;   
                setReviews(prevReviews => {
                    prevReviews = reviewsAll;
                    return prevReviews;
                });
            }

            /* 
               Getting Reviews Method
             */

            const getBundles = async(npid)=>{
                const bundleData = await fetch(`http://localhost:5000/laptopBundles/${npid}`,{
                   method:'GET',
                   headers:{
                        'Content-Type':'application/json',
                        'Accept':'application/json'                        
                   }     
                }).then(res=>res.json());

                let bundlesAll = bundleData.result;
                /* console.log("BundleData",bundlesAll); */
                setBundles(prevBundle =>{
                    prevBundle = bundlesAll;
                    return prevBundle;
                })
            }

            /* 
               Getting Bundles Method
            */

            const fetchData = async ()=>{
                const prods = await fetch(`http://localhost:5000/laptopById/${ProductId}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept' : 'application/json'
                    }
                })
                .then(res=>res.json());
                let product = prods.result[0];

                setLaptop(prods.result[0]);
                setTotalPrice(prevPrice=>{
                    let upPrice =0;
                    if(selectedBundleItems != null){
                        upPrice = _.sumBy(selectedBundleItems, function(o) { return o.Price; });
                    }
                    return prods.result[0].Price + upPrice;
                });
                setStockStatus(prevStat=> {
                    let status= product.StockStatus.toLowerCase();

                    if(status.includes("out of stock") || status.includes("pre-order") || status.includes("coming soon") || status.includes("notify me") || status.includes("coming soon / pre-order") || status.includes("product discontinued") || status.includes("stock to be confirm"))
                    {
                        /* setAdCart(false);
                        setDivNotify(true); */
                        if(status.includes("out of stock") || status.includes("pre-order"))
                        {
                            setStockBg("danger");   
                        }
                        setCartElements(
                            <Row  className="pe-2 ps-2 pt-1 pb-1">
                                <Button variant="danger" className="w-100 pt-3 pb-3 fs-6" onClick={notifyMe}>
                                    Notify Me
                                </Button>
                            </Row>
                        );
                    }
                    else{
                       /*  setAdCart(true);
                        setDivNotify(false); */
                        setCartElements(
                            <div>
                                 <Row className="pe-2 ps-2 pt-1 pb-1">
                                     <Button variant="warning" className="w-100 pt-2 pb-2 fs-6" onClick={addToCart}>Add To Cart</Button>
                                 </Row>
                                 <Row className="pe-2 ps-2 pt-1 pb-1">
                                     <Button variant="warning" className="w-100 pt-2 pb-2 fs-6">Buy Now</Button>
                                 </Row>
                            </div>
                         );
                    }

                    prevStat  = product.StockStatus;
                    return prevStat;
                });
                
                /* Page Work */
                
                /* Page Work */


                /* Methods */
                getGallery(product.ManuUrl);
                getSimilarLinks(product.IsFeatured);
                getSpecification(ProductId);
                getReviews(ProductId,product.IsFeatured,4);
                getBundles(ProductId);
                /* Methods */
            }    

            fetchData();
        }
    },[ProductId])

    const RenderHTML = (props) => (<span dangerouslySetInnerHTML={{__html:props.HTML}}></span>)

    const RenderHigh = (props) => {
        if(props.high)
            return props.high.split("|").map((highlight) => 
                <Col className="m-0 text-center" style={{fontSize:'13px', padding:'5px'}} key={crypto.randomBytes(10).toString('hex')} dangerouslySetInnerHTML={{ __html: highlight }} />
            );
        else
            return <Col></Col>;
    }

    const currencyFormat = (num) => {
        try{
            return 'R ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }catch(e){
            return num;
        }
     }

    const addToCart = ()=> {
        console.log("Add To Cart Click");
    }

    const notifyMe = () => {
        console.log("Notify Me Click");
    }

    /* Bundle Item Selection */
    const bundleItemsSeleceted = bundleItem => {
        setSelecetecBundleItems((prevBundleItems) => {
            let nBundleId = bundleItem.BundleId;
            prevBundleItems = _.filter(prevBundleItems,item => item.BundleId != nBundleId);
            let selecetedBundles =  [...prevBundleItems,bundleItem];
            let price = _.sumBy(selecetedBundles, function(o) { return o.Price; });
            setTotalPrice(laptop.Price + price);
            return selecetedBundles;
        });
        
    }
    /* Bundle Item Selection */
    
    return (
        <Container fluid>
           <div className="wrapper p-2">
                <Row className="pb-3">
                    <Col lg={5} md={6} sm={6} xs={12} className="pt-2 pb-2">
                        <div>
                        <LaptopGallery GalleryData={galleryData} />
                        </div>
                        {/* <Image className="hidden" src={laptop.manuurl}></Image> */}
                    </Col>
                    <Col lg={5} md={6} sm={6} xs={12} className="pt-2 pb-2">
                        <Row>
                            <Col>
                                <RenderHTML  HTML={laptop.Des} />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col md={8} xs={12}>
                                    <p  style={{fontSize:'13px'}} className='p-0 m-0'>  {laptop.SKU} </p>
                                    <p style={{fontSize:'12px'}}  className='p-0 m-0'> Be the first to review this product...</p>
                            </Col>
                            <Col md={4} xs={12}>
                            </Col>
                        </Row>
                        <hr></hr>
                        <Row className="text-right p-0">
                            <span style={{fontSize:'12px'}}>Modal No : <b>{laptop.Code}</b></span>
                        </Row>
                        <Row className="">
                            <RenderHigh high={laptop.high} />
                        </Row>
                        <Row>
                            <Col className="d-inline-flex justify-content-center mt-1 mb-1">
                                <Button className="btn btn-light border-dark w-100" >
                                   <FcLike/> Add To Wishlist
                                </Button>
                            </Col>
                            <Col  className="d-inline-flex justify-content-center  mt-1 mb-1">
                                <Button className="btn btn-light  border-dark  w-100" onClick={() => setAskQuestionShow(true)}>
                                  <FcQuestions/> Ask a Question?
                                </Button>

                                <AskQuestion
                                    show={askQuestionShow}
                                    onHide={() => setAskQuestionShow(false)}
                                />
                            </Col>
                            <Col  className="d-inline-flex justify-content-center  mt-1 mb-1">
                                <Button className="btn btn-light  border-dark  w-100" onClick={() => setTellFriendShow(true)}>
                                    <FcShare/> Tell a Friend
                                </Button>

                                <TellFriend
                                    show={tellFriendShow}
                                    onHide={() => setTellFriendShow(false)}
                                />
                            </Col>
                            <Col  className="d-inline-flex justify-content-center  mt-1 mb-1">
                                <Button className="btn btn-light  border-dark  w-100" >
                                    <FcCurrencyExchange/> Price Match
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={2} md={12} sm={12} xs={12} className="pt-2 pb-2">
                        {/* Pricing Section */}
                        <Row className="text-right">
                            <span className="f-12">List Price</span>
                            <span><s> {currencyFormat(laptop.OldPrice)}</s></span>
                            <span className="f-12">Discounted Price</span>
                            <span className="price-new">{currencyFormat(laptop.Price)}</span>
                            <span className="f-12 text-black-50">Save {laptop.per}%</span>
                            <span className="f-12 mt-1 fw-bold">Note: price include 15% V.A.T</span>
                            <span className="f-12 text-black-50">Discount only available when paying by Instant EFT or EFT *</span>
                        </Row>
                        <Row>
                            <Col>
                                <QtyBox />
                            </Col>
                            <Col className="d-inline-flex justify-content-center">
                                <Badge bg="dark" className="pt-2 pb-2 pe-3 ps-3 ">Free Delievery !</Badge>
                            </Col>
                        </Row>
                        <Row className="pe-2 ps-2 pt-2 pb-1">
                            <Badge bg={stockBg} className="w-100 pt-3 pb-3 fs-6">{stockStatus}</Badge>
                        </Row>

                        {cartElements}

                        {/* Pricing Section */}
                    </Col>
                </Row>
                <Row>
                {/* Product Information Tabs */}    
                <Col md={10} sm={12} xs={12}>
                    <Tabs defaultActiveKey="description" id="justify-tab-example" className="mb-3" justify>
                        <Tab eventKey="description" title="Description" >
                            <div className="container-fluid overflow-hidden">
                                <RenderHTML  HTML={laptop.DynamicOverview} />
                            </div>
                        </Tab>
                        <Tab eventKey="specification" title="Specification">
                            <div className="container-fluid overflow-hidden">
                                <LaptopSpec Specs={specification}/>
                            </div>
                        </Tab>
                        <Tab eventKey="essential-extras" title="Essential Extras">
                            <Row className="pe-1 ps-1">
                                <Col className="text-left ">
                                    <h5 className="pe-1 ps-1">Buy these items together and save even more!</h5>
                                </Col>
                                <Col className="text-right">
                                    <h6 className="pe-1 ps-1">Current Price: <span className="price-new">{currencyFormat(totalPrice)}</span></h6>
                                </Col>
                            </Row>
                            <LaptopBundles ProductId={ProductId} Bundles={bundles} onBundleItemsSeleceted={bundleItemsSeleceted} selecetedItems={selectedBundleItems}/>
                        </Tab>
                        <Tab eventKey="reviews" title="Reviews">
                            <LaptopReviews  ProductId={ProductId} Reviews={reviews} />
                        </Tab>
                    </Tabs>
                </Col>
                {/* Product Information Tabs */}    
                <Col md={2} sm={12} xs={12}>
                    <LaptopLinks links={similarLinks} brand={brand} ProductId={ProductId} />
                </Col>
                </Row>
            </div>
        </Container>
    );

}

export default Laptop;