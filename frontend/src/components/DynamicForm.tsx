"use client";

import React from "react";

interface Field {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
  visible?: boolean;
}

interface DynamicFormProps {
  fields: Field[];
  formData: { [key: string]: any };
  onSubmit: (formData: { [key: string]: any }) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  classes: { [key: string]: string };
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  formData,
  onSubmit,
  onChange,
  onRoleChange,
  classes,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onRoleChange(e);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.formContainer}>
      {fields.map((field) => (
        <div key={field.name}>
          {field.type === "select" ? (
            <div>
              <label htmlFor={field.name} className={classes.label}>
                {field.label}:
              </label>
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleRoleChange}
                required={field.required}
                className={classes.inputField}
              >
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label htmlFor={field.name} className={classes.label}>
                {field.label}:
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                className={classes.inputField}
                style={{
                  display:
                    field.visible !== undefined && !field.visible
                      ? "none"
                      : "block",
                }}
              />
            </div>
          )}
        </div>
      ))}
      <div className={classes.submitButtonContainer}>
        <button type="submit" className={classes.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
