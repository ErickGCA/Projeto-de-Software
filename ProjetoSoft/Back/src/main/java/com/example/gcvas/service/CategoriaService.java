package com.example.gcvas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gcvas.models.Categoria;
import com.example.gcvas.repositories.CategoriaRepository;

import jakarta.transaction.Transactional;

@Service

public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    public Categoria findById(Long id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        return categoria.orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
    }

    public Categoria create(Categoria categoria) {
        categoria.setId(null);
        return categoriaRepository.save(categoria);
    }

    @Transactional
    public void update(Categoria categoria) {
        Categoria existingCategoria = categoriaRepository.findById(categoria.getId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        // Atualizar campos simples
        existingCategoria.setNome(categoria.getNome());
        existingCategoria.setDescricao(categoria.getDescricao());

        // Atualizar beneficiários
        if (categoria.getBeneficiarios() != null) {
            existingCategoria.getBeneficiarios().clear(); // Limpa os beneficiários antigos
            existingCategoria.getBeneficiarios().addAll(categoria.getBeneficiarios()); // Adiciona os novos
        }

        // Salvar alterações
        categoriaRepository.save(existingCategoria);
    }

    public void delete(Long id) {
        findById(id); // Verifica se existe
        categoriaRepository.deleteById(id);
    }
}