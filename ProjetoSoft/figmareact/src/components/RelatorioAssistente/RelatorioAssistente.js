import React from "react";
import Menu from "./Menu";
import styles from "./RelatorioAssistente.module.css";
import Sidebar from "./Sidebar";

function RelatorioAssistente() {
  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <div className={styles.content}>
          <div className={styles.column}>
            <Sidebar />
          </div>
          <div className={styles.column}>
            <Menu />
          </div>
        </div>
      </section>
    </main>
  );
}

export default RelatorioAssistente;
