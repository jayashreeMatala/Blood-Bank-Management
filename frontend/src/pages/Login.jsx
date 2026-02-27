import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(email, password);

    if (success) {
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ width: 350 }}>
        <h4 className="mb-3 text-center">Login</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-danger w-100">Login</button>
        </form>
      </div>
    </div>
  );
}