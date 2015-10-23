import {displayAddress} from './utils/display'
import {slugify} from './utils/text'
import {FOODGOV_SEARCH_URL} from './constants'

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
  let rating = document.createElement('a')
  let sluggedRating = slugify(eatery.fsa.rating)
  let address = displayAddress(eatery.fsa)
  let displayName = ''

  if (eatery.name.toLowerCase() !== eatery.fsa.business_name.toLowerCase()) {
    displayName = `<p><i class="faint">(Found as)</i></p>
                   <h4 class="munch-rating-hint-heading">${eatery.fsa.business_name} </h4>`
  }
  rating.innerHTML = `
    <div class="munch-rating-hint-wrapper">
      <div class="hint__content munch-rating-hint">
        ${displayName}
        <p class="munch-rating-hint-rating">FSA Rating: <b>${eatery.fsa.rating}</b> <i class="faint">(0 to 5)</i></p>
        <p class="munch-rating-hint-authority">Authority: ${eatery.fsa.local_authority_name}</p>
        <p class="munch-rating-hint-date">Rating Date: ${eatery.fsa.rating_date}</p>
        <p class="munch-rating-hint-address">${address}</p>
        <a class="munch-rating-hint-url" href="${eatery.fsa.url}" title="Food Standards Agency" target="_blank">Visit on food.gov.uk</a>
        <span class="fsa-logo"></span>
      </div>
    </div>
    `
  rating.className = `hint hint--html hint--bottom munch-rating munch-rating-${sluggedRating}`
  rating.href = eatery.fsa.url
  rating.target = '_blank'
  domElement.appendChild(rating)
}

function renderNotFound (slug, domElement) {
  let rating = document.createElement('a')
  rating.innerHTML = `
    <div class="munch-rating-hint-wrapper">
      <div class="hint__content munch-rating-hint">
        <h4 class="munch-rating-hint-heading">Why was no rating found?</h4>
        <p><b>1)</b> The restaurant may be newly listed, check back in a few days.</p>
        <p><b>2)</b> The restaurant's address details did not match up with official records.</p>
        <p><b>3)</b> The restaurant may be operating without registering with the FSA (illegally).</p>
        <a class="munch-rating-hint-url" href="${FOODGOV_SEARCH_URL}" title="Search on food.gov.uk">Search on food.gov.uk</a>
        <span class="fsa-logo"></span>
      </div>
    </div>
  `
  rating.className = `hint hint--html hint--bottom munch-rating munch-rating-not-found`
  rating.href = FOODGOV_SEARCH_URL
  rating.target = '_blank'
  domElement.appendChild(rating)
}
