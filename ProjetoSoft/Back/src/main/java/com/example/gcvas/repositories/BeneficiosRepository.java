package com.example.gcvas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.gcvas.models.Beneficios;

@Repository
public interface BeneficiosRepository extends JpaRepository<Beneficios, Long> {
 

}
