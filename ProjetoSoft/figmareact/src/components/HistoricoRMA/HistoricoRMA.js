import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api"; // Importando o módulo api
import styles from "./HistoricoRMA.module.css";
import Sidebar from "./Sidebar";

const HistoricoRMA = () => {
  const [mes, setMes] = useState("");
  const [historico, setHistorico] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const meses = [
    "JANEIRO",
    "FEVEREIRO",
    "MARCO",
    "ABRIL",
    "MAIO",
    "JUNHO",
    "JULHO",
    "AGOSTO",
    "SETEMBRO",
    "OUTUBRO",
    "NOVEMBRO",
    "DEZEMBRO",
  ];

  const handleFetchHistorico = async () => {
    if (!mes) {
      setError("Por favor, selecione um mês.");
      return;
    }

    try {
      // Enviando o mês selecionado para o backend
      console.log("Mes selecionado:", mes);
      const response = await api.get(`/resumo/${mes}`);
      console.log("Resposta da API:", response.data);
      setHistorico(response.data ? [response.data] : []); // Espera-se que data tenha o resumo do mês
      setError(null); // Limpa o erro se a chamada for bem-sucedida
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
      setHistorico([]); // Limpa o histórico em caso de erro
    }
  };

  const handleEdit = (id) => {
    navigate(`/editarRMA/${id}`);
  };

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <div className={styles.content}>
          <div className={styles.column}>
            <Sidebar />
          </div>
          <div className={styles.column}>
            <h2>Historico RMA</h2>

            <div className={styles.inputGroup}>
              <label htmlFor="mesSelect">Escolha o mês:</label>
              <select
                id="mesSelect"
                value={mes}
                onChange={(e) => setMes(e.target.value)}
              >
                <option value="">Selecione um mês</option>
                {meses.map((m, index) => (
                  <option key={index} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <button onClick={handleFetchHistorico}>Buscar Histórico</button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.dataRows}>
              {historico.map((item) => (
                <div className={styles.row} key={item.id}>
                  <div className={styles.inputGroup}>
                    <label>Nome da Unidade:</label>
                    <span>{item.unidade}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Nº da Unidade:</label>
                    <span>{item.numeroUnidade}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Endereço:</label>
                    <span>{item.endereco}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Município:</label>
                    <span>{item.municipio}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>UF:</label>
                    <span>{item.uf}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Mês:</label>
                    <span>{item.mes}</span>
                  </div>

                  <h3>Bloco 1 - Famílias em acompanhamento pelo PAIF</h3>

                  <div className={styles.inputGroup}>
                    <label>
                      Total de famílias em acompanhamento pelo PAIF:
                    </label>
                    <span>{item.familiasPAIFTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Novas famílias inseridas no acompanhamento:</label>
                    <span>{item.novasFamiliasPAIFTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Famílias em situação de extrema pobreza:</label>
                    <span>{item.familiasExtremaPobrezaTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Famílias beneficiárias do Bolsa Família:</label>
                    <span>{item.bolsaFamiliaTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>
                      Famílias em descumprimento de condicionalidades:
                    </label>
                    <span>{item.descumprimentoCondicionalidadesTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Famílias com membros beneficiários do BPC:</label>
                    <span>{item.bpcTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>
                      Famílias com crianças ou adolescentes em trabalho
                      infantil:
                    </label>
                    <span>{item.trabalhoInfantilTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>
                      Famílias com crianças ou adolescentes em acolhimento:
                    </label>
                    <span>{item.acolhimentoTotal}</span>
                  </div>
                  <h3>Bloco 2 - Atendimentos Particularizados</h3>
                  <div className={styles.inputGroup}>
                    <label>Total de atendimentos no mês de referência:</label>
                    <span>{item.atendimentosCRASTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>
                      Famílias encaminhadas para inclusão no Cadastro Único:
                    </label>
                    <span>{item.cadastroUnicoTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>
                      Famílias encaminhadas para atualização cadastral:
                    </label>
                    <span>{item.atualizacaoCadastralTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Indivíduos encaminhados para acesso ao BPC:</label>
                    <span>{item.bpcIndividuosTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Famílias encaminhadas para o CREAS:</label>
                    <span>{item.creasTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Visitas domiciliares realizadas:</label>
                    <span>{item.visitasDomiciliaresTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Auxílios-natalidade concedidos/entregues:</label>
                    <span>{item.auxiliosNatalidadeTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Auxílios-funeral concedidos/entregues:</label>
                    <span>{item.auxiliosFuneralTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>
                      Outros benefícios eventuais concedidos/entregues:
                    </label>
                    <span>{item.outrosBeneficiosTotal}</span>
                  </div>
                  <h3>Bloco 3 - Atendimentos Coletivos</h3>
                  <div className={styles.inputGroup}>
                    <label>Total de atendimentos coletivos realizados:</label>
                    <span>{item.atendimentosColetivosTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Famílias participando de grupos PAIF:</label>
                    <span>{item.familiasParticipantesPAIFTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Crianças de 0 a 6 anos em SCFV:</label>
                    <span>{item.criancas06SCFVTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Crianças de 7 a 14 anos em SCFV:</label>
                    <span>{item.criancas714SCFVTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Adolescentes de 15 a 17 anos em SCFV:</label>
                    <span>{item.adolescentes1517SCFVTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Adultos em SCFV:</label>
                    <span>{item.adultosSCFVTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Idosos em SCFV:</label>
                    <span>{item.idososSCFVTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Palestras e oficinas realizadas:</label>
                    <span>{item.palestrasOficinasTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Pessoas com deficiência atendidas:</label>
                    <span>{item.pessoasDeficienciaTotal}</span>
                  </div>

                  <div className={styles.inputGroup}>
                    <button onClick={() => handleEdit(item.id)}>Editar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HistoricoRMA;
