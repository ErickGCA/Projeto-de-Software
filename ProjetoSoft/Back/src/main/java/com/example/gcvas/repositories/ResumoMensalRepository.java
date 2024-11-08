package com.example.gcvas.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.gcvas.models.ResumoMensal;

@Repository
public interface ResumoMensalRepository extends JpaRepository<ResumoMensal, Long> {
    Optional<ResumoMensal> findByMes(String mes);
}
