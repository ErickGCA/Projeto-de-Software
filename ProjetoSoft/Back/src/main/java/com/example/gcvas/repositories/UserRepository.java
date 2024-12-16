package com.example.gcvas.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.gcvas.models.User;
import com.example.gcvas.models.Enums.TipoUser;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Transactional(readOnly = true)
    User findByUsername(String username);

    List<User> findByActive(Boolean active);

    List<User> findByActiveAndProfileNot(Boolean active, TipoUser profile);

    List<User> findByProfileNot(TipoUser profile); // Filtra perfis que não são ADM

}