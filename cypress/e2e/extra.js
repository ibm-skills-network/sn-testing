// cy.theia().find("div.theia-mini-browser-toolbar > input.theia-input").last().invoke('val').then((value) => {
//   console.log('THE VALUE IS')
//   console.log(value)
//   // https://bs-8000.theia-0-labs-staging-us-east.proxy.staging.cognitiveclass.ai
//   // https://theia-0-labs-staging-us-east.labs.staging.cognitiveclass.ai
//   // https://aa8394c2-ff36-4cc5-b536-741ec9917d37.mini-browser.theia-0-labs-staging-us-east.labs.staging.cognitiveclass.ai/user/bs/mini-browser/url
// })

// cy.theia().find('div[dir="ltr"]').should('be.visible').trigger('mousedown').then(($el) => {
//   const el = $el[0]
//   // const document = el.ownerDocument

//   .trigger('mousemove', { which: 1, pageX: 600, pageY: 600 })
//   .trigger('mouseup')

// })

// console.log('CLIENTX - ' + cy.theia().find('div[dir="ltr"]'))

// cy.theia().find('div[dir="ltr"]').should('be.visible').then($el => {
//   console.log($el[0])

// })

// trigger('mousedown')
//   // .trigger('mousemove', { which: 1, pageX: 600, pageY: 600 })
//   .trigger('mousemove', {clientX: 505, clientY: 357})
//   .trigger('mouseup')

// cy.window().then((win) => {
//   win.navigator.clipboard.readText().then((text) => {
//     expect(text).to.eq('your copied text');
//   });
// });

//   cy.window().its('navigator.clipboard')
// .invoke('readText').should('equal', 'copied text')
