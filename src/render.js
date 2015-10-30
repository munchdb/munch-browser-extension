import templates from './templates'
import {slugify} from './utils/text'
import {stringToDOM} from './utils/dom'

export function renderResults (lookupMap, xhrEvent) {
  let response = xhrEvent.currentTarget.response

  // Handle results that were found.
  for (let i in response) {
    let eatery = response[i]
    if (eatery.fsa_rating == null) continue
    let domElement = lookupMap.get(eatery.site_id)
    renderFound(eatery, domElement)
    lookupMap.delete(eatery.site_id)
  }

  // Handle results that were not found.
  for (let [slug, domElement] of lookupMap.entries()) {
    renderNotFound(slug, domElement)
  }
}

function renderFound (eatery, domElement) {
  let sluggedRating = slugify(eatery.fsa.rating)
  let displayName = eatery.name.toLowerCase() !== eatery.fsa.business_name.toLowerCase()
  let ratingHTML = templates.rating_found.render({
    'eatery': eatery,
    'displayName': displayName,
    'sluggedRating': sluggedRating
  })
  domElement.appendChild(stringToDOM(ratingHTML))
}

function renderNotFound (slug, domElement) {
  let ratingHTML = templates.rating_not_found.render()
  domElement.appendChild(stringToDOM(ratingHTML))
}
