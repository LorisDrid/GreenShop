import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import Footer from "../components/Footer";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/Home"); // Redirige vers /Home si l'utilisateur est déjà connecté
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        { email, password },
      );

      // Stocker le token et l'ID utilisateur dans le localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("userId", response.data.userId);

      navigate("/Home");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          if (err.response.status === 429) {
            setError("Too many requests, please try again later.");
          } else if (err.response.status === 401) {
            setError("Invalid credentials, please try again.");
          } else if (err.response.data && err.response.data.error) {
            setError(err.response.data.error);
          } else {
            setError("An unexpected error occurred");
          }
        } else {
          setError("No response from server, please try again.");
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
          </form>
          <p className="signup-link">
            You don't have an account? <a href="/Signup">Click here</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
