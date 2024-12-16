import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap";
import api from "../../api/api";
import styles from "./GerenciarBeneficiado.module.css";

function AddEditModal({
  show,
  handleClose,
  title,
  item,
  onSave,
  onHelpClick,
  onBackClick,
}) {
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

  const [showModal, setShowModal] = useState(false);

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

    // Lidar com checkboxes e armazenar valores selecionados como array
    if (type === "checkbox") {
      console.log("Checkbox alterado");
      console.log("Nome do campo:", name);
      console.log("Valor do checkbox:", value);
      console.log("Checkbox marcado:", checked);

      // Se o valor atual de formData[name] for uma string, converte em array
      const currentValues = formData[name] ? formData[name].split(",") : [];
      console.log("Valores atuais antes da atualização:", currentValues);

      if (checked) {
        // Se o checkbox estiver marcado, adiciona o valor ao array
        currentValues.push(value);
      } else {
        // Se o checkbox for desmarcado, remove o valor do array
        const index = currentValues.indexOf(value);
        if (index > -1) {
          currentValues.splice(index, 1);
        }
      }

      // Converte o array de valores em uma string separada por vírgulas
      const updatedValue = currentValues.join(",");
      console.log("Valores atualizados para checkbox:", updatedValue);

      setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValue, // Armazena como uma string
      }));
    }
    // Lidar com campos <select> múltiplos
    else if (name === "categoriasIds" && e.target.options) {
      const selectedValues = Array.from(e.target.options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      // Converte os valores para uma string separada por vírgulas
      const updatedSelectValue = selectedValues.join(",");
      console.log("Valores selecionados no select:", selectedValues);
      console.log("String de valores do select:", updatedSelectValue);

      setFormData((prevData) => ({
        ...prevData,
        [name]: updatedSelectValue, // Armazena como uma string separada por vírgulas
      }));
    }
    // Lidar com campos numéricos (impede valores negativos)
    else if (type === "number") {
      const numericValue = Number(value);

      if (numericValue < 0) {
        alert("Valor não pode ser negativo.");
        return; // Não atualiza o estado se for negativo
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue, // Atualiza o valor numérico
      }));

      console.log(`Valor numérico de ${name} atualizado:`, numericValue);
    }
    // Para outros campos (texto, etc)
    else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "mes" ? mesesTraducao[value] || value : value,
      }));

      console.log(`Valor de ${name} atualizado:`, value);
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
  const isValidCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0,
      resto;

    // Validação do primeiro dígito verificador
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;

    // Validação do segundo dígito verificador
    for (let i = 1; i <= 10; i++)
      soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
  };
  const handleSubmit = async () => {
    const errors = {};

    // Validação dos campos obrigatórios
    if (!formData.username) {
      alert("Por favor, preencha o campo de nome de usuário.");
      return;
    }
    if (!formData.nis) {
      alert("O campo 'NIS' é obrigatório.");
      return;
    }

    if (!formData.cpf) {
      alert("Por favor, preencha o campo de CPF.");
      return;
    }

    if (!isValidCPF(formData.cpf)) {
      alert(
        "CPF inválido ou já cadastrado. Por favor, insira um número de CPF válido."
      );
      return;
    }
    if (!formData.telefone) {
      alert("O campo 'Telefone' é obrigatório.");
      return;
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
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Tab
            eventKey="basics"
            title="Informações Básicas"
            tabClassName="custom-tab-basics"
          >
            <div className={styles.sidebarButtonss}>
              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Ajuda</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <h3>
                      <strong>Instruções de Preenchimento</strong>
                    </h3>
                    <p>
                      Os campos devem ser preenchidos com valores numéricos.
                      Confira as orientações específicas para cada bloco:
                    </p>

                    <h4>
                      <strong>
                        Bloco 1: Famílias em Acompanhamento pelo PAIF
                      </strong>
                    </h4>
                    <p>
                      Registre o número total de famílias acompanhadas pelo
                      programa.
                    </p>

                    <h4>
                      <strong>Bloco 2: Atendimentos Particularizados</strong>
                    </h4>
                    <p>
                      Registre o número de atendimentos realizados de forma
                      individualizada no CRAS.
                    </p>

                    <h4>
                      <strong>Bloco 3: Atendimentos Coletivos</strong>
                    </h4>
                    <p>
                      Registre o número de atendimentos realizados coletivamente
                      no CRAS.
                    </p>

                    <hr />

                    <h4>
                      <strong>Detalhamento por Campos</strong>
                    </h4>

                    <h5>
                      <strong>A.1 e A.2</strong>
                    </h5>
                    <p>
                      Preencha com valores numéricos que representam o total de
                      famílias atendidas.
                    </p>

                    <h5>
                      <strong>B.1 a B.6</strong>
                    </h5>
                    <ul>
                      <li>
                        Identificam perfis específicos de famílias atendidas no
                        CRAS.
                      </li>
                      <li>
                        Nem todas as famílias listadas no item A.2 se encaixam
                        em B.1 a B.6.
                      </li>
                      <li>
                        Algumas famílias podem se encaixar em mais de uma
                        condição simultaneamente.
                      </li>
                      <li>
                        <strong>Nota:</strong> A soma dos valores de B.1 a B.6
                        não precisa ser igual ao valor de A.2.
                      </li>
                    </ul>

                    <h5>
                      <strong>C.1 a C.6</strong>
                    </h5>
                    <ul>
                      <li>
                        Incluem o número total de famílias/indivíduos atendidos,
                        independentemente de acompanhamento sistemático pelo
                        PAIF.
                      </li>
                      <li>
                        Considere todas as famílias ou indivíduos que passaram
                        pelo CRAS, não apenas os acompanhados diretamente.
                      </li>
                    </ul>

                    <h5>
                      <strong>C.7 a C.9</strong>
                    </h5>
                    <ul>
                      <li>
                        Referem-se aos auxílios e benefícios eventuais
                        concedidos ou entregues pelo CRAS.
                      </li>
                      <li>
                        Se não houver concessão ou entrega de benefícios,
                        preencha com <strong>0 (zero)</strong>.
                      </li>
                    </ul>

                    <hr />

                    <h4>
                      <strong>Outras Observações Importantes</strong>
                    </h4>
                    <ul>
                      <li>
                        No <strong>Bloco 2</strong>, registre os atendimentos
                        particularizados.
                      </li>
                      <li>
                        No <strong>Bloco 3</strong>, registre os atendimentos
                        coletivos.
                      </li>
                      <li>
                        Nos Serviços de Convivência, contabilize os usuários de
                        acordo com sua idade, independentemente de estarem no
                        mesmo grupo etário.
                      </li>
                    </ul>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Fechar
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Nome do Beneficiário *</Form.Label>
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
                {/*
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
                </Form.Group> */}
              </Form.Group>
            </Form>
          </Tab>

          <Tab
            eventKey="bloco1"
            title="Bloco I - Famílias PAIF"
            style={{ overflow: "auto", maxHeight: "600px" }}
          >
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

          <Tab
            eventKey="bloco2"
            title="Bloco II - Atendimentos CRAS"
            style={{ overflow: "auto", maxHeight: "600px" }}
          >
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

          <Tab
            eventKey="bloco3"
            title="Bloco III - Coletivos"
            style={{ overflow: "auto", maxHeight: "600px" }}
          >
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

          </Tab>*/}
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <div className={styles.footerButtonContainer}>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Salvar
          </Button>

          <button
            type="button"
            className={styles.helpButtons}
            onClick={() => setShowModal(true)}
            style={{
              width: "40px",
              position: "relative",
              bottom: "25px",
              padding: "20px",
              borderRadius: "30px",
              padding: "2px 10px",
              border: "3px solid #fff",
            }}
          >
            ? {/* Ícone de interrogação */}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEditModal;
