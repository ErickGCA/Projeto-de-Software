import React from "react";
import styles from "./AgendarConsulta.module.css";

const FormInput = ({
  label,
  icon,
  type = "text",
  id,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <>
      <label htmlFor={id} className={styles.inputLabel}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <span className={styles.inputIcon}>{icon}</span>{" "}
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className={styles.inputField}
          required={label.includes("*")} // Problema: 'label' não está definido
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default FormInput;
