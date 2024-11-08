import React, { useState } from "react";
import api from "../../api/api"; // Importe o seu cliente de API
import logoImage from "../images/logo (1).png"; // Ajuste o caminho conforme sua estrutura
import styles from "./AgendarConsulta.module.css";
import FormInput from "./FormInput";

const camposFormulario = [
  {
    label: "Nome",
    width: 412,
    id: "nome",
    placeholder: "Digite o nome completo",
  },
  {
    label: "CPF",
    id: "cpf",
    placeholder: "Digite o CPF",
  },
  {
    label: "Telefone",
    id: "telefone",
    placeholder: "Digite o telefone",
  },
  {
    label: "Endereço",
    id: "endereco",
    placeholder: "Digite o endereço",
  },
  {
    label: "Data de Nascimento",
    id: "dataNascimento",
    type: "date",
    placeholder: "Selecione a data de nascimento",
  },
  {
    label: "Setor",
    id: "setor",
    placeholder: "Digite o setor",
  },
  {
    label: "Data da Consulta",
    id: "dataConsulta",
    type: "date",
    placeholder: "Selecione a data da consulta",
  },
  {
    label: "Horário da Consulta",
    id: "horarioConsulta",
    type: "time",
    placeholder: "Selecione o horário da consulta",
  },
];

function AgendarConsulta() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    endereco: "",
    dataNascimento: "",
    setor: "",
    dataConsulta: "",
    horarioConsulta: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const payload = {
      username: formData.nome,
      cpf: formData.cpf,
      telefone: formData.telefone,
      endereco: formData.endereco,
      data: formData.dataNascimento,
      setor: formData.setor,
      dataconsu: formData.dataConsulta,
      hora: formData.horarioConsulta,
    };

    try {
      const response = await api.post("/agendar", payload);
      console.log("Dados enviados com sucesso:", response.data);
      setSuccess(true);
      setFormData({
        nome: "",
        cpf: "",
        telefone: "",
        endereco: "",
        dataNascimento: "",
        setor: "",
        dataConsulta: "",
        horarioConsulta: "",
      });
    } catch (err) {
      console.error("Erro ao enviar dados:", err);
      setError(
        err.response?.data?.message ||
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
            <h1 className={styles.formTitle}>Agendar</h1>
            {camposFormulario.map((input, index) => (
              <FormInput
                key={index}
                label={input.label}
                type={input.type}
                id={input.id}
                value={formData[input.id]}
                onChange={handleChange}
                placeholder={input.placeholder}
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

export default AgendarConsulta;
