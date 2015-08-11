import {log} from './log'
import {slugify} from './utils/text'

export function renderResults (lookupMap, xhrEvent) {
  let response = xhrEvent.currentTarget.response
  let requestedCount = lookupMap.size
  let returnedCount = response.length
  let percentReturned = (returnedCount / requestedCount) * 100
  let ratedCount = 0
  let notRatedCount = 0

  // Handle results that were found.
  for (let i in response) {
    let eatery = response[i]
    if (eatery.fsa_rating == null) continue
    let domElement = lookupMap.get(eatery.site_id)
    renderFound(eatery, domElement)
    lookupMap.delete(eatery.site_id)
    ratedCount++
  }

  // Handle results that were not found.
  for (let [slug, domElement] of lookupMap.entries()) {
    renderNotFound(slug, domElement)
    notRatedCount++
  }
  let percentRated = (ratedCount / requestedCount) * 100
  log(`Lookup results => ${requestedCount} requested from API, ${returnedCount} returned => ${percentReturned.toFixed(2)}%`)
  log(`Lookup results => ${ratedCount} rated, ${notRatedCount} not => ${percentRated.toFixed(2)}%`)
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
