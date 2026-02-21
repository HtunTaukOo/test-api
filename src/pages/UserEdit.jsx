import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const usernameRef = useRef();
  const emailRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const passwordRef = useRef();
  const statusRef = useRef();

    async function loadUser() {
    const res = await fetch(`http://localhost:3000/api/user/${id}`);

    if (!res.ok) {
        alert("Failed to load user");
        return;
    }

    const data = await res.json();
    if (!data) return;

    usernameRef.current.value = data.username || "";
    emailRef.current.value = data.email || "";
    firstnameRef.current.value = data.firstname || "";
    lastnameRef.current.value = data.lastname || "";
    statusRef.current.value = data.status || "ACTIVE";
    }


  async function updateUser() {
    const body = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      status: statusRef.current.value,
    };

    // include password only if filled
    if (passwordRef.current.value) {
      body.password = passwordRef.current.value;
    }

    const res = await fetch(`http://localhost:3000/api/user/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      alert("User updated!");
      navigate("/user");
    } else {
      alert("Update failed");
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div>
      <h2>Edit User</h2>

      <table>
        <tbody>
          <tr>
            <td>Username</td>
            <td><input ref={usernameRef} /></td>
          </tr>
          <tr>
            <td>Email</td>
            <td><input ref={emailRef} /></td>
          </tr>
          <tr>
            <td>First Name</td>
            <td><input ref={firstnameRef} /></td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td><input ref={lastnameRef} /></td>
          </tr>
          <tr>
            <td>New Password</td>
            <td><input type="password" ref={passwordRef} /></td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              <select ref={statusRef}>
                <option value="ACTIVE">ACTIVE</option>
                <option value="SUSPENDED">SUSPENDED</option>
                <option value="DELETED">DELETED</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <button onClick={updateUser}>Update User</button>
      <button onClick={() => navigate("/user")}>Cancel</button>
    </div>
  );
}
