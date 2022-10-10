import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FcCollapse, FcExpand } from "react-icons/fc";
import Bundle from "./Bundle";
var _ = require("lodash");

const LaptopBundles = (props) =>{
    const bundles = props.Bundles;
    let baseBundle = null;
    let prodsBundle = null;
    let bundlesSet = [{
        "BundleID": 1,
        "BundleTitle":"Micosoft Office::",
        "Bundles":null,
        "SelectedOption":null,
        "OptionPrice":0,
    },{
        "BundleID": 2,
        "BundleTitle":"Antivirus::",
        "Bundles":null,
        "SelectedOption":null,
        "OptionPrice":0,
    },{
        "BundleID": 5,
        "BundleTitle":"Carry BAG:: ",
        "Bundles":null,
        "SelectedOption":null,
        "OptionPrice":0,
    },{
        "BundleID": 3,
        "BundleTitle":"External HDD:: ",
        "Bundles":null,
        "SelectedOption":null,
        "OptionPrice":0,
    },{
        "BundleID": 4,
        "BundleTitle":"Mouse:: ",
        "Bundles":null,
        "SelectedOption":null,
        "OptionPrice":0,
    },{
        "BundleID": 6,
        "BundleTitle":"Headphones:: ",
        "Bundles":null,
        "SelectedOption":null,
        "OptionPrice":0,
    },{
        "BundleID": 7,
        "BundleTitle":"Speakers:: ",
        "Bundles":null,
        "SelectedOption":null,
        "OptionPrice":0,
    },{
        "BundleID": 8,
        "BundleTitle":"Monitors:: ",
        "Bundles":null,
        "SelectedOption":null,
        "OptionPrice":0,
    }];
    let finalBundles=null;
    let crypto = require("crypto");
   
    const selectBundleItem = bundleItem =>{
        console.log(bundleItem);
        props.onBundleItemsSeleceted(bundleItem);
    };

    if(bundles)
    {
        /* console.log(bundles); */
        baseBundle = bundles[0];
        if(bundles.length === 2)
        {
            prodsBundle = bundles[1];
        }

        /* console.log(_.uniq( _.map(baseBundle,"BundleID"))); */
        _.map(
            _.filter(_.map(_.uniq( _.map(baseBundle,"BundleID")),(n)=>{ return _.filter(baseBundle,bundle => bundle.BundleID === n && (n === 1 || n === 2 || n === 5)) }),filter => filter.length > 0)
            ,(fbundles)=>{
            let bundleID=0;
            let maxPrice= 0;
            const ffBundles =fbundles.map((fbundle) => {
                let bundle = {};
                bundle["BundleID"] = fbundle.BundleID;
                bundleID = fbundle.BundleID;
                bundle["Title"] = fbundle.Title;
                let price = (fbundle.Price.split("=").length > 0 ? parseFloat(fbundle.Price.split("=")[1]):0);
                bundle["Price"] = price;
                bundle["ImageUrl"] = fbundle.Price.split("~")[0].split("!").length > 0 ? "https://www.evetech.co.za/"+fbundle.Price.split("~")[0].split("!")[1]:'';
                bundle["GalleryId"] = fbundle.Price.split("!")[0];
                bundle["ImageId"] = fbundle.ImageID;
                bundle["ProductId"] = fbundle.nPid;
                bundle["IsDefault"] = price > 0 ? 0:1;
                bundle["IsSelected"] = parseInt(bundle["IsDefault"]) ? 1 : 0;
                maxPrice = maxPrice < price ? price:maxPrice;
                bundle["Status"] = fbundle.Status;
                return bundle;
            });

            _.map(bundlesSet, (bundle)=> {
                if(bundle.BundleID === bundleID && !(maxPrice === 0 && ffBundles.length===1))
                    bundle.Bundles= ffBundles;
                return bundle;    
            });

            return ffBundles;
        });
       /*  console.log(finaleBundles); */

       if(prodsBundle)
        {
            /* console.log(prodsBundle);  */
             _.map(
                _.filter([
                    _.filter(prodsBundle, bundle=> bundle.parentiid === 107 || bundle.parentiid === 108),
                    _.map(_.filter(prodsBundle, bundle=> bundle.parentiid === 124 ),(item) => {item["BundleID"]=3; return item;}),
                    _.map(_.filter(prodsBundle, bundle=> bundle.parentiid === 117 ),(item) => {item["BundleID"]=4; return item;}),
                    _.map(_.filter(prodsBundle, bundle=> bundle.parentiid === 100 || bundle.parentiid === 318 ),(item) => {item["BundleID"]=6; return item;}),
                    _.map(_.filter(prodsBundle, bundle=> bundle.parentiid === 87 ),(item) => {item["BundleID"]=8; return item;})
                ],item => item.length > 0)
                ,(fbundles)=>{
                let bundleID=0;
                const ffBundles = fbundles.map((fbundle,ind) => {
                    let bundle = {};
                    bundle["BundleID"] = fbundle.BundleID;
                    bundleID = fbundle.BundleID;
                    bundle["Title"] = fbundle.ConfigText.trim().length>0 ? fbundle.ConfigText.trim() : fbundle.partname;
                    bundle["Price"] = parseFloat(fbundle.price) > 0 ? parseFloat(fbundle.price) : fbundle.Price_Vat;
                    bundle["ImageUrl"] =  "https://www.evetech.co.za/"+(fbundle.configImage.trim().length>0 ? fbundle.configImage.trim() : fbundle.ProductImage);
                    bundle["GalleryId"] = 0;
                    bundle["ImageId"] = fbundle.ImageID;
                    bundle["ProductId"] = fbundle.productid;
                    bundle["IsDefault"] = 0;
                    bundle["IsSelected"] = 0;
                    bundle["Status"] = 1;
                    return bundle;
                });

                _.map(bundlesSet, (bundle)=> {
                    if(bundle.BundleID === bundleID)
                        bundle.Bundles= ffBundles;
                    return bundle;    
                });
                return ffBundles;
            }); 
        }

        bundlesSet=_.filter(bundlesSet, set => set.Bundles !== null);

        const clickBundleHead = (e) =>{
             console.log(e);   
        }

        finalBundles = bundlesSet.map((bundle,ind) => {
            return <Bundle bundle={bundle} key={crypto.randomBytes(4).toString('hex')} isOpen={true} onBundleSelection={selectBundleItem} selectedBundleItems={props.selecetedItems}/>
        });

    }

    

    return (
        <div id="bundlesDiv">
            {finalBundles}
        </div>
    );

}

export default LaptopBundles;