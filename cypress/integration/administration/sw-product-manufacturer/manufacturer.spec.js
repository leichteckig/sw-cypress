describe('Example for creating a manufacturer and doing some inline editing', function () {
    beforeEach(function () {
        cy.loginViaApi();
    });
    it('test crud operations', function () {
        cy.get('.sw-admin-menu__navigation-list-item.sw-product').trigger('mouseover');
    });
});
