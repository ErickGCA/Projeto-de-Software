package com.example.gcvas.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gcvas.models.Beneficiario;
import com.example.gcvas.models.Encaminhar;
import com.example.gcvas.models.ResumoMensal;
import com.example.gcvas.repositories.BeneficiarioRepository; // Importação do repositório
import com.example.gcvas.repositories.EncaminharRepository;

import jakarta.transaction.Transactional;

@Service
public class EncaminharService {

    private static final Logger logger = LoggerFactory.getLogger(EncaminharService.class);

    @Autowired
    private EncaminharRepository encaminharRepository;

    @Autowired
    private BeneficiarioRepository beneficiarioRepository; // Adicionando o repositório aqui

    @Autowired
    private ResumoMensalService resumoMensalService;

    public List<Encaminhar> findAll() {
        return encaminharRepository.findAll();
    }

    public Encaminhar findByid(Long id) {
        Optional<Encaminhar> obj = this.encaminharRepository.findById(id);
        return obj.orElseThrow(() -> new RuntimeException("Encaminhar não encontrado {id:" + id + "} "));
    }

    @Transactional
    public Encaminhar create(Encaminhar obj) {
        obj.setId(null); // Certificando-se de que o ID é null para um novo objeto
        logger.info("Criando novo encaminhamento: {}", obj);

        // Buscar o beneficiário pelo NIS (ID)
        Optional<Beneficiario> optionalBeneficiario = beneficiarioRepository.findById(obj.getBeneficiario().getId());
        if (optionalBeneficiario.isPresent()) {
            Beneficiario beneficiario = optionalBeneficiario.get();
            obj.setBeneficiario(beneficiario); // Atualiza o objeto com o beneficiário encontrado

            // Salva o objeto
            Encaminhar savedEncaminhar = this.encaminharRepository.save(obj);

            // Incrementar o ResumoMensal com base no mês atual
            String mesAtual = LocalDate.now().getMonth().toString(); // Utilizando o mês atual
            ResumoMensal resumoMensal = resumoMensalService.createOrGetResumo(mesAtual);

            // Incrementando ResumoMensal com dados do beneficiário
            resumoMensalService.incrementarResumo(resumoMensal, beneficiario);
            resumoMensal.incrementarTotalEncaminhamentos(); // Nova linha adicionada
            resumoMensalService.updateResumoMensal(resumoMensal); // Atualiza o ResumoMensal no banco

            return savedEncaminhar;
        } else {
            logger.error("Beneficiário não encontrado com o ID: {}", obj.getBeneficiario().getId());
            throw new RuntimeException("Beneficiário não encontrado com o ID: " + obj.getBeneficiario().getId());
        }
    }

    @Transactional
    public Encaminhar update(Encaminhar newObj) {
        Encaminhar obj = this.findByid(newObj.getId());

        obj.setTelefone(newObj.getTelefone());

        obj.setSetor(newObj.getSetor());
        logger.info("Atualizando encaminhamento: {}", obj);

        return this.encaminharRepository.save(obj);
    }

    public void deleteByid(Long id) {
        try {
            this.encaminharRepository.deleteById(id);
            logger.info("Encaminhamento deletado: {}", id);
        } catch (Exception e) {
            logger.error("Erro ao deletar encaminhamento: {}", e.getMessage());
        }
    }
}
