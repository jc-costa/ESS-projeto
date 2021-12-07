@i9n
Feature: Realização de um Pedido
    Como cliente
    Eu quero pedir os itens no meu carrinho de compras
    Para que eu possa recebe-los em casa

    Scenario: Pedido bem sucedido
        Given Eu estou na página do carrinho de compras
        And Eu tenho o item "Pizza Grande" do restaurante "Pizza Hut" no meu carrinho
        When Eu clico no botão "Confirmar"
        And O pagamento é bem sucedido
        Then Eu sou levado para a página do pedido em andamento

    Scenario: Pedido mal sucedido
        Given Eu estou na página do carrinho de compras
        And Eu tenho o item "Pizza Grande" do restaurante "Pizza Hut" no meu carrinho
        When Eu clico no botão "Confirmar"
        And O pagamento é mal sucedido
        Then Eu continuo na página do carrinho e nada muda

    Scenario: Carrinho Vazio - Botão desativado
        Given Eu estou na página do carrinho de compras
        And O carrinho está vazio
        Then O botão "Confirmar" está desativado

    Scenario: Pedido fora do Horário
        Given Eu estou na página do carrinho de compras
        And Eu tenho o item "Pizza Grande" do restaurante "Pizza Hut" no meu carrinho
        And o restaurante fecha as "22:00"
        When Eu clico no botão "Confirmar"
        Then Eu recebo uma mensagem de erro dizendo "O restaurante não está mais recebendo pedidos"        