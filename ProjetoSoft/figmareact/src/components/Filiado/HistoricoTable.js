import React from "react";
import { Button } from "react-bootstrap";
import styles from "./BeneficiosAssistente.module.css";

function HistoricoTable({ data, onEdit, onDelete }) {
  const formatCPF = (cpf) => {
    if (!cpf) return "";
    const numbers = cpf.replace(/\D/g, "");
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

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
            <td>{formatCPF(item.cpf)}</td>
            <td>{formatDate(item.data)}</td>
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
