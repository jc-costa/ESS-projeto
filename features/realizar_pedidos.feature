@i9n
Feature: Realização de um Pedido
    Como cliente
    Eu quero pedir os itens no meu carrinho de compras
    Para que eu possa recebe-los em casa

    Scenario: Pedido com sucesso
        Given Eu tenho um carrinho de compras com itens de um restaurante
        When Eu realizo o pedido
        Then Eu recebo uma confirmação do pedido
    
    Scenario: Pedido com item em falta substituído
        Given Eu tenho um carrinho de compras com itens de um restaurante
        When Eu realizo o pedido
        And Eu recebo uma mensagem informando que o item está em falta
        And Eu substituo o item
        Then Eu recebo uma confirmação do pedido

    Scenario: Pedido com item em falta ignorado
        Given Eu tenho um carrinho de compras com itens de um restaurante
        When Eu realizo o pedido
        And Eu recebo uma mensagem informando que o item está em falta
        And Eu informo que não quero o item
        Then Eu recebo uma confirmação do pedido

    Scenario: Pedido cancelado pelo restaurante
        Given Eu tenho um carrinho de compras com itens de um restaurante
        And O restaurante não pode atender o meu pedido
        When Eu realizo o pedido
        Then Eu recebo uma mensagem informando que o pedido foi cancelado pelo restaurante
        