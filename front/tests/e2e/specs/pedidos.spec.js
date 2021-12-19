/// <reference types ="cypress" />

describe('Pedidos', () => {
  it('Visits the app root url', () => {
    cy.visit('/pedidos')
    cy.contains('12/12/2021')
    cy.get('[data-cy=btn-carrinho]').click()
    cy.url().should('eq', 'http://localhost:8080/carrinho')
  })
})
