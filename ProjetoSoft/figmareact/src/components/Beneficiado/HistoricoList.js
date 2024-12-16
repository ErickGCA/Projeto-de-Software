import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import api from "../../api/api"; // Ajustado para a estrutura de diretórios
import AddEditModal from "./AddEditModal";
import DeleteModal from "./DeleteModal"; // Importar o DeleteModal
import styles from "./GerenciarBeneficiado.module.css";
import HistoricoTable from "./HistoricoTable";
import Pagination from "./Pagination";

function HistoricoList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [historicoData, setHistoricoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Função para buscar os dados do histórico
  const getHistorico = async () => {
    try {
      const response = await api.get("/Beneficiario");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados do histórico:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHistorico();
        setHistoricoData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do histórico:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleShowDeleteModal = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleDelete = async () => {
    try {
      if (selectedItem) {
        await api.delete(`/Beneficiario/${selectedItem.id}`);
        const data = await getHistorico();
        setHistoricoData(data);
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error("Erro ao excluir item:", error);

      if (error.response && error.response.status === 400) {
        // Supondo que o backend retorne uma mensagem apropriada
        alert(
          error.response.data.message ||
            "Não foi possível excluir este beneficiário pois ele possui vínculos associados (benefícios ou filiados)."
        );
      } else {
        alert("Houve um erro ao excluir o item. Por favor, tente novamente.");
      }
    }
  };

  const filteredData = historicoData.filter((item) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      (item.nome && item.nome.toLowerCase().includes(searchValue)) ||
      (item.codnis && item.codnis.toLowerCase().includes(searchValue)) ||
      (item.endereco && item.endereco.toLowerCase().includes(searchValue)) ||
      (item.cpf && item.cpf.toLowerCase().includes(searchValue)) ||
      (item.telefone && item.telefone.toLowerCase().includes(searchValue)) ||
      (item.date && item.date.toLowerCase().includes(searchValue)) ||
      (item.filiado && item.date.toLowerCase().includes(searchValue)) ||
      (item.respostas && item.date.toLowerCase().includes(searchValue))
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSave = async (item) => {
    try {
      if (item.id) {
        // Atualizar um benefício existente
        await api.put(`/Beneficiario/${item.id}`, item);
      } else {
        // Criar um novo benefício
        await api.post("/Beneficiario", item);
        alert("Beneficiário criado com sucesso!"); // Exibe o alerta simples
      }

      // Atualizar os dados e fechar os modais
      const data = await getHistorico();
      setHistoricoData(data);
      handleCloseAddModal();
      handleCloseEditModal();
    } catch (error) {
      console.error("Erro ao salvar histórico:", error);
      alert("Houve um erro ao salvar os dados. Por favor, tente novamente.");
    }
  };

  return (
    <div className={styles.historicoContainer}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <Button onClick={handleShowAddModal} className={styles.createButton}>
          Criar
        </Button>
      </div>

      <HistoricoTable
        data={currentItems}
        onEdit={handleShowEditModal}
        onDelete={handleShowDeleteModal}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onSelectPage={setCurrentPage}
      />

      <AddEditModal
        show={showAddModal || showEditModal}
        handleClose={showAddModal ? handleCloseAddModal : handleCloseEditModal}
        title={
          showAddModal ? "Adicionar Beneficiário" : "Editar Beneficiário e RMA"
        }
        item={selectedItem}
        onSave={handleSave}
      />

      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default HistoricoList;
