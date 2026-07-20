import React, { useEffect, useState } from "react";
import { api } from "../../api/client";
import { Field, Modal } from "../../components/ui";
import CrudTable from "../../components/CrudTable";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(null);

  const load = () => api.listCategories().then(setCategories);
  useEffect(() => { load(); }, []);

  const save = async (form) => {
    if (form._id) await api.updateCategory(form._id, form);
    else await api.createCategory(form);
    setModal(null);
    load();
  };
  const del = async (c) => { await api.deleteCategory(c._id); load(); };

  return (
    <>
      <CrudTable
        title="Categories"
        columns={["Name", "Description"]}
        rows={categories.map((c) => ({ cells: [c.name, c.desc], raw: c }))}
        onAdd={() => setModal({ name: "", desc: "" })}
        onEdit={setModal}
        onDelete={del}
      />
      {modal && (
        <Modal title={modal._id ? "Edit Category" : "Add Category"} onClose={() => setModal(null)}>
          <Field placeholder="Name" value={modal.name} onChange={(e) => setModal({ ...modal, name: e.target.value })} />
          <Field placeholder="Description" value={modal.desc} onChange={(e) => setModal({ ...modal, desc: e.target.value })} />
          <button className="btn btn-solid" style={{ width: "100%" }} onClick={() => save(modal)}>Save</button>
        </Modal>
      )}
    </>
  );
}
