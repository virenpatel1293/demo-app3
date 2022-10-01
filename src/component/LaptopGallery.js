import React, { useEffect, useState } from "react";
import {ReactImageGallery as ImageGallery} from "react-image-gallery";

const LaptopGallery = (props) => {
    const [gallery,setGallery] = useState({});
    const [galleryData, setGalleryData] = useState([]);

    useEffect(()=>{
        if(!isNaN(props.ProductId)){            
            const getGallery = async ()=>{
                const prods = await fetch(`http://localhost:5000/laptopGalleryById/${props.ProductId}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept' : 'application/json'
                    }
                })
                .then(res=>res.json());
                let gallery = prods.result[0];
               /*  setGallery(prevGallery => {
                    return {...prevGallery, gall};            
                }); */
                setGallery(gallery);
                console.log(gallery);
            }   

            getGallery();
            
            let galleryImages=[];
            let images = gallery.ImageGallery.split("|").map(image => {
                return `https://www.evetech.co.za/${image}`;
            });
            let imageThumb = gallery.ImageGalleryThumb.split("|").map(image => {
                return `https://www.evetech.co.za/${image}`;
            });
            console.log(images);
            for(let i=0;i<images.length ; i++) {
                galleryImages.push({
                    "original" : images[i],
                    "thumbnail": imageThumb[i]
                });
            }
            setGalleryData(galleryImages);
            console.log(galleryData);
        }
    },[]);

    return (
        <div>
         {/*    <ImageGallery  items={galleryData}/> */}
        </div>
    );
};

export default LaptopGallery;