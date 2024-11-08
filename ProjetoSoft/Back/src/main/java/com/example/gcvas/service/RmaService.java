package com.example.gcvas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gcvas.models.Rma;
import com.example.gcvas.repositories.RmaRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class RmaService {

    @Autowired
    private RmaRepository rmaRepository;

    public List<Rma> findAll() {
        return rmaRepository.findAll();
    }

    public Rma findByid(Long id) {
        return rmaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rma não encontrado com id: " + id));
    }

    public List<Rma> findByMes(String mes) {
        return rmaRepository.findByMes(mes);
    }

    public Rma create(Rma rma) {
        return rmaRepository.save(rma);
    }

    public void update(Rma rma) {
        if (!rmaRepository.existsById(rma.getId())) {
            throw new EntityNotFoundException("Rma não encontrado com id: " + rma.getId());
        }
        rmaRepository.save(rma);
    }

    public void deleteByid(Long id) {
        rmaRepository.deleteById(id);
    }

}
