import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import styles from "./ConsultarHistoricoAgen.module.css";

export function Pagination({ currentPage, totalPages, onPageSelect }) {
  return (
    <div className={styles.pagination}>
      <DropdownButton title={`Página ${currentPage}`} variant="secondary">
        {[...Array(totalPages).keys()].map((page) => (
          <Dropdown.Item key={page + 1} onClick={() => onPageSelect(page + 1)}>
            Página {page + 1}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
}
