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
    categoriaId: "",
  });
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBeneficiarios, setFilteredBeneficiarios] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState("basics");
  const [categorias, setCategorias] = useState([]);
  const [formErrors, setFormErrors] = useState({});

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
        categoriaId: item.categoriaId || "",
        mes: mesesToPortugues[item.mes] || item.mes,
      });
      if (item.beneficiario?.username) {
        setSearchTerm(item.beneficiario.username);
      }
    }
  }, [item]);

  useEffect(() => {
    if (!show) {
      // Resetando os dados do formulário quando o modal for fechado
      setFormData({
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
        familiasParticipantesPAIF: 0,
        criancas06SCFV: 0,
        criancas714SCFV: 0,
        adolescentes1517SCFV: 0,
        adultosSCFV: 0,
        idososSCFV: 0,
        palestrasOficinas: 0,
        pessoasDeficiencia: 0,
        filiadoUsername: "",
        filiadoCpf: "",
        dataNascimento: "",
        beneficiario: "", // Resetando para vazio
        beneficiarioId: "",
        beneficiarioNome: "",
        categoriaId: "",
      });
    }
  }, [show]); // Isso vai reagir sempre que o modal for aberto ou fechado

  const mesesTraducao = {
    JANEIRO: "JANUARY",
    FEVEREIRO: "FEBRUARY",
    MARCO: "MARCH",
    ABRIL: "APRIL",
    MAIO: "MAY",
    JUNHO: "JUNE",
    JULHO: "JULY",
    AGOSTO: "AUGUST",
    SETEMBRO: "SEPTEMBER",
    OUTUBRO: "OCTOBER",
    NOVEMBRO: "NOVEMBER",
    DEZEMBRO: "DECEMBER",
  };

  const mesesToPortugues = {
    JANUARY: "JANEIRO",
    FEBRUARY: "FEVEREIRO",
    MARCH: "MARCO",
    APRIL: "ABRIL",
    MAY: "MAIO",
    JUNE: "JUNHO",
    JULY: "JULHO",
    AUGUST: "AGOSTO",
    SEPTEMBER: "SETEMBRO",
    OCTOBER: "OUTUBRO",
    NOVEMBER: "NOVEMBRO",
    DECEMBER: "DEZEMBRO",
  };
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
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const currentValues = Array.isArray(formData[name]) ? formData[name] : [];
      let newValue;

      if (checked) {
        // Se marcado, usamos apenas o valor atual
        newValue = value;
      } else {
        // Se desmarcado, limpamos o valor
        newValue = "";
      }

      setFormData((prevData) => ({
        ...prevData,
        categoriaId: newValue, // Armazena apenas um valor
        categoria: {
          id: newValue, // Atualiza o ID da categoria
        },
      }));

      console.log("Valor atualizado:", newValue);
    } else if (name === "categoriasIds" && e.target.options) {
      const selectedValues = Array.from(e.target.options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedValues,
      }));
    } else {
      if (name === "familiasPAIF") {
        console.log("Familias PAIF antes de atualizar:", formData.familiasPAIF);
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "mes" ? mesesTraducao[value] || value : value,
      }));

      if (name === "familiasPAIF") {
        console.log("Familias PAIF após atualização:", value);
      }
    }
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
    const errors = {};

    // Validação dos campos obrigatórios
    if (!formData.username) {
      errors.username = "O campo 'Nome' é obrigatório.";
    }
    if (!formData.cpf) {
      errors.cpf = "O campo 'CPF' é obrigatório.";
    }
    if (!formData.telefone) {
      errors.telefone = "O campo 'Telefone' é obrigatório.";
    }
    if (!formData.nis) {
      errors.nis = "O campo 'NIS' é obrigatório.";
    }

    // Se houver erros, não prosseguir com a submissão
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // Evita a execução do código a seguir se houver erros
    }

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
          return;
        }
      }

      const updatedFormData = {
        ...formData,
        beneficiario: {
          id: formData.beneficiarioId,
        },
        ...(formData.categoriaId && {
          categoria: {
            id: formData.categoriaId,
          },
        }),
      };

      onSave(updatedFormData);
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get("/categorias");
        setCategorias(response.data);
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      }
    };

    fetchCategorias();
  }, []);

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
                <Form.Label>Nome *</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                {formErrors.username && (
                  <Form.Text className="text-danger">
                    {formErrors.username}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="formNis">
                <Form.Label>NIS *</Form.Label>
                <Form.Control
                  type="text"
                  name="nis"
                  value={formData.nis}
                  onChange={handleChange}
                  required
                />
                {formErrors.nis && (
                  <Form.Text className="text-danger">
                    {formErrors.nis}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="formCpf">
                <Form.Label>CPF *</Form.Label>
                <Form.Control
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  required
                />
                {formErrors.cpf && (
                  <Form.Text className="text-danger">
                    {formErrors.cpf}
                  </Form.Text>
                )}
                {formErrors.endereco && (
                  <Form.Text className="text-danger">
                    {formErrors.endereco}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="formTelefone">
                <Form.Label>Telefone *</Form.Label>
                <Form.Control
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
                {formErrors.telefone && (
                  <Form.Text className="text-danger">
                    {formErrors.telefone}
                  </Form.Text>
                )}
                <Form.Group controlId="formCategoria">
                  <Form.Label>Categoria</Form.Label>
                  <div
                    className="checkbox-container"
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      padding: "10px",
                    }}
                  >
                    {categorias.map((categoria) => (
                      <div key={categoria.id} className="mb-2">
                        <Form.Check
                          type="checkbox"
                          id={`categoria-${categoria.id}`}
                          label={categoria.nome}
                          name="categoriaId"
                          value={categoria.id}
                          checked={formData.categoriaId?.includes(
                            String(categoria.id)
                          )} // Convertemos para string para garantir
                          onChange={handleChange}
                        />
                      </div>
                    ))}
                  </div>
                </Form.Group>
              </Form.Group>
            </Form>
          </Tab>

          <Tab eventKey="bloco1" title="Bloco I - Famílias PAIF">
            <Form className="p-3">
              <h5>A. Volume de famílias em acompanhamento pelo PAIF</h5>

              <Form.Group className="mb-3" controlId="formMes">
                <Form.Label>Mês</Form.Label>
                <Form.Select
                  name="mes"
                  value={formData.mes ? mesesToPortugues[formData.mes] : ""}
                  onChange={handleChange}
                >
                  <option value="">Selecione um mês</option>
                  <option value="JANEIRO">Janeiro</option>
                  <option value="FEVEREIRO">Fevereiro</option>
                  <option value="MARCO">Março</option>
                  <option value="ABRIL">Abril</option>
                  <option value="MAIO">Maio</option>
                  <option value="JUNHO">Junho</option>
                  <option value="JULHO">Julho</option>
                  <option value="AGOSTO">Agosto</option>
                  <option value="SETEMBRO">Setembro</option>
                  <option value="OUTUBRO">Outubro</option>
                  <option value="NOVEMBRO">Novembro</option>
                  <option value="DEZEMBRO">Dezembro</option>
                </Form.Select>
              </Form.Group>

              <h5>Informações Adicionais</h5>
              <Form.Group className="mb-3" controlId="formFamiliasPAIF">
                <Form.Label>
                  A.1. Total de famílias em acompanhamento pelo PAIF
                </Form.Label>
                <Form.Control
                  type="number"
                  name="familiasPAIF"
                  value={formData.familiasPAIF || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNovasFamiliasPAIF">
                <Form.Label>
                  A.2. Novas famílias inseridas no acompanhamento do PAIF
                </Form.Label>
                <Form.Control
                  type="number"
                  name="novasFamiliasPAIF"
                  value={formData.novasFamiliasPAIF || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <h5>B. Perfil das novas famílias</h5>
              <Form.Group
                className="mb-3"
                controlId="formFamiliasExtremaPobreza"
              >
                <Form.Label>
                  B.1. Famílias em situação de extrema pobreza
                </Form.Label>
                <Form.Control
                  type="number"
                  name="familiasExtremaPobreza"
                  value={formData.familiasExtremaPobreza || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBolsaFamilia">
                <Form.Label>
                  B.2. Famílias beneficiárias do Programa Bolsa Família
                </Form.Label>
                <Form.Control
                  type="number"
                  name="bolsaFamilia"
                  value={formData.bolsaFamilia || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formDescumprimentoCondicionalidades"
              >
                <Form.Label>
                  B.3. Famílias beneficiárias em descumprimento de
                  condicionalidades
                </Form.Label>
                <Form.Control
                  type="number"
                  name="descumprimentoCondicionalidades"
                  value={formData.descumprimentoCondicionalidades || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBpc">
                <Form.Label>
                  B.4. Famílias com membros beneficiários do BPC
                </Form.Label>
                <Form.Control
                  type="number"
                  name="bpc"
                  value={formData.bpc || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTrabalhoInfantil">
                <Form.Label>
                  B.5. Famílias com crianças ou adolescentes em situação de
                  trabalho infantil
                </Form.Label>
                <Form.Control
                  type="number"
                  name="trabalhoInfantil"
                  value={formData.trabalhoInfantil || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAcolhimento">
                <Form.Label>
                  B.6. Famílias com crianças ou adolescentes em Serviço de
                  Acolhimento
                </Form.Label>
                <Form.Control
                  type="number"
                  name="acolhimento"
                  value={formData.acolhimento || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Tab>

          <Tab eventKey="bloco2" title="Bloco II - Atendimentos CRAS">
            <Form className="p-3">
              <h5>C. Volume de atendimentos particularizados</h5>
              <Form.Group className="mb-3" controlId="formAtendimentosCRAS">
                <Form.Label>
                  C.1. Total de atendimentos particularizados realizados
                </Form.Label>
                <Form.Control
                  type="number"
                  name="atendimentosCRAS"
                  value={formData.atendimentosCRAS || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCadastroUnico">
                <Form.Label>
                  C.2. Famílias encaminhadas para inclusão no Cadastro Único
                </Form.Label>
                <Form.Control
                  type="number"
                  name="cadastroUnico"
                  value={formData.cadastroUnico || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAtualizacaoCadastral">
                <Form.Label>
                  C.3. Famílias encaminhadas para atualização cadastral
                </Form.Label>
                <Form.Control
                  type="number"
                  name="atualizacaoCadastral"
                  value={formData.atualizacaoCadastral || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBpcIndividuos">
                <Form.Label>
                  C.4. Indivíduos encaminhados para acesso ao BPC
                </Form.Label>
                <Form.Control
                  type="number"
                  name="bpcIndividuos"
                  value={formData.bpcIndividuos || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCreas">
                <Form.Label>C.5. Famílias encaminhadas para o CREAS</Form.Label>
                <Form.Control
                  type="number"
                  name="creas"
                  value={formData.creas || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formVisitasDomiciliares">
                <Form.Label>C.6. Visitas domiciliares realizadas</Form.Label>
                <Form.Control
                  type="number"
                  name="visitasDomiciliares"
                  value={formData.visitasDomiciliares || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAuxiliosNatalidade">
                <Form.Label>
                  C.7. Total de auxílios-natalidade concedidos/entregues
                </Form.Label>
                <Form.Control
                  type="number"
                  name="auxiliosNatalidade"
                  value={formData.auxiliosNatalidade || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAuxiliosFuneral">
                <Form.Label>
                  C.8. Total de auxílios-funeral concedidos/entregues
                </Form.Label>
                <Form.Control
                  type="number"
                  name="auxiliosFuneral"
                  value={formData.auxiliosFuneral || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formOutrosBeneficios">
                <Form.Label>
                  C.9. Outros benefícios eventuais concedidos/entregues
                </Form.Label>
                <Form.Control
                  type="number"
                  name="outrosBeneficios"
                  value={formData.outrosBeneficios || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Tab>

          <Tab eventKey="bloco3" title="Bloco III - Coletivos">
            <Form className="p-3">
              <h5>D. Volume de atendimentos coletivos</h5>
              <Form.Group
                className="mb-3"
                controlId="formFamiliasParticipantesPAIF"
              >
                <Form.Label>
                  D.1. Famílias participando regularmente de grupos no âmbito do
                  PAIF
                </Form.Label>
                <Form.Control
                  type="number"
                  name="familiasParticipantesPAIF"
                  value={formData.familiasParticipantesPAIF || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCriancas06SCFV">
                <Form.Label>
                  D.2. Crianças de 0 a 6 anos em Serviços de Convivência
                </Form.Label>
                <Form.Control
                  type="number"
                  name="criancas06SCFV"
                  value={formData.criancas06SCFV || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCriancas714SCFV">
                <Form.Label>
                  D.3. Crianças/adolescentes de 7 a 14 anos em Serviços de
                  Convivência
                </Form.Label>
                <Form.Control
                  type="number"
                  name="criancas714SCFV"
                  value={formData.criancas714SCFV || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAdolescentes1517SCFV">
                <Form.Label>
                  D.4. Adolescentes de 15 a 17 anos em Serviços de Convivência
                </Form.Label>
                <Form.Control
                  type="number"
                  name="adolescentes1517SCFV"
                  value={formData.adolescentes1517SCFV || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAdultosSCFV">
                <Form.Label>
                  D.8. Adultos entre 18 e 59 anos em Serviços de Convivência
                </Form.Label>
                <Form.Control
                  type="number"
                  name="adultosSCFV"
                  value={formData.adultosSCFV || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formIdososSCFV">
                <Form.Label>D.5. Idosos em Serviços de Convivência</Form.Label>
                <Form.Control
                  type="number"
                  name="idososSCFV"
                  value={formData.idososSCFV || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPalestrasOficinas">
                <Form.Label>
                  D.6. Pessoas que participaram de palestras, oficinas e outras
                  atividades coletivas
                </Form.Label>
                <Form.Control
                  type="number"
                  name="palestrasOficinas"
                  value={formData.palestrasOficinas || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPessoasDeficiencia">
                <Form.Label>
                  D.7. Pessoas com deficiência participando dos Serviços de
                  Convivência ou PAIF
                </Form.Label>
                <Form.Control
                  type="number"
                  name="pessoasDeficiencia"
                  value={formData.pessoasDeficiencia || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Tab>
          {/* <Tab eventKey="filiado" title="Filiado"> 
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
          </Tab>*/}
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
