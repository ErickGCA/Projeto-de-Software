// Modals.js
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// AddModal Component
export function AddModal({ show, handleClose, handleSave }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",

    profile: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const userData = {
      username: formData.username,
      password: formData.password,
      confirmPassword: formData.password,

      profile: Number(formData.profile),
    };

    handleSave(userData);
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
      profile: "",
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Usuário *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Usuário"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={{
                width: "91.5%",
              }}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Senha *</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2"
                style={{
                  border: "none",
                  background: "transparent",
                  position: "relative",
                  bottom: "10px",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirmar Senha *</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Confirmar Senha"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2"
                style={{
                  border: "none",
                  background: "transparent",
                  position: "relative",
                  bottom: "10px",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
          </Form.Group>
          <Form.Group controlId="formProfile">
            <Form.Label>Perfil *</Form.Label>
            <Form.Control
              as="select"
              name="profile"
              value={formData.profile}
              onChange={handleChange}
              style={{
                width: "30%",
              }}
            >
              <option value="">Selecione</option>
              <option value="0">ADM</option>
              <option value="1">SECRETARIA</option>
              <option value="2">OUTROS</option>
              <option value="3">ASSISTENTE</option>
              {/* <option value="3">ANALISTA</option> */}
            </Form.Control>
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

// EditModal Component
export function EditModal({ show, handleClose, selectedItem, handleSave }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",

    profile: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        username: selectedItem.username || "",
        password: selectedItem.password || "",
        confirmPassword: selectedItem.confirmPassword || "",
        profile: selectedItem.profile !== undefined ? selectedItem.profile : "",
      });
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = () => {
    // Converter 'profile' para número antes de enviar
    const updatedUser = {
      username: formData.username,
      password: formData.password,
      profile: Number(formData.profile),
    };

    handleSave(updatedUser);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Senha *</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2"
                style={{
                  border: "none",
                  background: "transparent",
                  position: "relative",
                  bottom: "10px",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirmar Senha *</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Confirmar Senha"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2"
                style={{
                  border: "none",
                  background: "transparent",
                  position: "relative",
                  bottom: "10px",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
          </Form.Group>
          <Form.Group controlId="formProfile">
            <Form.Label>Profile</Form.Label>
            <Form.Control
              as="select"
              name="profile"
              value={formData.profile}
              onChange={handleChange}
              style={{
                width: "30%",
              }}
            >
              <option value="">Selecione</option>
              <option value="0">ADM</option>
              <option value="1">SECRETARIA</option>
              <option value="2">OUTROS</option>
              <option value="3">ASSISTENTE</option>
            </Form.Control>
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

// DeleteModal Component
export function DeleteModal({ show, handleClose, handleDelete, selectedItem }) {
  const onDelete = () => {
    handleDelete();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Tem certeza de que deseja excluir o usuário{" "}
          <strong>{selectedItem?.username}</strong>?
        </p>
      </Modal.Body>
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
