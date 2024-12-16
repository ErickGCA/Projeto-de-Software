package com.example.gcvas.controllers;

import java.net.URI;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.gcvas.models.Beneficiario;
import com.example.gcvas.models.Beneficios;
import com.example.gcvas.service.BeneficiarioService;
import com.example.gcvas.service.BeneficiosService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/Beneficios")
@Validated
public class BeneficiosController {

    @Autowired
    private BeneficiosService beneficiosService;

    @Autowired
    private BeneficiarioService beneficiariosService; // Injeção do BeneficiarioService

    @GetMapping
    public ResponseEntity<List<Beneficios>> getBeneficios() {
        return ResponseEntity.ok().body(beneficiosService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Beneficios> getBeneficios(@PathVariable("id") Long id) {
        Beneficios obj = this.beneficiosService.findByid(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping()
    public ResponseEntity<Void> postBeneficios(@RequestBody @Valid Beneficios obj) {
        // Se o campo 'beneficiado' for null, inicialize como um Set vazio
        if (obj.getBeneficiado() == null) {
            obj.setBeneficiado(new HashSet<>());
        }

        // Associe os beneficiários a partir dos IDs enviados
        Set<Beneficiario> beneficiarios = obj.getBeneficiado().stream()
                .map(beneficiario -> beneficiariosService.findByid(beneficiario.getId()))
                .collect(Collectors.toSet());

        obj.setBeneficiado(beneficiarios); // Define a lista de beneficiários no benefício
        this.beneficiosService.create(obj); // Salva o benefício com os beneficiários

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(obj.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> putBeneficios(@PathVariable("id") Long id, @RequestBody Beneficios newObj) {
        newObj.setId(id);
        this.beneficiosService.update(newObj);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBeneficiosById(@PathVariable("id") Long id) {
        this.beneficiosService.deleteByid(id);
        return ResponseEntity.noContent().build();
    }
}