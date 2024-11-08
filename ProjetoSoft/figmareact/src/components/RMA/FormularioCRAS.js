import React, { useEffect, useState } from "react";
import api from "../../api/api"; // Importe seu cliente de API
import styles from "./FormularioCRAS.module.css";
import Sidebar from "./Sidebar";

const FormularioCRAS = () => {
  const [formData, setFormData] = useState({

    unidade: "",
    numeroUnidade: "",
    endereco: "",
    municipio: "",
    uf: "",
    mes: "",
    familiasPAIF: "",
    novasFamiliasPAIF: "",
    familiasExtremaPobreza: "",
    bolsaFamilia: "",
    descumprimentoCondicionalidades: "",
    bpc: "",
    trabalhoInfantil: "",
    acolhimento: "",
    atendimentosCRAS: "",
    cadastroUnico: "",
    atualizacaoCadastral: "",
    bpcIndividuos: "",
    creas: "",
    visitasDomiciliares: "",
    auxiliosNatalidade: "",
    auxiliosFuneral: "",
    outrosBeneficios: "",
    atendimentosColetivos: "",
    familiasParticipantesPAIF: "",
    criancas06SCFV: "",
    criancas714SCFV: "",
    adolescentes1517SCFV: "",
    adultosSCFV: "",
    idososSCFV: "",
    palestrasOficinas: "",
    pessoasDeficiencia: "",
  });

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    document.body.style.zoom = "80%";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/Rma", formData);
      console.log("Formulário enviado:", response.data);
      alert("Formulário enviado com sucesso!");
      // Limpa os dados do formulário
      setFormData({
        unidade: "",
        numeroUnidade: "",
        endereco: "",
        municipio: "",
        uf: "",
        mes: "",
        familiasPAIF: "",
        novasFamiliasPAIF: "",
        familiasExtremaPobreza: "",
        bolsaFamilia: "",
        descumprimentoCondicionalidades: "",
        bpc: "",
        trabalhoInfantil: "",
        acolhimento: "",
        atendimentosCRAS: "",
        cadastroUnico: "",
        atualizacaoCadastral: "",
        bpcIndividuos: "",
        creas: "",
        visitasDomiciliares: "",
        auxiliosNatalidade: "",
        auxiliosFuneral: "",
        outrosBeneficios: "",
        atendimentosColetivos: "",
        familiasParticipantesPAIF: "",
        criancas06SCFV: "",
        criancas714SCFV: "",
        adolescentes1517SCFV: "",
        adultosSCFV: "",
        idososSCFV: "",
        palestrasOficinas: "",
        pessoasDeficiencia: "",
      });
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      alert("Erro ao enviar o formulário!");
    }
    
    if (!formData.mes) {
      alert("Por favor, selecione um mês.");
      return;
    }
    
  };

  

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <div className={styles.content}>
          <div className={styles.column}>
            <Sidebar />
          </div>
          <div className={styles.column}>
            <form className={styles.formularioCras} onSubmit={handleSubmit}>
              <h2>Formulário de Registro Mensal de Atendimentos do CRAS</h2>

              <div className={styles.inputGroup}>
                <label>Nome da Unidade:</label>
                <input
                  type="text"
                  name="unidade"
                  value={formData.unidade}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Nº da Unidade:</label>
                <input
                  type="text"
                  name="numeroUnidade"
                  value={formData.numeroUnidade}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Endereço:</label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Município:</label>
                <input
                  type="text"
                  name="municipio"
                  value={formData.municipio}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>UF:</label>
                <input
                  type="text"
                  name="uf"
                  value={formData.uf}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Mês:</label>
                <select name="mes" value={formData.mes} onChange={handleChange}>
                  <option value="">Selecione o mês</option>
                  {meses.map((mes, index) => (
                    <option key={index} value={mes}>
                      {mes}
                    </option>
                  ))}
                </select>
              </div>

              <h3>Bloco 1 - Famílias em acompanhamento pelo PAIF</h3>

              <div className={styles.inputGroup}>
                <label>Total de famílias em acompanhamento pelo PAIF:</label>
                <input
                  type="number"
                  name="familiasPAIF"
                  value={formData.familiasPAIF}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Novas famílias inseridas no acompanhamento:</label>
                <input
                  type="number"
                  name="novasFamiliasPAIF"
                  value={formData.novasFamiliasPAIF}
                  onChange={handleChange}
                />
              </div>

              <h3>Perfil das novas famílias</h3>

              <div className={styles.inputGroup}>
                <label>Famílias em situação de extrema pobreza:</label>
                <input
                  type="number"
                  name="familiasExtremaPobreza"
                  value={formData.familiasExtremaPobreza}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Famílias beneficiárias do Bolsa Família:</label>
                <input
                  type="number"
                  name="bolsaFamilia"
                  value={formData.bolsaFamilia}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Famílias em descumprimento de condicionalidades:</label>
                <input
                  type="number"
                  name="descumprimentoCondicionalidades"
                  value={formData.descumprimentoCondicionalidades}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Famílias com membros beneficiários do BPC:</label>
                <input
                  type="number"
                  name="bpc"
                  value={formData.bpc}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>
                  Famílias com crianças ou adolescentes em trabalho infantil:
                </label>
                <input
                  type="number"
                  name="trabalhoInfantil"
                  value={formData.trabalhoInfantil}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>
                  Famílias com crianças ou adolescentes em acolhimento:
                </label>
                <input
                  type="number"
                  name="acolhimento"
                  value={formData.acolhimento}
                  onChange={handleChange}
                />
              </div>

              <h3>Bloco 2 - Atendimentos Particularizados</h3>

              <div className={styles.inputGroup}>
                <label>Total de atendimentos no mês de referência:</label>
                <input
                  type="number"
                  name="atendimentosCRAS"
                  value={formData.atendimentosCRAS}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>
                  Famílias encaminhadas para inclusão no Cadastro Único:
                </label>
                <input
                  type="number"
                  name="cadastroUnico"
                  value={formData.cadastroUnico}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Famílias encaminhadas para atualização cadastral:</label>
                <input
                  type="number"
                  name="atualizacaoCadastral"
                  value={formData.atualizacaoCadastral}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Indivíduos encaminhados para acesso ao BPC:</label>
                <input
                  type="number"
                  name="bpcIndividuos"
                  value={formData.bpcIndividuos}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Famílias encaminhadas para o CREAS:</label>
                <input
                  type="number"
                  name="creas"
                  value={formData.creas}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Visitas domiciliares realizadas:</label>
                <input
                  type="number"
                  name="visitasDomiciliares"
                  value={formData.visitasDomiciliares}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Auxílios-natalidade concedidos/entregues:</label>
                <input
                  type="number"
                  name="auxiliosNatalidade"
                  value={formData.auxiliosNatalidade}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Auxílios-funeral concedidos/entregues:</label>
                <input
                  type="number"
                  name="auxiliosFuneral"
                  value={formData.auxiliosFuneral}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Outros benefícios eventuais concedidos/entregues:</label>
                <input
                  type="number"
                  name="outrosBeneficios"
                  value={formData.outrosBeneficios}
                  onChange={handleChange}
                />
              </div>

              <h3>Bloco 3 - Atendimentos Coletivos</h3>

              <div className={styles.inputGroup}>
                <label>Total de atendimentos coletivos realizados:</label>
                <input
                  type="number"
                  name="atendimentosColetivos"
                  value={formData.atendimentosColetivos}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Famílias participando de grupos PAIF:</label>
                <input
                  type="number"
                  name="familiasParticipantesPAIF"
                  value={formData.familiasParticipantesPAIF}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Crianças de 0 a 6 anos em SCFV:</label>
                <input
                  type="number"
                  name="criancas06SCFV"
                  value={formData.criancas06SCFV}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Crianças de 7 a 14 anos em SCFV:</label>
                <input
                  type="number"
                  name="criancas714SCFV"
                  value={formData.criancas714SCFV}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Adolescentes de 15 a 17 anos em SCFV:</label>
                <input
                  type="number"
                  name="adolescentes1517SCFV"
                  value={formData.adolescentes1517SCFV}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Adultos em SCFV:</label>
                <input
                  type="number"
                  name="adultosSCFV"
                  value={formData.adultosSCFV}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Idosos em SCFV:</label>
                <input
                  type="number"
                  name="idososSCFV"
                  value={formData.idososSCFV}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Palestras e oficinas realizadas:</label>
                <input
                  type="number"
                  name="palestrasOficinas"
                  value={formData.palestrasOficinas}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Pessoas com deficiência atendidas:</label>
                <input
                  type="number"
                  name="pessoasDeficiencia"
                  value={formData.pessoasDeficiencia}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FormularioCRAS;
