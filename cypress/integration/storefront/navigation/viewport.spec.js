describe('Nav Menus', function () {

  beforeEach(() => {
    cy.visit('/');
  });

  context('720p resolution', function () {
    beforeEach(function () {
      // run these tests as if in a desktop
      // browser with a 720p monitor
      cy.viewport(1280, 720)
    });

    it('displays full header', function () {
      cy.get('.nav.main-navigation-menu').should('be.visible');
      cy.get('.nav-main-toggle').should('not.be.visible');
    });
  });

  context('iphone-6 resolution', function () {
    beforeEach(function () {
      // run these tests as if in a mobile browser
      // and ensure our responsive UI is correct
      cy.viewport('iphone-6');
    });

    it('displays mobile menu on click', function () {
      cy.get('.nav.main-navigation-menu').should('not.be.visible');
      cy.get('.nav-main-toggle .nav-main-toggle-btn').should('be.visible').click();
      cy.get('.js-offcanvas.is-left.offcanvas-menu.is-open').should('be.visible');
    });
  });
});
