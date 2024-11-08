package com.example.gcvas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.gcvas.models.Requisicao;

@Repository
public interface RequisicaoRespository extends JpaRepository<Requisicao, Long> {
    

}
