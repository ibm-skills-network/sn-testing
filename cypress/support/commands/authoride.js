const confirmInstructions = (subject) => {
    if (subject[0].children[0].id !== 'layout') {
      throw new Error('Not instructions')
    }
}


export function tableOfContents(subject, item) {
    confirmInstructions(subject)

    if (item === undefined) {
      return subject.find('button.toc')
    }
    const el = cy.wrap(subject.find('div.table-of-contents > button').eq(item-1))
    el.scrollIntoView()
    return el
}

export function page(subject, item) {
  confirmInstructions(subject)

  // if (item === undefined) {
  //   return subject.find('button.toc')
  // }
  const el = cy.wrap(subject.find('div.pages > div.page').eq(item-1))
  el.scrollIntoView()
  return el
}

export function currentPage(subject) {
  confirmInstructions(subject)

  const domElement = subject.find('div.pages > div.page').filter(function() {
    return this.style['display'] !== 'none';
  });
  const el = cy.wrap(domElement[0])
  return el
}

export function nextPage(subject) {
  confirmInstructions(subject)

  const domElement = subject.find('div.pages > div.page').filter(function() {
    return this.style['display'] !== 'none';
  });
  const el = cy.wrap(domElement[0].lastChild.childNodes[1])

  el.scrollIntoView()
  el.click()
  return el
}

export function previousPage(subject) {
  confirmInstructions(subject)

  const domElement = subject.find('div.pages > div.page').filter(function() {
    return this.style['display'] !== 'none';
  });
  const el = cy.wrap(domElement[0].lastChild.childNodes[0])

  el.scrollIntoView()
  el.click()
  return el
}
