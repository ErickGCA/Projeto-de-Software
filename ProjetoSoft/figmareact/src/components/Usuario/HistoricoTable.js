import React from "react";
import { Button } from "react-bootstrap";
import styles from "./GerenciarUsuario.module.css";

function Table({ items, onEdit, onToggleActive }) {
  return (
    <table className={styles.historicoTable}>
      <thead>
        <tr>
          <th>Login</th>

          <th>Profile</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className={!item.active ? styles.inactiveRow : ""}>
            <td>{item.username}</td>

            <td>{item.profile}</td>
            <td>{item.active ? "Ativo" : "Inativo"}</td>
            <td>
              <Button
                className={`${styles.actionButton} ${styles.editButton}`}
                onClick={() => onEdit(item)}
              >
                Editar
              </Button>
              <Button
                className={`${styles.actionButton} ${
                  item.active ? styles.deactivateButton : styles.activateButton
                }`}
                onClick={() => onToggleActive(item)}
              >
                {item.active ? "Desativar" : "Ativar"}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
