describe('Register: Open register form', function () {

    it('check if register form is present', function () {
        cy.visit('/account/login');
        cy.get('.register-form').should('be.visible');
    });

    it('trigger validation error', function () {
        cy.visit('/account/login');

        cy.get('[name="email"]:invalid').should('be.visible');
        cy.get('.register-submit [type="submit"]').click();
    });

    it('fill registration form and submit', function () {
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

        cy.get('.register-submit [type="submit"]').click();

        cy.url().should('not.include', '/register');
        cy.url().should('include', '/account');

        cy.get('.account-welcome h1').should((element) => {
            expect(element).to.contain('Overview');
        });
    });
    after(function () {
        return cy.removeFixtureByName('john-doe-for-testing@example.com', 'customer', {
            identifier: 'email'
        })
    });
});
