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

        return this.filiadoRepository.save(obj);
    }

    @Transactional
    public Filiado update(Filiado newObj) {
        Filiado obj = this.findByid(newObj.getId());

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
        }
    }

}
