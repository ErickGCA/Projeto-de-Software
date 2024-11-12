package com.example.gcvas.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gcvas.models.Beneficiario;
import com.example.gcvas.models.Categoria;
import com.example.gcvas.models.ResumoMensal;
import com.example.gcvas.repositories.BeneficiarioRepository;
import com.example.gcvas.repositories.CategoriaRepository;
import com.example.gcvas.repositories.ResumoMensalRepository;

import jakarta.transaction.Transactional;

@Service
public class BeneficiarioService {

        @Autowired
        BeneficiarioRepository beneficiarioRepository;

        @Autowired
        private ResumoMensalService resumoMensalService;

        @Autowired
        CategoriaRepository categoriaRepository; // Adicionando a injeção da categoria

        @Autowired
        ResumoMensalRepository resumoMensalRepository; // Adicionando o repositório para ResumoMensal

        public List<Beneficiario> findAll() {
                return beneficiarioRepository.findAll();
        }

        public List<Beneficiario> findByCategoria(Long categoriaId) {
                return beneficiarioRepository.findByCategoriaId(categoriaId);
        }

        public Beneficiario findByid(Long id) {
                Optional<Beneficiario> obj = this.beneficiarioRepository.findById(id);

                if (obj.isPresent()) {
                        return obj.get();
                }
                throw new RuntimeException("Beneficiário não encontrado {id:" + id + "} ");
        }

        private static final Map<String, String> MES_MAPA = new HashMap<>();

        static {
                MES_MAPA.put("JANEIRO", "JANUARY");
                MES_MAPA.put("fevereiro", "February");
                MES_MAPA.put("março", "March");
                MES_MAPA.put("abril", "April");
                MES_MAPA.put("maio", "May");
                MES_MAPA.put("junho", "June");
                MES_MAPA.put("julho", "July");
                MES_MAPA.put("agosto", "August");
                MES_MAPA.put("setembro", "September");
                MES_MAPA.put("OUTUBRO", "OCTOBER");
                MES_MAPA.put("novembro", "November");
                MES_MAPA.put("dezembro", "December");
        }

        private String traduzirMesParaIngles(String mes) {
                return MES_MAPA.getOrDefault(mes.toLowerCase(), mes);
        }

        public List<Beneficiario> findByMes(String mes) {
                String mesIngles = traduzirMesParaIngles(mes);
                return beneficiarioRepository.findByMes(mesIngles);
        }

        @Transactional
        public Beneficiario create(Beneficiario obj) {
                obj.setMes(traduzirMesParaIngles(obj.getMes()));
                obj.setId(null);

                // Verifica se foi informada uma categoria
                if (obj.getCategoria() != null && obj.getCategoria().getId() != null) {
                        Categoria categoria = categoriaRepository.findById(obj.getCategoria().getId())
                                        .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
                        obj.setCategoria(categoria);
                }

                Beneficiario savedBeneficiario = this.beneficiarioRepository.save(obj);
                atualizarResumoMensal(savedBeneficiario);

                return savedBeneficiario;
        }

        @Transactional
        public Beneficiario update(Beneficiario newObj) {
                try {
                        // Atualiza o mês do novo objeto antes de qualquer operação
                        newObj.setMes(traduzirMesParaIngles(newObj.getMes()));

                        // Buscar o beneficiário original
                        Beneficiario oldObj = this.findByid(newObj.getId());
                        if (oldObj == null) {
                                throw new RuntimeException("Beneficiário não encontrado");
                        }

                        // Se o mês mudou, precisamos atualizar dois resumos
                        if (!oldObj.getMes().equals(newObj.getMes())) {
                                // Subtrai do resumo antigo
                                ResumoMensal oldResumo = resumoMensalService.createOrGetResumo(oldObj.getMes());
                                decrementarResumo(oldResumo, oldObj);

                                // Adiciona ao novo resumo
                                ResumoMensal newResumo = resumoMensalService.createOrGetResumo(newObj.getMes());
                                incrementarResumo(newResumo, newObj);
                        } else {
                                // Mesmo mês, apenas atualiza a diferença
                                ResumoMensal resumo = resumoMensalService.createOrGetResumo(newObj.getMes());
                                atualizarDiferencaResumo(resumo, oldObj, newObj);
                        }

                        // Atualiza os campos do beneficiário
                        atualizarCamposBeneficiario(oldObj, newObj);

                        // Salva as alterações
                        return beneficiarioRepository.save(oldObj);
                } catch (Exception e) {
                        e.printStackTrace();
                        throw new RuntimeException("Erro ao atualizar Beneficiário", e);
                }
        }

        private void atualizarCamposBeneficiario(Beneficiario oldObj, Beneficiario newObj) {
                oldObj.setNis(newObj.getNis());
                oldObj.setUsername(newObj.getUsername());
                oldObj.setEndereco(newObj.getEndereco());
                oldObj.setCpf(newObj.getCpf());
                oldObj.setTelefone(newObj.getTelefone());
                oldObj.setMes(newObj.getMes());
                oldObj.setFamiliasPAIF(newObj.getFamiliasPAIF());
                oldObj.setNovasFamiliasPAIF(newObj.getNovasFamiliasPAIF());
                oldObj.setFamiliasExtremaPobreza(newObj.getFamiliasExtremaPobreza());
                oldObj.setBolsaFamilia(newObj.getBolsaFamilia());
                oldObj.setDescumprimentoCondicionalidades(newObj.getDescumprimentoCondicionalidades());
                oldObj.setBpc(newObj.getBpc());
                oldObj.setTrabalhoInfantil(newObj.getTrabalhoInfantil());
                oldObj.setAcolhimento(newObj.getAcolhimento());
                oldObj.setAtendimentosCRAS(newObj.getAtendimentosCRAS());
                oldObj.setCadastroUnico(newObj.getCadastroUnico());
                oldObj.setAtualizacaoCadastral(newObj.getAtualizacaoCadastral());
                oldObj.setBpcIndividuos(newObj.getBpcIndividuos());
                oldObj.setCreas(newObj.getCreas());
                oldObj.setVisitasDomiciliares(newObj.getVisitasDomiciliares());
                oldObj.setAuxiliosNatalidade(newObj.getAuxiliosNatalidade());
                oldObj.setAuxiliosFuneral(newObj.getAuxiliosFuneral());
                oldObj.setOutrosBeneficios(newObj.getOutrosBeneficios());
                oldObj.setFamiliasParticipantesPAIF(newObj.getFamiliasParticipantesPAIF());
                oldObj.setCriancas06SCFV(newObj.getCriancas06SCFV());
                oldObj.setCriancas714SCFV(newObj.getCriancas714SCFV());
                oldObj.setAdolescentes1517SCFV(newObj.getAdolescentes1517SCFV());
                oldObj.setAdultosSCFV(newObj.getAdultosSCFV());
                oldObj.setIdososSCFV(newObj.getIdososSCFV());
                oldObj.setPalestrasOficinas(newObj.getPalestrasOficinas());
                oldObj.setPessoasDeficiencia(newObj.getPessoasDeficiencia());
        }

        private void atualizarDiferencaResumo(ResumoMensal resumo, Beneficiario oldObj, Beneficiario newObj) {
                // Atualiza cada campo com a diferença entre o novo e o antigo valor
                resumo.setTrabalhoInfantilTotal(resumo.getTrabalhoInfantilTotal() - oldObj.getTrabalhoInfantil()
                                + newObj.getTrabalhoInfantil());
                resumo.setFamiliasPAIFTotal(
                                resumo.getFamiliasPAIFTotal() - oldObj.getFamiliasPAIF() + newObj.getFamiliasPAIF());
                resumo.setNovasFamiliasPAIFTotal(resumo.getNovasFamiliasPAIFTotal() - oldObj.getNovasFamiliasPAIF()
                                + newObj.getNovasFamiliasPAIF());
                resumo.setFamiliasExtremaPobrezaTotal(resumo.getFamiliasExtremaPobrezaTotal()
                                - oldObj.getFamiliasExtremaPobreza() + newObj.getFamiliasExtremaPobreza());
                resumo.setBolsaFamiliaTotal(
                                resumo.getBolsaFamiliaTotal() - oldObj.getBolsaFamilia() + newObj.getBolsaFamilia());
                resumo.setDescumprimentoCondicionalidadesTotal(resumo.getDescumprimentoCondicionalidadesTotal()
                                - oldObj.getDescumprimentoCondicionalidades()
                                + newObj.getDescumprimentoCondicionalidades());
                resumo.setBpcTotal(resumo.getBpcTotal() - oldObj.getBpc() + newObj.getBpc());
                resumo.setAcolhimentoTotal(
                                resumo.getAcolhimentoTotal() - oldObj.getAcolhimento() + newObj.getAcolhimento());
                resumo.setAtendimentosCRASTotal(resumo.getAtendimentosCRASTotal() - oldObj.getAtendimentosCRAS()
                                + newObj.getAtendimentosCRAS());
                resumo.setCadastroUnicoTotal(
                                resumo.getCadastroUnicoTotal() - oldObj.getCadastroUnico() + newObj.getCadastroUnico());
                resumo.setAtualizacaoCadastralTotal(resumo.getAtualizacaoCadastralTotal()
                                - oldObj.getAtualizacaoCadastral() + newObj.getAtualizacaoCadastral());
                resumo.setBpcIndividuosTotal(
                                resumo.getBpcIndividuosTotal() - oldObj.getBpcIndividuos() + newObj.getBpcIndividuos());
                resumo.setCreasTotal(resumo.getCreasTotal() - oldObj.getCreas() + newObj.getCreas());
                resumo.setVisitasDomiciliaresTotal(resumo.getVisitasDomiciliaresTotal()
                                - oldObj.getVisitasDomiciliares() + newObj.getVisitasDomiciliares());
                resumo.setAuxiliosNatalidadeTotal(resumo.getAuxiliosNatalidadeTotal() - oldObj.getAuxiliosNatalidade()
                                + newObj.getAuxiliosNatalidade());
                resumo.setAuxiliosFuneralTotal(resumo.getAuxiliosFuneralTotal() - oldObj.getAuxiliosFuneral()
                                + newObj.getAuxiliosFuneral());
                resumo.setOutrosBeneficiosTotal(resumo.getOutrosBeneficiosTotal() - oldObj.getOutrosBeneficios()
                                + newObj.getOutrosBeneficios());
                resumo.setFamiliasParticipantesPAIFTotal(resumo.getFamiliasParticipantesPAIFTotal()
                                - oldObj.getFamiliasParticipantesPAIF() + newObj.getFamiliasParticipantesPAIF());
                resumo.setCriancas06SCFVTotal(resumo.getCriancas06SCFVTotal() - oldObj.getCriancas06SCFV()
                                + newObj.getCriancas06SCFV());
                resumo.setCriancas714SCFVTotal(resumo.getCriancas714SCFVTotal() - oldObj.getCriancas714SCFV()
                                + newObj.getCriancas714SCFV());
                resumo.setAdolescentes1517SCFVTotal(resumo.getAdolescentes1517SCFVTotal()
                                - oldObj.getAdolescentes1517SCFV() + newObj.getAdolescentes1517SCFV());
                resumo.setAdultosSCFVTotal(
                                resumo.getAdultosSCFVTotal() - oldObj.getAdultosSCFV() + newObj.getAdultosSCFV());
                resumo.setIdososSCFVTotal(
                                resumo.getIdososSCFVTotal() - oldObj.getIdososSCFV() + newObj.getIdososSCFV());
                resumo.setPalestrasOficinasTotal(resumo.getPalestrasOficinasTotal() - oldObj.getPalestrasOficinas()
                                + newObj.getPalestrasOficinas());
                resumo.setPessoasDeficienciaTotal(resumo.getPessoasDeficienciaTotal() - oldObj.getPessoasDeficiencia()
                                + newObj.getPessoasDeficiencia());

                resumoMensalService.updateResumoMensal(resumo);
        }

        private void decrementarResumo(ResumoMensal resumo, Beneficiario obj) {
                resumo.setTrabalhoInfantilTotal(resumo.getTrabalhoInfantilTotal() - obj.getTrabalhoInfantil());
                resumo.setFamiliasPAIFTotal(resumo.getFamiliasPAIFTotal() - obj.getFamiliasPAIF());
                resumo.setNovasFamiliasPAIFTotal(resumo.getNovasFamiliasPAIFTotal() - obj.getNovasFamiliasPAIF());
                resumo.setFamiliasExtremaPobrezaTotal(
                                resumo.getFamiliasExtremaPobrezaTotal() - obj.getFamiliasExtremaPobreza());
                resumo.setBolsaFamiliaTotal(resumo.getBolsaFamiliaTotal() - obj.getBolsaFamilia());
                resumo.setDescumprimentoCondicionalidadesTotal(resumo.getDescumprimentoCondicionalidadesTotal()
                                - obj.getDescumprimentoCondicionalidades());
                resumo.setBpcTotal(resumo.getBpcTotal() - obj.getBpc());
                resumo.setAcolhimentoTotal(resumo.getAcolhimentoTotal() - obj.getAcolhimento());
                resumo.setAtendimentosCRASTotal(resumo.getAtendimentosCRASTotal() - obj.getAtendimentosCRAS());
                resumo.setCadastroUnicoTotal(resumo.getCadastroUnicoTotal() - obj.getCadastroUnico());
                resumo.setAtualizacaoCadastralTotal(
                                resumo.getAtualizacaoCadastralTotal() - obj.getAtualizacaoCadastral());
                resumo.setBpcIndividuosTotal(resumo.getBpcIndividuosTotal() - obj.getBpcIndividuos());
                resumo.setCreasTotal(resumo.getCreasTotal() - obj.getCreas());
                resumo.setVisitasDomiciliaresTotal(resumo.getVisitasDomiciliaresTotal() - obj.getVisitasDomiciliares());
                resumo.setAuxiliosNatalidadeTotal(resumo.getAuxiliosNatalidadeTotal() - obj.getAuxiliosNatalidade());
                resumo.setAuxiliosFuneralTotal(resumo.getAuxiliosFuneralTotal() - obj.getAuxiliosFuneral());
                resumo.setOutrosBeneficiosTotal(resumo.getOutrosBeneficiosTotal() - obj.getOutrosBeneficios());
                resumo.setFamiliasParticipantesPAIFTotal(
                                resumo.getFamiliasParticipantesPAIFTotal() - obj.getFamiliasParticipantesPAIF());
                resumo.setCriancas06SCFVTotal(resumo.getCriancas06SCFVTotal() - obj.getCriancas06SCFV());
                resumo.setCriancas714SCFVTotal(resumo.getCriancas714SCFVTotal() - obj.getCriancas714SCFV());
                resumo.setAdolescentes1517SCFVTotal(
                                resumo.getAdolescentes1517SCFVTotal() - obj.getAdolescentes1517SCFV());
                resumo.setAdultosSCFVTotal(resumo.getAdultosSCFVTotal() - obj.getAdultosSCFV());
                resumo.setIdososSCFVTotal(resumo.getIdososSCFVTotal() - obj.getIdososSCFV());
                resumo.setPalestrasOficinasTotal(resumo.getPalestrasOficinasTotal() - obj.getPalestrasOficinas());
                resumo.setPessoasDeficienciaTotal(resumo.getPessoasDeficienciaTotal() - obj.getPessoasDeficiencia());

                resumoMensalService.updateResumoMensal(resumo);
        }

        private void incrementarResumo(ResumoMensal resumo, Beneficiario obj) {
                resumo.setTrabalhoInfantilTotal(resumo.getTrabalhoInfantilTotal() + obj.getTrabalhoInfantil());
                resumo.setFamiliasPAIFTotal(resumo.getFamiliasPAIFTotal() + obj.getFamiliasPAIF());
                resumo.setNovasFamiliasPAIFTotal(resumo.getNovasFamiliasPAIFTotal() + obj.getNovasFamiliasPAIF());
                resumo.setFamiliasExtremaPobrezaTotal(
                                resumo.getFamiliasExtremaPobrezaTotal() + obj.getFamiliasExtremaPobreza());
                resumo.setBolsaFamiliaTotal(resumo.getBolsaFamiliaTotal() + obj.getBolsaFamilia());
                resumo.setDescumprimentoCondicionalidadesTotal(resumo.getDescumprimentoCondicionalidadesTotal()
                                + obj.getDescumprimentoCondicionalidades());
                resumo.setBpcTotal(resumo.getBpcTotal() + obj.getBpc());
                resumo.setAcolhimentoTotal(resumo.getAcolhimentoTotal() + obj.getAcolhimento());
                resumo.setAtendimentosCRASTotal(resumo.getAtendimentosCRASTotal() + obj.getAtendimentosCRAS());
                resumo.setCadastroUnicoTotal(resumo.getCadastroUnicoTotal() + obj.getCadastroUnico());
                resumo.setAtualizacaoCadastralTotal(
                                resumo.getAtualizacaoCadastralTotal() + obj.getAtualizacaoCadastral());
                resumo.setBpcIndividuosTotal(resumo.getBpcIndividuosTotal() + obj.getBpcIndividuos());
                resumo.setCreasTotal(resumo.getCreasTotal() + obj.getCreas());
                resumo.setVisitasDomiciliaresTotal(resumo.getVisitasDomiciliaresTotal() + obj.getVisitasDomiciliares());
                resumo.setAuxiliosNatalidadeTotal(resumo.getAuxiliosNatalidadeTotal() + obj.getAuxiliosNatalidade());
                resumo.setAuxiliosFuneralTotal(resumo.getAuxiliosFuneralTotal() + obj.getAuxiliosFuneral());
                resumo.setOutrosBeneficiosTotal(resumo.getOutrosBeneficiosTotal() + obj.getOutrosBeneficios());
                resumo.setFamiliasParticipantesPAIFTotal(
                                resumo.getFamiliasParticipantesPAIFTotal() + obj.getFamiliasParticipantesPAIF());
                resumo.setCriancas06SCFVTotal(resumo.getCriancas06SCFVTotal() + obj.getCriancas06SCFV());
                resumo.setCriancas714SCFVTotal(resumo.getCriancas714SCFVTotal() + obj.getCriancas714SCFV());
                resumo.setAdolescentes1517SCFVTotal(
                                resumo.getAdolescentes1517SCFVTotal() + obj.getAdolescentes1517SCFV());
                resumo.setAdultosSCFVTotal(resumo.getAdultosSCFVTotal() + obj.getAdultosSCFV());
                resumo.setIdososSCFVTotal(resumo.getIdososSCFVTotal() + obj.getIdososSCFV());
                resumo.setPalestrasOficinasTotal(resumo.getPalestrasOficinasTotal() + obj.getPalestrasOficinas());
                resumo.setPessoasDeficienciaTotal(resumo.getPessoasDeficienciaTotal() + obj.getPessoasDeficiencia());

                resumoMensalService.updateResumoMensal(resumo);
        }

        public void deleteByid(Long id) {
                try {
                        this.beneficiarioRepository.deleteById(id);
                        // Aqui você pode decidir se deseja atualizar o ResumoMensal ao deletar
                } catch (Exception e) {
                        // Tratar a exceção conforme necessário
                }
        }

        @Transactional
        private void atualizarResumoMensal(Beneficiario beneficiario) {
                // Obter o mês atual
                String mes = beneficiario.getMes();

                // Obter ou criar o ResumoMensal para o mês
                ResumoMensal resumoMensal = resumoMensalRepository.findByMes(mes)
                                .orElse(new ResumoMensal(mes)); // Inicializa um novo objeto caso não exista

                // Atualizar campos com base nos dados do beneficiário
                resumoMensal
                                .setTrabalhoInfantilTotal(resumoMensal.getTrabalhoInfantilTotal()
                                                + beneficiario.getTrabalhoInfantil());
                resumoMensal.setFamiliasPAIFTotal(resumoMensal.getFamiliasPAIFTotal() + beneficiario.getFamiliasPAIF());
                resumoMensal.setNovasFamiliasPAIFTotal(
                                resumoMensal.getNovasFamiliasPAIFTotal() + beneficiario.getNovasFamiliasPAIF());
                resumoMensal.setFamiliasExtremaPobrezaTotal(
                                resumoMensal.getFamiliasExtremaPobrezaTotal()
                                                + beneficiario.getFamiliasExtremaPobreza());
                resumoMensal.setBolsaFamiliaTotal(resumoMensal.getBolsaFamiliaTotal() + beneficiario.getBolsaFamilia());
                resumoMensal.setDescumprimentoCondicionalidadesTotal(
                                resumoMensal.getDescumprimentoCondicionalidadesTotal()
                                                + beneficiario.getDescumprimentoCondicionalidades());
                resumoMensal.setBpcTotal(resumoMensal.getBpcTotal() + beneficiario.getBpc());
                resumoMensal
                                .setTrabalhoInfantilTotal(resumoMensal.getTrabalhoInfantilTotal()
                                                + beneficiario.getTrabalhoInfantil());
                resumoMensal.setAcolhimentoTotal(resumoMensal.getAcolhimentoTotal() + beneficiario.getAcolhimento());
                resumoMensal
                                .setAtendimentosCRASTotal(resumoMensal.getAtendimentosCRASTotal()
                                                + beneficiario.getAtendimentosCRAS());
                resumoMensal.setCadastroUnicoTotal(
                                resumoMensal.getCadastroUnicoTotal() + beneficiario.getCadastroUnico());
                resumoMensal.setAtualizacaoCadastralTotal(
                                resumoMensal.getAtualizacaoCadastralTotal() + beneficiario.getAtualizacaoCadastral());
                resumoMensal.setBpcIndividuosTotal(
                                resumoMensal.getBpcIndividuosTotal() + beneficiario.getBpcIndividuos());
                resumoMensal.setCreasTotal(resumoMensal.getCreasTotal() + beneficiario.getCreas());
                resumoMensal.setVisitasDomiciliaresTotal(
                                resumoMensal.getVisitasDomiciliaresTotal() + beneficiario.getVisitasDomiciliares());
                resumoMensal.setAuxiliosNatalidadeTotal(
                                resumoMensal.getAuxiliosNatalidadeTotal() + beneficiario.getAuxiliosNatalidade());
                resumoMensal
                                .setAuxiliosFuneralTotal(resumoMensal.getAuxiliosFuneralTotal()
                                                + beneficiario.getAuxiliosFuneral());
                resumoMensal
                                .setOutrosBeneficiosTotal(resumoMensal.getOutrosBeneficiosTotal()
                                                + beneficiario.getOutrosBeneficios());

                resumoMensal.setFamiliasParticipantesPAIFTotal(
                                resumoMensal.getFamiliasParticipantesPAIFTotal()
                                                + beneficiario.getFamiliasParticipantesPAIF());
                resumoMensal.setCriancas06SCFVTotal(
                                resumoMensal.getCriancas06SCFVTotal() + beneficiario.getCriancas06SCFV());
                resumoMensal
                                .setCriancas714SCFVTotal(resumoMensal.getCriancas714SCFVTotal()
                                                + beneficiario.getCriancas714SCFV());
                resumoMensal.setAdolescentes1517SCFVTotal(
                                resumoMensal.getAdolescentes1517SCFVTotal() + beneficiario.getAdolescentes1517SCFV());
                resumoMensal.setAdultosSCFVTotal(resumoMensal.getAdultosSCFVTotal() + beneficiario.getAdultosSCFV());
                resumoMensal.setIdososSCFVTotal(resumoMensal.getIdososSCFVTotal() + beneficiario.getIdososSCFV());
                resumoMensal.setPalestrasOficinasTotal(
                                resumoMensal.getPalestrasOficinasTotal() + beneficiario.getPalestrasOficinas());
                resumoMensal.setPessoasDeficienciaTotal(
                                resumoMensal.getPessoasDeficienciaTotal() + beneficiario.getPessoasDeficiencia());

                // Salvar o ResumoMensal atualizado
                resumoMensalRepository.save(resumoMensal);
        }

}
