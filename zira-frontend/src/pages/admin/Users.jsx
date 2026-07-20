import React, { useEffect, useState } from "react";
import { api } from "../../api/client";
import CrudTable from "../../components/CrudTable";

export default function Users() {
  const [users, setUsers] = useState([]);
  const load = () => api.listUsers().then(setUsers);
  useEffect(() => { load(); }, []);

  const del = async (u) => { await api.deleteUser(u._id); load(); };

  return (
    <CrudTable
      title="Users"
      columns={["Name", "Email", "Phone", "Address"]}
      rows={users.map((u) => ({ cells: [u.name, u.email, u.phone, u.address], raw: u }))}
      onDelete={del}
    />
  );
}
