describe("Password actions", () => {
    it("Change password", () => {
        cy.server()
        cy.route("POST", Cypress.env("BACKEND_AUTH") + "account/changepassword").as("postPWD")

        cy.login()
    
        cy.get(".navbar-burger").click()
        cy.get("#usernav").click()
        cy.get("#changepwd").click()

        cy.changepwd("123123aA", "123123aA")
        cy.wait("@postPWD").then(function(xhr) {
            expect(xhr.response.body.Id)
            expect(cy.get("#dashboard").should("be.visible"))
        })
    })

    // it("Reset password", () => {
    //     let UserEmail = "test@local.test"
    //     let UserPhone = "7 9999999954"
    //     let UserPWD = "123123aA"

    //     cy.server()
    //     cy.route("POST", Cypress.env("BACKEND_AUTH_2") + "user-password/reset-code").as("postForgotPWD")
    //     cy.route("POST", Cypress.env("BACKEND_AUTH_2") + "user-password/reset-token").as("postTokenPWD")
    //     cy.route("PATCH", Cypress.env("BACKEND_AUTH_2") + "user-password/reset-token").as("postResetPWD")

    //     cy.visit("/forgotpassword")
    //     cy.get("[name=\"Login\"]").type(UserEmail)
    //     cy.get("button[type=\"Submit\"]").click()
    //     cy.wait("@postForgotPWD").then(function(xhr) {
    //         alert(xhr.response.body)
    //         expect(xhr.response.body).to.have.property("Message")
    //     })

    //     cy.request("GET", Cypress.env("BACKEND_AUTH_2") + "user-password/get-last-reset-code?phoneOrEmail=" + UserPhone)
    //         .then((response) => {
    //             expect(response.body).to.have.property("Data")

    //             cy.get("[name=\"Code\"]").type(response.body.Data)
    //             cy.get("button[class=\"button is-primary\"]").click()
    //             cy.wait("@postTokenPWD").then(function(xhr) {
    //                 expect(xhr.response.body).to.have.property("ResetToken")
    //             })

    //             cy.get("[name=\"Password\"]").type(UserPWD)
    //             cy.get("[name=\"PasswordConfirmation\"]").type(UserPWD)
    //             cy.get("button[type=\"Submit\"]").click()
    //             cy.wait("@postResetPWD").then(function(xhr) {
    //                 expect(xhr.response.status).to.eq(200)
    //             })

    //             cy.login(UserEmail, UserPWD)
    //         })
    // })
})