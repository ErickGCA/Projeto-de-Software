import React from "react";
import styles from "./GerenciarBeneficiado.module.css";
import HistoricoList from "./HistoricoList"; // Importando o componente HistoricoList
import Sidebar from "./Sidebar";

function GerenciarBeneficiado() {
  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <div className={styles.content}>
          <div className={styles.sidebarColumn}>
            <Sidebar />
          </div>
          <div className={styles.historicoColumn}>
            <HistoricoList /> 
          </div>
        </div>
      </section>
    </main>
  );
}

export default GerenciarBeneficiado;
