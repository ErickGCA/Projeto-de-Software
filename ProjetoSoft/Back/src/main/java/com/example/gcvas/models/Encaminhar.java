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

    @Column(name = "CPF", unique = false, nullable = false, insertable = true, updatable = false, length = 11)
    @NotBlank
    @Size(min = 11, max = 11)
    private String cpf;

    @Column(name = "Telefone", unique = false, nullable = false, insertable = true, updatable = true, length = 11)
    @NotBlank
    @Size(min = 8, max = 11)
    private String telefone;

    @Column(name = "Endereco", unique = false, nullable = false, insertable = true, updatable = true, length = 50)
    @NotBlank
    @Size(min = 5, max = 50)
    private String endereco;

    @Column(name = "Data_Nascimento", unique = false, nullable = false, insertable = true, updatable = false, length = 8)
    @NotNull
    private LocalDate data;

    @Column(name = "Setor", unique = false, nullable = false, insertable = true, updatable = true, length = 20)
    @NotBlank
    private String setor;

    @ManyToOne
    @JoinColumn(name = "CodF", nullable = true)
    private Filiado filiado; // Relacionamento com Filiado

    // Se você também quiser relacionar com Beneficiario, adicione:
    @ManyToOne
    @JoinColumn(name = "id", unique = false, nullable = false, insertable = true, updatable = false)
    private Beneficiario beneficiario;

}
