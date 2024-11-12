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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    @Column(name = "NIS", nullable = false, unique = true)
    @NotNull
    @Size(min = 11, max = 11)
    private String nis;

    @Column(name = "username", nullable = false)
    @NotNull(message = "O campo 'NOme' não pode ser nulo.")
    private String username;

    @Column(name = "Endereco")
    private String endereco;

    @Column(name = "CPF", nullable = false, unique = true)
    @NotNull(message = "O campo 'CPF' não pode ser nulo.")
    @Size(min = 11, max = 11)
    private String cpf;

    @Column(name = "Telefone", nullable = false)
    @NotNull(message = "O campo 'Telefone' não pode ser nulo.")
    private String telefone;

    @Column(name = "mes", nullable = false)
    @NotNull(message = "O campo 'mês' não pode ser nulo.")
    private String mes;

    // COLUNA A
    // A.1. Total de famílias em acompanhamento pelo PAIF
    @Column(name = "familiasPAIF", nullable = false)
    @NotNull
    private Integer familiasPAIF;
    // A.2. Novas famílias inseridas no acompanhamento do PAIF durante o mês de
    // referência
    @Column(name = "novasFamiliasPAIF", nullable = false)
    @NotNull
    private Integer novasFamiliasPAIF;

    // COLUNA B
    // B.1. Famílias em situação de extrema pobreza
    @Column(name = "familiasExtremaPobreza", nullable = false)
    @NotNull
    private Integer familiasExtremaPobreza;
    // B.2. Famílias beneficiárias do Programa Bolsa Família
    @Column(name = "bolsaFamilia", nullable = false)
    @NotNull
    private Integer bolsaFamilia;
    // B.3. Famílias beneficiárias do Programa Bolsa Família em descumprimento de
    // condicionalidades
    @Column(name = "descumprimentoCondicionalidades", nullable = false)
    @NotNull
    private Integer descumprimentoCondicionalidades;
    // B.4. Famílias com membros beneficiários do BPC
    @Column(name = "bpc", nullable = false)
    @NotNull
    private Integer bpc;
    // B.5. Famílias com crianças ou adolescentes em situação de trabalho infantil
    @Column(name = "trabalhoInfantil", nullable = false)
    @NotNull
    private Integer trabalhoInfantil;
    // B.6. Famílias com crianças ou adolescentes em Serviço de Acolhimento
    @Column(name = "acolhimento", nullable = false)
    @NotNull
    private Integer acolhimento;

    // COLUNA C
    // C.1. Total de atendimentos particularizados realizados no mês de referência
    @Column(name = "atendimentosCRAS", nullable = false)
    @NotNull
    private Integer atendimentosCRAS;
    // C.2. Famílias encaminhadas para inclusão no Cadastro Único
    @Column(name = "cadastroUnico", nullable = false)
    @NotNull
    private Integer cadastroUnico;
    // C.3. Famílias encaminhadas para atualização cadastral no Cadastro Único
    @Column(name = "atualizacaoCadastral", nullable = false)
    @NotNull
    private Integer atualizacaoCadastral;
    // C.4. Indivíduos encaminhados para acesso ao BPC
    @Column(name = "bpcIndividuos", nullable = false)
    @NotNull
    private Integer bpcIndividuos;
    // C.5. Famílias encaminhadas para o CREAS
    @Column(name = "creas", nullable = false)
    @NotNull
    private Integer creas;
    // C.6. Visitas domiciliares realizadas
    @Column(name = "visitasDomiciliares", nullable = false)
    @NotNull
    private Integer visitasDomiciliares;
    // C.7. Total de auxílios-natalidade concedidos/entregues durante o mês de
    // referência
    @Column(name = "auxiliosNatalidade", nullable = false)
    @NotNull
    private Integer auxiliosNatalidade;
    // C.8. Total de auxílios-funeral concedidos/entregues durante o mês de
    // referência
    @Column(name = "auxiliosFuneral", nullable = false)
    @NotNull
    private Integer auxiliosFuneral;
    // C.9. Outros benefícios eventuais concedidos/entregues durante o mês de
    // referência
    @Column(name = "outrosBeneficios", nullable = false)
    @NotNull
    private Integer outrosBeneficios;

    // COLUNA D

    // REVER ESSA DE BAIXO
    @Column(name = "familiasParticipantesPAIF", nullable = false)
    @NotNull
    private Integer familiasParticipantesPAIF;
    // D.2. Crianças de 0 a 6 anos em Serviços de Convivência e Fortalecimento de
    // Vínculos
    @Column(name = "criancas06SCFV", nullable = false)
    @NotNull
    private Integer criancas06SCFV;
    // D.3. Crianças/adolescentes de 7 a 14 anos em Serviços de Convivência e
    // Fortalecimento de Vínculos
    @Column(name = "criancas714SCFV", nullable = false)
    @NotNull
    private Integer criancas714SCFV;
    // D.4. Adolescentes de 15 a 17 anos em Serviços de Convivência e Fortalecimento
    // de Vínculos
    @Column(name = "adolescentes1517SCFV", nullable = false)
    @NotNull
    private Integer adolescentes1517SCFV;
    // D.8. Adultos entre 18 e 59 anos em Serviços de Convivência e Fortalecimento
    // de Vínculos
    @Column(name = "adultosSCFV", nullable = false)
    @NotNull
    private Integer adultosSCFV;
    // D.5. Idosos em Serviços de Convivência e Fortalecimento de Vínculos para
    // idosos
    @Column(name = "idososSCFV", nullable = false)
    @NotNull
    private Integer idososSCFV;
    // D.6. Pessoas que participaram de palestras, oficinas e outras atividades
    // coletivas de caráter não continuado
    @Column(name = "palestrasOficinas", nullable = false)
    @NotNull
    private Integer palestrasOficinas;
    // D.7. Pessoas com deficiência, participando dos Serviços de Convivência ou dos
    // grupos do PAIF
    @Column(name = "pessoasDeficiencia", nullable = false)
    @NotNull
    private Integer pessoasDeficiencia;

    // ATÉ AQUI

    @ManyToMany
    @JoinTable(name = "BeneficiadoBeneficio", joinColumns = @JoinColumn(name = "cod_nis"), inverseJoinColumns = @JoinColumn(name = "CodB"))
    Set<Beneficios> beneficiadoBeneficio;

    @ManyToOne
    @JoinColumn(name = "categoria")
    private Categoria categoria;

}