const crypto = require('crypto')
const OAuth = require('oauth-1.0a')
  
const oauth = OAuth({
    consumer: { key: Cypress.env('lti_client_id'), secret: Cypress.env('lti_client_secret') },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto
            .createHmac('sha1', key)
            .update(base_string)
            .digest('base64')
    },
})

export const getIframeDocument = (type, firstBoot = true) => {
    // Cypress yields jQuery element, which has the real
    // DOM element under property "0".
    // From the real DOM iframe element we can get
    // the "document" element, it is stored in "contentDocument" property
    // Cypress "its" command can access deep properties using dot notation
    // https://on.cypress.io/its

    const timeout = firstBoot ? 60000 : 15000;

    if (type === "instructions") {
      return cy.get('#markdown-instructions-wrapper > iframe', { timeout })
      .its('0.contentDocument').should('exist')
    } else if (type === "theia") {
      return cy.get('iframe#tool_iframe', { timeout })
      .its('0.contentDocument').should('exist')
    }
}
  
export const getIframeBody = (type) => {
    // get the document
    return getIframeDocument(type)
    // automatically retries until body is loaded
    .its('body').should('not.be.undefined')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    .then(cy.wrap)
}

export function loginLTI(fixture) {
    cy.fixture(fixture).then((custom_params) => {
        const data = {
            lti_message_type:	"basic-lti-launch-request",
            lti_version:	"LTI-1p0",
            user_id:	"5",
            lis_person_sourcedid:	"skills-network-instructor:5",
            lis_person_contact_email_primary:	"bs@ibm.com",
            lis_person_name_full:	"Bradley+Steinfeld",
            roles:	"Instructor",
            // custom_sn_labs_tool:	"cloud-ide",
            // custom_sn_asset_library_instructions_url:	"https://cf-course-data-dev.s3.us.cloud-object-storage.appdomain.cloud/IBM-JV0276EN-SkillsNetwork/labs/some_lab.md",
            // custom_sn_asset_library_notebook_url: "https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMDeveloperSkillsNetwork-DA0101EN-SkillsNetwork/labs/Module%201/DA0101EN-Review-Introduction.ipynb"
            ...custom_params
        }

        const request_data = {
            url: Cypress.env('lti_url'),
            method: 'POST',
            data
        }

        const options = {
            method: 'POST',
            url: Cypress.env('lti_url'),
            form: true,
            followRedirect: true,
            body:  oauth.authorize(request_data)
        };

        return cy.visit({
            url: Cypress.env('lti_url'),
            method: 'POST',
            body: oauth.authorize(request_data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    })
}
