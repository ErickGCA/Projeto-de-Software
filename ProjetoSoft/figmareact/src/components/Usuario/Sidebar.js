import React from "react";
import { MdArrowBack } from "react-icons/md"; // Ícone de seta
import logoImage from "../images/logo (1).png"; // Ajuste o caminho conforme sua estrutura
import styles from "./GerenciarUsuario.module.css";

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
      <h2 className={styles.formTitle}>Gerenciar Usuário</h2>

      {/* Botão de Voltar */}
      <button type="button" className={styles.backButton} onClick={onBackClick}>
        <MdArrowBack /> {/* Ícone de seta para voltar */}
      </button>

      {/* Botão de ajuda */}
      <button type="button" className={styles.helpButton} onClick={onHelpClick}>
        ? {/* Ponto de interrogação */}
      </button>
    </aside>
  );
}

export default Sidebar;
