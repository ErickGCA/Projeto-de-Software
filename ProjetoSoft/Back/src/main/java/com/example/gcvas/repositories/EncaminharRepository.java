package com.example.gcvas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.gcvas.models.Encaminhar;

@Repository
public interface EncaminharRepository extends JpaRepository<Encaminhar, Long> {

    

    
}