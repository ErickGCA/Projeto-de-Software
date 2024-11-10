import React, { useEffect, useState } from "react";
import {
  MdDateRange,
  MdLocationOn,
  MdPerson,
  MdPhone,
  MdWork,
} from "react-icons/md";
import api from "../../api/api";
import logoImage from "../images/logo (1).png";
import styles from "./EncaminharPessoa.module.css";
import FormInput from "./FormInput";

const formInputs = [
  { label: "Nome", icon: <MdPerson />, width: 412, id: "username" },
  { label: "CPF", icon: <MdPerson />, width: 217, id: "cpf" },
  { label: "Telefone", icon: <MdPhone />, width: 217, id: "telefone" },
  { label: "Endereço", icon: <MdLocationOn />, width: 412, id: "endereco" },
  {
    label: "Data de Nascimento",
    icon: <MdDateRange />,
    width: 217,
    id: "data",
    type: "date",
  },
  { label: "Setor", icon: <MdWork />, width: 217, id: "setor" },
];

function EncaminharPessoa() {
  const [formData, setFormData] = useState({
    username: "",
    beneficiarioId: "",
    beneficiarioNome: "",
    cpf: "",
    telefone: "",
    endereco: "",
    data: "",
    setor: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBeneficiarios, setFilteredBeneficiarios] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

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
      cpf: formData.cpf,
      telefone: formData.telefone,
      endereco: formData.endereco,
      data: formData.data,
      setor: formData.setor,
      beneficiario: { id: formData.beneficiarioId },
    };

    try {
      await api.post("/encaminhar", payload);
      setSuccess(true);
      setFormData({
        username: "",
        beneficiarioId: "",
        beneficiarioNome: "",
        cpf: "",
        telefone: "",
        endereco: "",
        data: "",
        setor: "",
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

  const formatCPF = (cpf) =>
    cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

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
                            CPF: {formatCPF(beneficiario.cpf)} | NIS:{" "}
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
                Dados enviados com sucesso!
              </div>
            )}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EncaminharPessoa;
