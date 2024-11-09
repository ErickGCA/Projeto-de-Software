package com.example.gcvas.config;

import static org.springframework.security.config.Customizer.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.example.gcvas.Security.JWTAuthenticationFilter;
import com.example.gcvas.Security.JWTAuthorizationFilter;
import com.example.gcvas.Security.JWTUtil;

@SuppressWarnings("deprecation")
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

        @Autowired
        private UserDetailsService userDetailsService;

        @Autowired
        private JWTUtil jwtUtil;

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http.cors(withDefaults()).csrf(csrf -> csrf.disable());

                AuthenticationManagerBuilder authenticationManagerBuilder = http
                                .getSharedObject(AuthenticationManagerBuilder.class);
                authenticationManagerBuilder.userDetailsService(this.userDetailsService)
                                .passwordEncoder(bCryptPasswordEncoder());
                AuthenticationManager authenticationManager = authenticationManagerBuilder.build();
                http.authenticationManager(authenticationManager);

                // Permitir acesso público ao endpoint /Beneficiario/mes/{mes}
                http.authorizeRequests(requests -> requests
                                .requestMatchers("/Beneficiario/mes/**").permitAll() // Permite o acesso sem
                                                                                     // autenticação
                                .anyRequest().authenticated() // Outros endpoints exigem autenticação
                );

                http.addFilter(new JWTAuthenticationFilter(authenticationManager, jwtUtil));
                http.addFilter(new JWTAuthorizationFilter(authenticationManager, jwtUtil, userDetailsService));

                http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
                return http.build();
        }

        @Bean
        public BCryptPasswordEncoder bCryptPasswordEncoder() {
                return new BCryptPasswordEncoder();
        }
}
