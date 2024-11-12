import React from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import logoImage from "../images/logo (1).png";
import styles from "./GerenciarUsuario.module.css";

function Sidebar({ onHelpClick }) {
  const navigate = useNavigate(); // Inicializa o hook

  const handleBackClick = () => {
    navigate(-1); // Volta para a página anterior
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
      <h2 className={styles.formTitle}>Gerenciar Usuário</h2>

      <button
        type="button"
        className={styles.backButton}
        onClick={handleBackClick}
      >
        <MdArrowBack />
      </button>

      <button type="button" className={styles.helpButton} onClick={onHelpClick}>
        ?
      </button>
    </aside>
  );
}

export default Sidebar;
