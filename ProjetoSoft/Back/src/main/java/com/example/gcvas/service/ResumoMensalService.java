package com.example.gcvas.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gcvas.models.Beneficiario;
import com.example.gcvas.models.ResumoMensal;
import com.example.gcvas.repositories.ResumoMensalRepository;

import jakarta.transaction.Transactional;

@Service
public class ResumoMensalService {

    private static final Logger logger = LoggerFactory.getLogger(ResumoMensalService.class);

    @Autowired
    private ResumoMensalRepository resumoMensalRepository;

    public ResumoMensal findByMes(String mes) {
        return resumoMensalRepository.findByMes(mes).orElse(null);
    }

    @Transactional
    public ResumoMensal createOrGetResumo(String mes) {
        Optional<ResumoMensal> optionalResumo = resumoMensalRepository.findByMes(mes);
        if (optionalResumo.isPresent()) {
            logger.info("ResumoMensal encontrado para o mês: {}", mes);
            return optionalResumo.get();
        } else {
            ResumoMensal newResumo = new ResumoMensal(mes);
            logger.info("Criando um novo ResumoMensal para o mês: {}", mes);
            return resumoMensalRepository.save(newResumo);
        }
    }

    @Transactional
    public ResumoMensal updateResumoMensal(ResumoMensal resumoMensal) {
        logger.info("Atualizando ResumoMensal: {}", resumoMensal);
        return resumoMensalRepository.save(resumoMensal);
    }

    public void deleteByMes(String mes) {
        Optional<ResumoMensal> resumoMensal = resumoMensalRepository.findByMes(mes);
        resumoMensal.ifPresent(r -> {
            logger.info("Deletando ResumoMensal para o mês: {}", mes);
            resumoMensalRepository.delete(r);
        });
    }

    public void incrementarResumo(ResumoMensal resumoMensal, Beneficiario beneficiario) {
        // Log do ResumoMensal antes da atualização

        logger.info("ResumoMensal antes de incrementar: {}", resumoMensal);

        // Log do Beneficiário
        logger.info("Incrementando ResumoMensal com os dados do beneficiário: {}", beneficiario);
        logger.info("Trabalho Infantil do Beneficiário: {}", beneficiario.getTrabalhoInfantil());

        // Incrementos
        // Incrementos
        resumoMensal.setTrabalhoInfantilTotal(
                resumoMensal.getTrabalhoInfantilTotal()
                        + (beneficiario.getTrabalhoInfantil() != null ? beneficiario.getTrabalhoInfantil() : 0));

        resumoMensal.setFamiliasPAIFTotal(
                resumoMensal.getFamiliasPAIFTotal()
                        + (beneficiario.getFamiliasPAIF() != null ? beneficiario.getFamiliasPAIF() : 0));

        resumoMensal.setNovasFamiliasPAIFTotal(
                resumoMensal.getNovasFamiliasPAIFTotal()
                        + (beneficiario.getNovasFamiliasPAIF() != null ? beneficiario.getNovasFamiliasPAIF() : 0));

        resumoMensal.setFamiliasExtremaPobrezaTotal(
                resumoMensal.getFamiliasExtremaPobrezaTotal()
                        + (beneficiario.getFamiliasExtremaPobreza() != null ? beneficiario.getFamiliasExtremaPobreza()
                                : 0));

        resumoMensal.setBolsaFamiliaTotal(
                resumoMensal.getBolsaFamiliaTotal()
                        + (beneficiario.getBolsaFamilia() != null ? beneficiario.getBolsaFamilia() : 0));

        resumoMensal.setDescumprimentoCondicionalidadesTotal(
                resumoMensal.getDescumprimentoCondicionalidadesTotal()
                        + (beneficiario.getDescumprimentoCondicionalidades() != null
                                ? beneficiario.getDescumprimentoCondicionalidades()
                                : 0));

        resumoMensal.setBpcTotal(
                resumoMensal.getBpcTotal()
                        + (beneficiario.getBpc() != null ? beneficiario.getBpc() : 0));

        resumoMensal.setAcolhimentoTotal(
                resumoMensal.getAcolhimentoTotal()
                        + (beneficiario.getAcolhimento() != null ? beneficiario.getAcolhimento() : 0));

        resumoMensal.setAtendimentosCRASTotal(
                resumoMensal.getAtendimentosCRASTotal()
                        + (beneficiario.getAtendimentosCRAS() != null ? beneficiario.getAtendimentosCRAS() : 0));

        resumoMensal.setCadastroUnicoTotal(
                resumoMensal.getCadastroUnicoTotal()
                        + (beneficiario.getCadastroUnico() != null ? beneficiario.getCadastroUnico() : 0));

        resumoMensal.setAtualizacaoCadastralTotal(
                resumoMensal.getAtualizacaoCadastralTotal()
                        + (beneficiario.getAtualizacaoCadastral() != null ? beneficiario.getAtualizacaoCadastral()
                                : 0));

        resumoMensal.setBpcIndividuosTotal(
                resumoMensal.getBpcIndividuosTotal()
                        + (beneficiario.getBpcIndividuos() != null ? beneficiario.getBpcIndividuos() : 0));

        resumoMensal.setCreasTotal(
                resumoMensal.getCreasTotal()
                        + (beneficiario.getCreas() != null ? beneficiario.getCreas() : 0));

        resumoMensal.setVisitasDomiciliaresTotal(
                resumoMensal.getVisitasDomiciliaresTotal()
                        + (beneficiario.getVisitasDomiciliares() != null ? beneficiario.getVisitasDomiciliares() : 0));

        resumoMensal.setAuxiliosNatalidadeTotal(
                resumoMensal.getAuxiliosNatalidadeTotal()
                        + (beneficiario.getAuxiliosNatalidade() != null ? beneficiario.getAuxiliosNatalidade() : 0));

        resumoMensal.setAuxiliosFuneralTotal(
                resumoMensal.getAuxiliosFuneralTotal()
                        + (beneficiario.getAuxiliosFuneral() != null ? beneficiario.getAuxiliosFuneral() : 0));

        resumoMensal.setOutrosBeneficiosTotal(
                resumoMensal.getOutrosBeneficiosTotal()
                        + (beneficiario.getOutrosBeneficios() != null ? beneficiario.getOutrosBeneficios() : 0));

        resumoMensal.setAtendimentosColetivosTotal(
                resumoMensal.getAtendimentosColetivosTotal()
                        + (beneficiario.getAtendimentosColetivos() != null ? beneficiario.getAtendimentosColetivos()
                                : 0));

        resumoMensal.setFamiliasParticipantesPAIFTotal(
                resumoMensal.getFamiliasParticipantesPAIFTotal()
                        + (beneficiario.getFamiliasParticipantesPAIF() != null
                                ? beneficiario.getFamiliasParticipantesPAIF()
                                : 0));

        resumoMensal.setCriancas06SCFVTotal(
                resumoMensal.getCriancas06SCFVTotal()
                        + (beneficiario.getCriancas06SCFV() != null ? beneficiario.getCriancas06SCFV() : 0));

        resumoMensal.setCriancas714SCFVTotal(
                resumoMensal.getCriancas714SCFVTotal()
                        + (beneficiario.getCriancas714SCFV() != null ? beneficiario.getCriancas714SCFV() : 0));

        resumoMensal.setAdolescentes1517SCFVTotal(
                resumoMensal.getAdolescentes1517SCFVTotal()
                        + (beneficiario.getAdolescentes1517SCFV() != null ? beneficiario.getAdolescentes1517SCFV()
                                : 0));

        resumoMensal.setAdultosSCFVTotal(
                resumoMensal.getAdultosSCFVTotal()
                        + (beneficiario.getAdultosSCFV() != null ? beneficiario.getAdultosSCFV() : 0));

        resumoMensal.setIdososSCFVTotal(
                resumoMensal.getIdososSCFVTotal()
                        + (beneficiario.getIdososSCFV() != null ? beneficiario.getIdososSCFV() : 0));

        resumoMensal.setPalestrasOficinasTotal(
                resumoMensal.getPalestrasOficinasTotal()
                        + (beneficiario.getPalestrasOficinas() != null ? beneficiario.getPalestrasOficinas() : 0));

        resumoMensal.setPessoasDeficienciaTotal(
                resumoMensal.getPessoasDeficienciaTotal()
                        + (beneficiario.getPessoasDeficiencia() != null ? beneficiario.getPessoasDeficiencia() : 0));

    }
}
