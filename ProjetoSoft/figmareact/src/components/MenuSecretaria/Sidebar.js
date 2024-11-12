import React, { useState } from "react";
import logoImage from "../images/logo (1).png"; // Ajuste o caminho conforme necessário
import styles from "./MenuSecretaria.module.css"; // Estilo com a classe de logout

function Sidebar() {
  // Função de logout simplificada (sem modal de confirmação)
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove o token de autenticação
    window.location.href = "http://localhost:3000/"; // Redireciona para a página de login
  };

  // Função que abre o modal de ajuda
  const handleHelpClick = () => {
    setIsModalOpen(true); // Abre o modal de ajuda ao clicar no botão de ajuda
  };

  // Função que fecha o modal de ajuda
  const handleCloseModal = () => {
    setIsModalOpen(false); // Fecha o modal
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
      <button className={styles.logoutButton} onClick={handleLogout}>
        Sair
      </button>

      {/* Botão de ajuda */}
      <button
        type="button"
        className={styles.helpButton}
        onClick={handleHelpClick}
      >
        ?
      </button>

      {/* Modal de instruções */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>
              <b>Instruções</b>
            </h2>
            <p>
              Bem-vindo ao menu principal do sistema! Abaixo estão as
              funcionalidades disponíveis:
            </p>
            <h3>
              <b>1. Agendar Consulta:</b>
            </h3>
            <p>
              Use essa opção para agendar uma nova consulta. Ao selecionar, você
              será redirecionado para uma página onde poderá escolher o horário
              e o setor adequado para o agendamento. Certifique-se de fornecer
              todos os detalhes necessários para o agendamento ser confirmado.
            </p>
            <h3>
              <b>2. Encaminhar Usuário:</b>
            </h3>
            <p>
              Utilize essa função para encaminhar um usuário para o setor
              necessário. Será solicitado que você forneça os dados do usuário e
              o setor para o qual ele deve ser encaminhado. Essa função é
              essencial para garantir que os usuários recebam atendimento no
              setor correto. Caso queira encaminhar o usuário com um
              beneficiario (caso eles sejam ligados) ele acrescentará no RMA os
              dados previamente cadastrados
            </p>
            <h3>
              <b>3. Gerar Relatório:</b>
            </h3>
            <p>
              Clique aqui para gerar relatórios do RMA. Esse relatório pode ser
              baixado e armazenado para fins de registro e análise.
            </p>
            <h3>
              <b>4. Agendamentos e Encaminhamentos:</b>
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
