import React from "react";
import { Button } from "react-bootstrap";
import styles from "./BeneficiosAssistente.module.css";

function HistoricoTable({ data, onEdit, onDelete }) {
  return (
    <table className={styles.historicoTable}>
      <thead>
        <tr>
          <th>Nome do Filiado</th>
          <th>CPF do Filiado</th>
          <th>Data de Nascimento</th>
          <th>Beneficiário</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.username}</td>
            <td>{item.cpf}</td>
            <td>{item.data}</td>
            <td>{item.beneficiario?.username || "Não informado"}</td>
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

export default HistoricoTable;
