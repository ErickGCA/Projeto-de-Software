import React, { useState } from "react";
import styles from "./GerenciarUsuario.module.css";
import Menu from "./Menu";
import Sidebar from "./Sidebar";

function GerenciarUsuario() {
  const [showHelp, setShowHelp] = useState(false); // Estado para exibir o modal de ajuda

  const handleBackClick = () => {
    window.history.back();
  };

  const handleHelpClick = () => {
    setShowHelp(true);
  };

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <div className={styles.content}>
          <div className={styles.column}>
            <Sidebar onHelpClick={handleHelpClick} />
          </div>
          <div className={styles.column}>
            <Menu />
          </div>
        </div>
      </section>

      {/* Modal de ajuda */}
      {showHelp && (
        <div className={styles.modalOverlay} onClick={() => setShowHelp(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Instruções para Gerenciar Usuário</h2>
            <p>
              Na página de gerenciamento de usuários, você pode realizar algumas
              ações relacionadas aos usuários registrados no sistema. Abaixo
              estão as instruções para utilizá-las:
            </p>
            <ol>
              <li>
                <b> Pesquisar pelo Nome do Usuário:</b>
              </li>
              <p>
                Utilize o campo de pesquisa para localizar um usuário pelo nome.
                Digite o nome completo ou parte do nome do usuário que deseja
                pesquisar. Quanto mais específico for o nome informado, mais
                rápida e precisa será a busca.
              </p>

              <li>
                <b> Botão Criar:</b>
              </li>
              <p>
                Clique no botão "Criar" para adicionar um novo usuário ao
                sistema. Um formulário será exibido para que você preencha os
                dados necessários do novo usuário. Certifique-se de preencher
                todos os campos obrigatórios corretamente antes de salvar o novo
                registro.
              </p>

              <li>
                <b> Botão Editar:</b>
              </li>
              <p>
                Após localizar um usuário, você pode clicar no botão "Editar" ao
                lado do registro correspondente. Isso permitirá que você
                modifique as informações do usuário, como nome, telefone,
                endereço, entre outros. Lembre-se de revisar as alterações antes
                de salvar para garantir que os dados estão corretos.
              </p>

              <li>
                <b> Botão Desativar:</b>
              </li>
              <p>
                Se for necessário desativar um usuário do sistema, clique no
                botão "Desativar" ao lado do registro. Para ativar, basta clicar
                novamente.
              </p>
              <p>
                O perfil secretaria é designado para as secretárias. O ADM para
                a assistente social com maior hierarquia. ASSISTENTE para as
                demais assistentes e o OUTROS para os demais usuarios
              </p>
            </ol>

            <h3>Dicas:</h3>
            <ul>
              <li>
                Certifique-se de que o nome do usuário está correto ao realizar
                a pesquisa para obter resultados precisos.
              </li>
              <li>
                Revise as informações cuidadosamente antes de salvar alterações
                ou desativar um usuário para evitar erros.
              </li>
              <li>
                Caso precise adicionar um novo usuário, verifique se todos os
                dados estão completos no formulário de criação.
              </li>
            </ul>

            <button
              className={styles.closeButton}
              onClick={() => setShowHelp(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default GerenciarUsuario;
