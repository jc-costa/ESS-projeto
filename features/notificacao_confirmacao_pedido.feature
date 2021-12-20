@i9n
Feature: Notificação da confirmação de um pedido
    Como um cliente
    Eu quero saber se o meu pedido foi confirmado pelo restaurante

    Scenario: Pedido Confirmado sem Problemas
        Given Estou na página do aplicativo
        When O restaurante aceita o pedido "Pizza Grande"
        Then Uma notificação do tipo "Alert" aparecerá na tela com a mensagem "O pedido #n° foi confirmado"

    Scenario: Pedido Recusado (Na página do pedido)
        Given Eu realizei o pedido do item "Pizza Grande" no restaurante "Pizza Hut"
        And Estou na página do pedido
        When O restaurante rejeita o pedido
        Then Uma notificação do tipo "Alert" aparecerá na tela com a mensagem "O pedido #n° foi rejeitado"

    Scenario: Pedido Recusado (Notificação)
        Given Eu realizei o pedido do item "Pizza Grande" no restaurante "Pizza Hut"
        And Eu não estou na página do pedido
        When O restaurante rejeita o pedido
        Then Uma notificação do tipo "Alert" aparecerá na tela com a mensagem "O pedido #n° foi rejeitado"

    Scenario: Item em falta
        Given Eu realizei o pedido do item "Pizza Grande" no restaurante "Pizza Hut"
        When O restaurante informa que o item "Pizza Grande" está em falta
        Then Uma notificação do tipo "Alert" aparecerá na tela com a mensagem "O item #item do pedido #n° está em falta"
        And Uma notificação do tipo "Confirm" aparecerá na tela com a mensagem "Deseja substituir o item #item do pedido #n°?"