import { getIframeBody } from "./common";

export function checkTerminalOutput(commands, options = {}) {
  const subject = getIframeBody("theia");

  openTerminal(subject);

  terminal(subject, "{ctrl}c");

  const filename = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5);

  for (let command of commands) {
    terminal(subject, `${command} >> ${filename}{enter}`);
  }

  terminal(subject, "ruby -run -ehttpd . -p8000{enter}");

  cy.wait(options.wait || 5000);

  return cy.get("@proxyURL").then((proxyURL) => {
    const appURL = proxyURL.replace("[PORT]", 8000);
    return cy.request(`${appURL}/${filename}`).then((resp) => {
      terminal(subject, "{ctrl}c");
      terminal(subject, `rm -f ${filename}`);
      return cy.wrap(resp.body);
    });
  });
}

export function openTerminal(subject) {
  getIframeBody("theia")
    .find("div.p-MenuBar-itemLabel")
    .contains("Terminal")
    .click()
    .then(() => {
      getIframeBody("theia")
        .find("div.p-Menu-itemLabel")
        .contains("New Terminal")
        .trigger("mousemove")
        .click();
    });
  cy.wait(15000);
}

export function terminal(subject, command, parseSpecialCharSequences = true) {
  // const el = cy.wrap(getIframeBody('theia').find('div[dir="ltr"]').last())
  const el = getIframeBody("theia").find('div[dir="ltr"]').last();

  if (command) {
    el.click();
    el.type(command, { parseSpecialCharSequences });
  }
  return el.should("be.visible");
}

export function openSNExtension(subject, category, item) {
  getIframeBody("theia")
    .find(
      "ul.p-TabBar-content>li.p-TabBar-tab[title='Skills Network Toolbox'][style~='height:']"
    )
    .click();

  if (category) {
    getIframeBody("theia")
      .find("#panel1a-header > div.MuiAccordionSummary-content")
      .contains(category)
      .click();

    if (item) {
      getIframeBody("theia")
        .find("div.theia-TreeNode")
        .contains(item)
        .parent()
        .parent()
        .parent()
        .trigger("mousemove")
        .click();
    }
  }
}
