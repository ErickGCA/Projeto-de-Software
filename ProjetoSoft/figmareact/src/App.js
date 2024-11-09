import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AgendarConsulta from "./components/Agendar/AgendarConsulta";
import GerenciarBeneficiado from "./components/Beneficiado/GerenciarBeneficiado";
import BeneficiosAssistente from "./components/Beneficio/BeneficiosAssistente";
import EncaminharPessoa from "./components/Encaminhar/EncaminharPessoa";
import Filiado from "./components/Filiado/BeneficiosAssistente";
import MenuHistorico from "./components/Historico/MenuHistorico";
import ConsultarHistoricoAgen from "./components/HistoricoConsultaAgendamento/ConsultarHistoricoAgen";
import HistoricoRMA from "./components/HistoricoRMA/HistoricoRMA";
import LoginPage from "./components/Login/LoginPage";
import MenuAssistente from "./components/MenuAssistente/MenuAssistente";
import MenuOutros from "./components/MenuOutros/MenuOutros";
import MenuSecretaria from "./components/MenuSecretaria/MenuSecretaria";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RelatorioAssistente from "./components/RelatorioAssistente/RelatorioAssistente";
import RequisicaoSecretaria from "./components/Requisicao/RequisicaoSecretaria";
import FormularioCRAS from "./components/RMA/FormularioCRAS";
import GerenciarUsuario from "./components/Usuario/GerenciarBeneficiado";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/menuassistente"
          element={
            <PrivateRoute>
              <MenuAssistente />
            </PrivateRoute>
          }
        />
        <Route path="/menusecretaria" element={<MenuSecretaria />} />
        <Route
          path="/encaminhar"
          element={
            <PrivateRoute>
              <EncaminharPessoa />
            </PrivateRoute>
          }
        />
        <Route
          path="/agendar"
          element={
            <PrivateRoute>
              <AgendarConsulta />
            </PrivateRoute>
          }
        />
        <Route
          path="/menuoutros"
          element={
            <PrivateRoute>
              <MenuOutros />
            </PrivateRoute>
          }
        />
        <Route
          path="/filiado"
          element={
            <PrivateRoute>
              <Filiado />
            </PrivateRoute>
          }
        />
        <Route
          path="/historico"
          element={
            <PrivateRoute>
              <MenuHistorico />
            </PrivateRoute>
          }
        />
        <Route
          path="/relatoriosecretaria"
          element={
            <PrivateRoute>
              <RelatorioAssistente />
            </PrivateRoute>
          }
        />
        <Route
          path="/gerenciarbeneficiario"
          element={
            <PrivateRoute>
              <GerenciarBeneficiado />
            </PrivateRoute>
          }
        />
        <Route
          path="/gerenciarusuario"
          element={
            <PrivateRoute>
              <GerenciarUsuario />
            </PrivateRoute>
          }
        />
        <Route
          path="/consultarhistoricoagen"
          element={
            <PrivateRoute>
              <ConsultarHistoricoAgen />
            </PrivateRoute>
          }
        />
        <Route
          path="/requisicaosecretaria"
          element={
            <PrivateRoute>
              <RequisicaoSecretaria />
            </PrivateRoute>
          }
        />
        <Route
          path="/rma"
          element={
            <PrivateRoute>
              <FormularioCRAS />
            </PrivateRoute>
          }
        />
        <Route
          path="/rmaa"
          element={
            <PrivateRoute>
              <HistoricoRMA />
            </PrivateRoute>
          }
        />
        <Route
          path="/beneficios"
          element={
            <PrivateRoute>
              <BeneficiosAssistente />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
