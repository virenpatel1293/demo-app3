import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ProductList from "./ProductList";
/* import HorizontalScrollView from "../UI/HorizontalScrollView"; */
import { useSpring,animated } from "react-spring";
import { useGesture } from "react-use-gesture";

const ProductDeals= (props)=>{
    const [laptops, setLaptops] = useState([]);
    
    const fetchData = async ()=>{

        const prods = await fetch('http://localhost:5000/byQueryId',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({
                queryId : props.QueryId
            })
        })
        .then(res=>res.json());
        console.log(prods);
        setLaptops(prods.result);
    }

    useEffect(()=>{
        fetchData();
    },[]);


    return (
       <Card>
            <Card.Header>
                <h3>{props.DealTitle}</h3>
            </Card.Header>
            <Card.Body className="p-0 m-0">
                <HorizontalScrollView className="overflow-scroll hide-scroll p-3">
                    <ProductList data={laptops}></ProductList>
                </HorizontalScrollView>
            </Card.Body>
        </Card>

    );

}

function HorizontalScrollView(props) {
    const ref = React.useRef();
    const isDragging = React.useRef(false);
    const [{ x }, set, stop] = useSpring(() => ({ x: 0 }));
    const bind = useGesture(
      {
        onDrag({ down, movement: [x], first, last, vxvy: [vx] }) {
          if (first) isDragging.current = true;
          if (last) setTimeout(() => (isDragging.current = false), 0);
          set({ x: -x, immediate: down });
        },
        onClickCapture(ev) {
          if (isDragging.current) {
            try{
                ev.stopPropagation();
            }catch(e){}
          }
        },
        onWheelStart() {
          // Stop any user-land scroll animation from confcliting with the browser
          try{
            stop();
          }catch(e){}
        }
      },
      {
        drag: {
          axis: "x",
          filterTaps: true,
          initial() {
            return [-ref.current.scrollLeft, 0];
          }
        }
      }
    );
  
    return (
      <animated.div
        ref={ref}
        scrollLeft={x}
        className={props.className}
        {...bind()}
      >
        {props.children}
      </animated.div>
    );
  }


export default ProductDeals;