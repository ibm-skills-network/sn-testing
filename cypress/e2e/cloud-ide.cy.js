describe('empty spec', () => {
  before(() => {
    cy.launchLTI('cloud-ide')

    // Get Proxy URL
    cy.get('iframe#tool_iframe', { timeout: 60000 }).then((iframe) => {
      const src = iframe[0].src
      
      const regexp = /https:\/\/([^\.]+)\.labs\.([^\/]+)\/.+/;
      const matches = src.match(regexp);

      const proxyURL = `https://bs-8000.${matches[1]}.proxy.${matches[2]}/`

      cy.wrap(proxyURL)
    }).as('proxyURL')
  })

  
  it('can run simple example', () => {
    cy.theia().openTerminal()

    cy.theia().terminal('{ctrl}c')
    cy.theia().terminal('echo "TEST" > abc123{enter}')
    cy.theia().terminal('ruby -run -ehttpd . -p8000{enter}')

    cy.wait(5000)

    cy.get('@proxyURL').then((proxyURL) => {
      cy.request(proxyURL + '/abc123').its('body').should('include', "TEST")
    })
  })

  it('can use the skills network extension', () => {
    cy.theia().openSNExtension('other', 'Launch Application')

    cy.theia().find("#combo-box").type('8000', { release: false })

    cy.theia().find("#combo-box").should('have.value', '8000')
    cy.wait(500)
    cy.theia().find("button[title='Open here']").click()
  })

})
