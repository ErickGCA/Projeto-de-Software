import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import api from "../../api/api";
import AddEditModal from './AddEditModal';
import styles from "./BeneficiosAssistente.module.css";
import DeleteModal from './DeleteModal'; // Importar o DeleteModal
import HistoricoTable from "./HistoricoTable";
import Pagination from "./Pagination";


function HistoricoList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [historicoData, setHistoricoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const getHistorico = async () => {
    try {
      const response = await api.get("/Beneficios");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados dos benefícios:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHistorico();
        setHistoricoData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do histórico:', error);
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
        await api.delete(`/Beneficios/${selectedItem.id}`);
        const data = await getHistorico();
        setHistoricoData(data);
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      alert('Houve um erro ao excluir o item. Por favor, tente novamente.');
    }
  };

  // Filtragem dentro do componente
  const filteredData = historicoData.filter((item) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      item.CodBeneficio && item.CodBeneficio.toLowerCase().includes(searchValue) ||
      item.categoria && item.categoria.toLowerCase().includes(searchValue) ||
      item.desc_beneficio && item.desc_beneficio.toLowerCase().includes(searchValue)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSave = async (item) => {
    try {
      if (item.id) {
        await api.put(`/Beneficios/${item.id}`, item);
      } else {
        await api.post('/Beneficios', item);
      }
  
      // Verificando a resposta da API e atualização do estado
      const data = await getHistorico();
      setHistoricoData(data);
      handleCloseAddModal();
      handleCloseEditModal();
    } catch (error) {
      console.error("Erro ao salvar benefício:", error);
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
        title={showAddModal ? 'Adicionar Beneficio' : 'Editar Beneficio'}
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
