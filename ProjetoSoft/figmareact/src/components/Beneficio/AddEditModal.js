import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import api from "../../api/api";

const initialStaticCategories = ["Categoria 1", "Categoria 2", "Categoria 3"];

function AddEditModal({ show, handleClose, title, item, onSave }) {
  const [categoria, setCategoria] = useState(item || {});
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [selectedBeneficiarios, setSelectedBeneficiarios] = useState([]);
  const [staticCategories, setStaticCategories] = useState(
    initialStaticCategories
  );
  const [filteredCategories, setFilteredCategories] = useState(
    initialStaticCategories
  );
  const [showCategoriesList, setShowCategoriesList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (show) {
        try {
          const response = await api.get("/Beneficiario");
          setBeneficiarios(response.data);
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

  useEffect(() => {
    if (item) {
      setCategoria(item);
      setSelectedBeneficiarios(item.beneficiarios || []);
    } else {
      setCategoria({});
      setSelectedBeneficiarios([]);
    }
  }, [item]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategoria((prev) => ({ ...prev, nome: value }));

    if (value) {
      // Ensure that the value is a string before applying toLowerCase
      const suggestions = staticCategories.filter(
        (category) =>
          category && category.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCategories(suggestions);
    } else {
      setFilteredCategories(staticCategories);
    }
  };

  const handleBeneficiarioChange = (e) => {
    const beneficiarioId = parseInt(e.target.value);
    setSelectedBeneficiarios((prev) => {
      if (e.target.checked) {
        return [...prev, beneficiarioId];
      } else {
        return prev.filter((id) => id !== beneficiarioId);
      }
    });
  };

  const handleSaveClick = () => {
    const categoriaData = {
      ...categoria,
      beneficiarios: selectedBeneficiarios,
    };

    if (!staticCategories.includes(categoria.nome)) {
      const updatedCategories = [...staticCategories, categoria.nome];
      setStaticCategories(updatedCategories);
      setFilteredCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    }

    onSave(categoriaData);
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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nome do Beneficio</Form.Label>
            <div style={{ position: "relative" }}>
              <Form.Control
                type="text"
                name="nome"
                value={categoria.nome || ""}
                onChange={handleCategoryChange}
                placeholder="Digite ou selecione o nome do beneficio"
                list="categoria-suggestions"
              />
              <datalist id="categoria-suggestions">
                {filteredCategories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </datalist>
            </div>
          </Form.Group>

          <Button
            variant="link"
            onClick={() => setShowCategoriesList((prev) => !prev)}
            style={{
              padding: 0,
              marginTop: "10px",
              textDecoration: "none",
              color: "#000000",
              fontWeight: "normal",
              paddingBottom: "20px",
            }}
          >
            {showCategoriesList
              ? "Ocultar Lista de Beneficios"
              : "Lista de Beneficios"}
          </Button>

          {showCategoriesList && (
            <div style={{ marginTop: "10px", overflowX: "auto" }}>
              <table
                className="table table-bordered table-striped"
                style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f8f9fa" }}>
                    <th>Beneficio</th>
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

          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descricao"
              value={categoria.descricao || ""}
              onChange={(e) =>
                setCategoria((prev) => ({ ...prev, descricao: e.target.value }))
              }
              placeholder="Digite a descrição do beneficio"
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
