import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import "tailwindcss";
 
const initialNodes = [
  { id: '1', position: { x: 600, y: 0 }, data: { label: 'Task' } },
  { id: '2', position: { x: 600, y: 40 }, data: { label: 'Notification' } },
  { id: '3', position: { x: 600, y: 80 }, data: { label: 'condition' } },
  
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '2', target: '3' },
  { id: 'e1-4', source: '3', target: '4' }
];
 
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background  variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}