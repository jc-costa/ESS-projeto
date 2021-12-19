/// <reference types ="cypress" />

describe('DetalhesPedidos', () => {
    it('Verifica se os detalhes de pedido estão ok ', () => {
      cy.visit('/')

      cy.get('[data-cy=nome-usuario]').type('Paulo Borba')
      cy.get('[data-cy=btn-confirmar-login]').click()

      //cy.get('[data-cy=btn-carrinho]').click()
      cy.get('[data-cy=btn-pedidos]').click()

      cy.get('[data-cy=btn-detalhesPedido]').eq(0).click()
      cy.url().should('eq', 'http://localhost:8080/detalhe/1')

      cy.get('[data-cy=btn-voltarPedidos]').click()

      cy.get('[data-cy=btn-detalhesPedido]').eq(1).click()
      cy.url().should('eq', 'http://localhost:8080/detalhe/2')
      
    })
  })