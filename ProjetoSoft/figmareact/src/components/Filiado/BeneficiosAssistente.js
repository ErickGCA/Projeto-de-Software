import React from "react";
import styles from "./BeneficiosAssistente.module.css";
import Menu from "./Menu";
import Sidebar from "./Sidebar";

function BeneficiosAssistente() {
  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <div className={styles.content}>
          <div className={styles.siderbarColumn}>
            <Sidebar />
          </div>
          <div className={styles.historicoColumn}>
            <Menu />
          </div>
        </div>
      </section>
    </main>
  );
}

export default BeneficiosAssistente;
