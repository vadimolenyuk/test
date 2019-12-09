describe("Basic actions", () => {
    it("Login", () => {
        cy.login()
    })

    it("Logout", () => {
        cy.logout()
        expect(cy.get("#home").should("be.visible"))
    })

    it("Resister & verify phone", () => {
        // Prepare
        let RandomNumber = Math.floor(Math.random() * 1000000000)
        RandomNumber = parseInt(RandomNumber.toString().substring(0, 7))
        let PhoneNumber = "+7999" + RandomNumber
        let Email = RandomNumber + "@local.test"

        cy.server()
        cy.route("POST", Cypress.env("BACKEND_AUTH") + "account/register").as("postRegister")
        cy.route("POST", Cypress.env("BACKEND_AUTH") + "phone/requestverification").as("postVerifyRequest")
        cy.route("POST", Cypress.env("BACKEND_AUTH") + "phone/verify").as("postVerifyCheck")

        // Register
        cy.visit("/")
        cy.get("a[href=\"/register\"]")
            .first()
            .click()
        
        cy.register(Email, PhoneNumber, "P@ssw0rd")

        cy.wait("@postRegister").then(function(xhr) {
            expect(xhr.response.body.Id)
            cy.wait(5000)
            expect(cy.get("#verify").should("be.visible"))
        })

        // Verify phone
        cy.wait("@postVerifyRequest").then(function(xhr) {
            expect(xhr.response.body.Message)
        })

        cy.request("GET", Cypress.env("BACKEND") + "user-phone/get-last-verification-code?phoneOrEmail=" + PhoneNumber)
            .then((response) => {
                expect(response.body).to.have.property("Text")
                cy.get("[name=\"Code\"]").type(response.body.Text)
                cy.get("button[type=\"Submit\"]").click()
                cy.wait("@postVerifyCheck").then(function(xhr) {
                    expect(xhr.response.body.Message)
                    expect(cy.get("#dashboard").should("be.visible"))
                })
            })
    })
})