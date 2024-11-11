import React, { useState } from "react";
import styles from "./ConsultarHistoricoAgen.module.css";
import Menu from "./Menu";
import Sidebar from "./Sidebar";

function ConsultarHistoricoAgen() {
  const [showHelp, setShowHelp] = useState(false);

  const toggleHelp = () => setShowHelp((prev) => !prev);

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <div className={styles.content}>
          <div className={styles.sidebarColumn}>
            <Sidebar toggleHelp={toggleHelp} />{" "}
            {/* Passando a função para a Sidebar */}
          </div>
          <div className={styles.historicoColumn}>
            <Menu />
          </div>
        </div>
      </section>

      {/* Modal de ajuda */}
      {showHelp && (
        <div className={styles.modalOverlay} onClick={toggleHelp}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // Impede que o clique no modal feche a caixa
          >
            <h2>Instruções</h2>
            <p>
              Nesta página, você pode visualizar o histórico de encaminhamentos
              e agendamentos realizadas no sistema e gerencia-las. Utilize as
              funcionalidades abaixo para pesquisar e modificar os registros.
            </p>
            <ol>
              <li>
                <strong>Pesquisar pelo Nome do Beneficiário:</strong>
                <p>
                  Use o campo de pesquisa para localizar ações específicas. A
                  busca deve ser feita através do SETOR.
                </p>
              </li>

              <li>
                <strong>Botão Excluir:</strong>
                <p>
                  Clique no botão "Excluir" para remover um registro. Uma
                  confirmação será solicitada antes de concluir.
                </p>
              </li>
              <li>
                <strong>Dicas:</strong>
                <p>
                  Verifique se o nome está correto e revise as informações antes
                  de salvar.
                </p>
              </li>
            </ol>
            <button className={styles.closeButton} onClick={toggleHelp}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default ConsultarHistoricoAgen;
