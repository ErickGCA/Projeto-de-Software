// BeneficiosAssistente.js
import React, { useState } from "react";
import styles from "./BeneficiosAssistente.module.css";
import Menu from "./Menu";
import Sidebar from "./Sidebar";

function BeneficiosAssistente() {
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
            <h2>Instruções para Benefícios do Assistente</h2>
            <p></p>
            <ol>
              <li>
                <b>Geral:</b> Possibilidade de CRIAR um novo BENEFICIO, após a
                criação, o mesmo irá aparecer na lista de beneficios no
                beneficiario, como descrito no help. Caso um beneficiario seja
                associado a um beneficio já criado, o mesmo será listado aqui,
                basta clicar em ver detalhes para abrir uma lista de
                beneficiarios que possuem o direito a determinado beneficio..
              </li>
              <li>
                <b>Menu de Benefícios:</b> Podemos excluir ou editar os
                beneficios, a exclusão de um beneficio faz com que o
                beneficiario associado perca o beneficio.
              </li>
              <li>
                <b>Sidebar:</b> Navegue pelas opções adicionais no menu lateral
                para acessar funcionalidades específicas.
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

export default BeneficiosAssistente;
