import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./GerenciarUsuario.module.css";

function Table({ items, onEdit, onToggleActive }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortedItems = React.useMemo(() => {
    if (!sortConfig.key) return items;

    return [...items].sort((a, b) => {
      const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
      const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [items, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      const direction =
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc";
      return { key, direction };
    });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  return (
    <table className={styles.historicoTable}>
      <thead>
        <tr>
          <th onClick={() => handleSort("username")}>
            Login {getSortIndicator("username")}
          </th>
          <th onClick={() => handleSort("profile")}>
            Profile {getSortIndicator("profile")}
          </th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {sortedItems.map((item) => (
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
