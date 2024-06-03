// src/pages/signup.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    role: "buyer",
    adminSecret: "",
  });

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
    // Logique d'inscription
    navigate("/");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Inscription</h1>
        <form onSubmit={handleSubmit}>
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
            Mot de passe:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Numéro de téléphone:
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </label>
          <label>
            Rôle:
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
              Clé d'administrateur:
              <input
                type="text"
                name="adminSecret"
                value={formData.adminSecret}
                onChange={handleChange}
              />
            </label>
          )}
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
