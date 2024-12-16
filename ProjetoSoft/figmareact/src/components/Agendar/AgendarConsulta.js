import React, { useState } from "react";
import {
  MdAccessTime,
  MdDateRange,
  MdPerson,
  MdPhone,
  MdWork,
} from "react-icons/md";
import api from "../../api/api";
import styles from "./AgendarConsulta.module.css";
import FormInput from "./FormInput";
import Sidebar from "./SidebarButton"; // Importando Sidebar

const camposFormulario = [
  {
    label: "Nome *",
    icon: <MdPerson />,
    width: 412,
    id: "nome",
  },

  {
    label: "Telefone",
    icon: <MdPhone />,
    id: "telefone",
  },

  {
    label: "Setor *",
    icon: <MdWork />,
    id: "setor",
  },
  {
    label: "Data da Consulta *",
    icon: <MdDateRange />,
    id: "dataConsulta",
    type: "date",
  },
  {
    label: "Horário da Consulta *",
    icon: <MdAccessTime />,
    id: "horarioConsulta",
    type: "time",
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
  const [showHelp, setShowHelp] = useState(false);

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

    // Validação: verificar se a data da consulta já passou
    const today = new Date();
    const selectedDate = new Date(formData.dataConsulta);

    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      setLoading(false);
      setError("A data da consulta não pode ser uma data que já passou.");
      return;
    }

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

  const handleBackClick = () => {
    window.history.back();
  };

  const handleHelpClick = () => {
    setShowHelp(true);
  };

  return (
    <div className={styles.container}>
      <main className={styles.background}>
        <form className={styles.formWrapper} onSubmit={handleSubmit}>
          <Sidebar
            onBackClick={handleBackClick} // Passando a função para Sidebar
            onHelpClick={handleHelpClick}
          />
          <div className={styles.formContent}>
            <h1 className={styles.formTitle}>Agendar</h1>
            {camposFormulario.map((input, index) => (
              <FormInput
                key={index}
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
                O agendamento foi realizado com sucesso!
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

        {showHelp && (
          <div
            className={styles.modalOverlay}
            onClick={() => setShowHelp(false)}
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Instruções para Agendar Consulta</h2>
              <p>
                Nesta página, você pode agendar uma nova consulta preenchendo os
                campos obrigatórios abaixo. Certifique-se de seguir as
                instruções de preenchimento para garantir que os dados estejam
                corretos.
              </p>
              <ol>
                <li>
                  <b>Nome:</b> Informe o nome completo do usuário. Mínimo de
                  caracteres: 2, Máximo de caracteres: 50.
                </li>
                <li>
                  <b>Telefone:</b> Informe o telefone de contato do usuário.
                </li>
                <li>
                  <b>Setor:</b> Escolha ou insira o setor responsável pela
                  consulta.
                </li>
                <li>
                  <b>Data da Consulta:</b> Informe a data desejada no formato
                  DD/MM/AAAA.
                </li>
                <li>
                  <b>Horário da Consulta:</b> Insira o horário desejado no
                  formato HH:MM.
                </li>
                <li>
                  <b>Importante:</b> Verifique todos os campos antes de
                  confirmar o agendamento, todos são obrigatorios.
                </li>
              </ol>
              <button
                className={styles.closeButton}
                onClick={() => setShowHelp(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AgendarConsulta;
