/* eslint-env node */
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export type Fixtures = Record<string, string>

export const fixtures: Fixtures = {
  basic: fs.readFileSync(path.join(__dirname, 'basic.html'), 'utf8'),
  inert: fs.readFileSync(path.join(__dirname, 'inert.html'), 'utf8'),
  'changing-content': fs.readFileSync(path.join(__dirname, 'changing-content.html'), 'utf8'),
  jqueryui: fs.readFileSync(path.join(__dirname, 'jqueryui.html'), 'utf8'),
  nested: fs.readFileSync(path.join(__dirname, 'nested.html'), 'utf8'),
  'non-linear': fs.readFileSync(path.join(__dirname, 'non-linear.html'), 'utf8'),
  svg: fs.readFileSync(path.join(__dirname, 'svg.html'), 'utf8'),
  radio: fs.readFileSync(path.join(__dirname, 'radio.html'), 'utf8'),
  details: fs.readFileSync(path.join(__dirname, 'details.html'), 'utf8'),
  'shadow-dom': fs.readFileSync(path.join(__dirname, 'shadow-dom.html'), 'utf8'),
  displayed: fs.readFileSync(path.join(__dirname, 'displayed.html'), 'utf8'),
  fieldset: fs.readFileSync(path.join(__dirname, 'fieldset.html'), 'utf8'),
  shadowDomRadio: fs.readFileSync(path.join(__dirname, 'shadow-dom-radio.html'), 'utf8'),
  shadowDomDisplay: fs.readFileSync(path.join(__dirname, 'shadow-dom-display.html'), 'utf8'),
  shadowDomQuery: fs.readFileSync(path.join(__dirname, 'shadow-dom-query.html'), 'utf8'),
  'shadow-dom-untabbable': fs.readFileSync(path.join(__dirname, 'shadow-dom-untabbable.html'), 'utf8'),
}
