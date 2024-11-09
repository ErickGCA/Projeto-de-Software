// HistoricoList.jsx
import axios from "axios";
import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import FormularioCRAS2 from "./FormularioCRAS2";

axios.defaults.baseURL = "http://localhost:8080"; // Define a URL base

const HistoricoList = () => {
  const [showForm, setShowForm] = useState(false);
  const [mesAtual, setMesAtual] = useState("");
  const [dadosFormulario, setDadosFormulario] = useState(null);
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();

  const mapMesToNome = {
    "01": "JANEIRO",
    "02": "FEVEREIRO",
    "03": "MARÇO",
    "04": "ABRIL",
    "05": "MAIO",
    "06": "JUNHO",
    "07": "JULHO",
    "08": "AGOSTO",
    "09": "SETEMBRO",
    10: "OUTUBRO",
    11: "NOVEMBRO",
    12: "DEZEMBRO",
  };

  const buscarDadosMes = async (mes) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/Beneficiario/mes/${mes}`
      );
      const dados = calcularTotais(response.data);
      setDadosFormulario(dados);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const calcularTotais = (beneficiarios) => {
    if (!beneficiarios || beneficiarios.length === 0) return null;

    const totais = {
      mes: beneficiarios[0].mes,
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
    };

    beneficiarios.forEach((beneficiario) => {
      Object.keys(totais).forEach((key) => {
        if (key !== "mes" && beneficiario[key] !== undefined) {
          totais[key] += beneficiario[key];
        }
      });
    });

    return totais;
  };

  const handleMesChange = (event) => {
    const mes = event.target.value;
    setMesAtual(mes);
    if (mes) {
      const mesNome = mapMesToNome[mes];
      buscarDadosMes(mesNome);
    }
  };

  const handlePrint = () => {
    const content = componentRef.current;
    if (!content) {
      console.error("Erro: conteúdo não encontrado para impressão.");
      return;
    }

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Formulário CRAS</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; }
            @media print {
              body { width: 21cm; height: 29.7cm; margin: 0; padding: 1cm; }
            }
          </style>
        </head>
        <body>
          ${content.outerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <select
          value={mesAtual}
          onChange={handleMesChange}
          className="mb-2 mr-2 p-2 border rounded"
        >
          <option value="">Selecione o mês</option>
          <option value="01">Janeiro</option>
          <option value="02">Fevereiro</option>
          <option value="03">Março</option>
          <option value="04">Abril</option>
          <option value="05">Maio</option>
          <option value="06">Junho</option>
          <option value="07">Julho</option>
          <option value="08">Agosto</option>
          <option value="09">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>
        </select>

        <Button onClick={() => setShowForm(!showForm)} className="mr-2">
          {showForm ? "Voltar" : "Gerar Formulário"}
        </Button>

        {showForm && (
          <Button onClick={handlePrint} className="ml-2">
            Imprimir
          </Button>
        )}
      </div>

      {loading ? (
        <div>Carregando dados...</div>
      ) : (
        showForm &&
        dadosFormulario && (
          <FormularioCRAS2 ref={componentRef} dados={dadosFormulario} />
        )
      )}
    </div>
  );
};

export default HistoricoList;
