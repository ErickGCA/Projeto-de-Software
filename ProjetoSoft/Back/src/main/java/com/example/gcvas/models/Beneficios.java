package com.example.gcvas.models;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = Beneficios.TABLE_NAME)
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Beneficios {
    
     public static final String TABLE_NAME = "Beneficios";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CodB", nullable = false, unique = true)
    private Long  id;

    @Column(name = "Categoria", unique = true, nullable = false, insertable = true, updatable = false, length = 50 )
    @Size(min = 4, max = 50)
    @NotBlank
    private String categoria;

    @Column(name = "Descricao", unique = false, nullable = false, insertable = true, updatable = true, length = 50 )
    @Size(min = 4, max = 50)
    @NotBlank
    private String desc_beneficio;

    @ManyToMany(mappedBy="beneficiadoBeneficio")
    Set<Beneficiario> beneficiado;


}
