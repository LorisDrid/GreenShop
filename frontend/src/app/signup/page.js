// src/app/signup/page.js
"use client";

import { useState } from "react";
import styles from "./Signup.module.css";
import DynamicForm from "@components/DynamicForm";

const SignupPage = () => {
  const roles = ["buyer", "seller", "administrator"];

  const fields = [
    { name: "email", label: "Email", type: "email", required: true },
    {
      name: "password",
      label: "Mot de passe",
      type: "password",
      required: true,
    },
    {
      name: "phoneNumber",
      label: "Numéro de téléphone",
      type: "text",
      required: false,
    },
    {
      name: "role",
      label: "Rôle",
      type: "select",
      options: roles,
      required: true,
    },
    {
      name: "adminSecret",
      label: "Clé d'administrateur",
      type: "text",
      required: false,
      visible: false,
    },
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    role: roles[0], // Par défaut, le premier rôle sera sélectionné
    adminSecret: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("User signed up successfully:", result);
      } else {
        console.error("Error signing up:", result.error);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleRoleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      adminSecret: "", // Réinitialiser la clé de l'administrateur lors du changement de rôle
    });
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Inscription</h1>
        <DynamicForm
          fields={fields}
          formData={formData}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onRoleChange={handleRoleChange}
          classes={styles}
        />
      </div>
    </div>
  );
};

export default SignupPage;
