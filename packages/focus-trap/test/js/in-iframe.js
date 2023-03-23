/* eslint-disable promise/param-names */
/* eslint-disable no-promise-executor-return */

import { createFocusTrap } from '../../dist/index.js'

export default async () => {
  const contextIframe = document.querySelector('#in-iframe')

  // wait for iFrame DOM to completely load
  while (!contextIframe.contentWindow.document.querySelector('#in-iframe-trap')) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 500))
  }

  const targetDocument = contextIframe.contentWindow.document

  if (targetDocument) {
    const trapWrapper = targetDocument.querySelector('#in-iframe-trap')
    const focusTrap = createFocusTrap('#in-iframe-trap', {
      document: targetDocument,
      onActivate: () => trapWrapper.classList.add('is-active'),
      onDeactivate: () => trapWrapper.classList.remove('is-active'),
    })

    document.querySelector('#activate-in-iframe').addEventListener('click', focusTrap.activate)

    targetDocument.querySelector('#deactivate-in-iframe').addEventListener('click', focusTrap.deactivate)
  }
}
