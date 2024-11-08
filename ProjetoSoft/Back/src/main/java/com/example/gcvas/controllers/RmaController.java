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

import com.example.gcvas.models.Rma;
import com.example.gcvas.service.RmaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/Rma")
@Validated
public class RmaController {

    @Autowired
    RmaService rmaService;

    @GetMapping("/mes/{mes}")
    public List<Rma> getRmaByMes(@PathVariable String mes) {
        return rmaService.findByMes(mes); // Aqui estamos chamando o método correto

    }

    @GetMapping
    public ResponseEntity<List<Rma>> getRma() {
        return ResponseEntity.ok().body(rmaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rma> getRma(@PathVariable("id") Long id) {
        Rma obj = this.rmaService.findByid(id);

        return ResponseEntity.ok().body(obj);
    }

    @PostMapping()
    public ResponseEntity<Void> postRma(@RequestBody @Valid Rma obj) {
        this.rmaService.create(obj);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> putRma(@PathVariable("id") Long id, @RequestBody Rma newObj) {
        newObj.setId(id);

        this.rmaService.update(newObj);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequisicaoById(@PathVariable("id") Long id) {
        this.rmaService.deleteByid(id);

        return ResponseEntity.noContent().build();
    }

}