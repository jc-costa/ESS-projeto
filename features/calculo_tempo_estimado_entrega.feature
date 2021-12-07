@i9n
Feature: Cálculo do tempo estimado de entrega
    Como um cliente
    Eu quero ter uma estimativa de quanto tempo irá levar para o meu pedido ser entegue

    Scenario: Consultar tempo de um pedido
        Given Estou na página de "Pedidos"
        When Eu clico no pedido "Pizza Grande"
        Then As informações do pedido como "Preço", "Data do pedido" e "Tempo estimado" são exibidas

