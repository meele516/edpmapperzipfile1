import { useState } from "react";
import Drawer from "./Drawer";
import "./SideDrawer.css";
import open from "./assets/open.svg"

export default function SideDrawer() {
  const [isDrawerShowing, setDrawerShowing] = useState(true);

  const handleToggleDrawer = () => {
    console.log("clicked")
    setDrawerShowing(!isDrawerShowing);
  };
  console.log("rerendered")

  return (
    <div className="sidedrawer">
      {/* <button className="openButton" onClick={()=>setDrawerShowing(true)}>
        {isDrawerShowing ? "Close" : "Open"}
      </button> */}
      <img src={open} onClick={(e)=>handleToggleDrawer()} style={{position:"absolute",padding:"10px",zIndex:2}}></img>
      <Drawer show={isDrawerShowing} handleToggleDrawer={handleToggleDrawer}/>
    </div>
  );
}
