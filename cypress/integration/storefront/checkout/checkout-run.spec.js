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
        cy.get('#personalSalutation').select('Mr.');
        cy.get('#personalFirstName').type('John');
        cy.get('#personalLastName').type('Doe');

        cy.get('#personalMail').type('john-doe-for-testing@example.com');
        cy.get('#personalPassword').type('1234567890');

        cy.get('#billingAddressAddressStreet').type('123 Main St');
        cy.get('#billingAddressAddressZipcode').type('9876');
        cy.get('#billingAddressAddressCity').type('Anytown');
        cy.get('#billingAddressAddressCountry').select('USA');
        cy.get('.register-form .register-submit .btn-primary').click();

        // Product detail
        cy.visit(product.url);
        cy.get('.product-detail-buy .btn-buy').click();

        // Off canvas
        cy.get('.offcanvas.is-open').should('be.visible');
        cy.get('.cart-item-label').contains(product.name);

        // Checkout
        cy.get('.offcanvas-cart-actions .btn-primary').click();

        // Confirm
        cy.get('.confirm-tos .card-title').contains('Terms, conditions and cancellation policy');
        cy.get('.confirm-tos .custom-checkbox label').scrollIntoView();
        cy.get('.confirm-tos .custom-checkbox label').click(1, 1);
        cy.get('.confirm-address').contains('John Doe');
        cy.get('.cart-item-details-container .cart-item-label').contains(product.name);


        /*
        * As real orders will be created and must not be removed, we don't enable finishing checkout by default.
        * If you allow orders to be created, just set the variable 'checkoutAllowed' to 'true'
        * in your cypress.env.json file.
        * */
        if (Cypress.env('checkoutAllowed')) {
            cy.get('#confirmFormSubmit').scrollIntoView();
            cy.get('#confirmFormSubmit').click();
            cy.get('.finish-header').contains('Thank you for your order with');
        }
    });
    after(function () {
        return cy.removeFixtureByName('john-doe-for-testing@example.com', 'customer', {
            identifier: 'email'
        })
    });
});
