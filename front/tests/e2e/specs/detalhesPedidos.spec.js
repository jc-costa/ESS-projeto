/// <reference types ="cypress" />

//Testa se ao clicar para ver detalhes de pedidos, os detalhes são mostrados. Além disso, testa se ao clicar no botão para voltar para o carrinho, se ele volta mesmo.
describe('DetalhesPedidos', () => {
    it('Verifica se os detalhes de pedido estão ok ', () => {
      cy.visit('/')

      cy.get('[data-cy=nome-usuario]').type('Breno Miranda')
      cy.get('[data-cy=btn-confirmar-login]').click()

      cy.get('[data-cy=btn-pedidos]').click()

      cy.get('[data-cy=btn-detalhesPedido]').eq(0).click()
      cy.url().should('eq', 'http://localhost:8080/detalhe/1')

      cy.get('[data-cy=btn-voltarPedidos]').click()
      cy.url().should('eq', 'http://localhost:8080/pedidos')

    //   cy.get('[data-cy=btn-detalhesPedido]').eq(1).click()
    //   cy.url().should('eq', 'http://localhost:8080/detalhe/2')
      
    })
  })