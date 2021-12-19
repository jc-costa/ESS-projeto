/// <reference types ="cypress" />

describe('Carrinho', () => {
  it('Clica em confirmar e deve retornar ok', () => {
    cy.visit('/carrinho')
  })
})
