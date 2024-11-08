import React from "react";
import { Button, Modal } from "react-bootstrap";

function DeleteModal({ show, handleClose, onDelete }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Beneficio</Modal.Title>
      </Modal.Header>
      <Modal.Body>Tem certeza de que deseja excluir este Beneficio?</Modal.Body>
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
