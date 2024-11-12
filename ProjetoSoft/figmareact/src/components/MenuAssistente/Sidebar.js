import React, { useState } from "react";
import logoImage from "../images/logo (1).png"; // Ajuste o caminho conforme sua estrutura
import styles from "./MenuAssistente.module.css";

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
            <h2>Instruções</h2>
            <p>
              Bem-vindo ao menu da assistente social! Abaixo estão as opções
              disponíveis para você gerenciar usuários, beneficiários,
              benefícios e outras funções importantes do sistema.
            </p>

            <h3>1. Gerenciar Usuários</h3>
            <p>
              Utilize essa opção para gerenciar os dados dos usuários
              registrados no sistema. Aqui, você pode visualizar, editar ou
              desativar informações de qualquer usuário. Certifique-se de
              revisar todas as alterações antes de salvá-las.
            </p>

            <h3>2. Beneficiário (Gerenciar)</h3>
            <p>
              Use essa funcionalidade para gerenciar os beneficiários
              registrados. Você pode adicionar, editar ou excluir beneficiários,
              bem como revisar seus dados e histórico. Verifique se as
              informações dos beneficiários estão corretas antes de fazer
              qualquer alteração.
            </p>

            <h3>3. Benefícios (Gerenciar)</h3>
            <p>
              Essa opção permite gerenciar os benefícios disponíveis para os
              beneficiários. Você pode adicionar novos benefícios, editar os
              existentes ou removê-los quando necessário. Certifique-se de que
              os benefícios atribuídos estejam corretos e atualizados.
            </p>

            <h3>4. Filiado (Gerenciar)</h3>
            <p>
              Acesse esta área para visualizar e gerenciar os filiados. Aqui,
              você pode criar, excluir ou editar as informações. Verifique cada
              filiado cuidadosamente antes de tomar qualquer decisão.
            </p>

            <h3>5. Relatório RMA</h3>
            <p>
              Utilize esta opção para gerar um relatório detalhados sobre RMA
              Você pode personalizar o relatório conforme o mês.
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
