@i9n
Feature: Cancelamento de pedidos
    As a Como um cliente
    I want uma área na qual eu possa cancelar meu pedido, caso não tenha chegado
    so that Eu posso cancelar meu pedido
    
    Scenario: Cancelar pedido
        Given Estou na página com meus pedidos realizados
        And o pedido "Pizza Grande" ainda não está em preparação
        When Eu clico no pedido "Pizza Grande"
        And Eu clico no botão "Cancelar"
        Then O pedido é cancelado    

    Scenario: Cancelar pedido em preparação
        Given Estou na página com meus pedidos realizados
        And o pedido "Pizza Grande" está em preparação
        When Eu clico no pedido "Pizza Grande"
        And Eu clico no botão "Cancelar"
        Then O pedido é cancelado

    Scenario: Confirmar cancelamento de pedido pronto
        Given Estou na página com meus pedidos realizados
        And o pedido "Pizza Grande" está pronto
        When Eu clico no pedido "Pizza Grande"
        And Eu clico no botão "Cancelar"
        Then A mensagem "Uma taxa de R$ x será cobrada pelo cancelamento" aparece na tela
        And e as opções de "Confirmar" e "Cancelar"
        When Eu clico em "Confirmar"
        Then O pedido é cancelado cobrando uma taxa "R$ x"

    Scenario: Cancelar cancelamento de pedido pronto
        Given Estou na página com meus pedidos realizados
        And o pedido "Pizza Grande" está pronto
        When Eu clico no pedido "Pizza Grande"
        And Eu clico no botão "Cancelar"
        Then A mensagem "Uma taxa de R$ x será cobrada pelo cancelamento" aparece na tela
        And e as opções de "Confirmar" e "Cancelar"
        When Eu clico em "Cancelar"
        Then Eu sou redirecionado a tela do pedido

    Scenario: Cancelar pedido a caminho
        Given Estou na página com meus pedidos realizados
        And o pedido "Pizza Grande" está pronto
        When Eu clico no pedido "Pizza Grande"
        And Eu clico no botão "Cancelar"
        Then A mensagem "Uma taxa de R$ x será cobrada pelo cancelamento" aparece na tela
        And e as opções de "Confirmar" e "Cancelar"
        When Eu clico em "Confirmar"
        Then O pedido é cancelado cobrando uma taxa "R$ x"
        
