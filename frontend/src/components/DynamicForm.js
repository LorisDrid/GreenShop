// src/components/DynamicForm.js
"use client";

const DynamicForm = ({
  fields,
  formData,
  onSubmit,
  onChange,
  onRoleChange,
  classes,
}) => {
  const handleChange = (e) => {
    onChange(e);
  };

  const handleRoleChange = (e) => {
    onRoleChange(e);
  };

  const handleSubmit = (e) => {
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
                {field.options.map((option) => (
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
