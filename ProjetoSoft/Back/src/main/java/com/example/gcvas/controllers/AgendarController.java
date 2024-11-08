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

import com.example.gcvas.models.Agendar;
import com.example.gcvas.service.AgendarService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/agendar")
@Validated
public class AgendarController {

    @Autowired
    AgendarService agendarService;

    @GetMapping
    public ResponseEntity<List<Agendar>> getAgendar() {
        return ResponseEntity.ok().body(agendarService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agendar> getAgendar(@PathVariable("id") Long id) {
        Agendar obj = this.agendarService.findByid(id);

        return ResponseEntity.ok().body(obj);
    }
    @PostMapping
    public ResponseEntity<Void> postAgendar(@RequestBody @Valid Agendar obj) {
        this.agendarService.create(obj);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

     @PutMapping("/{id}")
    public ResponseEntity<Void> putAgendar(@PathVariable("id") Long id, @RequestBody Agendar newObj) {
        newObj.setId(id);

        this.agendarService.update(newObj);
        
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBeneficiarioById(@PathVariable("id")Long id){
        this.agendarService.deleteByid(id);

        return ResponseEntity.noContent().build();
    }
    
}