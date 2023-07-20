describe("Author IDE", () => {
  before(() => {
    cy.launchLTI("cloud-ide");
  });

  it("can render instructions and move between pages", () => {
    cy.instructions().toc().click();
    cy.instructions().toc(3).click();

    cy.instructions()
      .page(3)
      .should("be.visible")

      .contains(
        "Author IDE is a tool for creating and managing your instructions."
      );

    cy.instructions().page(7).should("not.be.visible");

    cy.instructions().toc().click();
    cy.instructions().toc(7).click();

    cy.instructions().page(3).should("not.be.visible");

    // cy.instructions().page(7).should('be.visible').contains('Feel free to explore what other buttons do on your own.')
    cy.instructions()
      .page(7)
      .contains("Feel free to explore what other buttons do on your own.");

    cy.instructions().nextPage();
    cy.instructions().nextPage();

    cy.instructions()
      .currentPage()
      .contains(
        "We do recommend that you use the following as an outline for your Cloud-IDE-based lab instructions."
      );
  });

  it.skip("can run a execute code block", () => {
    cy.instructions().toc().click();
    cy.instructions().toc(4).click();
    cy.instructions().find("button.execute-code-block").click();
  });
});
