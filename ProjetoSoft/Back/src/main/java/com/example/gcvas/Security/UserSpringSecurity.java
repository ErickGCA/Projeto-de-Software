package com.example.gcvas.Security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.gcvas.models.Enums.TipoUser;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserSpringSecurity implements UserDetails {
    private Long id;
    private String username;
    private String password;
    private Boolean active; // Adicione este campo
    private Collection<? extends GrantedAuthority> authorities;

    public UserSpringSecurity(Long id, String username, String password, TipoUser tipoUser, Boolean active) {
        List<TipoUser> tipoUsers = new ArrayList<>();
        tipoUsers.add(tipoUser);
        this.id = id;
        this.username = username;
        this.password = password;
        this.active = active; // Inicialize o campo
        this.authorities = tipoUsers.stream()
                .map(x -> new SimpleGrantedAuthority(x.toString()))
                .collect(Collectors.toList());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.active;
    }

    public boolean hasRole(TipoUser tipoUser) {
        return getAuthorities().contains(new SimpleGrantedAuthority(tipoUser.toString()));
    }
}