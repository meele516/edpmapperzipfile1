

import { useCallback } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";

import "reactflow/dist/style.css"
import { nodeTypes } from "./nodes";


import { initialNodes } from "./nodes";
import { edgeTypes, initialEdges,} from "./edges";
import { useFlow } from "./hooks/useFlow";
import { useDrop } from "react-dnd";

export default function App() {
  const [initialNodes,initialEdges]=useFlow()
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  console.log(nodes,"saleem")
  const onConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );
  const [{ isOver }, drop] = useDrop(() => ({
		accept: "node",
		drop:  (item)=>{
      console.log(item)
    },
		hover:(item, monitor)=>{
			console.log(item,"uppena")
		}
	
	  }));
console.log(edges)
  return (
    <div style={{width:"100%",height:"100%"}} ref={drop} >
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
    </div>
  );
}
