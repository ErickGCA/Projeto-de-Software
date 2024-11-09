import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import api from "../../api/api";

function AddEditModal({ show, handleClose, title, item, onSave }) {
  const [beneficio, setBeneficio] = useState(item || {});
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [selectedBeneficiarios, setSelectedBeneficiarios] = useState([]);

  useEffect(() => {
    // Carrega beneficiários ao abrir o modal
    const fetchBeneficiarios = async () => {
      try {
        const response = await api.get("/Beneficiario");
        setBeneficiarios(response.data);
      } catch (error) {
        console.error("Erro ao carregar beneficiários:", error);
      }
    };
    fetchBeneficiarios();
  }, [show]);

  useEffect(() => {
    if (item) {
      setBeneficio(item);
      setSelectedBeneficiarios(item.beneficiado || []);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBeneficio((prev) => ({ ...prev, [name]: value }));
  };

  const handleBeneficiariosChange = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const ids = options.map((opt) => opt.value);
    setSelectedBeneficiarios(ids);
  };

  const handleSaveClick = () => {
    console.log("Dados do benefício a serem salvos:", beneficio);
    console.log("IDs dos beneficiários selecionados:", selectedBeneficiarios);
    onSave({ ...beneficio, beneficiadoIds: selectedBeneficiarios });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              type="text"
              name="categoria"
              value={beneficio.categoria || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              name="desc_beneficio"
              value={beneficio.desc_beneficio || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Beneficiários</Form.Label>
            <Form.Control
              as="select"
              multiple
              value={selectedBeneficiarios}
              onChange={handleBeneficiariosChange}
            >
              {beneficiarios.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.username} - {b.nis}
                </option>
              ))}
            </Form.Control>
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
