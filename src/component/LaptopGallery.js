import React from "react";
import ImageGallery from 'react-image-gallery';

const LaptopGallery = (props) => {
    return (
        <div>
            <ImageGallery  items={props.GalleryData} thumbnailPosition={"left"} />
        </div>
    );
};

export default LaptopGallery;