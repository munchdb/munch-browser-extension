import URI from 'urijs'

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

export function replaceLink(affiliateURL, replaceLinkSelector) {
  let anchors = document.querySelectorAll(replaceLinkSelector)
  log(anchors)
  for (let anchor of anchors) {
    let href = anchor.href
    let uri = new URI(href)
    uri.addSearch('munchdb', true)
    let targetedAffiliateURL = affiliateURL.replace('{url}', encodeURIComponent(uri))
    anchor.setAttribute('href', targetedAffiliateURL)
  }
}
