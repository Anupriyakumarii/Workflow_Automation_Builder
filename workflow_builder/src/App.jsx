// import React, { useCallback, useRef, useState } from 'react';
// import {
//   ReactFlow,
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
// } from '@xyflow/react';
 
// import '@xyflow/react/dist/style.css';

 
 
// const initialNodes = [
//   { id: '1', position: { x: 600, y: 0 }, data: { label: 'Task' } },
//   { id: '2', position: { x: 600, y: 200 }, data: { label: 'Condition' } },
//   { id: '3', position: { x: 600, y: 400 }, data: { label: 'Notifications' } },
// ];
// const initialEdges = [
//   { id: 'e1-1', source: '1', target: '2' },
//   { id: 'e1-2', source: '2', target: '3' },
//   { id: 'e1-3', source: '3', target: '4' }
// ];



 
// export default function App() {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
 
//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     [setEdges],
//   );
 
//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
        
//       >
//         <Controls />
//         <MiniMap />
//         <Background variant="dots" gap={12} size={1} />
        
//       </ReactFlow>
//     </div>
//   );
// }


import React, { useCallback, useRef, useState } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Panel,
  // applyNodeChanges,
  // applyEdgeChanges,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import "tailwindcss";
import { initialNodes, initialEdges } from './components/initialElement';
import ContextMenu from './components/ContextMenu';
import FormNode from './components/FormNode';

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [setEdges],
  );

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu],
  );

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

 
  
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
    <ReactFlow
      ref={ref}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onPaneClick={onPaneClick}
      onNodeContextMenu={onNodeContextMenu}
      fitView
      style={{ backgroundColor: "#F7F9FB" }}
    >
      <Background />
      {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      <MiniMap/>
      <Controls/>
     
    </ReactFlow>
    </div>
  );
};

export default Flow;
