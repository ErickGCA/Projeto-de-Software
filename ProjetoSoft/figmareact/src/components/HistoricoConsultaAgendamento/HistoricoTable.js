// HistoricoTable.js
import React from "react";
import { Button } from "react-bootstrap";
import styles from "./ConsultarHistoricoAgen.module.css";

export function HistoricoTable({ items, onEdit, onDelete }) {
  return (
    <table className={styles.historicoTable}>
      <thead>
        <tr>
          <th>Categoria</th>
          <th>Nome</th>
          <th>Data do Agendamento</th>
          <th>Horário do Agendamento</th>
          <th>Setor</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.categoria}</td>
            <td>{item.nome || item.username}</td>
            <td>
              {item.dataConsulta
                ? new Date(item.dataConsulta).toLocaleDateString()
                : "-"}
            </td>
            <td>
              {item.hora
                ? item.hora // Verifique se está no formato correto
                : "-"}
            </td>
            <td>{item.setor || "-"}</td>
            <td>
              <Button
                className={`${styles.actionButton} ${styles.editButton}`}
                onClick={() => onEdit(item)}
              >
                Editar
              </Button>
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
