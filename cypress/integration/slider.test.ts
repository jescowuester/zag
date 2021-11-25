describe("popover", () => {
  beforeEach(() => {
    cy.visit("/slider")
    cy.injectAxe()

    cy.findByTestId("label").as("label")
    cy.findByTestId("output").as("output")
    cy.findByTestId("thumb").as("thumb")
    cy.findByTestId("track").as("track")
  })

  it("should have no accessibility violations", () => {
    cy.checkA11y(".root")
  })

  describe("keyboard interaction", () => {
    it("should work with arrow left/right keys", () => {
      cy.get("@thumb").focus().realType("{rightarrow}")
      cy.get("@output").should("have.text", "41")
      cy.get("@thumb").realType("{rightarrow}")
      cy.get("@output").should("have.text", "42")
    })

    it("should work with home/end keys", () => {
      cy.get("@thumb").focus().realType("{home}")
      cy.get("@output").should("have.text", "0")
      cy.get("@thumb").realType("{end}")
      cy.get("@output").should("have.text", "100")
    })

    it("should work with shift modifier key", () => {
      cy.get("@thumb").focus().realPress(["Shift", "ArrowRight"])
      cy.get("@output").should("have.text", "50")
      cy.get("@thumb").focus().realPress(["Shift", "ArrowLeft"])
      cy.get("@output").should("have.text", "40")
    })

    it("should work with page up/down modifier keys", () => {
      cy.get("@thumb").focus().realType("{pageup}")
      cy.get("@output").should("have.text", "50")
      cy.get("@thumb").focus().realType("{pagedown}")
      cy.get("@output").should("have.text", "40")
    })
  })

  describe("pointer interaction", () => {
    it("should set value on click track", () => {
      cy.get("@track").then((el) => {
        const width = el.width()
        cy.get("@track").click(width * 0.8, 0)
        cy.get("@output").should("have.text", "80")
      })
    })

    it("should set the value on drag", () => {
      cy.get("@track").then((el) => {
        let width = el.width()
        const midY = el.height() / 2
        const point = { x: width * 0.8, y: midY }
        cy.get("@track").realMouseDown({ position: point, pointer: "mouse" })
        point.x += 10
        cy.document().trigger("mousemove", point)
        cy.document().trigger("pointerup")
        cy.get("@output").should("have.text", "93")
      })
    })
  })
})