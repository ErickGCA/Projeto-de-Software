package com.example.gcvas.repositories;

import java.util.List;
import java.util.Optional; // Importação correta

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.gcvas.models.Beneficiario;

@Repository
public interface BeneficiarioRepository extends JpaRepository<Beneficiario, Long> {

    List<Beneficiario> findByMes(String mes); // Método para buscar beneficiários pelo mês

    Optional<Beneficiario> findById(Long id); // Usando o ID (cod_nis)

}
