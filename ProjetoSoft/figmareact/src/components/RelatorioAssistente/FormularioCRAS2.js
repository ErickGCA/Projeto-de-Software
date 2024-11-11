import React, { forwardRef } from "react";

const FormularioCRAS2 = forwardRef(({ dados }, ref) => {
  return (
    <div
      ref={ref}
      className="w-[21cm] min-h-[29.7cm] bg-white p-8 mx-auto font-sans text-sm print:text-black"
    >
      {/* Título e Cabeçalho */}
      <div className="text-center font-bold mb-2 text-black">
        FORMULÁRIO DE REGISTRO MENSAL DE ATENDIMENTOS DO CRAS
      </div>

      <div className="mb-3 text-black">
        <div className="mb-1">MÊS: {dados?.mes || "____"}</div>
      </div>

      {/* Bloco I */}
      <div className="mb-4">
        <div className="font-bold mb-1 text-white bg-green-600 p-1">
          Bloco I - Famílias em acompanhamento pelo PAIF
        </div>

        <table className="w-full border-collapse mb-2">
          <thead>
            <tr className="bg-green-100">
              <th className="border border-black p-1 text-left">
                A. Volume de famílias em acompanhamento pelo PAIF
              </th>
              <th className="border border-black p-1 w-20 text-center">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="border border-black p-1">
                A.1. Total de famílias em acompanhamento pelo PAIF
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.familiasPAIF || 0}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-black p-1">
                A.2. Novas famílias inseridas no acompanhamento do PAIF durante
                o mês de referência
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.novasFamiliasPAIF || 0}
              </td>
            </tr>
          </tbody>
        </table>

        <table className="w-full border-collapse mb-2">
          <thead>
            <tr className="bg-green-100">
              <th className="border border-black p-1 text-left">
                B. Perfil das novas famílias inseridas em acompanhamento no PAIF
                no mês de referência
              </th>
              <th className="border border-black p-1 w-20 text-center">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="border border-black p-1">
                B.1. Famílias em situação de extrema pobreza
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.familiasExtremaPobreza || 0}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-black p-1">
                B.2. Famílias beneficiárias do Programa Bolsa Família
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.bolsaFamilia || 0}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="border border-black p-1">
                B.3. Famílias beneficiárias do Programa Bolsa Família em
                descumprimento de condicionalidades
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.descumprimentoCondicionalidades || 0}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-black p-1">
                B.4. Famílias com membros beneficiários do BPC
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.bpc || 0}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="border border-black p-1">
                B.5. Famílias com crianças ou adolescentes em situação de
                trabalho infantil
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.trabalhoInfantil || 0}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-black p-1">
                B.6. Famílias com crianças ou adolescentes em Serviço de
                Acolhimento
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.acolhimento || 0}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="text-xs italic bg-green-50 p-2 border border-black">
          Atenção! Os itens B1 a B6 identificam apenas alguns perfis de
          famílias. É normal que algumas famílias contadas no item A2 não se
          enquadrem em nenhuma das condições acima, enquanto outras podem se
          enquadrar simultaneamente em mais de uma condição. Portanto, a soma de
          B1 a B6 não terá, necessariamente, o mesmo valor relatado em A2.
        </div>
      </div>

      {/* Bloco II */}
      <div className="mb-4">
        <div className="font-bold mb-1 text-white bg-green-600 p-1">
          Bloco 2 - Atendimentos particularizados realizados no CRAS
        </div>

        <table className="w-full border-collapse mb-2">
          <thead>
            <tr className="bg-green-100">
              <th className="border border-black p-1 text-left">
                C. Volume de atendimentos particularizados realizados no CRAS no
                mês de referência
              </th>
              <th className="border border-black p-1 w-20 text-center">
                Quantidade
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="border border-black p-1">
                C.1. Total de atendimentos particularizados realizados no mês de
                referência
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.atendimentosCRAS || 0}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-black p-1">
                C.2. Famílias encaminhadas para inclusão no Cadastro Único
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.cadastroUnico || 0}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="border border-black p-1">
                C.3. Famílias encaminhadas para atualização cadastral no
                Cadastro Único
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.atualizacaoCadastral || 0}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-black p-1">
                C.4. Indivíduos encaminhados para acesso ao BPC
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.bpcIndividuos || 0}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="border border-black p-1">
                C.5. Famílias encaminhadas para o CREAS
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.creas || 0}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-black p-1">
                C.6. Visitas domiciliares realizadas
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.visitasDomiciliares || 0}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="border border-black p-1">
                C.7. Total de auxílios-natalidade concedidos/entregues durante o
                mês de referência
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.auxiliosNatalidade || 0}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-black p-1">
                C.8. Total de auxílios-funeral concedidos/entregues durante o
                mês de referência
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.auxiliosFuneral || 0}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="border border-black p-1">
                C.9. Outros benefícios eventuais concedidos/entregues durante o
                mês de referência
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.outrosBeneficios || 0}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="text-xs italic bg-green-50 p-2 border border-black">
          Atenção! Nos campos C1 a C6 devem ser contabilizadas todas as
          famílias/indivíduos, independente de estarem, ou não, em
          acompanhamento sistemático do PAIF. Nos campos C7, C8 e C9, considere
          os auxílios e os benefícios eventuais concedidos e /ou entregues no
          CRAS. Caso o CRAS não conceda nem entregue auxílios ou
          benefícios-eventuais marque 0 (zero) nos respectivos campos.
        </div>
      </div>

      {/* Bloco III */}
      <div className="mb-4">
        <div className="font-bold mb-1 text-white bg-green-600 p-1">
          Bloco 3 - Atendimentos coletivos realizados no CRAS
        </div>

        <table className="w-full border-collapse mb-2">
          <thead>
            <tr className="bg-green-100">
              <th className="border border-black p-1 text-left">
                D. Volume de atendimentos coletivos realizados no CRAS durante o
                mês de referência
              </th>
              <th className="border border-black p-1 w-20 text-center">
                Quantidade
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="border border-black p-1">
                D.1. Famílias participando regularmente de grupos no âmbito do
                PAIF
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.familiasParticipantesPAIF || 0}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-black p-1">
                D.2. Crianças de 0 a 6 anos em Serviços de Convivência e
                Fortalecimento de Vínculos
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.criancas06SCFV || 0}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="border border-black p-1">
                D.3. Crianças/adolescentes de 7 a 14 anos em Serviços de
                Convivência e Fortalecimento de Vínculos
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.criancas714SCFV || 0}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-black p-1">
                D.4. Adolescentes de 15 a 17 anos em Serviços de Convivência e
                Fortalecimento de Vínculos
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.adolescentes1517SCFV || 0}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="border border-black p-1">
                D.8. Adultos entre 18 e 59 anos em Serviços de Convivência e
                Fortalecimento de Vínculos
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.adultosSCFV || 0}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-black p-1">
                D.5. Idosos em Serviços de Convivência e Fortalecimento de
                Vínculos para idosos
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.idososSCFV || 0}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="border border-black p-1">
                D.6. Pessoas que participaram de palestras, oficinas e outras
                atividades coletivas de caráter não continuado
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.palestrasOficinas || 0}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-black p-1">
                D.7. Pessoas com deficiência, participando dos Serviços de
                Convivência ou dos grupos do PAIF
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.pessoasDeficiencia || 0}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="text-xs italic bg-green-50 p-2 border border-black">
          * Apesar dos serviços de convivência não estarem mais vinculados a
          faixas etárias, para facilidade de registro, os usuários devem ser
          contabilizados de acordo com a sua idade, independente de estarem, ou
          não, no mesmo grupo.
        </div>
      </div>

      <div className="mt-6 text-black">
        <div className="mt-2 border-b border-black"></div>
        <div className="mt-4">
          <div className="mt-4 text-center"></div>
        </div>
      </div>
    </div>
  );
});

FormularioCRAS2.displayName = "FormularioCRAS2";

export default FormularioCRAS2;
