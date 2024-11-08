package com.example.gcvas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.gcvas.models.Acao;


@Repository
public interface AcaoRepository extends JpaRepository<Acao, Long> {
    

}
