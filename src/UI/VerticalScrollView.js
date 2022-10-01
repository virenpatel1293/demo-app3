import React from "react";
import { useSpring,animated } from "react-spring";
import { useGesture } from "react-use-gesture";

function VerticalScrollView(props) {
    const ref = React.useRef();
    const isDragging = React.useRef(false);
    const [{ y }, set, stop] = useSpring(() => ({ y: 0 }));
    const bind = useGesture(
      {
        onDrag({ down, movement: [, y], first, last }) {
          if (first) isDragging.current = true;
          if (last) setTimeout(() => (isDragging.current = false), 0);
          set({ y: -y, immediate: down });
        },
        onClickCapture(ev) {
          if (isDragging.current) {
            ev.stopPropagation();
          }
        },
        onWheelStart() {
          // Stop any user-land scroll animation from confcliting with the browser
          stop();
        }
      },
      {
        drag: {
          axis: "y",
          filterTaps: true,
          initial() {
            return [0, -ref.current.scrollTop];
          }
        }
      }
    );
  
    return (
      <animated.div
        ref={ref}
        scrollTop={y}
        className={props.className}
        {...bind()}
      >
        {props.children}
      </animated.div>
    );
  }

  export default VerticalScrollView;
  