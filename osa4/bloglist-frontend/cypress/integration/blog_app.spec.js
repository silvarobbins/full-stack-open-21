describe ('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
        name: 'Atla',
        username: 'atlutin',
        password: 'atlaonparas'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login is shown', function() {
    cy.contains('Login to application')
    cy.contains('username:')
    cy.contains('password:')
  })

  it('login succeeds with correct credentials', function() {
    cy.get('#username').type('atlutin')
    cy.get('#password').type('atlaonparas')
    cy.get('#login-button').click()

    cy.contains('Atla is logged in')
  })

  it('login fails with wrong credentials', function() {
    cy.get('#username').type('incorrect')
    cy.get('#password').type('incorrect')
    cy.get('#login-button').click()

    cy.get('.error').should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
  })
})