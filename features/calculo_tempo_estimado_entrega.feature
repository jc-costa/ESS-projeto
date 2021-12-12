@i9n
Feature: Cálculo do tempo estimado de entrega
   As a cliente
   I want to ter uma estimativa de quanto tempo irá levar para o meu pedido ser entegue
   so that Eu posso consultar o tempo de um pedido

   Scenario: Consultar tempo de um pedido
      Given Estou na página de "Pedidos"
      When Eu clico no pedido "Pizza Grande"
      Then As informações do pedido como "Preço", "Data do pedido" e "Tempo estimado" são exibidas

