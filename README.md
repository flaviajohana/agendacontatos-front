# Agenda de contatos

> Front-end para o sistema de agenda de contatos.

## Sobre o Sistema
O sistema de agenda de contatos tem como objetivo armazenar dados de contatos (nome telefone celular e email).

## Implementação
Para a implementação foi utilizado o framework vue.js (https://vuejs.org/), com a adição do framework Vuetify (https://vuetifyjs.com/en/) para a estrutura de componentes e design do sistema.
As demais dependências encontram-se no arquivo de configuração package.json.
Para gerenciamento de dependências foi utilizado o Yarn (https://yarnpkg.com/)

## Deployment

É necessário criar um arquivo chamado .env para informar a url do back-end
> VUE_APP_URL=<url>

``` bash
# Instalação de dependências
yarn install

> Em algumas distribuições Unix, o comando acima pode apresentar problemas quanto à instalação da dependência do pacote phantomjs. Caso ocorra, antes do comando acima, execute:

yarn install phantomjs-prebuilt@2.1.14 --ignore-scripts

# Para execução no ambiente de desenvolvimento
yarn serve

# Para execução no ambiente de homologação/produção
yarn build
