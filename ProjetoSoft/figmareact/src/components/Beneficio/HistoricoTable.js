import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import styles from "./BeneficiosAssistente.module.css";

function HistoricoTable({ data, onEdit, onDelete }) {
  const [beneficiariosMap, setBeneficiariosMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchBeneficiarios = async () => {
      setLoading(true);
      setError(null);

      const fetchPromises = data.map(async (categoria) => {
        try {
          const response = await axios.get(
            `/Beneficiario/categoria/${categoria.id}`,
            {
              signal: controller.signal,
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (isMounted) {
            return { id: categoria.id, beneficiarios: response.data };
          }
        } catch (error) {
          if (axios.isCancel(error)) {
            return null;
          }

          if (error.response?.status === 403) {
            window.location.href = "/login";
            return null;
          }

          if (isMounted) {
            console.error(
              `Error fetching beneficiarios for categoria ${categoria.id}:`,
              error
            );
            return { id: categoria.id, error: true };
          }
        }
      });

      try {
        const results = await Promise.all(fetchPromises);
        if (isMounted) {
          const newBeneficiariosMap = results.reduce((acc, result) => {
            if (result && !result.error) {
              acc[result.id] = result.beneficiarios;
            }
            return acc;
          }, {});

          setBeneficiariosMap(newBeneficiariosMap);
        }
      } catch (error) {
        if (isMounted) {
          setError(
            "Erro ao carregar beneficiários. Por favor, tente novamente."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (data.length > 0) {
      fetchBeneficiarios();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [data]);

  const handleShowDetails = (categoria) => {
    setSelectedCategoria(categoria);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategoria(null);
  };

  const renderBeneficiariosTable = () => {
    const beneficiarios = beneficiariosMap[selectedCategoria.id];
    if (!beneficiarios || beneficiarios.length === 0) {
      return <p>Nenhum beneficiário encontrado.</p>;
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {beneficiarios.map((beneficiario) => (
            <tr key={beneficiario.id}>
              <td>{beneficiario.id}</td>
              <td>{beneficiario.username}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <span>{error}</span>
        <Button
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <>
      <table className={styles.historicoTable}>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Beneficiários</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.nome}</td>
              <td>{item.descricao}</td>
              <td className={styles.beneficiariosCell}>
                <Button
                  className={styles.detailsButton}
                  onClick={() => handleShowDetails(item)}
                >
                  Ver detalhes
                </Button>
              </td>
              <td className={styles.actionsCell}>
                <Button
                  className={`${styles.actionButton} ${styles.editButton}`}
                  onClick={() => onEdit(item)}
                >
                  Editar
                </Button>
                <Button
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  onClick={() => onDelete(item)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para exibir beneficiários */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Beneficiários - {selectedCategoria?.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCategoria && renderBeneficiariosTable()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HistoricoTable;
