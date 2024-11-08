package com.example.gcvas.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gcvas.models.ResumoMensal;
import com.example.gcvas.repositories.ResumoMensalRepository;

@RestController
@RequestMapping("/resumo")
public class ResumoMensalController {

    @Autowired
    private ResumoMensalRepository resumoMensalRepository;

    @GetMapping
    public List<ResumoMensal> getAllResumos() {
        return resumoMensalRepository.findAll();
    }

    @GetMapping("/{mes}")
    public ResponseEntity<ResumoMensal> getResumoByMes(@PathVariable String mes) {
        return resumoMensalRepository.findByMes(mes)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
