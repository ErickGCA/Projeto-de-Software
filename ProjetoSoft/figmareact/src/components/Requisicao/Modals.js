import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

// Modal para adicionar um novo registro
export function AddModal({ show, handleClose, handleSave }) {
  // Estados para capturar os dados do formulário
  const [codReq, setCodReq] = useState("");
  const [desc_req, setDesc_req] = useState("");
  const [status, setStatus] = useState("");
  const [codNIS, setCodNIS] = useState("");
  const [codBeneficio, setCodBeneficio] = useState("");
  const [date, setDate] = useState("");

  const onSave = () => {
    // Objeto de dados a ser salvo
    const requisicao = {
      codReq,
      desc_req,
      status,
      codNIS,
      codBeneficio,
      date,
    };
    handleSave(requisicao); // Chama a função de criação com os dados capturados
    handleClose(); // Fecha o modal após salvar
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Registro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCodReq">
            <Form.Label>CodReq</Form.Label>
            <Form.Control
              type="text"
              placeholder="CodReq"
              value={codReq}
              onChange={(e) => setCodReq(e.target.value)} // Atualiza o estado
            />
          </Form.Group>
          <Form.Group controlId="formDescrição">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descrição"
              value={desc_req}
              onChange={(e) => setDesc_req(e.target.value)} // Atualiza o estado
            />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)} // Atualiza o estado
            />
          </Form.Group>
          <Form.Group controlId="formCodNIS">
            <Form.Label>CodNIS</Form.Label>
            <Form.Control
              type="text"
              placeholder="CodNIS"
              value={codNIS}
              onChange={(e) => setCodNIS(e.target.value)} // Atualiza o estado
            />
          </Form.Group>
          <Form.Group controlId="formCodBeneficio">
            <Form.Label>CodBeneficio</Form.Label>
            <Form.Control
              type="text"
              placeholder="CodBeneficio"
              value={codBeneficio}
              onChange={(e) => setCodBeneficio(e.target.value)} // Atualiza o estado
            />
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)} // Atualiza o estado
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={onSave}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
}

// Modal para editar um registro existente
export function EditModal({ show, handleClose, selectedItem, handleSave }) {
  const [codReq, setCodReq] = useState("");
  const [desc_req, setdesc_req] = useState("");
  const [status, setStatus] = useState("");
  const [codNIS, setCodNIS] = useState("");
  const [codBeneficio, setCodBeneficio] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // Atualiza os estados quando o item selecionado mudar
    if (selectedItem) {
      setCodReq(selectedItem.codReq || "");
      setdesc_req(selectedItem.desc_req || "");
      setStatus(selectedItem.status || "");
      setCodNIS(selectedItem.codNIS || "");
      setCodBeneficio(selectedItem.codBeneficio || "");
      setDate(selectedItem.date || "");
    }
  }, [selectedItem]);

  const onSave = () => {
    const requisicaoAtualizada = {
      codReq,
      desc_req,
      status,
      codNIS,
      codBeneficio,
      date,
    };
    handleSave(requisicaoAtualizada); // Chama a função de salvar com os dados atualizados
    handleClose(); // Fecha o modal após salvar
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Registro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCodReq">
            <Form.Label>CodReq</Form.Label>
            <Form.Control
              type="text"
              placeholder="CodReq"
              value={codReq}
              onChange={(e) => setCodReq(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescrição">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descrição"
              value={desc_req}
              onChange={(e) => setdesc_req(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCodNIS">
            <Form.Label>CodNIS</Form.Label>
            <Form.Control
              type="text"
              placeholder="CodNIS"
              value={codNIS}
              onChange={(e) => setCodNIS(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCodBeneficio">
            <Form.Label>CodBeneficio</Form.Label>
            <Form.Control
              type="text"
              placeholder="CodBeneficio"
              value={codBeneficio}
              onChange={(e) => setCodBeneficio(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={onSave}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
}

// Modal para excluir um registro
export function DeleteModal({ show, handleClose, handleDelete }) {
  const onDelete = () => {
    handleDelete(); // Chama a função de exclusão
    handleClose(); // Fecha o modal após excluir
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Registro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tem certeza de que deseja excluir este registro?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="danger" onClick={onDelete}>Excluir</Button>
      </Modal.Footer>
    </Modal>
  );
}
