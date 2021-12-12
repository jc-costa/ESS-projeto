@i9n
Feature: Cálculo do tempo estimado de entrega
     Scenario: Consultar tempo de um pedido
        Given Estou na página de "Pedidos"
        When Eu clico no pedido "Pizza Grande"
        Then As informações do pedido como "Preço", "Data do pedido" e "Tempo estimado" são exibidas

