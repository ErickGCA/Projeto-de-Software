import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import api from "../../api/api";
import styles from "./GerenciarUsuario.module.css";
import HistoricoTable from "./HistoricoTable";
import { AddModal, EditModal } from "./Modals";
import { Pagination } from "./Pagination";

function HistoricoList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [historicoData, setHistoricoData] = useState([]);
  const itemsPerPage = 5;

  const fetchHistoricoData = async () => {
    try {
      const response = await api.get("/user");
      setHistoricoData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do histórico", error);
    }
  };

  useEffect(() => {
    fetchHistoricoData();
  }, []);

  const toggleUserActive = async (user) => {
    try {
      await api.put(`/user/${user.id}/toggle-active`);
      await fetchHistoricoData(); // Recarrega os dados após a alteração
    } catch (error) {
      console.error("Erro ao alterar status do usuário", error);
      alert("Erro ao alterar status do usuário. Tente novamente.");
    }
  };

  const createUser = async (user) => {
    try {
      await api.post("/user", user);
      await fetchHistoricoData();
      setShowAddModal(false);
    } catch (error) {
      console.error("Erro ao criar usuário", error);
      alert("Erro ao criar usuário. Tente novamente.");
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      await api.put(`/user/${selectedItem.id}`, updatedUser);
      await fetchHistoricoData();
      setShowEditModal(false);
    } catch (error) {
      console.error("Erro ao atualizar usuário", error);
      alert("Erro ao atualizar usuário. Tente novamente.");
    }
  };

  const filteredData = historicoData.filter((item) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      item.id.toString().includes(searchValue) ||
      (item.username && item.username.toLowerCase().includes(searchValue)) ||
      (item.password && item.password.toLowerCase().includes(searchValue)) ||
      (item.profile && item.profile.toString().includes(searchValue))
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
        <Button
          onClick={() => setShowAddModal(true)}
          className={styles.createButton}
        >
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
          onToggleActive={toggleUserActive}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onSelectPage={setCurrentPage}
        />
      </div>

      <AddModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleSave={createUser}
      />

      <EditModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        selectedItem={selectedItem}
        handleSave={updateUser}
      />
    </div>
  );
}

export default HistoricoList;
