import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    const res = await fetch("http://localhost:3000/api/user");
    const data = await res.json();
    setUsers(data);
  }

  async function deleteUser(id) {
    await fetch(`http://localhost:3000/api/user/${id}`, {
      method: "DELETE",
    });
    loadUsers();
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h2>User Management</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.firstname} {u.lastname}</td>
              <td>{u.status}</td>
              <td>
                <Link to={`/user/${u._id}`}>Edit</Link>{" "}
                <button onClick={() => deleteUser(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


