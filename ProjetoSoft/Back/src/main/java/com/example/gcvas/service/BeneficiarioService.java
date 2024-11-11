package com.example.gcvas.service;

import java.util.List;
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
        CategoriaRepository categoriaRepository; // Adicione esta injeção

        @Autowired
        ResumoMensalRepository resumoMensalRepository; // Adicionando o repositório para ResumoMensal

        public List<Beneficiario> findByMes(String mes) {
                return beneficiarioRepository.findByMes(mes); // Certifique-se de que o repositório tem esse método
        }

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
                throw new RuntimeException("Beneficiario não encontrado {id:" + id + "} ");
        }

        @Transactional
        public Beneficiario create(Beneficiario obj) {
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
                        System.out.println("Updating Beneficiario with ID: " + newObj.getId());

                        // Encontrar o Beneficiário pelo ID
                        Beneficiario obj = this.findByid(newObj.getId());
                        if (obj == null) {
                                throw new RuntimeException("Beneficiário não encontrado");
                        }

                        System.out.println("Found Beneficiario: " + obj);

                        // Atualiza os campos específicos que você deseja
                        obj.setNis(newObj.getNis());
                        obj.setUsername(newObj.getUsername());
                        obj.setEndereco(newObj.getEndereco());
                        obj.setCpf(newObj.getCpf());
                        obj.setTelefone(newObj.getTelefone());
                        obj.setMes(newObj.getMes());

                        System.out.println("Updated Beneficiario: " + obj);

                        // Salvar e retornar o objeto atualizado
                        return this.beneficiarioRepository.save(obj);
                } catch (Exception e) {
                        e.printStackTrace(); // Captura a exceção para melhor rastreamento
                        throw new RuntimeException("Erro ao atualizar Beneficiário", e);
                }
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
