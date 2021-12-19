/// <reference types ="cypress" />

describe('Sair', () => {
    it('Clica em sair deve fazer voltar para página de login', () => {
      cy.visit('/')
      cy.get('[data-cy=nome-usuario]').type('Paulo Borba')
      cy.get('[data-cy=btn-confirmar-login]').click()

      cy.get('[data-cy=btn-sair]').click()
      cy.url().should('eq', 'http://localhost:8080')
    })
  })
  