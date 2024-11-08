package com.example.gcvas.controllers;

import java.net.URI;
import java.util.List;

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
import com.example.gcvas.service.BeneficiarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/Beneficiario")
@Validated
public class BeneficiarioController {

    @Autowired
    BeneficiarioService beneficiarioService;

    @GetMapping("/mes/{mes}")
    public List<Beneficiario> getRmaByMes(@PathVariable String mes) {
        return beneficiarioService.findByMes(mes); // Aqui estamos chamando o método correto

    }

    @GetMapping
    public ResponseEntity<List<Beneficiario>> getBeneficiario() {
        return ResponseEntity.ok().body(beneficiarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Beneficiario> getBeneficiario(@PathVariable("id") Long id) {
        Beneficiario obj = this.beneficiarioService.findByid(id);

        return ResponseEntity.ok().body(obj);
    }

    @PostMapping()
    public ResponseEntity<Void> postBeneficiario(@RequestBody @Valid Beneficiario obj) {
        this.beneficiarioService.create(obj);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(obj.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> putBeneficiario(@PathVariable("id") Long id, @RequestBody Beneficiario newObj) {
        newObj.setId(id);

        this.beneficiarioService.update(newObj);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBeneficiarioById(@PathVariable("id") Long id) {
        this.beneficiarioService.deleteByid(id);

        return ResponseEntity.noContent().build();
    }

}
