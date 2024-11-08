import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function AddEditModal({ show, handleClose, title, item, onSave }) {
  const [formData, setFormData] = useState({
    id: "",
    categoria: "",
    desc_beneficio: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id || "",
        categoria: item.categoria || "", // Corrigido aqui
        desc_beneficio: item.desc_beneficio || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCategoria">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              type="text"
              name="categoria" // Corrigido aqui
              value={formData.categoria}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDesc_beneficio">
            <Form.Label>Descrição Benefício</Form.Label> {/* Corrigido aqui */}
            <Form.Control
              type="text"
              name="desc_beneficio"
              value={formData.desc_beneficio}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEditModal;
