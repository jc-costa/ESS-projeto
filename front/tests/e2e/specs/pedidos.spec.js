/// <reference types ="cypress" />

//Teste que verifica se conseguimos acessar o carrinho

describe('Pedidos', () => {
  it('Verifica se os pedidos estão ', () => {
    cy.visit('/')
    cy.get('[data-cy=nome-usuario]').type('Breno Miranda')
    cy.get('[data-cy=btn-confirmar-login]').click()

    cy.get('[data-cy=btn-carrinho]').first().click()
    cy.url().should('eq', 'http://localhost:8080/carrinho')
  })
})
