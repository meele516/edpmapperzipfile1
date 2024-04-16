import * as React from "react";
import { useSpring, animated } from "react-spring";
import "./SideDrawer.css";
import close from "./assets/close.svg"
import Draggable from "./Draggable";

const Drawer = ({ show,handleToggleDrawer }) => {
  const props = useSpring({
    
    left: show ?- 300 : 0,
    position: "absolute",
    top: 0,
    backgroundColor: "#f8f4ff",
    height: "100vh",
    width: "300px",
    zIndex:100
  });
//   const []=useDrag((dropedItem)=>({
// type:"node"
//   }))


let data=["cloudStorage","bigQueryData","Azure"]
  return (
    <animated.div style={props}>
        <img src={close} style={{position:"absolute",padding:"10px",right:0,zIndex:100}} onClick={(e)=>handleToggleDrawer()}></img>
      <div className="drawer">
        <div>
       {data.map((dta)=><Draggable name={dta}/>
        
        )}
       </div>
        
      </div>
    </animated.div>
  );
};

export default Drawer;
