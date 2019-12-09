describe("Landing page", () => {
    it("Loading landing page", () => {
        cy.visit("/")
        expect(cy.get("#home").should("be.visible"))
    })

    it("Calculate pre-order and restore this order after login", () => {
        cy.server()
        cy.route("POST", Cypress.env("BACKEND") + "price").as("calculatePrice")

        cy.visit("/")
        cy.get("input[name=SellAmount]").type(100)

        cy.wait("@calculatePrice").then(function() {
            cy.get("input[name=BuyAmount]")
                .invoke("val")
                .should("not.be.empty")
        })

        cy.get("#submitbtn").click()
        cy.get(".snackbar").should("be.visible")

        cy.login()

        cy.get("input[name=BuyAmount]")
            .invoke("val")
            .should("not.be.empty")
        cy.get("input[name=SellAmount]")
            .invoke("val")
            .should("not.be.empty")
        cy.get("#submitbtn").should("have.class", "is-success")
    })
})
