import {getIframeBody} from './common'

const confirmTheia = (subject) => {
    // if (subject[0].children[0].id !== 'layout') {
    //   throw new Error('Not instructions')
    // }
}

export function openTerminal(subject) {
    confirmTheia(subject)

    getIframeBody('theia').find('div.p-MenuBar-itemLabel').contains('Terminal').click().then(() => {
        getIframeBody('theia').find('div.p-Menu-itemLabel').contains('New Terminal').trigger('mousemove').click();
    });
    cy.wait(15000)
}


export function terminal(subject, command, parseSpecialCharSequences = true) {
    confirmTheia(subject)

    const el = cy.wrap(subject.find('div[dir="ltr"]').last())

    if (command) {
        el.click()
        el.type(command, { parseSpecialCharSequences })
    }
    return el.should('be.visible')
}

export function openSNExtension(subject, category, item) {
    confirmTheia(subject)

    getIframeBody('theia').find("ul.p-TabBar-content>li.p-TabBar-tab[title='Skills Network Toolbox'][style~='height:']").click();

    if (category) {
        getIframeBody('theia').find("#panel1a-header > div.MuiAccordionSummary-content").contains(category).click()

        if (item) {
            getIframeBody('theia').find('div.theia-TreeNode').contains(item).parent().parent().parent().trigger('mousemove').click()
        }
    }
}


