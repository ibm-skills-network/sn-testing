const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
import "cypress-iframe";

const oauth = OAuth({
  consumer: {
    key: Cypress.env("LTI_CLIENT_ID"),
    secret: Cypress.env("LTI_CLIENT_SECRET"),
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

export const getIframeBody = (type) => {
  if (type === "instructions") {
    cy.frameLoaded("iframe[name='author_ide_iframe_name']");
    return cy
      .iframe('iframe[name="author_ide_iframe_name"]')
      .should("not.be.empty");
  } else if (type === "theia") {
    cy.frameLoaded("iframe#tool_iframe");
    return cy.iframe("iframe#tool_iframe").should("not.be.empty");
  }
};

export function loginLTI(fixture) {
  cy.fixture(fixture).then((custom_params) => {
    const data = {
      lti_message_type: "basic-lti-launch-request",
      lti_version: "LTI-1p0",
      user_id: "5",
      lis_person_sourcedid: "skills-network-instructor:5",
      lis_person_contact_email_primary: "bs@ibm.com",
      lis_person_name_full: "Bradley+Steinfeld",
      roles: "Instructor",
      // custom_sn_labs_tool:	"cloud-ide",
      // custom_sn_asset_library_instructions_url:	"https://cf-course-data-dev.s3.us.cloud-object-storage.appdomain.cloud/IBM-JV0276EN-SkillsNetwork/labs/some_lab.md",
      // custom_sn_asset_library_notebook_url: "https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMDeveloperSkillsNetwork-DA0101EN-SkillsNetwork/labs/Module%201/DA0101EN-Review-Introduction.ipynb"
      ...custom_params,
    };

    const request_data = {
      url: Cypress.env("LTI_URL"),
      method: "POST",
      data,
    };

    return cy.visit({
      url: Cypress.env("LTI_URL"),
      method: "POST",
      body: oauth.authorize(request_data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  });
}
