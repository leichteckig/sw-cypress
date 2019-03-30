describe('Delete a manufacturer in various ways', function () {
    beforeEach(function () {
        return cy.loginViaApi().then(() => {
            return cy.createDefaultFixture('product-manufacturer')
        })
    });
    it('delete manufacturer via context menu', function () {
        cy.get('.sw-admin-menu__navigation-list-item.sw-product').trigger('mouseover');
        cy.get('.sw-admin-menu__flyout-item--sw-manufacturer').click();
        cy.get('.smart-bar__header > h2').contains('Manufacturer');
        cy.get('.sw-page__smart-bar-amount').contains('2');
        cy.clickContextMenuItem(
            '.sw-context-menu-item--danger',
            '.sw-context-button__button',
            '.sw-grid__row--0'
        );
        cy.get('.sw-modal').should('be.visible');
        cy.get('.sw-modal .sw-modal__body p').contains(
            'Are you sure you want to delete the manufacturer "MAN-U-FACTURE"?'
        );
        cy.get('.sw-modal__footer .sw-button--primary').click();
        cy.get('.sw-modal').should('not.exist');
        cy.get('.sw-page__smart-bar-amount').contains('(1)');
        cy.get('input.sw-search-bar__input').typeAndCheckSearchField('MAN-U-FACTURE');
        cy.get('.sw-page__smart-bar-amount').contains('(0)');
    });
});
