import {DEFAULT_SETTINGS} from './../constants'
import {log} from './log'

export function injectBodyClass (doc, slug) {
  doc.body.className += ` munchdb-${slug}`
}

export function stringToDOM (str) {
  let parser = new DOMParser()
  let doc = parser.parseFromString(str, 'text/html')
  return doc.body.firstChild
}

export function getSettings (domElement) {
  let parsedSettings = {}

  if (domElement.dataset.settings) {
    parsedSettings = JSON.parse(domElement.dataset.settings)
  }

  let settings = Object.assign({}, DEFAULT_SETTINGS, parsedSettings)
  return settings
}
