import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  /* Load profile */
  useEffect(() => {
    fetch(`http://localhost:3000/api/profile/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          email: data.email || "",
        });

        if (data.profileImage) {
          setPreview(`http://localhost:3000${data.profileImage}`);
        }
      });
  }, [id]);

  /* Handle submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstname", form.firstname);
    formData.append("lastname", form.lastname);
    formData.append("email", form.email);

    if (image) formData.append("image", image);

    await fetch(`http://localhost:3000/api/profile/${id}`, {
      method: "PATCH",
      body: formData,
    });

    alert("Profile updated");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>User Profile</h2>

      {preview && (
        <img
          src={preview}
          alt="profile"
          width="120"
          style={{ display: "block", marginBottom: 10 }}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="First name"
          value={form.firstname}
          onChange={(e) => setForm({ ...form, firstname: e.target.value })}
        />
        <br />

        <input
          placeholder="Last name"
          value={form.lastname}
          onChange={(e) => setForm({ ...form, lastname: e.target.value })}
        />
        <br />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <br /><br />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
