package com.example.gcvas.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.gcvas.Security.UserSpringSecurity;
import com.example.gcvas.models.User;
import com.example.gcvas.models.Enums.TipoUser;
import com.example.gcvas.repositories.UserRepository;
import com.example.gcvas.service.exceptions.AuthorizationException;
import com.example.gcvas.service.exceptions.ObjectNotFoundException;

import jakarta.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepository userRepository;

    public List<User> findAll(Boolean activeOnly) {
        if (activeOnly != null) {
            return userRepository.findByActive(activeOnly);
        }
        return userRepository.findAll();
    }

    public User findById(Long id) {
        Optional<User> obj = this.userRepository.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado {id:" + id + "}"));
    }

    public void VerificaADM() {
        UserSpringSecurity userSpringSecurity = authenticated();
        if (!Objects.nonNull(userSpringSecurity)
                || !userSpringSecurity.hasRole(TipoUser.ADM))
            throw new AuthorizationException("Acesso negado!");
    }

    @Transactional
    public User create(User obj) {
        obj.setId(null);
        obj.setPassword(this.bCryptPasswordEncoder.encode(obj.getPassword()));
        obj.setActive(true); // Garante que novos usuários são criados como ativos
        return this.userRepository.save(obj);
    }

    @Transactional
    public User update(User newObj) {
        User obj = this.findById(newObj.getId());
        obj.setPassword(this.bCryptPasswordEncoder.encode(newObj.getPassword()));
        obj.setProfile(newObj.getProfile());
        // Mantém o status active inalterado durante atualizações normais
        return this.userRepository.save(obj);
    }

    @Transactional
    public User toggleActivation(Long id) {
        User user = findById(id);
        user.setActive(!user.getActive()); // Inverte o status atual
        return userRepository.save(user);
    }

    public UserSpringSecurity authenticated() {
        try {
            return (UserSpringSecurity) SecurityContextHolder.getContext()
                    .getAuthentication().getPrincipal();
        } catch (Exception e) {
            return null;
        }
    }

}