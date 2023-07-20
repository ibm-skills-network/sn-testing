export function tableOfContents(subject, item) {
  if (item === undefined) {
    return subject.find("div.toolbar > button.toc");
  }
  const el = cy.wrap(
    subject.find("div.table-of-contents > button").eq(item - 1)
  );
  el.scrollIntoView();
  return el;
}

export function page(subject, item) {
  // if (item === undefined) {
  //   return subject.find('button.toc')
  // }
  const el = cy.wrap(subject.find("div.pages > div.page").eq(item - 1));
  el.scrollIntoView();
  return el;
}

export function currentPage(subject) {
  const domElement = subject.find("div.pages > div.page").filter(function () {
    return this.style["display"] !== "none";
  });
  const el = cy.wrap(domElement[0]);
  return el;
}

export function nextPage(subject) {
  const domElement = subject.find("div.pages > div.page").filter(function () {
    return this.style["display"] !== "none";
  });
  const el = cy.wrap(domElement[0].lastChild.childNodes[1]);

  el.scrollIntoView();
  el.click();
  return el;
}

export function previousPage(subject) {
  const domElement = subject.find("div.pages > div.page").filter(function () {
    return this.style["display"] !== "none";
  });
  const el = cy.wrap(domElement[0].lastChild.childNodes[0]);

  el.scrollIntoView();
  el.click();
  return el;
}
