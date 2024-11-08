import React, { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import generatePDF from "./generatePDF";
import Pagination from "./Pagination";
import styles from "./RelatorioAssistente.module.css";

function HistoricoList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const itemsPerPage = 7;

  const historicoData = [
    {
      nome: "Maria",
      codnis: "123",
      endereco: "Rua A",
      cpf: "111.111.111-11",
      telefone: "12345678",
      date: "2023-09-01",
    },
  ];

  const filteredData = historicoData.filter((item) =>
    item.nome.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className={styles.historicoContainer}>
      <div className={styles.searchContainer}>
        <FormControl
          type="text"
          placeholder="Filtrar por nome..."
          className="mr-sm-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button
          onClick={() => generatePDF(historicoData)}
          className={styles.createButton}
        >
          Gerar PDF
        </Button>
      </div>

      <div className={styles.historicoTableContainer}>
        <table className={styles.historicoTable}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Codnis</th>
              <th>Endereço</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.nome}</td>
                <td>{item.codnis}</td>
                <td>{item.endereco}</td>
                <td>{item.cpf}</td>
                <td>{item.telefone}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageSelect={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>
    </div>
  );
}

export default HistoricoList;
