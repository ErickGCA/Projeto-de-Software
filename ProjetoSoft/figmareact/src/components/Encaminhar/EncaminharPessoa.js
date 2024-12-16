import React, { useEffect, useState } from "react";
import { MdArrowBack, MdPerson, MdPhone, MdWork } from "react-icons/md";
import api from "../../api/api";
import logoImage from "../images/logo (1).png";
import styles from "./EncaminharPessoa.module.css";
import FormInput from "./FormInput";

const formInputs = [
  { label: "Nome * ", icon: <MdPerson />, width: 412, id: "username" },
  { label: "Telefone ", icon: <MdPhone />, width: 217, id: "telefone" },
  { label: "Data *", icon: null, width: 217, id: "data", type: "date" },
  {
    label: "Horário da Consulta *",
    id: "horarioConsulta",
    type: "time",
  },
  { label: "Setor *", icon: <MdWork />, width: 217, id: "setor" },
];

function EncaminharPessoa() {
  const [formData, setFormData] = useState({
    username: "",
    beneficiarioId: "",
    beneficiarioNome: "",
    telefone: "",
    endereco: "",
    data: "",
    setor: "",
    horarioConsulta: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBeneficiarios, setFilteredBeneficiarios] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showHelp, setShowHelp] = useState(false); // Estado para controlar a exibição do modal de ajuda

  useEffect(() => {
    const fetchBeneficiarios = async () => {
      try {
        const response = await api.get("/Beneficiario");
        setBeneficiarios(response.data);
      } catch (err) {
        console.error("Erro ao buscar beneficiários:", err);
      }
    };
    fetchBeneficiarios();
  }, []);

  useEffect(() => {
    if (isSearching && searchTerm) {
      const results = beneficiarios.filter(
        (beneficiario) =>
          beneficiario.username
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          beneficiario.cpf
            .replace(/\D/g, "")
            .includes(searchTerm.replace(/\D/g, "")) ||
          beneficiario.nis.includes(searchTerm)
      );
      setFilteredBeneficiarios(results);
    } else {
      setFilteredBeneficiarios([]);
    }
  }, [searchTerm, beneficiarios, isSearching]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
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
      setIsSearching(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const payload = {
      username: formData.username,
      telefone: formData.telefone,
      endereco: formData.endereco,
      data: formData.data, // Formato ISO é enviado diretamente pelo input de tipo date
      setor: formData.setor,
      beneficiario: { id: formData.beneficiarioId },
      hora: formData.horarioConsulta,
    };

    if (formData.beneficiarioId) {
      payload.beneficiario = { id: formData.beneficiarioId };
    }
    console.log("Payload enviado:", payload);

    try {
      await api.post("/encaminhar", payload);
      setSuccess(true);
      setFormData({
        username: "",
        beneficiarioId: "",
        beneficiarioNome: "",
        telefone: "",
        endereco: "",
        data: "",
        setor: "",
        horarioConsulta: "",
      });
      setSearchTerm("");
    } catch (err) {
      console.error("Erro ao enviar dados:", err);
      setError(
        "Ocorreu um erro ao enviar os dados. Por favor, tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.background}>
        <form className={styles.formWrapper} onSubmit={handleSubmit}>
          <aside className={styles.sidebar}>
            <img
              loading="lazy"
              src={logoImage}
              alt="Logo da Secretaria"
              className={styles.logo}
            />
            <h2 className={styles.sidebarTitle}>
              Secretaria de Assistência Social de Quatiguá
            </h2>
          </aside>
          <div className={styles.formContent}>
            <h1 className={styles.formTitle}>Encaminhar</h1>

            <div className={styles.inputContainer} style={{ width: 412 }}>
              <label className={styles.label}>
                <MdPerson className={styles.icon} />
                Beneficiário
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleBeneficiarioSearchChange}
                  onFocus={() => setIsSearching(true)}
                  placeholder="Pesquise por Nome, CPF ou NIS"
                  className={styles.input}
                />
              </div>
              {isSearching && searchTerm && (
                <ul className={styles.beneficiarioList}>
                  {filteredBeneficiarios.length > 0 ? (
                    filteredBeneficiarios.map((beneficiario) => (
                      <li
                        key={beneficiario.id}
                        onClick={() => handleBeneficiarioSelect(beneficiario)}
                        className={styles.beneficiarioItem}
                      >
                        <div className={styles.beneficiarioInfo}>
                          <span className={styles.beneficiarioName}>
                            {beneficiario.username}
                          </span>
                          <span className={styles.beneficiarioDetails}>
                            {beneficiario.nis}
                          </span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className={styles.noResults}>
                      Nenhum beneficiário encontrado
                    </li>
                  )}
                </ul>
              )}
            </div>

            {formInputs.map((input) => (
              <FormInput
                key={input.id}
                label={input.label}
                icon={input.icon}
                width={input.width}
                type={input.type}
                id={input.id}
                value={formData[input.id]}
                onChange={handleChange}
              />
            ))}

            {error && <div className={styles.errorMessage}>{error}</div>}
            {success && (
              <div className={styles.successMessage}>
                O encaminhamento foi realizado com sucesso!
              </div>
            )}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>

            {/* Botão de ajuda */}
            <button
              type="button"
              className={styles.helpButton}
              onClick={() => setShowHelp(true)}
            >
              ?
            </button>

            {/* Botão de voltar */}
            <button
              type="button"
              className={styles.backButton}
              onClick={() => window.history.back()}
            >
              <MdArrowBack /> {/* Exibindo a seta de voltar */}
            </button>
          </div>
        </form>
      </main>

      {/* Modal de ajuda */}
      {showHelp && (
        <div className={styles.modalOverlay} onClick={() => setShowHelp(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Instruções para Encaminhar Pessoa</h2>
            <p>
              Preencha os campos abaixo para encaminhar uma pessoa corretamente.
            </p>
            <ol>
              <li>
                <b>Beneficiario:</b> Informe o nome do beneficiario que
                pertence, basta pesquisar pelo CPF ou CÓDIGO NIS para evitar
                ambiguidades.
              </li>
              <li>
                <b>Nome:</b> Informe o nome completo do beneficiário.
              </li>
              <li>
                <b>Telefone:</b> Informe o número de telefone do beneficiário.
              </li>
              <li>
                <b>Setor:</b> Selecione o setor relacionado ao beneficiário.
              </li>
            </ol>
            <button
              className={styles.closeHelpButton}
              onClick={() => setShowHelp(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EncaminharPessoa;
