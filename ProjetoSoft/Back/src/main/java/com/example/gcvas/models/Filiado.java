package com.example.gcvas.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Data
@Table(name = Filiado.TABLE_NAME)
@AllArgsConstructor
public class Filiado {

    public static final String TABLE_NAME = "Filiado";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CodF", nullable = false, unique = true, length = 10)
    private Long id;

    @Column(name = "username", unique = true, nullable = true, insertable = true, updatable = true, length = 50)
    @NotBlank
    @Size(min = 2, max = 50)
    private String username;

    @Column(name = "CPF", unique = true, nullable = false, insertable = true, updatable = false, length = 11)
    @NotBlank
    @Size(min = 11, max = 11)
    private String cpf;

    @Column(name = "Data_Nascimento", nullable = false)
    @NotNull
    private LocalDate data;

    @ManyToOne
    @JoinColumn(name = "cod_nis", nullable = false)
    private Beneficiario beneficiario;

}
