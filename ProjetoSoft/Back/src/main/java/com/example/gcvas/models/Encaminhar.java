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

@Table(name = Encaminhar.TABLE_NAME)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Encaminhar {

    public static final String TABLE_NAME = "Encaminhar";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CodEncami", nullable = false, unique = true)
    private Long id;

    @Column(name = "username", unique = false, nullable = false, insertable = true, updatable = false, length = 50)
    @NotBlank
    @Size(min = 2, max = 50)
    private String username;

    @Column(name = "Telefone", unique = false, nullable = true, insertable = true, updatable = true)
    private String telefone;

    @Column(name = "Setor", unique = false, nullable = false, insertable = true, updatable = true, length = 20)
    @NotBlank
    private String setor;

    @Column(name = "Data_Consulta", unique = false, nullable = false, insertable = true, updatable = true, length = 8)
    private LocalDate data;

    @Column(name = "Horario_Consulta", unique = false, nullable = false, insertable = true, updatable = true, length = 10)
    @NotNull
    private String hora;

    @ManyToOne
    @JoinColumn(name = "CodF", nullable = true)
    private Filiado filiado; // Relacionamento com Filiado

    @ManyToOne
    @JoinColumn(name = "id", nullable = true, updatable = false)
    private Beneficiario beneficiario;

}
