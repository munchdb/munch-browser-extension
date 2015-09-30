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
  let rating = document.createElement('a')
  let sluggedRating = slugify(eatery.fsa.rating)
  let address = [
    eatery.fsa.address_line_1,
    eatery.fsa.address_line_2,
    eatery.fsa.address_line_3,
    eatery.fsa.address_line_4,
    eatery.fsa.postcode
  ].filter(Boolean).join(',<br>')
  let displayName = eatery.fsa.business_name
  if (displayName.toLowerCase() !== eatery.name) {
    displayName = `${displayName} (also known as)`
  }

  rating.innerHTML = `
    <div class="munch-rating-hint-wrapper">
      <div class="hint__content munch-rating-hint">
        <h4 class="munch-rating-hint-heading">${displayName}</h4>
        <p class="munch-rating-hint-rating">FSA Rating: ${eatery.fsa.rating}</p>
        <p class="munch-rating-hint-authority">Authority: ${eatery.fsa.local_authority_name}</p>
        <p class="munch-rating-hint-date">Rating Date: ${eatery.fsa.rating_date}</p>
        <p class="munch-rating-hint-address">${address}</p>
        <a class="munch-rating-hint-url" href="${eatery.fsa.url}" title="Food Standards Agency" target="_blank">Visit on food.gov.uk</a>
        </p>
      </div>
    </div>
    `
  rating.className = `hint hint--html hint--bottom munch-rating munch-rating-${sluggedRating}`
  rating.href = eatery.fsa.url
  rating.target = '_blank'
  domElement.appendChild(rating)
}

function renderNotFound (slug, domElement) {
  let span = document.createElement('span')
  span.innerHTML = 'Rating not Found'
  span.className = `munch-rating munch-rating-not-found`
  domElement.appendChild(span)
}
