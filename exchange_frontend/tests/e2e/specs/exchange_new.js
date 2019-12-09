describe("Exchange orders", () => {
    // it("Exchange BTC for USD (bridgepay to app wallet)", () => {
    //     cy.server()
    //     cy.route("GET", Cypress.env("BACKEND") + "userslimit").as("loadLimits")
    //     cy.route("GET", Cypress.env("BACKEND") + "wallets").as("loadWallets")
    //     cy.route("POST", Cypress.env("BACKEND") + "price").as("calculateOrder")
    //     cy.route("POST", Cypress.env("BACKEND") + "orders").as("createOrder")

    //     cy.login()

    //     cy.wait("@loadLimits").then(function() {
    //         cy.wait(1000)
    //     })

    //     cy.get("input[name=SellAmount]").type(50)
    //     cy.wait("@calculateOrder").then(function() {
    //         cy.get("input[name=BuyAmount]")
    //             .invoke("val")
    //             .should("not.be.empty")
    //     })

    //     cy.wait("@loadWallets").then(function() {
    //         cy.get("#submitbtn").click()
    //     })

    //     cy.wait(500)
    //     cy.get(".modal-card-body [data-vv-name=BuyWallet]").click()
    //     cy.wait(500)
    //     cy.get(".modal-card-body [data-vv-name=BuyWallet] ul.multiselect__content li:nth-child(1)").click()

    //     cy.get(".modal-card-foot > button[data-cy=submit-bridgepay]").click()

    //     cy.wait("@createOrder").then(function(xhr) {
    //         expect(xhr.response.body.Address)
    //     })

    //     cy.wait(500)
    //     cy.get(".orderdetails-qr").should("be.visible")
    // })
})
