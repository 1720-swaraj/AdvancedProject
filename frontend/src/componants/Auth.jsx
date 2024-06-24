import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Auth.css";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:9999/api/auth/login"
      : "http://localhost:9999/api/auth/register";
    const payload = isLogin
      ? { email, password }
      : { name, email, password, role };
    try {
      const response = await axios.post(url, payload);
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      window.location.href = "/dashbord";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <div className="input-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required={!isLogin}
              className="auth-input"
            />
          </div>
        )}
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
        {!isLogin && (
          <div className="input-group">
            <select
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="auth-select"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Team Member">Team Member</option>
            </select>
          </div>
        )}
        <button type="submit" className="auth-button">
          {isLogin ? "Login" : "Register"}
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="switch-button"
        >
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
