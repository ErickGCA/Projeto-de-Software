package com.example.gcvas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gcvas.models.Filiado;
import com.example.gcvas.repositories.FiliadoRepository;

import jakarta.transaction.Transactional;

@Service
public class FiliadoService {

    @Autowired
    FiliadoRepository filiadoRepository;

    public List<Filiado> findAll() {
        return filiadoRepository.findAll();
    }

    public Filiado findByid(Long id) {
        Optional<Filiado> obj = this.filiadoRepository.findById(id);

        if (obj.isPresent()) {
            return obj.get();
        }
        throw new RuntimeException("Filiado não encontrado {id:" + id + "} ");
    }

    @Transactional
    public Filiado create(Filiado obj) {
        obj.setId(null);

        // Validação de CPF antes de salvar
        if (!isValidCPF(obj.getCpf())) {
            throw new RuntimeException("CPF inválido: " + obj.getCpf());
        }

        return this.filiadoRepository.save(obj);
    }

    @Transactional
    public Filiado update(Filiado newObj) {
        Filiado obj = this.findByid(newObj.getId());

        // Validação de CPF antes de atualizar
        if (!isValidCPF(newObj.getCpf())) {
            throw new RuntimeException("CPF inválido: " + newObj.getCpf());
        }

        // Atualizar os dados do objeto existente com os dados de newObj
        obj.setUsername(newObj.getUsername());
        obj.setCpf(newObj.getCpf());
        obj.setData(newObj.getData());
        obj.setBeneficiario(newObj.getBeneficiario());

        return this.filiadoRepository.save(obj);
    }

    public void deleteByid(Long id) {
        try {
            this.filiadoRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao deletar o filiado com id " + id, e);
        }
    }

    /**
     * Valida um CPF usando o cálculo dos dígitos verificadores.
     * 
     * @param cpf O CPF a ser validado (com ou sem pontuação).
     * @return true se o CPF for válido, false caso contrário.
     */
    private boolean isValidCPF(String cpf) {
        if (cpf == null)
            return false;

        // Remove caracteres não numéricos
        cpf = cpf.replaceAll("\\D", "");

        // Verifica se o CPF tem 11 dígitos ou é uma sequência repetida
        if (cpf.length() != 11 || cpf.matches("(\\d)\\1{10}")) {
            return false;
        }

        try {
            // Cálculo dos dígitos verificadores
            int[] pesos = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int soma = 0;

            for (int i = 0; i < 9; i++) {
                soma += Character.getNumericValue(cpf.charAt(i)) * pesos[i];
            }

            int resto = soma % 11;
            int digito1 = resto < 2 ? 0 : 11 - resto;

            soma = 0;
            int[] pesos2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

            for (int i = 0; i < 10; i++) {
                soma += Character.getNumericValue(cpf.charAt(i)) * pesos2[i];
            }

            resto = soma % 11;
            int digito2 = resto < 2 ? 0 : 11 - resto;

            return digito1 == Character.getNumericValue(cpf.charAt(9)) &&
                    digito2 == Character.getNumericValue(cpf.charAt(10));
        } catch (Exception e) {
            return false;
        }
    }
}
