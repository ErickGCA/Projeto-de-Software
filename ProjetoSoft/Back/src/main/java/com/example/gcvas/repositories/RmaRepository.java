package com.example.gcvas.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.gcvas.models.Rma;

public interface RmaRepository extends JpaRepository<Rma, Long> {

    List<Rma> findByMes(String mes); // Certifique-se de que este método está aqui
}