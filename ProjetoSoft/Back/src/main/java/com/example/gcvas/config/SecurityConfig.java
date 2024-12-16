package com.example.gcvas.config;

import static org.springframework.security.config.Customizer.*;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.gcvas.Security.JWTAuthenticationFilter;
import com.example.gcvas.Security.JWTAuthorizationFilter;
import com.example.gcvas.Security.JWTUtil;

@SuppressWarnings("deprecation")
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

        private AuthenticationManager authenticationManager;

        @Autowired
        private UserDetailsService userDetailsService;

        @Autowired
        private JWTUtil jwtUtil;

        private static final String[] PUBLIC_MATCHERS = {
                        "/Beneficiario/mes/**",
                        "/categorias/**", // Adicione essa linha

                        "/categoria/**",
                        "/Beneficiario/categoria/**",
                        "/resumo/**" // Permitir o acesso a este endpoint publicamente
        };

        private static final String[] PUBLIC_MATCHERS_POST = {
                        "/user", "/login" // Permitir POST para login e criação de usuário
        };

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                // Habilita o CORS e desabilita CSRF
                http.cors(withDefaults()).csrf(csrf -> csrf.disable());

                // Configuração de autenticação
                AuthenticationManagerBuilder authenticationManagerBuilder = http
                                .getSharedObject(AuthenticationManagerBuilder.class);
                authenticationManagerBuilder.userDetailsService(this.userDetailsService)
                                .passwordEncoder(bCryptPasswordEncoder());
                this.authenticationManager = authenticationManagerBuilder.build();

                // Configura permissões de acesso
                http.authorizeRequests(requests -> requests
                                .requestMatchers(HttpMethod.POST, PUBLIC_MATCHERS_POST).permitAll()
                                .requestMatchers(PUBLIC_MATCHERS).permitAll() // Acesso público ao
                                                                              // "/Beneficiario/mes/**"
                                .anyRequest().authenticated() // Todos os outros endpoints exigem autenticação
                )
                                .authenticationManager(authenticationManager);

                // Filtros JWT para autenticação e autorização
                http.addFilter(new JWTAuthenticationFilter(this.authenticationManager, this.jwtUtil));
                http.addFilter(new JWTAuthorizationFilter(this.authenticationManager, this.jwtUtil,
                                this.userDetailsService));

                // Gerenciamento de sessão sem estado
                http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
                return http.build();
        }

        @Bean
        CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Permitir apenas o front-end
                                                                                         // de localhost
                configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
                configuration.setAllowedHeaders(Arrays.asList("*"));
                configuration.setAllowCredentials(true);

                // Registra o CORS para todos os endpoints
                final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration); // Aplica para todos os endpoints
                return source;
        }

        @Bean
        public BCryptPasswordEncoder bCryptPasswordEncoder() {
                return new BCryptPasswordEncoder();
        }
}
