@i9n
Feature: Notificação da confirmação de um pedido
    Como um cliente
    Eu quero saber se o meu pedido foi confirmado pelo restaurante

    Scenario: Notificação do pedido
        Given Estou na página do aplcativo
        When O restaurante aceita o pedido "Pizza Grande"
        Then Uma notificação do tipo "Alert" aparecerá na tela com a mensagem "O pedido #n° foi confirmado"