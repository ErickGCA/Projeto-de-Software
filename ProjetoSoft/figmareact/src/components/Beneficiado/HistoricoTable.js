import React, { useState } from "react";
import { Button, Modal, Nav, Tab, Table } from "react-bootstrap";
import api from "../../api/api";
import styles from "./GerenciarBeneficiado.module.css";

function HistoricoTable({ data, onEdit, onDelete }) {
  const [showAdditionalInfoModal, setShowAdditionalInfoModal] = useState(false);
  const [showFiliadoModal, setShowFiliadoModal] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [selectedFiliados, setSelectedFiliados] = useState([]);
  const [loadingFiliado, setLoadingFiliado] = useState(false);
  const [error, setError] = useState(null);
  const [activeFiliadoIndex, setActiveFiliadoIndex] = useState(0);

  const handleShowFiliado = async (beneficiary) => {
    setLoadingFiliado(true);
    setError(null);
    setShowFiliadoModal(true);

    try {
      const response = await api.get("/filiado");
      const filiados = response.data;

      // Filtra todos os filiados que pertencem ao beneficiário selecionado
      const matchingFiliados = filiados.filter(
        (filiado) => filiado.beneficiario?.id === beneficiary.id
      );

      if (matchingFiliados.length > 0) {
        setSelectedFiliados(matchingFiliados);
      } else {
        setError("Nenhum filiado encontrado para este beneficiário.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do filiado:", error);
      setError(
        "Erro ao carregar dados do filiado. Por favor, tente novamente."
      );
    } finally {
      setLoadingFiliado(false);
    }
  };

  const handleShowAdditionalInfo = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setShowAdditionalInfoModal(true);
  };

  // Função de fechamento do modal de filiado
  const handleCloseFiliado = () => {
    setShowFiliadoModal(false);
    setSelectedFiliados([]);
    setError(null);
  };

  // Função de fechamento do modal de informações adicionais
  const handleCloseAdditionalInfo = () => {
    setShowAdditionalInfoModal(false);
    setSelectedBeneficiary(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const formatCPF = (cpf) => {
    return cpf
      ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
      : "";
  };

  return (
    <>
      <table className={styles.historicoTable}>
        <thead>
          <tr>
            <th>Beneficiário</th>
            <th>NIS</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Filiado</th>
            <th>Adicionais</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.username}</td>
              <td>{item.nis}</td>
              <td>{formatCPF(item.cpf)}</td> {/* Formatação do CPF */}
              <td>{item.telefone}</td>
              <td>
                <Button
                  variant="link"
                  className={styles.additionalInfoButton}
                  onClick={() => handleShowFiliado(item)}
                  style={{ color: "#333" }} // Cor escura para o botão
                >
                  Ver detalhes
                </Button>
              </td>
              <td>
                <Button
                  variant="link"
                  className={styles.additionalInfoButton}
                  onClick={() => handleShowAdditionalInfo(item)}
                  style={{ color: "#333" }} // Cor escura para o botão
                >
                  Ver detalhes
                </Button>
              </td>
              <td>
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

      {/* Modal para exibir informações do filiado */}
      <Modal show={showFiliadoModal} onHide={handleCloseFiliado} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Informações do Filiado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingFiliado ? (
            <p>Carregando informações do filiado...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : selectedFiliados.length > 0 ? (
            <Tab.Container
              id="filiado-tabs"
              activeKey={activeFiliadoIndex}
              onSelect={(selectedIndex) => setActiveFiliadoIndex(selectedIndex)}
            >
              <Nav variant="pills">
                {selectedFiliados.map((filiado, index) => (
                  <Nav.Item key={filiado.id}>
                    <Nav.Link
                      eventKey={index}
                      className={`${styles.customTabLink} ${
                        activeFiliadoIndex === index
                          ? styles.customTabLinkActive
                          : ""
                      }`}
                    >
                      Filiado #{index + 1}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
              <Tab.Content>
                {selectedFiliados.map((filiado, index) => (
                  <Tab.Pane eventKey={index} key={filiado.id}>
                    <Table bordered hover size="sm">
                      <tbody>
                        <tr>
                          <td>
                            <strong>Nome do Filiado</strong>
                          </td>
                          <td>{filiado.username}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>CPF</strong>
                          </td>
                          <td>{formatCPF(filiado.cpf)}</td>{" "}
                          {/* Formatação do CPF */}
                        </tr>
                        <tr>
                          <td>
                            <strong>Data de Nascimento</strong>
                          </td>
                          <td>{formatDate(filiado.data)}</td>{" "}
                          {/* Formatação da Data */}
                        </tr>
                        <tr>
                          <td>
                            <strong>Código do Filiado</strong>
                          </td>
                          <td>{filiado.id}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Tab.Container>
          ) : (
            <p>Nenhum filiado encontrado para este beneficiário.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFiliado}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para exibir informações adicionais */}
      <Modal
        show={showAdditionalInfoModal}
        onHide={handleCloseAdditionalInfo}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Informações Adicionais</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBeneficiary ? (
            <Table bordered hover size="sm">
              <tbody>
                <tr>
                  <td>
                    <strong>Mes</strong>
                  </td>
                  <td>{selectedBeneficiary.mes}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Famílias PAIF</strong>
                  </td>
                  <td>{selectedBeneficiary.familiasPAIF}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Novas Famílias PAIF</strong>
                  </td>
                  <td>{selectedBeneficiary.novasFamiliasPAIF}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Famílias Extrema Pobreza</strong>
                  </td>
                  <td>{selectedBeneficiary.familiasExtremaPobreza}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Bolsa Família</strong>
                  </td>
                  <td>{selectedBeneficiary.bolsaFamilia}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Descumprimento de Condicionalidades</strong>
                  </td>
                  <td>{selectedBeneficiary.descumprimentoCondicionalidades}</td>
                </tr>
                <tr>
                  <td>
                    <strong>BPC</strong>
                  </td>
                  <td>{selectedBeneficiary.bpc}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Trabalho Infantil</strong>
                  </td>
                  <td>{selectedBeneficiary.trabalhoInfantil}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Acolhimento</strong>
                  </td>
                  <td>{selectedBeneficiary.acolhimento}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Atendimentos CRAS</strong>
                  </td>
                  <td>{selectedBeneficiary.atendimentosCRAS}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Cadastro Único</strong>
                  </td>
                  <td>{selectedBeneficiary.cadastroUnico}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Outros Benefícios</strong>
                  </td>
                  <td>{selectedBeneficiary.outrosBeneficios}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Famílias Participantes PAIF</strong>
                  </td>
                  <td>{selectedBeneficiary.familiasParticipantesPAIF}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Crianças 0-6 SCFV</strong>
                  </td>
                  <td>{selectedBeneficiary.criancas06SCFV}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Crianças 7-14 SCFV</strong>
                  </td>
                  <td>{selectedBeneficiary.criancas714SCFV}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Adolescentes 15-17 SCFV</strong>
                  </td>
                  <td>{selectedBeneficiary.adolescentes1517SCFV}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Adultos SCFV</strong>
                  </td>
                  <td>{selectedBeneficiary.adultosSCFV}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Idosos SCFV</strong>
                  </td>
                  <td>{selectedBeneficiary.idososSCFV}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Palestras e Oficinas</strong>
                  </td>
                  <td>{selectedBeneficiary.palestrasOficinas}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Pessoas com Deficiência</strong>
                  </td>
                  <td>{selectedBeneficiary.pessoasDeficiencia}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <p>Nenhuma informação adicional disponível.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdditionalInfo}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HistoricoTable;
