import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.scss"; // Assurez-vous que le chemin est correct
import Footer from "../components/Footer";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "buyer",
    adminSecret: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
        formData,
      );

      // Log de la réponse du backend
      console.log("Backend response:", response.data);
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("An unexpected error occurred");
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="form-container">
          <h1 className="title">Sign up</h1>
          <form onSubmit={handleSubmit}>
            <div className="name-fields">
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Phone number:
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </label>
            <label>
              Role:
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="administrator">Administrator</option>
              </select>
            </label>
            {formData.role === "administrator" && (
              <label>
                Admin key:
                <input
                  type="text"
                  name="adminSecret"
                  value={formData.adminSecret}
                  onChange={handleChange}
                />
              </label>
            )}
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="signup-button">
              Signup
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignupPage;
