// RelatorioAssistente.js
import React, { useState } from "react";
import Menu from "./Menu";
import styles from "./RelatorioAssistente.module.css";
import Sidebar from "./Sidebar";

function RelatorioAssistente() {
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
            <h2>Instruções para Gerar Relatório</h2>
            <p>
              Aqui você pode gerar relatório relacionados ao RMA. As instruções
              detalhadas estão abaixo:
            </p>
            <ol>
              <li>
                <b>Selecione o mês:</b> Ao selecionar um mês você verá um
                relatório pré-preenchido caso esse mês tenha sido cadastrado no
                sistema.
              </li>
              <li>
                <b>Imprimir:</b> Após verificar que o mês existe e é o mês que
                você deseja, basta clicar em imprimir e o relatório será gerado
                no estilo do RMA.
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

export default RelatorioAssistente;
