// HistoricoList.js
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import styles from "./ConsultarHistoricoAgen.module.css";
import { HistoricoTable } from "./HistoricoTable";
import { DeleteModal, EditModal } from "./Modals";
import { Pagination } from "./Pagination";

function HistoricoList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [historicoData, setHistoricoData] = useState([]);
  const itemsPerPage = 6; 

  // Função para buscar dados do backend
  useEffect(() => {
    const fetchHistoricoData = async () => {
      try {
        // Buscar dados de Agendamentos
        const agendarResponse = await api.get("/agendar");
        const agendamentos = agendarResponse.data.map(item => ({
          ...item,
          categoria: "Agendamento",
          dataConsulta: item.dataconsu,
          horarioConsulta: item.horarioConsulta // Verifique o nome correto
        }));

        console.log("Agendamentos:", agendamentos);

        // Buscar dados de Encaminhamentos
        const encaminharResponse = await api.get("/encaminhar");
        const encaminhamentos = encaminharResponse.data.map(item => ({
          ...item,
          categoria: "Encaminhamento",
          
          horarioConsulta: item.horario // Mapeia 'horario' para 'horarioConsulta'
        }));

        console.log("Encaminhamentos:", encaminhamentos);

        // Combinar os dados
        const combinedData = [...agendamentos, ...encaminhamentos];

        // Ordenar por data (mais recentes primeiro)
        combinedData.sort((a, b) => new Date(b.dataConsulta) - new Date(a.dataConsulta));

        setHistoricoData(combinedData);
      } catch (error) {
        console.error("Erro ao buscar dados do histórico", error);
      }
    };

    fetchHistoricoData();
  }, []);

  // Funções para editar e excluir
  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleUpdateItem = async (updatedItem) => {
    try {
      if (updatedItem.categoria === "Agendamento") {
        await api.put(`/agendar/${updatedItem.id}`, updatedItem);
      } else {
        await api.put(`/encaminhar/${updatedItem.id}`, updatedItem);
      }
      // Atualiza o estado com o item atualizado
      setHistoricoData(prevData =>
        prevData.map(item => (item.id === updatedItem.id ? updatedItem : item))
      );
    } catch (error) {
      console.error("Erro ao salvar as alterações", error);
      // Aqui você pode adicionar um feedback visual para o usuário
    }
  };

  const handleDeleteItem = async (itemToDelete) => {
    try {
      if (itemToDelete.categoria === "Agendamento") {
        await api.delete(`/agendar/${itemToDelete.id}`);
      } else {
        await api.delete(`/encaminhar/${itemToDelete.id}`);
      }
      // Remove o item do estado
      setHistoricoData(prevData => prevData.filter(item => item.id !== itemToDelete.id));
    } catch (error) {
      console.error("Erro ao deletar o item", error);
      // Aqui você pode adicionar um feedback visual para o usuário
    }
  };

  // Filtra os dados com base na pesquisa
  const filteredData = historicoData.filter((item) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      (item.nome && item.nome.toLowerCase().includes(searchValue)) ||
      (item.cpf && item.cpf.toLowerCase().includes(searchValue)) ||
      (item.setor && item.setor.toLowerCase().includes(searchValue)) ||
      (item.dataConsulta && item.dataConsulta.toLowerCase().includes(searchValue)) ||
      (item.horarioConsulta && item.horarioConsulta.toLowerCase().includes(searchValue))
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className={styles.historicoContainer}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        {/* Removido o botão 'Criar' */}
      </div>

      <div className={styles.historicoTableContainer}>
        <HistoricoTable
          items={currentItems}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageSelect={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>

      <EditModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        selectedItem={selectedItem}
        handleSave={handleUpdateItem}
      />
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        selectedItem={selectedItem}
        handleDelete={() => {
          handleDeleteItem(selectedItem);
          setShowDeleteModal(false);
        }}
      />
    </div>
  );
}

export default HistoricoList;
