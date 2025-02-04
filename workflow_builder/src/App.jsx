import React, { useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  ReactFlowProvider,
  Panel,
  // applyNodeChanges,
  // applyEdgeChanges,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { initialNodes, initialEdges } from "./components/initialElement";
import ContextMenu from "./components/ContextMenu";

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();
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
    [setMenu]
  );

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  return (
    <div
      className="reactflow-wrapper"
      style={{ width: "100vw", height: "100vh" }}
    >
      <ReactFlowProvider>
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
          style={{ backgroundColor: "#F7F9FB", width: "80%" }}
        >
          <Background />
          {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
          <MiniMap />
          <Controls />
        </ReactFlow>
        <FormNode />
      </ReactFlowProvider>
    </div>
  );
};

export default Flow;
