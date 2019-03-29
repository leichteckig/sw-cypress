describe('Product: Edit product in various ways', function () {
    beforeEach(function () {
        return cy.loginViaApi().then(() => {
            return cy.createProductFixture('product', {
                manufacturerName: 'shopware AG',
                taxName: '19%'
            })
        })
    });
    it('delete using context menu action', function () {
        cy.get('.sw-admin-menu__navigation-list-item.sw-product span.collapsible-text').contains('Products');
        cy.get('a.sw-admin-menu__navigation-link[href="#/sw/product/index"]').first().click();
        cy.clickContextMenuItem(
            '.sw-context-menu-item--danger',
            '.sw-context-button__button',
            '.sw-data-grid__row--0'
        );
        cy.get('.sw-modal').should('be.visible');
        cy.get('.sw-modal .sw-product-list__confirm-delete-text').contains(
            'Are you sure you really want to delete the product "Product name"?'
        );
        cy.get('.sw-modal__footer .sw-button--primary').click();
        cy.get('.sw-modal').should('not.exist');
        cy.get('.sw-empty-state').should('be.visible');
        cy.get('.sw-page__smart-bar-amount').contains('(0)');
        cy.get('input.sw-search-bar__input').typeAndCheckSearchField('Product name');
        cy.get('.sw-page__smart-bar-amount').contains('(0)');
    });
});
