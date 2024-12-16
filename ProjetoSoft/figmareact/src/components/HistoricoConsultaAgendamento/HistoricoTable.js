// HistoricoTable.js
import React from "react";
import { Button } from "react-bootstrap";
import styles from "./ConsultarHistoricoAgen.module.css";

export function HistoricoTable({ items, onEdit, onDelete }) {
  // Função para formatar a data
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      // Converte a string de data para um objeto Date
      const date = new Date(dateString);
      // Verifica se a data é válida
      return !isNaN(date.getTime()) ? date.toLocaleDateString() : "-";
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "-";
    }
  };

  return (
    <table className={styles.historicoTable}>
      <thead>
        <tr>
          <th>Categoria</th>
          <th>Nome</th>
          <th>Data</th>
          <th>Horário</th>
          <th>Setor</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.categoria}</td>
            <td>{item.nome || item.username || "-"}</td>
            <td>{formatDate(item.dataConsulta)}</td>
            <td>{item.horarioConsulta || item.hora || "-"}</td>
            <td>{item.setor || "-"}</td>
            <td>
              <Button
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={() => onDelete(item)}
              >
                Excluir
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
