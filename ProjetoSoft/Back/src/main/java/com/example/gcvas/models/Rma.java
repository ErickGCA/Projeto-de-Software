package com.example.gcvas.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = Rma.TABLE_NAME)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rma {

    public static final String TABLE_NAME = "Rma";

    // Novo enum para representar os meses do ano
    public enum Mes {
        JANEIRO, FEVEREIRO, MARCO, ABRIL, MAIO, JUNHO, JULHO, AGOSTO, SETEMBRO, OUTUBRO, NOVEMBRO, DEZEMBRO
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CodRma", nullable = false, unique = true)
    private Long id;

    @Column(name = "unidade", nullable = false, length = 50)
    @NotBlank
    @Size(min = 2, max = 50)
    private String unidade;

    @Column(name = "numeroUnidade", nullable = false, length = 15)
    @NotNull
    private String numeroUnidade;

    @Column(name = "endereco", nullable = false, length = 50)
    @NotBlank
    @Size(min = 5, max = 50)
    private String endereco;

    @Column(name = "municipio", nullable = false, length = 50)
    @NotBlank
    @Size(min = 5, max = 50)
    private String municipio;

    @Column(name = "uf", nullable = false, length = 2)
    @NotBlank
    @Size(min = 2, max = 2)
    private String uf;

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
}