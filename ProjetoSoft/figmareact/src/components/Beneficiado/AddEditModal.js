import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap";
import api from "../../api/api";

function AddEditModal({ show, handleClose, title, item, onSave }) {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    nis: "",
    cpf: "",
    endereco: "",
    telefone: "",
    mes: "",
    familiasPAIF: 0,
    novasFamiliasPAIF: 0,
    familiasExtremaPobreza: 0,
    bolsaFamilia: 0,
    descumprimentoCondicionalidades: 0,
    bpc: 0,
    trabalhoInfantil: 0,
    acolhimento: 0,
    atendimentosCRAS: 0,
    cadastroUnico: 0,
    atualizacaoCadastral: 0,
    bpcIndividuos: 0,
    creas: 0,
    visitasDomiciliares: 0,
    auxiliosNatalidade: 0,
    auxiliosFuneral: 0,
    outrosBeneficios: 0,
    atendimentosColetivos: 0,
    familiasParticipantesPAIF: 0,
    criancas06SCFV: 0,
    criancas714SCFV: 0,
    adolescentes1517SCFV: 0,
    adultosSCFV: 0,
    idososSCFV: 0,
    palestrasOficinas: 0,
    pessoasDeficiencia: 0,
    // Campos da aba "Filiado"
    filiadoUsername: "",
    filiadoCpf: "",
    dataNascimento: "",
    beneficiario: "", // Supondo que seja um ID ou objeto Beneficiario
    beneficiarioId: "",
    beneficiarioNome: "",
  });

  const [beneficiarios, setBeneficiarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBeneficiarios, setFilteredBeneficiarios] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState("basics");

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id || "",
        username: item.username || "",
        nis: item.nis || "",
        cpf: item.cpf || "",
        endereco: item.endereco || "",
        telefone: item.telefone || "",
        mes: item.mes || "",
        familiasPAIF: item.familiasPAIF || 0,
        novasFamiliasPAIF: item.novasFamiliasPAIF || 0,
        familiasExtremaPobreza: item.familiasExtremaPobreza || 0,
        bolsaFamilia: item.bolsaFamilia || 0,
        descumprimentoCondicionalidades:
          item.descumprimentoCondicionalidades || 0,
        bpc: item.bpc || 0,
        trabalhoInfantil: item.trabalhoInfantil || 0,
        acolhimento: item.acolhimento || 0,
        atendimentosCRAS: item.atendimentosCRAS || 0,
        cadastroUnico: item.cadastroUnico || 0,
        atualizacaoCadastral: item.atualizacaoCadastral || 0,
        bpcIndividuos: item.bpcIndividuos || 0,
        creas: item.creas || 0,
        visitasDomiciliares: item.visitasDomiciliares || 0,
        auxiliosNatalidade: item.auxiliosNatalidade || 0,
        auxiliosFuneral: item.auxiliosFuneral || 0,
        outrosBeneficios: item.outrosBeneficios || 0,
        atendimentosColetivos: item.atendimentosColetivos || 0,
        familiasParticipantesPAIF: item.familiasParticipantesPAIF || 0,
        criancas06SCFV: item.criancas06SCFV || 0,
        criancas714SCFV: item.criancas714SCFV || 0,
        adolescentes1517SCFV: item.adolescentes1517SCFV || 0,
        adultosSCFV: item.adultosSCFV || 0,
        idososSCFV: item.idososSCFV || 0,
        palestrasOficinas: item.palestrasOficinas || 0,
        pessoasDeficiencia: item.pessoasDeficiencia || 0,
        // Dados da aba "Filiado"
        filiadoUsername: item.filiadoUsername || "",
        filiadoCpf: item.filiadoCpf || "",
        dataNascimento: item.dataNascimento || "",
        beneficiario: item.beneficiario || "",
        beneficiarioId: item.beneficiario?.id || "",
        beneficiarioNome: item.beneficiario?.username || "",
      });
      if (item.beneficiario?.username) {
        setSearchTerm(item.beneficiario.username);
      }
    }
  }, [item]);

  useEffect(() => {
    if (isSearching) {
      const results = beneficiarios.filter(
        (beneficiario) =>
          beneficiario.username
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          beneficiario.cpf
            .replace(/\D/g, "")
            .includes(searchTerm.replace(/\D/g, "")) ||
          (beneficiario.nis && beneficiario.nis.includes(searchTerm))
      );
      setFilteredBeneficiarios(results);
    }
  }, [searchTerm, beneficiarios, isSearching]);

  useEffect(() => {
    const fetchBeneficiarios = async () => {
      try {
        const response = await api.get("/Beneficiario");
        setBeneficiarios(response.data);
        setFilteredBeneficiarios(response.data);
      } catch (err) {
        console.error("Erro ao buscar beneficiários:", err);
      }
    };

    fetchBeneficiarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBeneficiarioSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearching(true);

    if (!value) {
      setFormData((prev) => ({
        ...prev,
        beneficiarioId: "",
        beneficiarioNome: "",
      }));
    }
  };

  const handleBeneficiarioSelect = (beneficiario) => {
    setFormData((prev) => ({
      ...prev,
      beneficiarioId: beneficiario.id,
      beneficiarioNome: beneficiario.username,
    }));
    setSearchTerm(beneficiario.username);
    setIsSearching(false);
  };

  const formatCPF = (cpf) => {
    const numbers = cpf.replace(/\D/g, "");
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const handleSubmit = async () => {
    try {
      // If we're on the filiado tab and have filiado data, create a filiado first
      if (activeTab === "filiado" && formData.filiadoUsername) {
        const filiadoData = {
          username: formData.filiadoUsername,
          cpf: formData.filiadoCpf,
          data: formData.dataNascimento,
          beneficiario: {
            id: formData.beneficiarioId,
          },
        };

        try {
          // Create filiado
          await api.post("/filiado", filiadoData);
        } catch (error) {
          console.error("Error creating filiado:", error);
          // Handle error (maybe show an alert to the user)
          return;
        }
      }

      // Then proceed with the original form submission
      const updatedFormData = {
        ...formData,
        beneficiario: {
          id: formData.beneficiarioId,
        },
      };
      onSave(updatedFormData);
    } catch (error) {
      console.error("Error in form submission:", error);
      // Handle error appropriately
    }
  };

  const searchStyles = {
    inputContainer: {
      position: "relative",
      marginBottom: "1rem",
    },
    beneficiarioList: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      maxHeight: "200px",
      overflowY: "auto",
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "4px",
      zIndex: 1000,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    beneficiarioItem: {
      padding: "8px 12px",
      cursor: "pointer",
      borderBottom: "1px solid #eee",
    },
    beneficiarioInfo: {
      display: "flex",
      flexDirection: "column",
    },
    beneficiarioName: {
      fontWeight: "bold",
    },
    beneficiarioDetails: {
      fontSize: "0.9em",
      color: "#666",
    },
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          <Tab eventKey="basics" title="Informações Básicas">
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formNis">
                <Form.Label>NIS</Form.Label>
                <Form.Control
                  type="text"
                  name="nis"
                  value={formData.nis}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formCpf">
                <Form.Label>CPF</Form.Label>
                <Form.Control
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formEndereco">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formTelefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Tab>

          <Tab eventKey="additional" title="Informações Adicionais">
            <Form>
              <Form.Group controlId="formMes">
                <Form.Label>Mês</Form.Label>
                <Form.Control
                  type="text"
                  name="mes"
                  value={formData.mes}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formFamiliasPAIF">
                <Form.Label>Famílias PAIF</Form.Label>
                <Form.Control
                  type="number"
                  name="familiasPAIF"
                  value={formData.familiasPAIF}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formNovasFamiliasPAIF">
                <Form.Label>Novas Famílias PAIF</Form.Label>
                <Form.Control
                  type="number"
                  name="novasFamiliasPAIF"
                  value={formData.novasFamiliasPAIF}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formFamiliasExtremaPobreza">
                <Form.Label>Famílias em Extrema Pobreza</Form.Label>
                <Form.Control
                  type="number"
                  name="familiasExtremaPobreza"
                  value={formData.familiasExtremaPobreza}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBolsaFamilia">
                <Form.Label>Bolsa Família</Form.Label>
                <Form.Control
                  type="number"
                  name="bolsaFamilia"
                  value={formData.bolsaFamilia}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescumprimentoCondicionalidades">
                <Form.Label>Descumprimento de Condicionalidades</Form.Label>
                <Form.Control
                  type="number"
                  name="descumprimentoCondicionalidades"
                  value={formData.descumprimentoCondicionalidades}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBpc">
                <Form.Label>BPC</Form.Label>
                <Form.Control
                  type="number"
                  name="bpc"
                  value={formData.bpc}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formTrabalhoInfantil">
                <Form.Label>Trabalho Infantil</Form.Label>
                <Form.Control
                  type="number"
                  name="trabalhoInfantil"
                  value={formData.trabalhoInfantil}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAcolhimento">
                <Form.Label>Acolhimento</Form.Label>
                <Form.Control
                  type="number"
                  name="acolhimento"
                  value={formData.acolhimento}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAtendimentosCRAS">
                <Form.Label>Atendimentos CRAS</Form.Label>
                <Form.Control
                  type="number"
                  name="atendimentosCRAS"
                  value={formData.atendimentosCRAS}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formCadastroUnico">
                <Form.Label>Cadastro Único</Form.Label>
                <Form.Control
                  type="number"
                  name="cadastroUnico"
                  value={formData.cadastroUnico}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAtualizacaoCadastral">
                <Form.Label>Atualização Cadastral</Form.Label>
                <Form.Control
                  type="number"
                  name="atualizacaoCadastral"
                  value={formData.atualizacaoCadastral}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBpcIndividuos">
                <Form.Label>BPC para Indivíduos</Form.Label>
                <Form.Control
                  type="number"
                  name="bpcIndividuos"
                  value={formData.bpcIndividuos}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formCreas">
                <Form.Label>CREAS</Form.Label>
                <Form.Control
                  type="number"
                  name="creas"
                  value={formData.creas}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formVisitasDomiciliares">
                <Form.Label>Visitas Domiciliares</Form.Label>
                <Form.Control
                  type="number"
                  name="visitasDomiciliares"
                  value={formData.visitasDomiciliares}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAuxiliosNatalidade">
                <Form.Label>Auxílios Natalidade</Form.Label>
                <Form.Control
                  type="number"
                  name="auxiliosNatalidade"
                  value={formData.auxiliosNatalidade}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAuxiliosFuneral">
                <Form.Label>Auxílios Funeral</Form.Label>
                <Form.Control
                  type="number"
                  name="auxiliosFuneral"
                  value={formData.auxiliosFuneral}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formOutrosBeneficios">
                <Form.Label>Outros Benefícios</Form.Label>
                <Form.Control
                  type="number"
                  name="outrosBeneficios"
                  value={formData.outrosBeneficios}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAtendimentosColetivos">
                <Form.Label>Atendimentos Coletivos</Form.Label>
                <Form.Control
                  type="number"
                  name="atendimentosColetivos"
                  value={formData.atendimentosColetivos}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formFamiliasParticipantesPAIF">
                <Form.Label>Famílias Participantes PAIF</Form.Label>
                <Form.Control
                  type="number"
                  name="familiasParticipantesPAIF"
                  value={formData.familiasParticipantesPAIF}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formCriancas06SCFV">
                <Form.Label>Crianças 0-6 SCFV</Form.Label>
                <Form.Control
                  type="number"
                  name="criancas06SCFV"
                  value={formData.criancas06SCFV}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formCriancas714SCFV">
                <Form.Label>Crianças 7-14 SCFV</Form.Label>
                <Form.Control
                  type="number"
                  name="criancas714SCFV"
                  value={formData.criancas714SCFV}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAdolescentes1517SCFV">
                <Form.Label>Adolescentes 15-17 SCFV</Form.Label>
                <Form.Control
                  type="number"
                  name="adolescentes1517SCFV"
                  value={formData.adolescentes1517SCFV}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAdultosSCFV">
                <Form.Label>Adultos SCFV</Form.Label>
                <Form.Control
                  type="number"
                  name="adultosSCFV"
                  value={formData.adultosSCFV}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formIdososSCFV">
                <Form.Label>Idosos SCFV</Form.Label>
                <Form.Control
                  type="number"
                  name="idososSCFV"
                  value={formData.idososSCFV}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPalestrasOficinas">
                <Form.Label>Palestras e Oficinas</Form.Label>
                <Form.Control
                  type="number"
                  name="palestrasOficinas"
                  value={formData.palestrasOficinas}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPessoasDeficiencia">
                <Form.Label>Pessoas com Deficiência</Form.Label>
                <Form.Control
                  type="number"
                  name="pessoasDeficiencia"
                  value={formData.pessoasDeficiencia}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Tab>
          <Tab eventKey="filiado" title="Filiado">
            <Form>
              <Form.Group controlId="formFiliadoUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="filiadoUsername"
                  value={formData.filiadoUsername}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formFiliadoCpf">
                <Form.Label>CPF</Form.Label>
                <Form.Control
                  type="text"
                  name="filiadoCpf"
                  value={formData.filiadoCpf}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDataNascimento">
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBeneficiario">
                <Form.Label>Beneficiário</Form.Label>
                <div style={searchStyles.inputContainer}>
                  <Form.Control
                    type="text"
                    value={searchTerm}
                    onChange={handleBeneficiarioSearchChange}
                    onFocus={() => setIsSearching(true)}
                    placeholder="Pesquise por Nome, CPF ou NIS"
                  />
                  {isSearching &&
                    searchTerm &&
                    filteredBeneficiarios.length > 0 && (
                      <div style={searchStyles.beneficiarioList}>
                        {filteredBeneficiarios.map((beneficiario) => (
                          <div
                            key={beneficiario.id}
                            onClick={() =>
                              handleBeneficiarioSelect(beneficiario)
                            }
                            style={searchStyles.beneficiarioItem}
                          >
                            <div style={searchStyles.beneficiarioInfo}>
                              <span style={searchStyles.beneficiarioName}>
                                {beneficiario.username}
                              </span>
                              <span style={searchStyles.beneficiarioDetails}>
                                CPF: {formatCPF(beneficiario.cpf)}
                                {beneficiario.nis &&
                                  ` | NIS: ${beneficiario.nis}`}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </Form.Group>
            </Form>
          </Tab>
        </Tabs>
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
