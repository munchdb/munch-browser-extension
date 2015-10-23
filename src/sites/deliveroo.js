import {extractText} from './../utils/text'

export const SLUG = 'deliveroo'

export const PATH_TO_FUNC_MAP = new Map([
  ['^/restaurants', lookupAreaListings],
  ['^/menu', lookupRestaurantListing]
])

const SLUG_REGEX = '/([a-zA-Z0-9-\.\'&\!]+)$'

function lookupAreaListings () {
  const restaurants = document.querySelectorAll('.restaurant--details')
  const map = new Map()

  for (var element of restaurants) {
    let url = element.querySelector('a').getAttribute('href')
    let slug = extractText(url, SLUG_REGEX)
    let insertInside = element.querySelector('.list-item-inner')
    map.set(slug, insertInside)
  }
  return map

}

function lookupRestaurantListing () {
  const el = document.querySelector('.restaurant-details h1')
  const slug = extractText(window.location.pathname, SLUG_REGEX)
  return new Map([
    [slug, el]
  ])

}
