import React, { useState } from "react";
import logoImage from "../images/logo (1).png"; // Ajuste o caminho conforme sua estrutura
import styles from "./MenuSecretaria.module.css";

function Sidebar() {
  // Função de logout simplificada (sem modal de confirmação)
  const handleLogoutClick = () => {
    localStorage.removeItem("authToken"); // Remove o token de autenticação
    window.location.href = "http://localhost:3000/"; // Redireciona para a página de login
  };

  // Função que abre o modal de ajuda
  const handleHelpClick = () => {
    setIsModalOpen(true);
  };

  // Função que fecha o modal de ajuda
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de ajuda

  return (
    <aside className={styles.sidebarContainer}>
      <img
        loading="lazy"
        src={logoImage}
        alt="Logo da Secretaria"
        className={styles.logo}
      />
      <h1 className={styles.sidebarTitle}>Secretaria de Assistência Social</h1>

      {/* Botão de Logout */}
      <button className={styles.logoutButton} onClick={handleLogoutClick}>
        <i className="fas fa-arrow-left"></i> Sair
      </button>

      {/* Botão de ajuda */}
      <button className={styles.helpButton} onClick={handleHelpClick}>
        ?
      </button>

      {/* Modal de instruções */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>
              <b>Agendamentos e Encaminhamentos:</b>
            </h3>
            <p>
              Acesse essa seção para consultar o histórico de agendamentos e
              encaminhamentos realizados. Aqui, você poderá visualizar os
              detalhes de cada ação, incluindo datas, horários e setores
              envolvidos. Use esta área para rever ou acompanhar o andamento de
              processos já iniciados.
            </p>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
