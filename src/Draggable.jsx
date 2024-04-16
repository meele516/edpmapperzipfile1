import { useRef } from "react";
import { useDrag } from "react-dnd";

export default function Draggable({name}){

    const [{ isDragging }, drag] = useDrag((droppedItem) => ({
      type: "node",
      item: { id: name ,node:name
        ,trigger:() => {}},
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      }));
      console.log(drag,"drag value is")
    return <div ref={drag} style={{color:"black"}}>{name}</div>
}