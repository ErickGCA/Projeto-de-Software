package com.example.gcvas.models;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Data
@Table(name = Beneficiario.TABLE_NAME)
@AllArgsConstructor

public class Beneficiario {

    public static final String TABLE_NAME = "Beneficiario";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_nis", nullable = false, unique = true)
    private Long id;

    @Column(name = "NIS", nullable = false)

    private String nis;

    @Column(name = "username", nullable = false)

    private String username;

    @Column(name = "Endereco", nullable = false)
    private String endereco;

    @Column(name = "CPF", nullable = false)

    private String cpf;

    @Column(name = "Telefone", nullable = false)

    private String telefone;
    // COMEÇA AQUI OS ATRIBUTOS QUE QUERO QUE SEJAM MANYTOONE NA OUTRA CLASSE
    @Column(name = "mes", nullable = false)
    @NotNull(message = "O campo 'mes' não pode ser nulo.")
    private String mes; // Adiciona o novo campo de mês

    @Column(name = "familiasPAIF", nullable = false)
    @NotNull
    private Integer familiasPAIF;

    @Column(name = "novasFamiliasPAIF", nullable = false)
    @NotNull
    private Integer novasFamiliasPAIF;

    @Column(name = "familiasExtremaPobreza", nullable = false)
    @NotNull
    private Integer familiasExtremaPobreza;

    @Column(name = "bolsaFamilia", nullable = false)
    @NotNull
    private Integer bolsaFamilia;

    @Column(name = "descumprimentoCondicionalidades", nullable = false)
    @NotNull
    private Integer descumprimentoCondicionalidades;

    @Column(name = "bpc", nullable = false)
    @NotNull
    private Integer bpc;

    @Column(name = "trabalhoInfantil", nullable = false)
    @NotNull
    private Integer trabalhoInfantil;

    @Column(name = "acolhimento", nullable = false)
    @NotNull
    private Integer acolhimento;

    @Column(name = "atendimentosCRAS", nullable = false)
    @NotNull
    private Integer atendimentosCRAS;

    @Column(name = "cadastroUnico", nullable = false)
    @NotNull
    private Integer cadastroUnico;

    @Column(name = "atualizacaoCadastral", nullable = false)
    @NotNull
    private Integer atualizacaoCadastral;

    @Column(name = "bpcIndividuos", nullable = false)
    @NotNull
    private Integer bpcIndividuos;

    @Column(name = "creas", nullable = false)
    @NotNull
    private Integer creas;

    @Column(name = "visitasDomiciliares", nullable = false)
    @NotNull
    private Integer visitasDomiciliares;

    @Column(name = "auxiliosNatalidade", nullable = false)
    @NotNull
    private Integer auxiliosNatalidade;

    @Column(name = "auxiliosFuneral", nullable = false)
    @NotNull
    private Integer auxiliosFuneral;

    @Column(name = "outrosBeneficios", nullable = false)
    @NotNull
    private Integer outrosBeneficios;

    @Column(name = "atendimentosColetivos", nullable = false)
    @NotNull
    private Integer atendimentosColetivos;

    @Column(name = "familiasParticipantesPAIF", nullable = false)
    @NotNull
    private Integer familiasParticipantesPAIF;

    @Column(name = "criancas06SCFV", nullable = false)
    @NotNull
    private Integer criancas06SCFV;

    @Column(name = "criancas714SCFV", nullable = false)
    @NotNull
    private Integer criancas714SCFV;

    @Column(name = "adolescentes1517SCFV", nullable = false)
    @NotNull
    private Integer adolescentes1517SCFV;

    @Column(name = "adultosSCFV", nullable = false)
    @NotNull
    private Integer adultosSCFV;

    @Column(name = "idososSCFV", nullable = false)
    @NotNull
    private Integer idososSCFV;

    @Column(name = "palestrasOficinas", nullable = false)
    @NotNull
    private Integer palestrasOficinas;

    @Column(name = "pessoasDeficiencia", nullable = false)
    @NotNull
    private Integer pessoasDeficiencia;

    // ATÉ AQUI

    @ManyToMany
    @JoinTable(name = "BeneficiadoBeneficio", joinColumns = @JoinColumn(name = "cod_nis"), inverseJoinColumns = @JoinColumn(name = "CodB"))
    Set<Beneficios> beneficiadoBeneficio;

}