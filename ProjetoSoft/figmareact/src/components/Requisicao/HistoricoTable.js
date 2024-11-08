import React from "react";
import { Button } from "react-bootstrap";
import styles from "./RequisicaoSecretaria.module.css";

export function HistoricoTable({ items, onEdit, onDelete }) {
  return (
    <table className={styles.historicoTable}>
      <thead>
        <tr>
          <th>CodReq</th>
          <th>Descrição</th>
          <th>Status</th>
          <th>CodNIS</th>
          <th>CodBeneficio</th>
          <th>Date</th>

        </tr>
      </thead>
      <tbody>
  {items.map((item, index) => (
    <tr key={index}>
      <td>{item.id}</td> {/* Propriedade correta é "cod_req" */}
      <td>{item.desc_req}</td> {/* Propriedade correta é "descricao" */}
      <td>{item.status}</td> {/* Mantém igual */}
      <td>{item.beneficiario ? item.beneficiario.id: 'N/A'}</td> {/* Propriedade correta é "cod_nis" */}
      <td>{item.beneficios ? item.beneficios.id : 'N/A'}</td> {/* Propriedade correta é "cod_beneficio" */}
      <td>{item.data_hora}</td> {/* Propriedade correta é "data_hora" */}
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
