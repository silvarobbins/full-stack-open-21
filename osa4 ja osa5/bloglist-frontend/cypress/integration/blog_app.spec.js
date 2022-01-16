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
        cy.createBlog({ title: 'first blog', author: 'first author', url: 'firsturl.com', likes: 0 })
        cy.createBlog({ title: 'second blog', author: 'second author', url: 'secondurl.com', likes: 2 })
        cy.createBlog({ title: 'third blog', author: 'third author', url: 'thirdurl.com', likes: 3 })
      })

      it('a blog can be liked', function() {
        cy.contains('first blog').click()
        cy.contains('0 likes')

        cy.get('#like-button').click()
        cy.contains('1 like')
        cy.get('.notification').should('contain', 'liked first blog')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
      })

      it('deleting a blog works if logged user is user of blog', function() {
        cy.contains('third blog').click()
        cy.get('#delete-button').click()
        cy.get('.blog').should('have.length', 2)
      })

      it('blogs sort by number of likes', function () {
        cy.get('.blog').then( blogs => {
          cy.expect(blogs[0].textContent).to.equal('third blog, third author')
          cy.expect(blogs[1].textContent).to.equal('second blog, second author')
          cy.expect(blogs[2].textContent).to.equal('first blog, first author')
        })
      })
    })
  })
})