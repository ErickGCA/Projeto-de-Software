import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import styles from "./BeneficiosAssistente.module.css";

const Pagination = ({ currentPage, totalPages, onSelectPage }) => { // Alterar 'handlePageSelect' para 'onSelectPage'
  return (
    <div className={styles.pagination}>
      <DropdownButton
        id="dropdown-basic-button"
        title={`Página ${currentPage}`}
        variant="secondary"
      >
        {[...Array(totalPages).keys()].map((page) => (
          <Dropdown.Item
            key={page + 1}
            onClick={() => onSelectPage(page + 1)} // Usar 'onSelectPage' aqui
          >
            Página {page + 1}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
};


export default Pagination;
