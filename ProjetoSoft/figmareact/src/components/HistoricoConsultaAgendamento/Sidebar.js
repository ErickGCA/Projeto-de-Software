import React from "react";
import { MdArrowBack } from "react-icons/md"; // Ícone de seta para voltar
import logoImage from "../images/logo (1).png"; // Ajuste o caminho conforme sua estrutura
import styles from "./ConsultarHistoricoAgen.module.css"; // Importando os estilos

function Sidebar({ toggleHelp }) {
  const handleBack = () => {
    // Lógica para voltar à página anterior
    window.history.back(); // Navega para a página anterior
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
      <h2 className={styles.formTitle}>Histórico de Ações</h2>

      {/* Botão de voltar */}
      <button className={styles.backButton} onClick={handleBack}>
        <MdArrowBack />
      </button>

      {/* Botão de ajuda que chama a função passada como prop */}
      <button className={styles.helpButton} onClick={toggleHelp}>
        ?
      </button>
    </aside>
  );
}

export default Sidebar;
