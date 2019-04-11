describe('Navigation: Open flyout', function () {
    it('open category flyout', function () {
   
        cy.visit('/');
		// test first category which is the second element in the navigation
        cy.get('.nav-item.nav-link:nth-child(2)').should('be.visible');
        cy.get('.navigation-flyout').should('not.visible');
        cy.get('.nav-item.nav-link:nth-child(2)').trigger('mouseenter');
        cy.get('.navigation-flyout-content').should('be.visible');
    });
});