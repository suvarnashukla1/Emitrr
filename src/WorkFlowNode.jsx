export default function WorkFlowNode({ node, onAdd, onDelete, onEdit }) {
  const isEnd = node.type === "end";

  const getPlaceholder = () => {
    if (node.type === "branch") return "Condition";
    if (node.type === "end") return "End";
    return "Action";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ position: "relative" }}>
        <input
          value={node.label}
          placeholder={getPlaceholder()}
          onChange={(e) => onEdit(node.id, e.target.value)}
          style={{
            background:
              node.type === "start"
                ? "green"
                : node.type === "branch"
                ? "orange"
                : node.type === "end"
                ? "red"
                : "blue",
            color: "white",
            padding: "12px 20px",
            borderRadius: "10px",
            fontWeight: "600",
            minWidth: "140px",
            textAlign: "center"
          }}
        />
        {node.type !== "start" && (
          <button
            onClick={() => onDelete(node.id)}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              background: "transparent",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              padding: "0",
              width: "16px",
              height: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              opacity: 0.7
            }}
          >
            ×
          </button>
        )}
      </div>


      {!isEnd && (
        <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
          <button onClick={() => onAdd(node.id, "action")}>+ Action</button>
          <button onClick={() => onAdd(node.id, "branch")}>+ Branch</button>
          <button onClick={() => onAdd(node.id, "end")}>+ End</button>
        </div>
      )}

      {node.children.length > 0 && (
        <>

          <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
            {node.children.map((child) => (
              <WorkFlowNode
                key={child.id}
                node={child}
                onAdd={onAdd}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
