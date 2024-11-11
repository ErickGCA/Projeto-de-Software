import React, { useState } from "react";
import styles from "./GerenciarBeneficiado.module.css";
import HistoricoList from "./HistoricoList";
import Sidebar from "./Sidebar";

function GerenciarBeneficiado() {
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
              onHelpClick={handleHelpClick}
              onBackClick={handleBackClick}
            />
          </div>
          <div className={styles.historicoColumn}>
            <HistoricoList />
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
            <h2>Instruções para Gerenciar Beneficiado</h2>
            <p>
              Nesta página, você pode gerenciar as informações dos beneficiados
              registrados no sistema. Utilize as funcionalidades abaixo para
              acessar o histórico, editar ou excluir registros.
            </p>
            <ol>
              <li>
                <b>Histórico:</b> Consulte o histórico de cada beneficiado para
                visualizar interações e dados relevantes.
              </li>
              <li>
                <b>Editar Beneficiado:</b> Altere as informações necessárias do
                beneficiado, garantindo que todos os dados estejam atualizados.
              </li>
              <li>
                <b>Excluir Beneficiado:</b> Caso precise remover o registro, use
                a função de exclusão com cuidado, pois essa ação é permanente.
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

export default GerenciarBeneficiado;
