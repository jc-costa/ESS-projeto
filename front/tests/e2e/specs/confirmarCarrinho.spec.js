/// <reference types ="cypress" />

describe('Carrinho', () => {
  it('Clica em confirmar e deve retornar ok', () => {
    cy.visit('/')
    cy.get('[data-cy=nome-usuario]').type('Paulo Borba')
    cy.get('[data-cy=btn-confirmar-login]').click()

    cy.get('[data-cy=btn-carrinho]').click()
    cy.get('h2').should('have.text', 'Não há pedidos no carrinho')
  })
})
