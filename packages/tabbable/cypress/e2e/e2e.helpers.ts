/* eslint-disable promise/catch-or-return */
export function setupTestWindow(done: (testWindow: Window) => void) {
  cy.visit('./cypress/test-sandbox.html')
  cy.window().then(done)
}

export function getFixtures(done: (f: Record<string, string>) => void) {
  cy.task('getFixtures').then((f) => done(f as Record<string, string>))
}
export function removeAllChildNodes(parent: Element) {
  while (parent.firstChild) {
    parent.firstChild.remove()
  }
}

export function getIdsFromElementsArray(elements: Element[]) {
  return elements.map((el) => el.getAttribute('id'))
}

export function setupFixture(content: any, options: Record<string, any> = {}) {
  const win = options.window || window
  const doc = win.document
  const container = doc.createElement('div')

  appendHTMLWithShadowRoots(container, content, {
    win,
    caseId: options.caseId,
  })
  doc.body.append(container)

  return { container }
}

function supportsDeclarativeShadowDOM() {
  // eslint-disable-next-line no-prototype-builtins
  return HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot')
}

function hydrateShadowDomPolyfill(template: HTMLTemplateElement) {
  const mode = template.getAttribute('shadowroot')
  const delegatesFocus = !!template.getAttribute('shadowrootdelegatesfocus')
  const host = template.parentNode as any
  const shadowRoot = host.attachShadow({ mode, delegatesFocus })

  // expose closed shadow root for tests
  if (mode === 'closed') {
    host.closedShadowRoot = shadowRoot
  }

  shadowRoot.append(template.content)
  template.remove()
}

function scanAndHydrateShadowDom(container: Element) {
  container.querySelectorAll<HTMLTemplateElement>('template[shadowroot]').forEach(hydrateShadowDomPolyfill)
}

function defineCustomTestElement(win: any) {
  // register custom element to expose closed shadow for tests
  if (!win.customElements.get('test-shadow')) {
    win.customElements.define(
      'test-shadow',
      class TestShadow extends win.HTMLElement {
        constructor() {
          super()

          if (supportsDeclarativeShadowDOM()) {
            // expose closed shadow root for tests
            const { shadowRoot } = this.attachInternals()

            if (shadowRoot.mode === 'closed') {
              this.closedShadowRoot = shadowRoot
            }
          } else {
            // polyfill nested shadow hydration
            const shadowRoot = this.shadowRoot || this.closedShadowRoot

            if (shadowRoot) {
              scanAndHydrateShadowDom(shadowRoot)
            }
          }
        }
      },
    )
  }
}

function appendHTMLWithShadowRoots(container: Element, content: Element, { win, caseId }: any = {}) {
  win ||= window
  defineCustomTestElement(win)
  // create dom fragments with shadow dom (if supported)
  const fragment = new win.DOMParser().parseFromString(content, 'text/html', {
    includeShadowRoots: true,
  })

  // append content
  if (caseId) {
    container.append(fragment.querySelector(`#${caseId}`))
  } else {
    const nodes = fragment.children[0].children[1].children

    while (nodes.length > 0) {
      container.append(nodes[0])
    }
  }

  // polyfill shadow hydration if not supported
  if (supportsDeclarativeShadowDOM() === false) {
    scanAndHydrateShadowDom(container)
  }
}
