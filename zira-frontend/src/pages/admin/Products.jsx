import React, { useEffect, useState } from "react";
import { api } from "../../api/client";
import { Field, Modal, currency } from "../../components/ui";
import CrudTable from "../../components/CrudTable";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(null);

  const load = () => {
    api.listProducts().then(setProducts);
    api.listCategories().then(setCategories);
  };
  useEffect(() => { load(); }, []);

  const save = async (form) => {
    const clean = { ...form, price: Number(form.price), stock: Number(form.stock) };
    if (form._id) await api.updateProduct(form._id, clean);
    else await api.createProduct(clean);
    setModal(null);
    load();
  };
  const del = async (p) => { await api.deleteProduct(p._id); load(); };

  return (
    <>
      <CrudTable
        title="Products"
        columns={["Name", "Category", "Price", "Stock"]}
        rows={products.map((p) => ({
          cells: [p.name, p.categoryId?.name || "—", currency(p.price), p.stock],
          raw: p,
        }))}
        onAdd={() => setModal({ name: "", desc: "", price: "", stock: "", categoryId: categories[0]?._id || "", icon: "◆" })}
        onEdit={setModal}
        onDelete={del}
      />
      {modal && (
        <Modal title={modal._id ? "Edit Product" : "Add Product"} onClose={() => setModal(null)} wide>
          <Field placeholder="Name" value={modal.name} onChange={(e) => setModal({ ...modal, name: e.target.value })} />
          <Field placeholder="Description" value={modal.desc} onChange={(e) => setModal({ ...modal, desc: e.target.value })} />
          <div style={{ display: "flex", gap: 10 }}>
            <Field placeholder="Price (₹)" type="number" value={modal.price} onChange={(e) => setModal({ ...modal, price: e.target.value })} />
            <Field placeholder="Stock" type="number" value={modal.stock} onChange={(e) => setModal({ ...modal, stock: e.target.value })} />
          </div>
          <select
            className="input" style={{ marginBottom: 14 }}
            value={modal.categoryId?._id || modal.categoryId}
            onChange={(e) => setModal({ ...modal, categoryId: e.target.value })}
          >
            {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <button className="btn btn-solid" style={{ width: "100%" }} onClick={() => save(modal)}>Save</button>
        </Modal>
      )}
    </>
  );
}
