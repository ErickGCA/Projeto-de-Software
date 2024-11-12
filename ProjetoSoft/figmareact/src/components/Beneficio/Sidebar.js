import React from "react";
import { MdArrowBack } from "react-icons/md"; // Ícone de seta para voltar
import logoImage from "../images/logo (1).png"; // Ajuste o caminho conforme sua estrutura
import styles from "./BeneficiosAssistente.module.css";

function Sidebar({ onHelpClick, onBackClick }) {
  return (
    <aside className={styles.sidebarContainer}>
      <img
        loading="lazy"
        src={logoImage}
        alt="Logo da Secretaria"
        className={styles.logo}
      />
      <h1 className={styles.sidebarTitle}>Secretaria de Assistência Social</h1>
      <h2 className={styles.formTitle}>Gerenciar Beneficios</h2>

      {/* Botões de ajuda e voltar na sidebar */}
      <div className={styles.sidebarButtons}>
        <button
          type="button"
          className={styles.helpButton}
          onClick={onHelpClick}
        >
          ? {/* Ícone de interrogação */}
        </button>

        <button
          type="button"
          className={styles.backButton}
          onClick={onBackClick}
        >
          <MdArrowBack /> {/* Ícone de seta para voltar */}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
