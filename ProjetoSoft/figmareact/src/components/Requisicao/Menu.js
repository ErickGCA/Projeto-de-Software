import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import api from "../../api/api";
import { HistoricoTable } from "./HistoricoTable";
import { AddModal, DeleteModal, EditModal } from "./Modals";
import { Pagination } from "./Pagination";
import styles from "./RequisicaoSecretaria.module.css";

function HistoricoList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [historicoData, setHistoricoData] = useState([]); // Estado para armazenar os dados do backend
  const itemsPerPage = 6; 

  // Função para buscar dados do backend
  useEffect(() => {
    const fetchHistoricoData = async () => {
      try {
        const response = await api.get("/requisicao");
        setHistoricoData(response.data); // Armazena os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar dados do histórico", error);
      }
    };

    fetchHistoricoData();
  }, []); // Executa apenas na primeira renderização

  // Função para adicionar um novo item
  const createRequisicao = async (requisicao) => {
    try {
      await api.post('/requisicao', requisicao);
      // Atualiza a lista após adicionar
      const response = await api.get("/requisicao");
      setHistoricoData(response.data);
    } catch (error) {
      console.error("Erro ao criar requisição", error);
    }
  };

  // Função para atualizar um item
  const updateRequisicao = async (id, requisicao) => {
    try {
      await api.put(`/requisicao/${id}`, requisicao);
      // Atualiza a lista após editar
      const response = await api.get("/requisicao");
      setHistoricoData(response.data);
    } catch (error) {
      console.error("Erro ao atualizar requisição", error);
    }
  };

  // Função para excluir um item
  const deleteRequisicao = async (id) => {
    try {
      await api.delete(`/requisicao/${id}`);
      // Atualiza a lista após excluir
      const response = await api.get("/requisicao");
      setHistoricoData(response.data);
    } catch (error) {
      console.error("Erro ao excluir requisição", error);
    }
  };

  // Filtra os dados com base na pesquisa
  const filteredData = historicoData.filter((item) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      item.id.toString().includes(searchValue) ||
      item.desc_req.toLowerCase().includes(searchValue) ||
      item.status.toLowerCase().includes(searchValue) ||
      item.beneficiario?.id.toString().includes(searchValue) ||
      item.beneficios?.id.toString().includes(searchValue) ||
      item.data_hora.toLowerCase().includes(searchValue)
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
        <Button onClick={() => setShowAddModal(true)} className={styles.createButton}>
          Criar
        </Button>
      </div>

      <div className={styles.historicoTableContainer}>
        <HistoricoTable
          items={currentItems}
          onEdit={(item) => {
            setSelectedItem(item);
            setShowEditModal(true);
          }}
          onDelete={(item) => {
            setSelectedItem(item);
            setShowDeleteModal(true);
          }}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageSelect={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>

      <AddModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleSave={createRequisicao}
      />
      <EditModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        selectedItem={selectedItem}
        handleSave={(item) => updateRequisicao(selectedItem.id, item)}
      />
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={() => {
          deleteRequisicao(selectedItem.id);
          setShowDeleteModal(false);
        }}
      />
    </div>
  );
}

export default HistoricoList;
