
import { Position } from "reactflow";
import CustomHandle from "../handles/CustomHandle";




export function PositionLoggerNode({
  xPos,
  yPos,
  data,
  isConnectable 
}) {
  const x = `${Math.round(xPos)}px`;
  const y = `${Math.round(yPos)}px`;
  console.log(data,"hiramu")

  return (
    <div className="react-flow__node-default" style={{padding:"0px",width:"auto"}}>
      {data.label && <div style={{fontFamily:"monospace",color:"white",background:"#0159A1"}}>{data.label}</div>}

      <div style={{display:"flex",flexDirection:"column"}}>
       {
        data?.selectedOutputParams?.map(
          (paramName, index) => (
            <>
            <div style={{display:"flex",flexDirection:"row"}}>
           <input defaultChecked={data?.indexes?.[paramName] === "secondary" ? true : false} disabled={data?.indexes?.[paramName] === "secondary" ? true : false} type="checkbox"></input>
            <span key={index} style={index%2==0?{background:"beige"}:{}}>
              {paramName}
              
            </span>
            </div>
            <CustomHandle type="source" id={data.label+paramName+"source"} position={Position.Right} style={{top:index*18+30}} styleid={`bottom-${index}`} isConnectable={isConnectable} />
            <CustomHandle type="target" id={data.label+paramName+"target"} position={Position.Left} style={{top:index*18+30}} styleid={`left-${index}`} isConnectable={isConnectable} />
            </>
          )
        )
       }
       </div>
    </div>
  );
}
