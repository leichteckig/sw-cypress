import PageObject from "../../../support/pages/sw-general.page-object";

describe('Administration: Check module navigation', function () {

    beforeEach(function () {
        cy.setLocaleToEnGb().then(() => {
            return cy.loginViaApi();
        });
    });

    it('check product module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/product/index',
            mainMenuId: 'sw-catalogue',
            subMenuId: 'sw-product'
        });
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Products');
        cy.get('.sw-product-list__content').should('be.visible');
    });

    it('check manufacturer module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/manufacturer/index',
            mainMenuId: 'sw-catalogue',
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

    it('check tax module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/index',
            mainMenuId: 'sw-settings'
        });
        cy.get('#sw-settings-tax').click();
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Tax');
        cy.get('.sw-page__main-content').should('be.visible');
    });

    it('check snippet module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/index',
            mainMenuId: 'sw-settings'
        });
        cy.get('#sw-settings-snippet').click();
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Snippets');
        cy.get('.sw-settings-snippet-set-list__actions').should('be.visible');
    });

    it('check salutation module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/index',
            mainMenuId: 'sw-settings'
        });
        cy.get('#sw-settings-salutation').click();
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Salutation');
        cy.get('.sw-settings-salutation-list-grid').should('be.visible');
    });

    it('check rule builder module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/index',
            mainMenuId: 'sw-settings'
        });
        cy.get('#sw-settings-rule').click();
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Rule builder');
        cy.get('.sw-settings-rule-list__content').should('exist');
    });

    it('check number ranges module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/index',
            mainMenuId: 'sw-settings'
        });
        cy.get('#sw-settings-number-range').click();
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Number range');
        cy.get('.sw-settings-number-range-list-grid').should('be.visible');
    });

    it('check language module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/index',
            mainMenuId: 'sw-settings'
        });
        cy.get('#sw-settings-language').click();
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Languages');
        cy.get('.sw-settings-language-list').should('be.visible');
    });

    it('check customer group module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/index',
            mainMenuId: 'sw-settings'
        });
        cy.get('#sw-settings-customer-group').click();
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Customer group');
        cy.get('.sw-settings-customer-group-list-grid').should('be.visible');
    });

    it('check currency module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/index',
            mainMenuId: 'sw-settings'
        });
        cy.get('#sw-settings-currency').click();
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Currencies');
        cy.get('.sw-settings-currency-list-grid').should('be.visible');
    });

    it('check country module', function () {
        const page = new PageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/index',
            mainMenuId: 'sw-settings'
        });
        cy.get('#sw-settings-country').click();
        cy.get(`${page.elements.smartBarHeader} h2`).contains('Countries');
        cy.get('.sw-settings-country-list-grid').should('be.visible');
    });
});
