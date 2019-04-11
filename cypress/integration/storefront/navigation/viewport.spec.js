describe('Nav Menus', function () {

  beforeEach(() => {
    cy.visit('');
  });

  context('720p resolution', function () {
    beforeEach(function () {
      // run these tests as if in a desktop
      // browser with a 720p monitor
      cy.viewport(1280, 720)
    });

    it('displays full header', function () {
      cy.get('.navbar-nav.navigation-menu').should('be.visible');
      cy.get('.navbar-toggler').should('not.be.visible');
    });
  });

  context('iphone-6 resolution', function () {
    beforeEach(function () {
      // run these tests as if in a mobile browser
      // and ensure our responsive UI is correct
      cy.viewport('iphone-6');
    });

    it('displays mobile menu on click', function () {
      cy.get('.navbar-nav.navigation-menu').should('not.be.visible');
      cy.get('.navbar-toggler').should('be.visible').click();
      cy.get('.js-off-canvas.is-left.offcanvas-menu.is-open').should('be.visible');
    });
  });
});