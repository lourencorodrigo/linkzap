# Política de Privacidade — LinkZap

_Última atualização: 21 de setembro de 2026_

## Resumo

O LinkZap **não coleta, não armazena e não transmite nenhum dado pessoal.**
Não há servidores, banco de dados, contas de usuário, analytics ou rastreamento.

## Quais dados a extensão acessa

Apenas o **texto que você seleciona em uma página**, e somente no momento em que
você aciona a extensão — seja clicando no ícone dela ou escolhendo o item
"Abrir no WhatsApp" no menu do botão direito.

Esse texto é processado exclusivamente na memória do seu navegador, para
identificar um número de telefone e montar o link da conversa. Depois disso, é
descartado. Nada é gravado em disco, nem enviado para fora do seu dispositivo.

A extensão **não** lê o conteúdo das páginas que você visita, não observa sua
navegação e não é acionada sozinha.

## Permissões e por que são necessárias

- **activeTab** — acesso temporário à aba ativa, concedido pelo seu clique, para
  ler o texto selecionado. Limitado àquela aba e àquela interação.
- **scripting** — executar, no momento do clique, uma função que apenas lê a
  seleção (`window.getSelection()`). Ela não altera a página.
- **contextMenus** — adicionar o item "Abrir no WhatsApp" ao menu do botão
  direito quando há texto selecionado.

A extensão não solicita permissões de host e não tem acesso permanente a
nenhum site.

## Abertura do WhatsApp

Ao confirmar a ação, a extensão abre `https://wa.me/<número>` em uma nova aba.
O número vai na URL, como em qualquer link que você clicasse normalmente. A
partir daí, valem os termos e a política de privacidade do WhatsApp, sobre os
quais o LinkZap não tem qualquer controle.

## Compartilhamento com terceiros

Nenhum. Não vendemos, não transferimos e não compartilhamos dados, porque não
há dados coletados.

## Alterações

Se esta política mudar, a nova versão será publicada nesta mesma página, com a
data de atualização revisada.

## Contato

Dúvidas sobre esta política: rsilvape@gmail.com
