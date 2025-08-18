// src/components/RegistrationForm.jsx
import { useState } from "react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setMessage("⚠️ All fields are required.");
      return;
    }

    try {
      // Mock API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setMessage("✅ User registered successfully!");
        setFormData({ username: "", email: "", password: "" });
      } else {
        setMessage("❌ Registration failed. Try again.");
      }
    } catch (err) {
      setMessage("❌ Network error.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded w-80 mx-auto mt-6"
    >
      <h2 className="text-lg font-bold mb-2">Controlled Registration Form</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Register
      </button>

      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
