import React from "react";
import styles from './AgendarConsulta.module.css';

function SidebarButton({ text, marginTop }) {
  return (
    <button className={styles.sidebarButton} style={{ marginTop }}>
      {text}
    </button>
  );
}

export default SidebarButton;