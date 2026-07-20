import React, { useEffect, useState } from "react";
import { api } from "../../api/client";
import { Field, Modal } from "../../components/ui";
import CrudTable from "../../components/CrudTable";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [modal, setModal] = useState(null);

  const load = () => api.listBlogs().then(setBlogs);
  useEffect(() => { load(); }, []);

  const save = async (form) => {
    if (form._id) await api.updateBlog(form._id, form);
    else await api.createBlog(form);
    setModal(null);
    load();
  };
  const del = async (b) => { await api.deleteBlog(b._id); load(); };

  return (
    <>
      <CrudTable
        title="Blogs"
        columns={["Title", "Author", "Date"]}
        rows={blogs.map((b) => ({ cells: [b.title, b.author, new Date(b.createdAt).toLocaleDateString()], raw: b }))}
        onAdd={() => setModal({ title: "", author: "Zira Editorial", content: "" })}
        onEdit={setModal}
        onDelete={del}
      />
      {modal && (
        <Modal title={modal._id ? "Edit Blog" : "Add Blog"} onClose={() => setModal(null)} wide>
          <Field placeholder="Title" value={modal.title} onChange={(e) => setModal({ ...modal, title: e.target.value })} />
          <Field placeholder="Author" value={modal.author} onChange={(e) => setModal({ ...modal, author: e.target.value })} />
          <textarea
            className="input" rows={5} placeholder="Content"
            value={modal.content} onChange={(e) => setModal({ ...modal, content: e.target.value })}
            style={{ marginBottom: 14, resize: "vertical" }}
          />
          <button className="btn btn-solid" style={{ width: "100%" }} onClick={() => save(modal)}>Save</button>
        </Modal>
      )}
    </>
  );
}
