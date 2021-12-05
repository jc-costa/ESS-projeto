@i9n
Feature: Carrinho de Compras
    Como um cliente
    Eu quero ter um carrinho de compras ao qual eu possa adicionar, remover, e modificar itens
    Para que eu possa montar o meu pedido antes de realizá-lo

    Scenario: Adicionar item
        Given Estou na pagina do item que desejo pedir
        When Eu clico no botão "Adicionar"
        Then O item é adicionado ao carrinho    

    Scenario: Remover item
        Given Estou na pagina do carrinho
        And o item "Pizza Grande" está no carrinho 
        When Eu clico no item "Pizza Grande"
        And Eu clico no botão "Remover"
        Then O item "Pizza Grande" é removido ao carrinho

    Scenario: Modificar item
        Given Estou na pagina do carrinho
        And o item "Pizza Grande" está no carrinho 
        When Eu clico no item "Pizza Grande"
        And Eu clico no botões "+" ou "-"
        And Eu clico no botão "Atualizar"
        Then A quantidade do item "Pizza Grande" é Atualizada no carrinho
        
    Scenario: Limpar Carrinho
        Given Estou na pagina do carrinho
        When Eu clico no botão "Limpar"
        Then Todos os items são removidos do carrinho
        And A mensagem "Seu carrinho está vazio" aparece na tela