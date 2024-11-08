import React from "react";
import logoImage from "../images/logo (1).png"; // Ajuste o caminho conforme necessário
import styles from "./MenuSecretaria.module.css";

function Sidebar() {
  const handleBackButtonClick = () => {
    window.history.back(); // Volta para a página anterior
  };

  return (
    <aside className={styles.sidebarContainer}>
      <img
        loading="lazy"
        src={logoImage}
        alt="Logo da Secretaria"
        className={styles.logo}
      />
      <h1 className={styles.sidebarTitle}>Secretaria de Assistência Social</h1>
    </aside>
  );
}

export default Sidebar;
