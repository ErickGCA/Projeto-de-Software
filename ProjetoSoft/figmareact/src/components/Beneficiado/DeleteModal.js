import React from "react";
import { Button, Modal } from "react-bootstrap";

function DeleteModal({ show, handleClose, onDelete }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Beneficiario</Modal.Title>
      </Modal.Header>
      <Modal.Body>Tem certeza de que deseja excluir este Beneficiario?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
