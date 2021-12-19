/// <reference types ="cypress" />

describe('Pedidos', () => {
  it('Verifica se os pedidos estão ', () => {
    cy.visit('/')
    cy.get('[data-cy=btn-carrinho]').click()
    cy.url().should('eq', 'http://localhost:8080/carrinho')
  })
})
