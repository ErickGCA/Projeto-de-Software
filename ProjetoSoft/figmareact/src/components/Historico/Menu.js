import React, { useState } from "react";
import styles from "./MenuHistorico.module.css";

function HistoricoList() {
  const [searchTerm, setSearchTerm] = useState(""); 

  const historicoData = [
{
  nome: "dianabol",
  codnis: "025001",
  endereco: "rua hipertrofia, 25",
  cpf: "025.025.025-25",
  telefone: "(11) 40025-0000",
  date: "27/02/1996"
},
  ];
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = historicoData.filter((item) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      item.nome.toLowerCase().includes(searchValue) ||
      item.codnis.toLowerCase().includes(searchValue) ||
      item.endereco.toLowerCase().includes(searchValue) ||
      item.cpf.toLowerCase().includes(searchValue) ||
      item.telefone.toLowerCase().includes(searchValue) ||
      item.date.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className={styles.historicoContainer}>
      <input
        type="text"
        placeholder="Pesquisar..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />
  
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
            {filteredData.map((item, index) => (
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
      </div>
    </div>
  );
}

export default HistoricoList;
