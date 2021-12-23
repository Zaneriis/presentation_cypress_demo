/* eslint-disable no-undef */
const remplirInput = (username,email,age) => {
  cy.get("#input_username").clear().type(username)
  cy.get("#input_email").clear().type(email)
  cy.get("#input_age").clear().type(age)
}
const urlBack = "https://cataas.com/cat"

describe("Description des tests en lien avec le formulaire",()=>{
  before(()=>{
    console.log("Lancement des tests")
  })

  beforeEach(()=>{
    cy.intercept(urlBack, { fixture: 'doca.png' })
  })

  it("L'accès à la page est possible",()=>{
    cy.visit("/")
  })

  describe("Les informations saisies dans les inputs sont bien affichées",()=>{
    it("Input Username",()=>{
      const prenom = "Dark Vador"
      cy.get("#input_username").type(prenom).should("have.value", prenom)
    })

    it("Input Email",()=>{
      const email = "DarkVador@empire.com"
      cy.get("#input_email").type(email).should("have.value", email)
    })
    
    it("Input Age",()=>{
      const age = "44"
      cy.get("#input_age").clear().type(age).should("have.value", age)
    })
  })

  describe("Vérification de la validité des données",()=>{
    beforeEach(()=>{
      cy.visit("/")
    })

    describe("Input Username",()=>{
      it("Test avec un username banal : DarkVador",()=>{
        remplirInput("DarkVador","DarkVador@empire.com","44");
        cy.get("#button_submit").should("be.not.disabled")
      })
      it("Un username de plus de 20 caractères n'est pas valide",()=>{
        remplirInput("DarkVadorLeSuperMechantDeLEmpire","DarkVador@empire.com","44");
        cy.get("#button_submit").should("be.disabled")
      })
    })

    describe("Input Email",()=>{
      it("DarkVador@empire.com doit être valide",()=>{
        remplirInput("DarkVador","DarkVador@empire.com","44");
        cy.get("#button_submit").should("be.not.disabled")
      })
      it("DarkVador-empire.com ne doit pas être valide",()=>{
        remplirInput("DarkVador","DarkVador-empire.com","44");
        cy.get("#button_submit").should("be.disabled")
      })
    })

    describe("Input Age",()=>{
      it("Test avec un username banal : 44",()=>{
        cy.get("#input_age").type("Cinq").should('be.empty')
      })
      it("Un age avec des lettres n'est pas valide",()=>{
        remplirInput("DarkVador","DarkVador@empire.com","Cinq");
        cy.get("#button_submit").should("be.disabled")
      })
      it("Un age inférieur à 0 n'est pas valide",()=>{
        remplirInput("DarkVador","DarkVador@empire.com","-1");
        cy.get("#button_submit").should("be.disabled")
      })
      it("Un age supérieur à 200 n'est pas valide",()=>{
        remplirInput("DarkVador","DarkVador@empire.com","201");
        cy.get("#button_submit").should("be.disabled")
      })
    })
  })
})