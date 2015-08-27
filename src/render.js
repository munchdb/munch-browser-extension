import {slugify} from './utils/text'

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
  let span = document.createElement('span')
  let sluggedRating = slugify(eatery.fsa_rating)
  span.innerHTML = `FSA Rating: ${eatery.fsa_rating}`
  span.className = `munch-rating munch-rating-${sluggedRating}`
  domElement.appendChild(span)
}

function renderNotFound (slug, domElement) {
  let span = document.createElement('span')
  span.innerHTML = 'Rating not Found'
  span.className = `munch-rating munch-rating-not-found`
  domElement.appendChild(span)
}
