package com.example.gcvas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.gcvas.models.Filiado;

@Repository
public interface FiliadoRepository extends JpaRepository<Filiado, Long> {

}
