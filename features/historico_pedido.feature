@i9n
Feature: Histórico de Pedidos
    Como um cliente
    Eu quero ter a possbilidade de ver todos os pedidos realizados por mim e o que foi comprado

    Scenario: Exibir o histórico de pedidos
        Given Estou na página do aplicativo
        When Eu clico no botão "Pedidos"
        Then Uma página contendo todos os pedidos é exibida

    Scenario: Exibir o histórico de um pedido
        Given Estou na página de Pedidos
        When Eu clico no pedido "Pizza Grande"
        Then As informações de "N° Pedido", "Preço" e "Data do pedido" são exibidas
        