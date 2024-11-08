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

import com.example.gcvas.models.Requisicao;
import com.example.gcvas.service.RequisicaoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/requisicao")
@Validated
public class RequisicaoController {

    @Autowired
    RequisicaoService requisicaoService;

    @GetMapping
    public ResponseEntity<List<Requisicao>> getRequisicao() {
        return ResponseEntity.ok().body(requisicaoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Requisicao> getRequisicao(@PathVariable("id") Long id) {
        Requisicao obj = this.requisicaoService.findByid(id);

        return ResponseEntity.ok().body(obj);
    }
    
    @PostMapping()
    public ResponseEntity<Void> postRequisicao(@RequestBody @Valid Requisicao obj) {
        this.requisicaoService.create(obj);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

     @PutMapping("/{id}")
    public ResponseEntity<Void> putRequisicao(@PathVariable("id") Long id, @RequestBody Requisicao newObj) {
        newObj.setId(id);

        this.requisicaoService.update(newObj);
        
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequisicaoById(@PathVariable("id")Long id){
        this.requisicaoService.deleteByid(id);

        return ResponseEntity.noContent().build();
    }

}
