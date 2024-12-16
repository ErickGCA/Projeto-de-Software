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

        // Verifica se o beneficiário está presente e válido
        if (obj.getBeneficiario() != null && obj.getBeneficiario().getId() != null) {
            // Buscar o beneficiário pelo NIS (ID)
            Optional<Beneficiario> optionalBeneficiario = beneficiarioRepository
                    .findById(obj.getBeneficiario().getId());
            if (optionalBeneficiario.isPresent()) {
                Beneficiario beneficiario = optionalBeneficiario.get();
                obj.setBeneficiario(beneficiario); // Atualiza o objeto com o beneficiário encontrado
            } else {
                logger.warn("Beneficiário não encontrado com o ID: {}", obj.getBeneficiario().getId());
                // Não lançar exceção: permite continuar com o beneficiário como null
                obj.setBeneficiario(null);
            }
        } else {
            logger.info("Nenhum beneficiário informado. Continuando sem associar um beneficiário.");
            obj.setBeneficiario(null); // Explicitamente define como null para consistência
        }

        // Salva o objeto
        Encaminhar savedEncaminhar = this.encaminharRepository.save(obj);

        // Incrementar ResumoMensal apenas se necessário (pode ser condicional)
        String mesAtual = LocalDate.now().getMonth().toString(); // Utilizando o mês atual
        ResumoMensal resumoMensal = resumoMensalService.createOrGetResumo(mesAtual);

        if (obj.getBeneficiario() != null) {
            // Incrementando ResumoMensal com dados do beneficiário, se houver
            resumoMensalService.incrementarResumo(resumoMensal, obj.getBeneficiario());
        }
        resumoMensal.incrementarTotalEncaminhamentos(); // Incrementa o total de encaminhamentos
        resumoMensalService.updateResumoMensal(resumoMensal); // Atualiza o ResumoMensal no banco

        return savedEncaminhar;
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
