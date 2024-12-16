import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
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

      try {
        const responses = await Promise.all(
          data.map((categoria) =>
            axios.get(`/categorias/${categoria.id}`, {
              withCredentials: true,
            })
          )
        );

        const newBeneficiariosMap = responses.reduce((acc, response) => {
          const { id, beneficiarios } = response.data;
          acc[id] = beneficiarios;
          return acc;
        }, {});

        if (isMounted) {
          setBeneficiariosMap(newBeneficiariosMap);
        }
      } catch (error) {
        if (isMounted) {
          setError(
            "Erro ao carregar beneficiários. Por favor, tente novamente."
          );
          console.error(error);
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

  const handleShowDetails = async (categoria) => {
    try {
      const response = await axios.get(`/categorias/${categoria.id}`, {
        withCredentials: true,
      });

      setBeneficiariosMap((prev) => ({
        ...prev,
        [categoria.id]: response.data.beneficiarios,
      }));

      setSelectedCategoria(categoria);
      setShowModal(true);
    } catch (error) {
      console.error(
        `Error fetching beneficiarios for categoria ${categoria.id}:`,
        error
      );
      alert("Erro ao carregar beneficiários");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategoria(null);
  };

  // Função para formatar o CPF com pontuação
  const formatCPF = (cpf) => {
    if (!cpf) return "";
    const numbers = cpf.replace(/\D/g, "");
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  // Função para exibir o Tooltip
  const renderTooltip = (text) => <Tooltip id="tooltip">{text}</Tooltip>;

  const renderBeneficiariosTable = () => {
    const beneficiarios = beneficiariosMap[selectedCategoria.id];
    if (!beneficiarios || beneficiarios.length === 0) {
      return <p>Nenhum beneficiário encontrado.</p>;
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>CPF</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {beneficiarios.map((beneficiario) => (
            <tr key={beneficiario.id}>
              <td>{formatCPF(beneficiario.cpf)}</td>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={renderTooltip(beneficiario.username)}
                >
                  <span
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      display: "inline-block",
                      maxWidth: "150px", // Ajuste o maxWidth conforme necessário
                    }}
                  >
                    {beneficiario.username}
                  </span>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <>
      <table className={styles.historicoTable}>
        <thead>
          <tr>
            <th>
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip("Benefício")}
              >
                <span>Benefício</span>
              </OverlayTrigger>
            </th>
            <th>
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip("Descrição")}
              >
                <span>Descrição</span>
              </OverlayTrigger>
            </th>
            <th>Beneficiários</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={renderTooltip(item.nome)}
                >
                  <span
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      display: "inline-block",
                      maxWidth: "150px", // Ajuste conforme necessário
                    }}
                  >
                    {item.nome}
                  </span>
                </OverlayTrigger>
              </td>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={renderTooltip(item.descricao)}
                >
                  <span
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      display: "inline-block",
                      maxWidth: "150px", // Ajuste conforme necessário
                    }}
                  >
                    {item.descricao}
                  </span>
                </OverlayTrigger>
              </td>
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
