let product = {};

describe('Home: Open home page', function () {

    beforeEach(function () {
        cy.setLocaleToEnGb();
        return cy.getRandomProductInformationForCheckout().then((result) => {
            product = result;
        })
    });
    
    it('run checkout with random product as new customer', () => {
        // Registration
        cy.visit('/account/login');
        cy.get('select[name="salutationId"]').select('Mr.');
        cy.get('input[name="title"]').type('Prof. Dr.');
        cy.get('input[name="firstName"]').type('John');
        cy.get('input[name="lastName"]').type('Doe');

        cy.get('select[name="birthdayDay"]').select('4');
        cy.get('select[name="birthdayMonth"]').select('8');
        cy.get('select[name="birthdayYear"]').select('1917');

        cy.get('.register-form input[name="email"]').type('john-doe-for-testing@example.com');
        cy.get('.register-form input[name="password"]').type('1234567890');

        cy.get('input[name="billingAddress[street]"]').type('123 Main St');
        cy.get('input[name="billingAddress[zipcode]"]').type('9876');
        cy.get('input[name="billingAddress[city]"]').type('Anytown');
        cy.get('select[name="billingAddress[countryId]"]').select('USA');
        cy.get('.register-form .register-submit .btn-primary').click();

        // Product detail
        cy.visit(product.url);
        cy.get('.product-detail-buy .btn-buy').click();

        // Off canvas
        cy.get('.js-offcanvas.is-open').should('be.visible');
        cy.get('.cart-item-label').contains(product.name);

        // Checkout
        cy.get('.offcanvas-cart-actions .btn-primary').click();

        // Confirm
        cy.get('.confirm-tos .card-title').contains('Terms, conditions and cancellation policy');
        cy.get('.cart-item-details-container .cart-item-label').contains(product.name);


        /*
        * As real orders will be created and must not be removed, we don't enable finishing checkout by default.
        * If you allow orders to be created, just set the variable 'checkoutAllowed' to 'true'
        * in your cypress.env.json file.
        * */
        if (Cypress.env('checkoutAllowed')) {
            cy.get('.confirm-tos .custom-control-label').scrollIntoView();
            cy.get('.confirm-tos .custom-control-label').click();
            cy.get('#confirmFormSubmit').scrollIntoView();
            cy.get('#confirmFormSubmit').click();
            cy.get('.finish-header').contains('Thank you for your order with Shopware Storefront!');
        }
    });
    after(function () {
        return cy.removeFixtureByName('john-doe-for-testing@example.com', 'customer', {
            identifier: 'email'
        })
    });
});
