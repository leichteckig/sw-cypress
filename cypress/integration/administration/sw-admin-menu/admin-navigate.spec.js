import PageObject from "../../../support/pages/sw-general.page-object";

describe('Administration: Check module navigation', function () {
    beforeEach(function () {
        cy.setLocaleToEnGb();
        return cy.loginViaApi();
    });
    it('check product module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/product/index',
            mainMenuId: 'sw-product'
        });
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Products');
        cy.get('.sw-product-list__content').should('be.visible');
    });
    it('check manufacturer module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/manufacturer/index',
            mainMenuId: 'sw-product',
            subMenuId: 'sw-manufacturer'
        });
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Manufacturer');
        cy.get('.sw-manufacturer-list__content').should('exist');
    });
    it('check order module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/order/index',
            mainMenuId: 'sw-order'
        });
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Orders');
        cy.get('.sw-order-list').should('be.visible');
    });
    it('check customer module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/customer/index',
            mainMenuId: 'sw-customer'
        });
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Customer');
        cy.get('.sw-customer-list__content').should('be.visible');
    });
    it('check media module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/media/index',
            mainMenuId: 'sw-media'
        });
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Media');
        cy.get('.sw-media-index__page-content').should('be.visible');
    });
    it('check tax module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/tax/index',
            mainMenuId: 'sw-settings',
            subMenuId: 'sw-settings-tax'
        });
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Tax');
        cy.get('.sw-page__main-content').should('be.visible');
    });
    it('check snippet module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/snippet/index',
            mainMenuId: 'sw-settings',
            subMenuId: 'sw-settings-snippet'
        });
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Snippets');
        cy.get('.sw-settings-snippet-set-list__actions').should('be.visible');
    });
    it('check salutation module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/salutation/index',
            mainMenuId: 'sw-settings',
            subMenuId: 'sw-settings-salutation'
        });
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Salutation');
        cy.get('.sw-settings-salutation-list-grid').should('be.visible');
    });
    it('check rule module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/rule/index',
            mainMenuId: 'sw-settings',
            subMenuId: 'sw-settings-rule'
        });
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Rules');
        cy.get('.sw-settings-rule-list__content').should('exist');
    });
    it('check number ranges module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/number/range/index',
            mainMenuId: 'sw-settings',
            subMenuId: 'sw-settings-number-range'
        });
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Number range');
        cy.get('.sw-settings-number-range-list-grid').should('be.visible');
    });
    it('check language module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/language/index',
            mainMenuId: 'sw-settings',
            subMenuId: 'sw-settings-language'
        });
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Languages');
        cy.get('.sw-settings-language-list').should('be.visible');
    });
    it('check customer group module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/customer/group/index',
            mainMenuId: 'sw-settings',
            subMenuId: 'sw-settings-customer-group'
        });
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Customer group');
        cy.get('.sw-settings-customer-group-list-grid').should('be.visible');
    });
    it('check currency module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/currency/index',
            mainMenuId: 'sw-settings',
            subMenuId: 'sw-settings-currency'
        });
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Currencies');
        cy.get('.sw-settings-currency-list-grid').should('be.visible');
    });
    it('check country module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/country/index',
            mainMenuId: 'sw-settings',
            subMenuId: 'sw-settings-country'
        });
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Countries');
        cy.get('.sw-settings-country-list-grid').should('be.visible');
    });
});
