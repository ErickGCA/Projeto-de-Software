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

import com.example.gcvas.models.Filiado;
import com.example.gcvas.service.FiliadoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/filiado")
@Validated
public class FiliadoController {

    @Autowired
    FiliadoService filiadoService;

    @GetMapping
    public ResponseEntity<List<Filiado>> getFiliado() {
        return ResponseEntity.ok().body(filiadoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Filiado> getFiliado(@PathVariable("id") Long id) {
        Filiado obj = this.filiadoService.findByid(id);

        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ResponseEntity<Void> postFiliado(@RequestBody @Valid Filiado obj) {
        this.filiadoService.create(obj);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> putFiliado(@PathVariable("id") Long id, @RequestBody Filiado newObj) {
        newObj.setId(id);

        this.filiadoService.update(newObj);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFiliadoById(@PathVariable("id") Long id) {
        this.filiadoService.deleteByid(id);

        return ResponseEntity.noContent().build();
    }

}
