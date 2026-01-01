import { useState } from "react";
import WorkFlowNode from "./WorkFlowNode";

const initialWorkflow = {
  id: "start",
  type: "start",
  label: "Start",
  children: []
};

export default function App() {
  const [workflow, setWorkflow] = useState(initialWorkflow);

  const addNode = (parentId, type) => {
    const newNode = () => {
      const id = Date.now().toString();
      return type === "branch" ? {
        id,
        type: "branch",
        label: "Condition",
        children: [
          { id: id + "-true", type: "action", label: "True", children: [] },
          { id: id + "-false", type: "action", label: "False", children: [] }
        ]
      } : {
        id,
        type,
        label: type === "end" ? "End" : "Action",
        children: []
      };
    };

    const traverse = (node) => {
      if (node.id === parentId) {
        if (node.type === "end" || (node.type === "action" && node.children.length)) return node;
        return Object.assign({}, node, { children: node.children.concat(newNode()) });
      }
      return Object.assign({}, node, { children: node.children.map(traverse) });
    };

    setWorkflow(traverse(workflow));
  };

  const deleteNode = (id) => {
    const traverse = (node) =>
      Object.assign({}, node, {
        children: node.children.flatMap((child) =>
          child.id === id ? child.children : [traverse(child)]
        )
      });
    setWorkflow(traverse(workflow));
  };

  const editNode = (id, label) => {
    const traverse = (node) =>
      node.id === id
        ? Object.assign({}, node, { label })
        : Object.assign({}, node, { children: node.children.map(traverse) });
    setWorkflow(traverse(workflow));
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      overflowY: "auto",
      padding: "20px 0"
    }}>
      <div style={{
        maxWidth: "500px",
        width: "100%",
        padding: "30px",
        textAlign: "center",
        color: "white"
      }}>
        <h2>Workflow Builder</h2>
        <WorkFlowNode node={workflow} onAdd={addNode} onDelete={deleteNode} onEdit={editNode} />
      </div>
    </div>
  );
}