import React from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function CrudTable({ title, columns, rows, onAdd, onEdit, onDelete }) {
  return (
    <div className="fade">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <p className="serif" style={{ fontSize: 30 }}>{title}</p>
        {onAdd && (
          <button className="btn btn-solid" style={{ display: "flex", alignItems: "center", gap: 6 }} onClick={onAdd}>
            <Plus size={14} /> Add
          </button>
        )}
      </div>
      <div className="card" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
          <tr style={{ borderBottom: "1px solid var(--line)", color: "var(--muted)", textAlign: "left" }}>
              {columns.map((c) => <th key={c} style={{ padding: 12 }}>{c}</th>)}
              <th style={{ padding: 12 }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid var(--line)" }}>
                {r.cells.map((c, j) => <td key={j} style={{ padding: 12, color: "#d5cce0" }}>{c}</td>)}
                <td style={{ padding: 12, display: "flex", gap: 12 }}>
                  {onEdit && <Edit2 size={14} style={{ cursor: "pointer", color: "var(--muted)" }} onClick={() => onEdit(r.raw)} />}
                  {onDelete && <Trash2 size={14} style={{ cursor: "pointer", color: "var(--muted)" }} onClick={() => onDelete(r.raw)} />}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={columns.length + 1} style={{ padding: 16, color: "var(--muted)" }}>Nothing here yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
