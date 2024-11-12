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
              criar um beneficiario, associar com o RMA, ver detalhes dos
              filiados e dos RMAS.
            </p>
            <ol>
              <li>
                <b>Criar:</b> Na aba de criar beneficiario, mais especificamente
                no "Informações Adicionais", todos os campos são obrigatórios,
                com excessão da categoria Para a lista de categorias aparecer,
                você deverá criar o beneficio antes, em Beneficios -D "Gerenciar
                Beneficios". Os demais blocos (l, ll, lll), são referentes ao
                RMA, nenhuma das opções são obrigatórias.
              </li>
              <li>
                <b>Editar e Excluir:</b> Altere as informações necessárias do
                beneficiado, garantindo que todos os dados estejam atualizados.
                Para editar as informações sobre o RMA o usuário deve escolher o
                mês que deseja e atualizar as informações. NÃO DEIXE DE ESCOLHER
                O MêS!
              </li>
              <li>
                <b>Nos campos VER DETALHES</b> é possivel ver os detalhes do RMA
                associado a determinado beneficiario e os Filiados.
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
