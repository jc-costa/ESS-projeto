/// <reference types ="cypress" />

describe('Carrinho', () => {
  it('Clica em confirmar e deve retornar ok', () => {
    cy.visit('/')
    cy.get('[data-cy=nome-usuario]').type('Breno Miranda')
    cy.get('[data-cy=btn-confirmar-login]').click()
    cy.wait(200)
    cy.get('[data-cy=btn-carrinho]').click()
    cy.get('[data-cy=btn-confirmar-pedido]').click()
    cy.wait(200)
    cy.get('[data-cy="btn-ok-pagamento-confirmado"]').click()
    cy.wait(200)
    cy.get('[data-cy="btn-ok-pedido-confirmado"]').click()
  })
})
