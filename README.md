# ESS-projeto

Esse projeto consiste na implementacão das features relacionadas ao processo de realizacão e gerência de um pedido em um app de delivery de comida.

## Implementacão

O projeto é dividido em duas partes: o servidor, que implementa uma API RESTful, e o front-end, que apresenta uma interface web.

O servidor foi implementado em Typescript, fazendo uso de Node.js, enquanto que o front-end foi implementado em Vue.js.

## O Servidor

### Modelagem

O projeto pode ser dividido em duas grandes partes que interagem entre si, o carrinho de compras, e o pedido em si.

O carrinho de compras é onde o usuário armazena preliminarmente os itens que pretende pedir a medida que os escolhe do cardápio. Um carrinho de compras deve conter apenas item de único restaurante, como foi decidido em discussão com os stakeholders. O carrinho pode ter itens adicionados a si. Esses itens podem ser atualizados ou removidos depois disso. Além disso, o carrinho pode rápidamente ser limpo.

Uma vez que o usuário esteja satisfeito com seu carrinho, e deseje realizar o pedido, isso pode ser feito, criando um objeto especial Pedido, baseado no carrinho. O pedido tem as informacões sobre os itens do carrinho, porém estes se tornam agora imutaveis, e outras informacões são adicionadas, como informacões sobre o valor final, e data e hora do pedido. Além disso, um pagamento deve ser realizado pelo sistema de pagamentos (implementado por uma outra equipe e apenas *mockado* neste projeto). Após isso, o pedido é enviado para o restaurante, tornando-se uma comanda com a qual o restaurante pode interagir. A mudanca no status da comanda, realizada pelo restaurante, pode ser observada pelo pedido, que sua vez pode modificar seu próprio status de acordo, o que permite a notificacão ao usuário, etc.

### Padrões de projeto utilizados

Neste projeto, fomos guiados quase unicamente pelo paradigma orientado a objetos, com cada uma das entidades do projeto sendo implementada como uma classe. Além disso, fizemos uso do padrão [Observer](https://en.wikipedia.org/wiki/Observer_pattern) para que o usuário possa ser notificado das atualizacões ao seu pedido, e o pedido possa ser notificado das atualizacões de seu pagamento e comanda. Além disso, implementamos uma classe usando o padrão [Singleton](https://en.wikipedia.org/wiki/Singleton_pattern) para ser usada na simulacao do servico de pagamentos.

O objetivo com o uso do padrão Observer foi reduzir a acoplagem entre as classes usuário, pedido, e restaurante, permitindo entregar uma interface diferente ao usuário daquela que é entregue ao restaurante, uma vez que essas classes, conceitualmente, tem interacões (e "interesses") diferentes com um pedido.

### Endpoints

* `GET /usuario/:id/carrinho`: Retorna o carrinho de compras do usuário com a dada ID.
* `POST /usuario/:id/carrinho`: Adiciona o item passado no corpo da requisicão ao carrinho de compras do usuário com a dada ID. Retorna o carrinho atualizado.
* `DELETE /usuario/:id/carrinho/:idItem`: Remove o item com a dada idItem do carrinho de compras do usuário com a dada ID. Retorna o carrinho atualizado.
* `DELETE /usuario/:id/carrinho`: Limpa o carrinho de compras do usuário com a dada ID. Retorna o carrinho atualizado.
* `PUT /usuario/:id/carrinho`: Atualiza o item passado no corpo da requisicão no carrinho de compras do usuário com a dada ID. Retorna o carrinho atualizado.
* `GET /usuario/:id/carrinho/total`: Retorna o valor total do carrinho de compras do usuário com a dada ID.
* `GET /usuario/:id/pedido`: Retorna todos os pedidos do usuário com a dada ID.
* `POST /usuario/:id/pedido`: Cria um novo pedido a partir do carrinho de compras do usuário, retornando a lista de pedidos do usuário atualizada.
* `PUT /usuario/:id/pedidos/:idPedido/cancelar`: Cancela o pedido com a dada ID, retornando a lista de pedidos do usuário atualizada.

Além desses endpoints, que são os diretamente relevantes à implementacão das features desse projeto, nós apresentamos também algumas endpoints auxiliares:

* `GET /login`: Simula o processo de login de um usuário, sendo usada para permitir a demonstracão do fato de que o carrinho é individual.
* `GET /usuario/:id`: Pega o nome do usuário com a dada ID para que possa ser apresentado na interface.
* `POST /configs`: Permite que algumas configuracões de teste sejam definidas, como o comportamento esperado das APIs externas.

### Testes

No servidor, nós temos dois tipos de testes sendo realizados: testes unitários e testes de endpoint. Os testes unitário estão associados as funcionalidades das duas principais classes: Carrinho e Pedido. Já os testes de endpoint testam se os códigos de status são os esperados.

### Execucão

Para rodar o servidor, basta entrar na pasta `/server` e executar o comando `npm start`. Isso requer, é claro, que as devidas dependências (detalhadas no arquivo `package.json`) estejam instaladas, o que pode ser feito com o comando `npm install`.

Os testes podem ser executados com `npm test`, com as mesmas condicões acima.

Além disso, o comando `npm test:commit` pode ser utilizado para testar apenas a versão que será criada com o próximo commit (ou seja, ele usa apenas as modificacões que estão na *staging area* do git para os testes, descartando temporariamente qualquer modificacão que não vá ser adicionada no commit).

## Front-End

### Testes

Ao rodar os testes end-to-end, o front-end faz modificacões no servidor, de forma que este precisa ser reiniciado antes de uma segunda testagem.