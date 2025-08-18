// src/components/RegistrationForm.jsx
import { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setMessage("⚠️ All fields are required.");
      return;
    }

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );

      if (response.ok) {
        setMessage("✅ User registered successfully!");
        setUsername("");
        setEmail("");
        setPassword("");
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-2 w-full"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-full"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
