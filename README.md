# Workflow_Automation_Builder

## Overview

The Workflow Builder is a React application that allows users to create and manage workflow nodes visually. Users can add different types of nodes (tasks, conditions, notifications), connect them, and configure their properties through a user-friendly interface.

## Instructions to Run the Project Locally

**Clone the Repository**

First, clone the repository to your local machine:
Run the following commands to install the required packages:

npm install @xyflow/react

npm install react-hook-form

npm i lucide-react

## Design Decisions and Trade-offs

**Node Types** The application supports three types of nodes (Task, Condition, Notification). Each type has its own configuration requirements. This design allows for flexibility in defining workflows.

**Custom Node Components** Each node type has a custom component for rendering. This modular approach makes it easy to extend the application by adding new node types in the future.

**State Management** The application manages state using hooks like useState, useCallback, and custom hooks from @xyflow/react for nodes and edges. This ensures a clean and maintainable codebase.
->useState is used for selected node management and UI state like colorMode.
->useCallback optimizes performance by memoizing event handlers like onConnect, onNodeClick, handleNodeUpdate and deleteNode.

**User Interaction:** Users can add, update, or delete nodes easily. The configuration panel provides a straightforward way to modify node properties. This enhances the user experience by making the workflow design intuitive.

**UI Design:** A simple and clean UI is implemented using CSS to ensure that the workflow builder is user-friendly while maintaining a professional appearance.

**Interactivity & User Experience**
onNodeClick opens a configuration panel for updating node properties dynamically.
Nodes have connection handles (Handle components) for linking workflow steps.
MiniMap, Controls, and Background enhance the user experience for better navigation.

**Theming Support**
A colorMode state allows switching between "dark", "light", and "system" themes.

## Assumptions Made During Development

Data Structure: It is assumed that each node will have a unique ID, a type, and related data. The node types are limited to task, condition, and notification.

User Interaction: It is assumed that users will interact with the workflow builder primarily through the UI, and that node configurations will be updated via the provided forms.

Environment: It is assumed that users have Node.js and npm installed on their machine to run the project locally.

## Future Improvements

Enhanced Validation: Implement validation for node properties to ensure all required fields are filled out before allowing updates.

Persist Node Data: Add functionality to save the workflow to a database or local storage to maintain state across sessions.

Drag-and-Drop Support: Enhance the user experience by allowing users to drag and drop nodes to rearrange their workflows.
