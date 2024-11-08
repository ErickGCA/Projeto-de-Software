import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import api from "../../api/api";
import styles from "./GerenciarBeneficiado.module.css";

function HistoricoTable({ data, onEdit, onDelete }) {
  const [showAdditionalInfoModal, setShowAdditionalInfoModal] = useState(false);
  const [showFiliadoModal, setShowFiliadoModal] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [selectedFiliado, setSelectedFiliado] = useState(null);
  const [loadingFiliado, setLoadingFiliado] = useState(false);
  const [error, setError] = useState(null);

  const handleShowAdditionalInfo = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setShowAdditionalInfoModal(true);
  };

  const handleShowFiliado = async (beneficiary) => {
    setLoadingFiliado(true);
    setError(null);
    setShowFiliadoModal(true);

    try {
      const response = await api.get("/filiado");
      console.log("Dados brutos retornados da API:", response.data);

      const filiados = response.data;
      console.log("Lista de filiados:", filiados);

      // Log para cada filiado e seu beneficiário associado
      filiados.forEach((filiado, index) => {
        console.log(`Filiado ${index + 1}:`, {
          id: filiado.id,
          username: filiado.username,
          beneficiario: filiado.beneficiario,
          beneficiarioId: filiado.beneficiario?.id, // Mudança aqui
        });
      });

      const matchingFiliado = filiados.find((filiado) => {
        console.log("Comparando:", {
          "NIS do Beneficiário atual": beneficiary.id, // Mudança aqui
          "ID do Beneficiário do Filiado": filiado.beneficiario?.id, // Mudança aqui
          "Match?": filiado.beneficiario?.id === beneficiary.id, // Mudança aqui
        });
        return filiado.beneficiario?.id === beneficiary.id; // Mudança aqui
      });

      console.log("Filiado encontrado:", matchingFiliado);

      if (matchingFiliado) {
        setSelectedFiliado(matchingFiliado);
        console.log("Filiado selecionado com sucesso:", matchingFiliado);
      } else {
        console.log("Nenhum filiado encontrado para o ID:", beneficiary.id);
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

  const handleCloseAdditionalInfo = () => {
    setShowAdditionalInfoModal(false);
    setSelectedBeneficiary(null);
  };

  const handleCloseFiliado = () => {
    setShowFiliadoModal(false);
    setSelectedFiliado(null);
    setError(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <>
      <table className={styles.historicoTable}>
        <thead>
          <tr>
            <th>Beneficiário</th>
            <th>NIS</th>
            <th>CPF</th>
            <th>Endereço</th>
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
              <td>{item.cpf}</td>
              <td>{item.endereco}</td>
              <td>{item.telefone}</td>
              <td>
                <Button
                  variant="link"
                  className={styles.additionalInfoButton}
                  onClick={() => handleShowFiliado(item)}
                >
                  Ver detalhes
                </Button>
              </td>
              <td>
                <Button
                  variant="link"
                  className={styles.additionalInfoButton}
                  onClick={() => handleShowAdditionalInfo(item)}
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
      <Modal show={showFiliadoModal} onHide={handleCloseFiliado}>
        <Modal.Header closeButton>
          <Modal.Title>Informações do Filiado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingFiliado ? (
            <p>Carregando informações do filiado...</p>
          ) : error ? (
            <>
              <p className="text-danger">{error}</p>
              <div className="mt-3">
                <strong>Debug Info:</strong>
                <pre className="border p-2 mt-2" style={{ fontSize: "0.8em" }}>
                  {JSON.stringify(
                    {
                      selectedBeneficiaryNIS: selectedBeneficiary?.nis,
                      totalFiliadosLoaded: selectedFiliado !== null ? 1 : 0,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </>
          ) : selectedFiliado ? (
            <div>
              <p>
                <strong>Nome do Filiado:</strong> {selectedFiliado.username}
              </p>
              <p>
                <strong>CPF:</strong> {selectedFiliado.cpf}
              </p>
              <p>
                <strong>Data de Nascimento:</strong>{" "}
                {formatDate(selectedFiliado.data)}
              </p>
              <p>
                <strong>Código do Filiado:</strong> {selectedFiliado.id}
              </p>
              <p>
                <strong>Beneficiário (NIS):</strong>{" "}
                {selectedFiliado.beneficiario?.codnis}
              </p>
            </div>
          ) : (
            <p>Nenhuma informação do filiado disponível.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFiliado}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para exibir informações adicionais */}
      <Modal show={showAdditionalInfoModal} onHide={handleCloseAdditionalInfo}>
        <Modal.Header closeButton>
          <Modal.Title>Informações Adicionais</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBeneficiary ? (
            <div>
              <p>
                <strong>Mes:</strong> {selectedBeneficiary.mes}
              </p>
              <p>
                <strong>Famílias PAIF:</strong>{" "}
                {selectedBeneficiary.familiasPAIF}
              </p>
              <p>
                <strong>Novas Famílias PAIF:</strong>{" "}
                {selectedBeneficiary.novasFamiliasPAIF}
              </p>
              <p>
                <strong>Famílias Extrema Pobreza:</strong>{" "}
                {selectedBeneficiary.familiasExtremaPobreza}
              </p>
              <p>
                <strong>Bolsa Família:</strong>{" "}
                {selectedBeneficiary.bolsaFamilia}
              </p>
              <p>
                <strong>Descumprimento de Condicionalidades:</strong>{" "}
                {selectedBeneficiary.descumprimentoCondicionalidades}
              </p>
              <p>
                <strong>BPC:</strong> {selectedBeneficiary.bpc}
              </p>
              <p>
                <strong>Trabalho Infantil:</strong>{" "}
                {selectedBeneficiary.trabalhoInfantil}
              </p>
              <p>
                <strong>Acolhimento:</strong> {selectedBeneficiary.acolhimento}
              </p>
              <p>
                <strong>Atendimentos CRAS:</strong>{" "}
                {selectedBeneficiary.atendimentosCRAS}
              </p>
              <p>
                <strong>Cadastro Único:</strong>{" "}
                {selectedBeneficiary.cadastroUnico}
              </p>
              <p>
                <strong>Atualização Cadastral:</strong>{" "}
                {selectedBeneficiary.atualizacaoCadastral}
              </p>
              <p>
                <strong>BPC Individuos:</strong>{" "}
                {selectedBeneficiary.bpcIndividuos}
              </p>
              <p>
                <strong>CREAS:</strong> {selectedBeneficiary.creas}
              </p>
              <p>
                <strong>Visitas Domiciliares:</strong>{" "}
                {selectedBeneficiary.visitasDomiciliares}
              </p>
              <p>
                <strong>Auxílios Natalidade:</strong>{" "}
                {selectedBeneficiary.auxiliosNatalidade}
              </p>
              <p>
                <strong>Auxílios Funeral:</strong>{" "}
                {selectedBeneficiary.auxiliosFuneral}
              </p>
              <p>
                <strong>Outros Benefícios:</strong>{" "}
                {selectedBeneficiary.outrosBeneficios}
              </p>
              <p>
                <strong>Atendimentos Coletivos:</strong>{" "}
                {selectedBeneficiary.atendimentosColetivos}
              </p>
              <p>
                <strong>Famílias Participantes PAIF:</strong>{" "}
                {selectedBeneficiary.familiasParticipantesPAIF}
              </p>
              <p>
                <strong>Crianças 0-6 SCFV:</strong>{" "}
                {selectedBeneficiary.criancas06SCFV}
              </p>
              <p>
                <strong>Crianças 7-14 SCFV:</strong>{" "}
                {selectedBeneficiary.criancas714SCFV}
              </p>
              <p>
                <strong>Adolescentes 15-17 SCFV:</strong>{" "}
                {selectedBeneficiary.adolescentes1517SCFV}
              </p>
              <p>
                <strong>Adultos SCFV:</strong> {selectedBeneficiary.adultosSCFV}
              </p>
              <p>
                <strong>Idosos SCFV:</strong> {selectedBeneficiary.idososSCFV}
              </p>
              <p>
                <strong>Palestras e Oficinas:</strong>{" "}
                {selectedBeneficiary.palestrasOficinas}
              </p>
              <p>
                <strong>Pessoas com Deficiência:</strong>{" "}
                {selectedBeneficiary.pessoasDeficiencia}
              </p>
            </div>
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
