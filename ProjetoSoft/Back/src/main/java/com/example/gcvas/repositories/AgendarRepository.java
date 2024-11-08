package com.example.gcvas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.gcvas.models.Agendar;

@Repository
public interface AgendarRepository extends JpaRepository<Agendar, Long> {

    

    
}