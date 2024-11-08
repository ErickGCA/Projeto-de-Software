import React from "react";
import styles from "./EncaminharPessoa.module.css";

const FormInput = ({
  label,
  type = "text",
  id,
  value,
  onChange,
  placeholder,
  options,
}) => {
  return (
    <>
      <label htmlFor={id} className={styles.inputLabel}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        {type === "select" && options ? (
          <select
            id={id}
            value={value}
            onChange={onChange}
            className={styles.inputField}
            required
          >
            <option value="">{placeholder}</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            className={styles.inputField}
            placeholder={placeholder}
            required
          />
        )}
      </div>
    </>
  );
};

export default FormInput;
