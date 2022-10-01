import React from "react";
import { useSpring,animated } from "react-spring";
import { useGesture } from "react-use-gesture";

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

  export default HorizontalScrollView;