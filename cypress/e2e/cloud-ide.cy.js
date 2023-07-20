import { checkTerminalOutput } from "../support/commands/cloudide";

describe("Cloud IDE", () => {
  before(() => {
    cy.launchLTI("cloud-ide");

    // Get Proxy URL
    cy.get("iframe#tool_iframe", { timeout: 60000 })
      .then((iframe) => {
        const src = iframe[0].src;

        const regexp = /https:\/\/([^\.]+)\.labs\.([^\/]+)\/.+/;
        const matches = src.match(regexp);

        const proxyURL = `https://bs-[PORT].${matches[1]}.proxy.${matches[2]}/`;

        cy.wrap(proxyURL);
      })
      .as("proxyURL");
  });

  it("can run simple example", () => {
    let commands = ['echo "TEST"'];
    checkTerminalOutput(cy.theia(), commands).should("include", "TEST");
  });

  it.skip("can use the skills network extension", () => {
    cy.theia().openSNExtension("other", "Launch Application");

    cy.theia().find("#combo-box").type("8000", { release: false });

    cy.theia().find("#combo-box").should("have.value", "8000");
    cy.wait(500);
    cy.theia().find("button[title='Open here']").click();
  });
});
