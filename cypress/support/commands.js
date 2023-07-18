// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { getIframeBody, loginLTI } from "./commands/common";
import { openTerminal, terminal, openSNExtension } from "./commands/cloudide";
import {
  tableOfContents,
  page,
  nextPage,
  previousPage,
  currentPage,
} from "./commands/authoride";

// IFRAME COMMANDS
Cypress.Commands.add("instructions", () => {
  return getIframeBody("instructions");
});

Cypress.Commands.add("theia", () => {
  return getIframeBody("theia");
});

// LTI
Cypress.Commands.add("launchLTI", (fixture) => {
  return loginLTI(fixture);
});

// CLOUD IDE
Cypress.Commands.add("openTerminal", { prevSubject: true }, openTerminal);
Cypress.Commands.add("terminal", { prevSubject: true }, terminal);
Cypress.Commands.add("openSNExtension", { prevSubject: true }, openSNExtension);

// AUTHOR IDE
Cypress.Commands.add("toc", { prevSubject: true }, tableOfContents);
Cypress.Commands.add("page", { prevSubject: true }, page);
Cypress.Commands.add("nextPage", { prevSubject: true }, nextPage);
Cypress.Commands.add("previousPage", { prevSubject: true }, previousPage);
Cypress.Commands.add("currentPage", { prevSubject: true }, currentPage);
