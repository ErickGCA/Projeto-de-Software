// Modals.js
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export function EditModal({ show, handleClose, selectedItem, handleSave }) {
  const [formData, setFormData] = useState({
    nome: "",
    codnis: "",
    endereco: "",
    cpf: "",
    telefone: "",
    dataConsulta: "",
    horarioConsulta: ""
  });

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        nome: selectedItem.nome || "",
        codnis: selectedItem.codnis || "",
        endereco: selectedItem.endereco || "",
        cpf: selectedItem.cpf || "",
        telefone: selectedItem.telefone || "",
        dataConsulta: selectedItem.dataConsulta || "",
        horarioConsulta: selectedItem.horarioConsulta || "" // Certifique-se de que este campo está correto
      });
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSave = () => {
    // Validação dos dados pode ser adicionada aqui
    const updatedItem = { ...selectedItem, ...formData };
    handleSave(updatedItem);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Nome"
            />
          </Form.Group>
          <Form.Group controlId="formDataConsulta">
            <Form.Label>Data do Agendamento</Form.Label>
            <Form.Control
              type="date"
              name="dataConsulta"
              value={formData.dataConsulta}
              onChange={handleChange}
              placeholder="Data do Agendamento"
            />
          </Form.Group>
          <Form.Group controlId="formHorarioConsulta">
            <Form.Label>Horário do Agendamento</Form.Label>
            <Form.Control
              type="time"
              name="horarioConsulta"
              value={formData.horarioConsulta}
              onChange={handleChange}
              placeholder="Horário do Agendamento"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onSave}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function DeleteModal({ show, handleClose, selectedItem, handleDelete }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tem certeza de que deseja excluir {selectedItem?.nome}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
