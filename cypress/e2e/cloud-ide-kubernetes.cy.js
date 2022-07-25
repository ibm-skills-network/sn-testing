describe('empty spec', () => {
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
    cy.theia().openTerminal()

    cy.theia().terminal('{ctrl}c')
    cy.theia().terminal('docker ps > docker{enter}')
    cy.theia().terminal('docker run hello-world > hello-world{enter}')

    cy.theia().terminal('ruby -run -ehttpd . -p8000{enter}')

    cy.wait(8000)

    cy.get('@proxyURL').then((proxyURL) => {
      const appURL = proxyURL.replace('[PORT]', 8000)
      cy.request(appURL + '/docker').its('body').should('include', "CONTAINER ID")
      cy.request(appURL + '/hello-world').its('body').should('include', "Hello from Docker!")

      cy.theia().terminal('{ctrl}c')
    })
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
      cy.theia().terminal('kubectl delete deployments nginx-deployment{enter}')
    })
  })

})
