import React from 'react';
import { Handle, Position } from 'reactflow';

const CustomHandle = ({ type, id, position, style, styleid, isConnectable }) => {
  const handleStyle = {
    ...style,
    backgroundColor: 'lightblue',
    width: 2,
    height: 2,

    borderRadius:'1px',
   
    ...(styleid && { [styleid]: true }),
  };

  return (
    <Handle
      type={type}
      id={id}
      position={position}
      style={handleStyle}
      isConnectable={isConnectable}/>
  );
};

export default CustomHandle;