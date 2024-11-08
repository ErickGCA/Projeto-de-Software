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

import com.example.gcvas.models.Encaminhar;
import com.example.gcvas.service.EncaminharService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/encaminhar")
@Validated
public class EncaminharController {
    
    @Autowired
    EncaminharService encaminharService;

     @GetMapping
    public ResponseEntity<List<Encaminhar>> getEncaminhar() {
        return ResponseEntity.ok().body(encaminharService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Encaminhar> getEncaminhar(@PathVariable("id") Long id) {
        Encaminhar obj = this.encaminharService.findByid(id);

        return ResponseEntity.ok().body(obj);
    }
    @PostMapping
    public ResponseEntity<Void> postEncaminhar(@RequestBody @Valid Encaminhar obj) {
        this.encaminharService.create(obj);
    
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
    
        return ResponseEntity.created(uri).build();
    }
    

     @PutMapping("/{id}")
    public ResponseEntity<Void> putEncaminhar(@PathVariable("id") Long id, @RequestBody Encaminhar newObj) {
        newObj.setId(id);

        this.encaminharService.update(newObj);
        
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBeneficiarioById(@PathVariable("id")Long id){
        this.encaminharService.deleteByid(id);

        return ResponseEntity.noContent().build();
    }

}