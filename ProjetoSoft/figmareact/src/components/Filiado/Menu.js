import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import api from "../../api/api";
import AddEditModal from "./AddEditModal";
import styles from "./BeneficiosAssistente.module.css";
import DeleteModal from "./DeleteModal";
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
  const itemsPerPage = 6;

  const getHistorico = async () => {
    try {
      const response = await api.get("/filiado");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHistorico();
      setHistoricoData(data);
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
  };

  const handleShowAddModal = () => {
    setSelectedItem(null);
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setSelectedItem(null);
  };

  const handleShowEditModal = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const handleShowDeleteModal = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const handleDelete = async () => {
    try {
      if (selectedItem) {
        await api.delete(`/filiado/${selectedItem.id}`);
        const data = await getHistorico();
        setHistoricoData(data);
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error("Erro ao excluir filiado:", error);
      alert("Houve um erro ao excluir o filiado. Por favor, tente novamente.");
    }
  };

  const filteredData = historicoData.filter((item) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      (item.username && item.username.toLowerCase().includes(searchValue)) ||
      (item.cpf && item.cpf.toLowerCase().includes(searchValue)) ||
      (item.data && item.data.toString().toLowerCase().includes(searchValue)) ||
      (item.beneficiario?.username &&
        item.beneficiario.username.toLowerCase().includes(searchValue))
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSave = async (formData) => {
    try {
      // Verifica se os dados necessários estão presentes
      if (
        !formData.username ||
        !formData.cpf ||
        !formData.data ||
        !formData.beneficiario?.id
      ) {
        throw new Error("Dados incompletos");
      }

      // Prepara o payload para envio
      const payload = {
        username: formData.username,
        cpf: formData.cpf.replace(/\D/g, ""), // Remove caracteres não numéricos do CPF
        data: formData.data,
        beneficiario: {
          id: formData.beneficiario.id,
        },
      };

      // Se estiver editando, inclui o ID no payload
      if (formData.id) {
        payload.id = formData.id;
      }

      console.log("Payload sendo enviado:", payload);

      if (formData.id) {
        await api.put(`/filiado/${formData.id}`, payload);
      } else {
        await api.post("/filiado", payload);
      }

      // Atualiza a lista após salvar
      const data = await getHistorico();
      setHistoricoData(data);

      // Fecha os modais
      handleCloseAddModal();
      handleCloseEditModal();
    } catch (error) {
      console.error("Erro ao salvar filiado:", error);
      if (error.message === "Dados incompletos") {
        alert("Por favor, preencha todos os campos obrigatórios.");
      } else {
        alert("Houve um erro ao salvar os dados. Por favor, tente novamente.");
      }
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
        title={showAddModal ? "Adicionar Filiado" : "Editar Filiado"}
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
