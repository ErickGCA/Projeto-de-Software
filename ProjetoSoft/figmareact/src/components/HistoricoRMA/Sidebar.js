// Sidebar.js
import React from "react";
import logoImage from "../images/logo (1).png"; // Ajuste o caminho conforme sua estrutura
import styles from './HistoricoRMA.module.css';


function Sidebar() {
  return (
    <aside className={styles.sidebarContainer}>
      <img 
              loading="lazy"
              src={logoImage}
              alt="Logo da Secretaria"
              className={styles.logo}
      />
      <h1 className={styles.sidebarTitle}>
        Secretaria de Assistência Social
      </h1>
      <h2 className={styles.formTitle}>

      </h2>


    </aside>
  );
}

export default Sidebar;
