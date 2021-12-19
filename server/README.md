# O Servidor

O servidor contém a implementacão da lógica de back-end das features desse projeto. Ele implementa uma API que é utilizada pelo front-end.

## Organizacão

O arquivo `server.ts` contém a implementacão da API em si, com os endpoints.

Dentro da pasta `src` estão as implementacões das classes que são utilizadas internamente no servidor para a modelagem das diferentes partes do sistema:

1. `carrinho.ts` contém a implementacão da lógica do carrinho de compras
2. `pedido.ts` contém a implementacão da lógica dos pedidos
3. etc.

Ainda dentro da pasta `src` há a pasta `interfaces`, onde estão as implementacões de interfaces de padrões de projeto que são extendidas pelas classes do modelo.

Na pasta `specs` estão as implementacões dos testes.

## Modelagem



## Como utilizar

O servidor é implementado em node.js, fazendo uso de typescript, de forma que é necessário que ambas essas ferramentas estejam instaladas na máquina. Além disso, o funcionamento do módulo depende de outros módulos do node.js. Esses módulos estão detalhados no arquivo `package.json` e podem ser facilmente instalados com o comando

```sh
npm install
```

Após isso, o servidor pode ser executado com

```sh
npm start
```

Isso fará com que o servidor inicialize, escutando requisicões na porta 3000 (`localhost:3000`)

Para rodar os testes, o comando abaixo pode ser utilizado:

```sh
npm test
```

## Endpoints