// BeneficiosAssistente.js (Gerenciar Filiado)
import React, { useState } from "react";
import styles from "./BeneficiosAssistente.module.css";
import Menu from "./Menu";
import Sidebar from "./Sidebar";

function GerenciarFiliado() {
  const [showHelp, setShowHelp] = useState(false);

  const handleBackClick = () => {
    window.history.back();
  };

  const handleHelpClick = () => {
    setShowHelp(true);
  };

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <div className={styles.content}>
          <div className={styles.sidebarColumn}>
            <Sidebar
              onBackClick={handleBackClick}
              onHelpClick={handleHelpClick}
            />
          </div>
          <div className={styles.historicoColumn}>
            <Menu />
          </div>
        </div>
      </section>

      {/* Modal de ajuda */}
      {showHelp && (
        <div className={styles.modalOverlay} onClick={() => setShowHelp(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Instruções para Gerenciar Filiado</h2>
            <ol>
              <li>
                <b>Menu de Ações:</b> Aqui você pode criar um filiado, que será
                relacionado com um beneficiario, todas as informações da criação
                são indispensáveis.
              </li>
              <li>
                <b>Excluir e Editar:</b> Você pode editar e excluir filiados, se
                excluir um filiado ele automaticamente não aparecerá no
                beneficiario, se excluir um beneficiario o filiado para de
                existir.
              </li>
            </ol>

            <button
              className={styles.closeButton}
              onClick={() => setShowHelp(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default GerenciarFiliado;
