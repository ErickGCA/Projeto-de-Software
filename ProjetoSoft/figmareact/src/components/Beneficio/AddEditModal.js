import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Pagination } from "react-bootstrap";
import api from "../../api/api";

const initialStaticCategories = ["Categoria 1", "Categoria 2", "Categoria 3"];

function AddEditModal({ show, handleClose, title, item, onSave, categories }) {
  const [categoria, setCategoria] = useState({});
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [selectedBeneficiarios, setSelectedBeneficiarios] = useState([]);
  const [staticCategories, setStaticCategories] = useState(
    initialStaticCategories
  );
  const [filteredCategories, setFilteredCategories] = useState(
    initialStaticCategories
  );
  const [showCategoriesList, setShowCategoriesList] = useState(false);

  // Novos estados para pesquisa e paginação de beneficiários
  const [beneficiarioSearch, setBeneficiarioSearch] = useState("");
  const [filteredBeneficiarios, setFilteredBeneficiarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const itemsPerPage = 9; // Número de beneficiários por página

  const benefitsList = [
    "Plano de Saúde",
    "Vale Refeição",
    "Seguro de Vida",
    "Auxílio Transporte",
    "Academia",
    "Vale Cultura",
  ];

  // Resetar todos os estados quando o modal fecha ou abre
  useEffect(() => {
    if (!show) {
      // Limpar todos os estados quando o modal fecha
      setCategoria({});
      setSelectedBeneficiarios([]);
      setBeneficiarioSearch("");
      setCurrentPage(1);
      setErrorMessage("");
      setFilteredCategories(staticCategories);
    } else {
      // Se está editando um item existente
      if (item) {
        setCategoria(item);
        setSelectedBeneficiarios(item.beneficiarios?.map((b) => b.id) || []);
      } else {
        // Se está criando um novo item
        setCategoria({});
        setSelectedBeneficiarios([]);
      }
    }
  }, [show, item]);

  useEffect(() => {
    const fetchData = async () => {
      if (show) {
        try {
          const response = await api.get("/Beneficiario");
          setBeneficiarios(response.data);
          setFilteredBeneficiarios(response.data);
          setCurrentPage(1); // Resetar para a primeira página ao abrir o modal
        } catch (error) {
          console.error("Erro ao buscar beneficiários:", error);
        }
      }
    };
    fetchData();
  }, [show]);

  useEffect(() => {
    const savedCategories =
      JSON.parse(localStorage.getItem("categories")) || initialStaticCategories;
    setStaticCategories(savedCategories);
    setFilteredCategories(savedCategories);
  }, []);

  // Função para calcular os beneficiários da página atual
  const getPaginatedBeneficiarios = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredBeneficiarios.slice(startIndex, endIndex);
  };

  // Calcular o número total de páginas
  const totalPages = Math.ceil(filteredBeneficiarios.length / itemsPerPage);

  // Funções para manipulação de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategoria((prev) => ({ ...prev, nome: value }));
    setErrorMessage(""); // Limpar mensagem de erro ao digitar

    if (value) {
      const suggestions = staticCategories.filter(
        (category) =>
          category && category.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCategories(suggestions);
    } else {
      setFilteredCategories(staticCategories);
    }
  };

  // Nova função para pesquisar beneficiários
  const handleBeneficiarioSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setBeneficiarioSearch(searchTerm);

    const filtered = beneficiarios.filter(
      (beneficiario) =>
        beneficiario.username.toLowerCase().includes(searchTerm) ||
        (beneficiario.cpf &&
          beneficiario.cpf.toLowerCase().includes(searchTerm))
    );

    setFilteredBeneficiarios(filtered);
    setCurrentPage(1); // Voltar para a primeira página ao filtrar
  };

  const handleBeneficiarioChange = (beneficiarioId) => {
    setSelectedBeneficiarios((prev) => {
      if (prev.includes(beneficiarioId)) {
        return prev.filter((id) => id !== beneficiarioId);
      } else {
        return [...prev, beneficiarioId];
      }
    });
  };

  const handleSaveClick = async () => {
    // Verificar se o nome da categoria já existe
    const nomeCategoriaNormalizado = categoria.nome?.trim().toLowerCase();
    const categoriaExistente = (categories || staticCategories).find((cat) =>
      typeof cat === "string"
        ? cat.trim().toLowerCase() === nomeCategoriaNormalizado
        : cat.nome?.trim().toLowerCase() === nomeCategoriaNormalizado
    );

    if (
      categoriaExistente &&
      (!categoria.id || categoriaExistente.id !== categoria.id)
    ) {
      setErrorMessage("O benefício já existe, adicione ao invés de criar");
      return;
    }

    const categoriaData = {
      nome: categoria.nome,
      descricao: categoria.descricao,
      beneficiarios: selectedBeneficiarios.map((id) => ({ id })), // Formato esperado
    };

    try {
      let response;
      if (categoria.id) {
        // Editando uma categoria existente
        response = await api.put(`/categorias/${categoria.id}`, categoriaData);
      } else {
        // Criando uma nova categoria
        response = await api.post(`/categorias`, categoriaData);
      }
      console.log("Response from save:", response.data);
      if (onSave) onSave(response.data);
      handleClose();
    } catch (error) {
      console.error("O nome da categoria ja existe!", error);
      console.error("Detalhes do erro:", error.response?.data);

      alert(
        `Erro ao salvar categoria: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    const updatedCategories = staticCategories.filter(
      (category) => category !== categoryToDelete
    );
    setStaticCategories(updatedCategories);
    setFilteredCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <Form>
          <Form.Group>
            <Form.Label>Nome do Benefício</Form.Label>
            <div style={{ position: "relative" }}>
              <Form.Control
                type="text"
                name="nome"
                value={categoria.nome || ""}
                onChange={handleCategoryChange}
                placeholder="Digite o nome do benefício"
                list="categoria-suggestions"
              />
            </div>
          </Form.Group>

          {showCategoriesList && (
            <div style={{ marginTop: "10px", overflowX: "auto" }}>
              <table
                className="table table-bordered table-striped"
                style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f8f9fa" }}>
                    <th>Benefício</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((cat, index) => (
                    <tr key={index}>
                      <td>{cat}</td>
                      <td style={{ textAlign: "center" }}>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteCategory(cat)}
                          size="sm"
                        >
                          Excluir
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Form.Group className="mt-3">
            <Form.Label>Beneficiários</Form.Label>
            <Form.Control
              type="text"
              placeholder="Pesquisar beneficiários por NOME ou CPF"
              value={beneficiarioSearch}
              onChange={handleBeneficiarioSearch}
              className="mb-3"
            />
            <div
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                border: "1px solid #ced4da",
                borderRadius: "4px",
                padding: "10px",
              }}
            >
              {filteredBeneficiarios.length === 0 ? (
                <p className="text-center text-muted">
                  Nenhum beneficiário encontrado
                </p>
              ) : (
                <>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(200px, 1fr))",
                      gap: "10px",
                    }}
                  >
                    {getPaginatedBeneficiarios().map((beneficiario) => (
                      <div
                        key={beneficiario.id}
                        style={{
                          border: "1px solid #ced4da",
                          borderRadius: "8px",
                          padding: "10px",
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: selectedBeneficiarios.includes(
                            beneficiario.id
                          )
                            ? "#e9ecef"
                            : "#fff",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleBeneficiarioChange(beneficiario.id)
                        }
                      >
                        <input
                          type="checkbox"
                          checked={selectedBeneficiarios.includes(
                            beneficiario.id
                          )}
                          readOnly
                          style={{ marginRight: "10px" }}
                        />
                        <div>
                          <strong>{beneficiario.username}</strong>
                          {beneficiario.cpf && (
                            <div
                              style={{ fontSize: "0.8em", color: "#6c757d" }}
                            >
                              {beneficiario.email}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Componente de Paginação */}
                  <div className="d-flex justify-content-center mt-3">
                    <Pagination>
                      <Pagination.First
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                      />
                      <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                      {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                          key={index + 1}
                          active={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}
                      <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                      <Pagination.Last
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                      />
                    </Pagination>
                  </div>
                </>
              )}
            </div>
            <div className="mt-2 text-muted">
              {selectedBeneficiarios.length} beneficiário(s) selecionado(s)
            </div>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descricao"
              value={categoria.descricao || ""}
              onChange={(e) =>
                setCategoria((prev) => ({ ...prev, descricao: e.target.value }))
              }
              placeholder="Digite a descrição do benefício"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEditModal;
