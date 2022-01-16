describe ('Blog app', function() {

  beforeEach( function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.addUser({ name: 'Atla', username: 'atlutin', password: 'atlaonparas' })
    cy.addUser({ name: 'Other user', username: 'otherusername', password: 'secretpassword' })
    cy.visit('http://localhost:3000')
  })

  describe ('login', function() {

    it('is shown', function() {
      cy.contains('Login to application')
      cy.contains('username:')
      cy.contains('password:')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('atlutin')
      cy.get('#password').type('atlaonparas')
      cy.get('#login-button').click()

      cy.contains('Atla is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('incorrect')
      cy.get('#password').type('incorrect')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe ('when logged in', function() {

      beforeEach( function () {
        cy.login({ username: 'atlutin', password: 'atlaonparas' })
      })

      it('a blog can be created', function() {
        cy.contains('create new blog').click()

        cy.get('#title').type('first blog')
        cy.get('#author').type('first author')
        cy.get('#url').type('firsturl.com')
        cy.get('#submit-button').click()

        cy.contains('first blog, first author')
      })
    })

    describe('and blogs exist', function() {

      beforeEach( function () {
        cy.login({ username: 'atlutin', password: 'atlaonparas' })
        cy.createBlog({ title: 'first blog', author: 'first author', url: 'firsturl.com' })
        cy.createBlog({ title: 'second blog', author: 'second author', url: 'secondurl.com' })
        cy.createBlog({ title: 'third blog', author: 'third author', url: 'thirdurl.com' })
      })

      it('a blog can be liked', function() {
        cy.contains('first blog').click()
        cy.contains('0 likes')

        cy.get('#like-button').click()
        cy.contains('1 like')
        cy.get('.notification').should('contain', 'liked first blog')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
      })
    })
  })

  describe('deleting a blog', function() {
    beforeEach( function () {
      cy.login({ username: 'atlutin', password: 'atlaonparas' })
      cy.createBlog({ title: 'first blog', author: 'first author', url: 'firsturl.com' })
      cy.createBlog({ title: 'second blog', author: 'second author', url: 'secondurl.com' })
      cy.createBlog({ title: 'third blog', author: 'third author', url: 'thirdurl.com' })
    })

    it('works if logged user is a user of blog', function() {
      cy.contains('third blog').click()
      cy.get('#delete-button').click()
      cy.get('.notification').should('contain', 'deleted third blog')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('third blog, third author').should('not.exist')
    })

    it('works if logged user is a user of blog', function() {
      cy.get('#logout-button').click()
      cy.login({ username: 'otherusername', password: 'secretpassword' })
      cy.contains('second blog').click()

      cy.contains('secondurl.com')
      cy.get('#delete-button').should('not.exist')
    })


  })


})