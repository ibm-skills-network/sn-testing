import {checkTerminalOutput} from '../support/commands/cloudide'

describe('Cloud IDE Kubernetes', () => {
  before(() => {
    cy.launchLTI('cloud-ide-kubernetes')
  })

  beforeEach(() => {
    // Get Proxy URL
    cy.get('iframe#tool_iframe', { timeout: 60000 }).then((iframe) => {
      const src = iframe[0].src
      
      const regexp = /https:\/\/([^\.]+)\.labs\.([^\/]+)\/.+/;
      const matches = src.match(regexp);

      const proxyURL = `https://bs-[PORT].${matches[1]}.proxy.${matches[2]}/`

      cy.wrap(proxyURL)
    }).as('proxyURL')
  })

  
  it('can run simple docker commands', () => {
    const commands = [
      'docker ps',
      'docker run hello-world'
    ]
    checkTerminalOutput(commands, {wait: 8000})
      .should('include', "CONTAINER ID")
      .and('include', "Hello from Docker!")
  })

  it('can run docker and have connectivity', () => {
    const commands = [
      'docker run  --rm curlimages/curl:7.78.0 -L -v http://curl.haxx.se'
    ]
    checkTerminalOutput(commands, {wait: 15000}).should('include', "curl is used in command lines or scripts to transfer data. curl is also used")
  })

  it('can run simple kubernetes', () => {
    cy.theia().openTerminal()

    cy.theia().terminal('{ctrl}c')
    cy.theia().terminal('wget https://raw.githubusercontent.com/mngaonkar/single-node-kubernetes-cluster/master/nginx-deployment.yaml{enter}')
    cy.theia().terminal('kubectl apply -f nginx-deployment.yaml{enter}')
    cy.theia().terminal('kubectl port-forward $(kubectl get pods --output=jsonpath={.items[]..metadata.name}) 8088:80', false)
    cy.theia().terminal('{enter}')

    cy.wait(8000)

    cy.get('@proxyURL').then((proxyURL) => {
      const appURL = proxyURL.replace('[PORT]', 8088)
      cy.request(appURL).its('body').should('include', "Welcome to nginx!")

      cy.theia().terminal('{ctrl}c')
      cy.theia().terminal('kubectl deconste deployments nginx-deployment{enter}')
    })
  })

})
