package com.example.gcvas.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "ResumoMensal")
public class ResumoMensal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "mes", nullable = false, unique = true)
    @NotNull
    private String mes;

    @Column(name = "trabalhoInfantilTotal", nullable = false)
    private Integer trabalhoInfantilTotal = 0;

    @Column(name = "familiasPAIFTotal", nullable = false)
    private Integer familiasPAIFTotal = 0;

    @Column(name = "novasFamiliasPAIFTotal", nullable = false)
    private Integer novasFamiliasPAIFTotal = 0;

    @Column(name = "familiasExtremaPobrezaTotal", nullable = false)
    private Integer familiasExtremaPobrezaTotal = 0;

    @Column(name = "bolsaFamiliaTotal", nullable = false)
    private Integer bolsaFamiliaTotal = 0;

    @Column(name = "descumprimentoCondicionalidadesTotal", nullable = false)
    private Integer descumprimentoCondicionalidadesTotal = 0;

    @Column(name = "bpcTotal", nullable = false)
    private Integer bpcTotal = 0;

    @Column(name = "acolhimentoTotal", nullable = false)
    private Integer acolhimentoTotal = 0;

    @Column(name = "atendimentosCRASTotal", nullable = false)
    private Integer atendimentosCRASTotal = 0;

    @Column(name = "cadastroUnicoTotal", nullable = false)
    private Integer cadastroUnicoTotal = 0;

    @Column(name = "atualizacaoCadastralTotal", nullable = false)
    private Integer atualizacaoCadastralTotal = 0;

    @Column(name = "bpcIndividuosTotal", nullable = false)
    private Integer bpcIndividuosTotal = 0;

    @Column(name = "creasTotal", nullable = false)
    private Integer creasTotal = 0;

    @Column(name = "visitasDomiciliaresTotal", nullable = false)
    private Integer visitasDomiciliaresTotal = 0;

    @Column(name = "auxiliosNatalidadeTotal", nullable = false)
    private Integer auxiliosNatalidadeTotal = 0;

    @Column(name = "auxiliosFuneralTotal", nullable = false)
    private Integer auxiliosFuneralTotal = 0;

    @Column(name = "outrosBeneficiosTotal", nullable = false)
    private Integer outrosBeneficiosTotal = 0;

    @Column(name = "atendimentosColetivosTotal", nullable = false)
    private Integer atendimentosColetivosTotal = 0;

    @Column(name = "familiasParticipantesPAIFTotal", nullable = false)
    private Integer familiasParticipantesPAIFTotal = 0;

    @Column(name = "criancas06SCFVTotal", nullable = false)
    private Integer criancas06SCFVTotal = 0;

    @Column(name = "criancas714SCFVTotal", nullable = false)
    private Integer criancas714SCFVTotal = 0;

    @Column(name = "adolescentes1517SCFVTotal", nullable = false)
    private Integer adolescentes1517SCFVTotal = 0;

    @Column(name = "adultosSCFVTotal", nullable = false)
    private Integer adultosSCFVTotal = 0;

    @Column(name = "idososSCFVTotal", nullable = false)
    private Integer idososSCFVTotal = 0;

    @Column(name = "palestrasOficinasTotal", nullable = false)
    private Integer palestrasOficinasTotal = 0;

    @Column(name = "pessoasDeficienciaTotal", nullable = false)
    private Integer pessoasDeficienciaTotal = 0;

    // Novo campo para total de encaminhamentos
    @Column(name = "encaminhamentosTotal", nullable = false)
    private Integer encaminhamentosTotal = 0;

    // Construtor que aceita um mês
    public ResumoMensal(String mes) {
        this.mes = mes;
    }

    public int getTotalEncaminhamentos() {
        return encaminhamentosTotal;
    }

    public void incrementarTotalEncaminhamentos() {
        this.encaminhamentosTotal++;
    }
}
