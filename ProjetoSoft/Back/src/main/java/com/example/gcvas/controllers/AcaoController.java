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

import com.example.gcvas.models.Acao;
import com.example.gcvas.service.AcaoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/Acao")
@Validated
public class AcaoController {
    
    @Autowired
    AcaoService acaoService;

    @GetMapping
    public ResponseEntity<List<Acao>> getAcao() {
        return ResponseEntity.ok().body(acaoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Acao> getAcao(@PathVariable("id") Long id) {
        Acao obj = this.acaoService.findByid(id);

        return ResponseEntity.ok().body(obj);
    }
    @PostMapping("path")
    public ResponseEntity<Void> postAcao(@RequestBody @Valid Acao obj) {
        this.acaoService.create(obj);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

     @PutMapping("/{id}")
    public ResponseEntity<Void> putAcao(@PathVariable("id") Long id, @RequestBody Acao newObj) {
        newObj.setId(id);

        this.acaoService.update(newObj);
        
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBeneficiarioById(@PathVariable("id")Long id){
        this.acaoService.deleteByid(id);

        return ResponseEntity.noContent().build();
    }


}
