import React, { forwardRef } from "react";

const FormularioCRAS = forwardRef(({ dados }, ref) => {
  return (
    <div
      ref={ref}
      className="w-[21cm] min-h-[29.7cm] bg-white p-8 mx-auto font-sans text-sm"
    >
      {/* Título */}
      <div className="text-center font-bold mb-4">
        FORMULÁRIO DE REGISTRO MENSAL DE ATENDIMENTOS DO CRAS
      </div>

      {/* Cabeçalho */}
      <div className="mb-4">
        <div className="flex gap-4 mb-2">
          <div>
            MÊS:{" "}
            <span className="border-b border-black px-2">
              {dados?.mes || "____"}
            </span>{" "}
            / 20{" "}
            <span className="border-b border-black px-2">
              {dados?.ano || "_____"}
            </span>
          </div>
        </div>
        <div className="mb-2">
          Nome da Unidade:{" "}
          <span className="border-b border-black px-2">
            {dados?.nomeUnidade || "_______________________________________"}
          </span>
          Nº da Unidade:{" "}
          <span className="font-mono">
            |__|__|__|__|__|__|__|__|__|__|__|__|
          </span>
        </div>
        <div className="mb-2">
          Endereço:{" "}
          <span className="border-b border-black px-2">
            {dados?.endereco ||
              "________________________________________________________________________________________________"}
          </span>
        </div>
        <div>
          Município:{" "}
          <span className="border-b border-black px-2">
            {dados?.municipio ||
              "_________________________________________________________________________________________"}
          </span>
          UF:{" "}
          <span className="border-b border-black px-2">
            {dados?.uf || "____"}
          </span>
        </div>
      </div>

      {/* Bloco I */}
      <div className="mb-6">
        <div className="font-bold mb-2">
          Bloco I - Famílias em acompanhamento pelo PAIF
        </div>

        <table className="w-full border-collapse mb-4">
          <thead>
            <tr>
              <th className="border border-black p-1 text-left font-bold">
                A. Volume de famílias em acompanhamento pelo PAIF
              </th>
              <th className="border border-black p-1 w-24 text-center font-bold">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1">
                A.1. Total de famílias em acompanhamento pelo PAIF
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.totalFamilias || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                A.2. Novas famílias inseridas no acompanhamento do PAIF durante
                o mês de referência
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.novasFamilias || ""}
              </td>
            </tr>
          </tbody>
        </table>

        <table className="w-full border-collapse mb-2">
          <thead>
            <tr>
              <th className="border border-black p-1 text-left font-bold">
                B. Perfil das novas famílias inseridas em acompanhamento no PAIF
                no mês de referência
              </th>
              <th className="border border-black p-1 w-24 text-center font-bold">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1">
                B.1. Famílias em situação de extrema pobreza
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.familiasExtremaPobrezaTotal || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                B.2. Famílias beneficiárias do Programa Bolsa Família
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.familiasBolsaFamilia || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                B.3. Famílias beneficiárias do Programa Bolsa Família em
                descumprimento de condicionalidades
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.familiasBolsaFamiliaDescumprimento || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                B.4. Famílias com membros beneficiários do BPC
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.familiasBPC || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                B.5. Famílias com crianças ou adolescentes em situação de
                trabalho infantil
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.familiasTrabalhoInfantil || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                B.6. Famílias com crianças ou adolescentes em Serviço de
                Acolhimento
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.familiasAcolhimento || ""}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="text-xs italic bg-gray-100 p-2 border border-black">
          Atenção! Os itens B1 a B6 identificam apenas alguns perfis de
          famílias. É normal que algumas famílias contadas no item A2 não se
          enquadrem em nenhuma das condições acima, enquanto outras podem se
          enquadrar simultaneamente em mais de uma condição. Portanto, a soma de
          B1 a B6 não terá, necessariamente, o mesmo valor relatado em A2.
        </div>
      </div>

      {/* Bloco II */}
      <div className="mb-6">
        <div className="font-bold mb-2">
          Bloco 2 - Atendimentos particularizados realizados no CRAS
        </div>

        <table className="w-full border-collapse mb-2">
          <thead>
            <tr>
              <th className="border border-black p-1 text-left font-bold">
                C. Volume de atendimentos particularizados realizados no CRAS no
                mês de referência
              </th>
              <th className="border border-black p-1 w-24 text-center font-bold">
                Quantidade
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1">
                C.1. Total de atendimentos particularizados realizados no mês de
                referência
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.totalAtendimentos || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                C.2. Famílias encaminhadas para inclusão no Cadastro Único
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.familiasEncaminhadasCadUnico || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                C.3. Famílias encaminhadas para atualização cadastral no
                Cadastro Único
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.familiasAtualizacaoCadUnico || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                C.4. Indivíduos encaminhados para acesso ao BPC
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.individuosEncaminhadosBPC || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                C.5. Famílias encaminhadas para o CREAS
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.familiasEncaminhadasCREAS || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                C.6. Visitas domiciliares realizadas
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.visitasDomiciliares || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                C.7. Total de auxílios-natalidade concedidos/entregues durante o
                mês de referência
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.auxiliosNatalidade || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                C.8. Total de auxílios-funeral concedidos/entregues durante o
                mês de referência
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.auxiliosFuneral || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                C.9. Outros benefícios eventuais concedidos/entregues durante o
                mês de referência
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.outrosBeneficios || ""}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="text-xs italic bg-gray-100 p-2 border border-black">
          Atenção! Nos campos C1 a C6 devem ser contabilizadas todas as
          famílias/indivíduos, independente de estarem, ou não, em
          acompanhamento sistemático do PAIF. Nos campos C7, C8 e C9, considere
          os auxílios e os benefícios eventuais concedidos e /ou entregues no
          CRAS. Caso o CRAS não conceda nem entregue auxílios ou
          benefícios-eventuais marque 0 (zero) nos respectivos campos.
        </div>
      </div>

      {/* Bloco III */}
      <div className="mb-6">
        <div className="font-bold mb-2">
          Bloco 3 - Atendimentos coletivos realizados no CRAS
        </div>

        <table className="w-full border-collapse mb-2">
          <thead>
            <tr>
              <th className="border border-black p-1 text-left font-bold">
                D. Volume de atendimentos coletivos realizados no CRAS durante o
                mês de referência
              </th>
              <th className="border border-black p-1 w-24 text-center font-bold">
                Quantidade
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1">
                D.1. Famílias participando regularmente de grupos no âmbito do
                PAIF
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.familiasPAIF || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                D.2. Crianças de 0 a 6 anos em Serviços de Convivência e
                Fortalecimento de Vínculos
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.criancas0a6 || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                D.3. Crianças/adolescentes de 7 a 14 anos em Serviços de
                Convivência e Fortalecimento de Vínculos
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.criancas7a14 || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                D.4. Adolescentes de 15 a 17 anos em Serviços de Convivência e
                Fortalecimento de Vínculos
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.adolescentes15a17 || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                D.8. Adultos entre 18 e 59 anos em Serviços de Convivência e
                Fortalecimento de Vínculos
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.adultos18a59 || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                D.5. Idosos em Serviços de Convivência e Fortalecimento de
                Vínculos para idosos
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.idosos || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                D.6. Pessoas que participaram de palestras, oficinas e outras
                atividades coletivas de caráter não continuado
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.pessoasAtividadesColetivas || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">
                D.7. Pessoas com deficiência, participando dos Serviços de
                Convivência ou dos grupos do PAIF
              </td>
              <td className="border border-black p-1 text-center">
                {dados?.pessoasDeficiencia || ""}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="text-xs italic bg-gray-100 p-2 border border-black">
          * Apesar dos serviços de convivência não estarem mais vinculados a
          faixas etárias, para facilidade de registro, os usuários devem ser
          contabilizados de acordo com a sua idade, independente de estarem, ou
          não, no mesmo grupo.
        </div>
      </div>

      {/* Responsável */}
      <div className="mt-8">
        <div>Nome e cargo da pessoa responsável no CRAS pelas informações:</div>
        <div className="mt-4 border-b border-black">
          {dados?.responsavelNome ||
            "_________________________________________________________________________"}
        </div>
      </div>
    </div>
  );
});

export default FormularioCRAS;
