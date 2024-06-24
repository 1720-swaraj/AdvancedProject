import { useEffect, useState } from "react";
import axios from "axios";
import "../style/Auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [errorMeassage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchUsersEmail = async () => {
      const Users = await axios.get("http://localhost:9999/api/users");
      setUsers(Users);
    };
    fetchUsersEmail();
  }, []);

  const checkEmailIsPresentOrNot = () => {
    return users.filter((user) => user.email === email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkEmailIsPresentOrNot) {
      setErrorMessage("User already exists");
    } else {
      const url = "http://localhost:9999/api/auth/register";
      const payload = { name, email, password, role };
      try {
        const response = await axios.post(url, payload);
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        window.location.href = "/login";
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="auth-input"
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="auth-input"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="auth-input"
          />
        </div>
        <div className="input-group">
          <select
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="auth-select"
            required
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Team Member">Team Member</option>
          </select>
        </div>
        {errorMeassage && <div className="error-message">{errorMeassage}</div>}
        <button type="submit" className="auth-button">
          Register
        </button>
        <button
          type="button"
          onClick={() => (window.location.href = "/login")}
          className="switch-button"
        >
          Switch to Login
        </button>
      </form>
    </div>
  );
};

export default Register;
