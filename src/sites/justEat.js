import {extractText} from './../utils/text'

export const DIRECTORY_ID = 1

export const SLUG = 'just-eat'

export const PATH_TO_FUNC_MAP = new Map([
  ['^/area', lookupAreaListings],
  ['^/restaurants', lookupRestaurantListing]
])

const SLUG_REGEX = '/restaurants-([a-zA-Z0-9-\.]+)'

function lookupAreaListings () {
  const restaurants = document.querySelectorAll('.restaurant:not(.offlineRestaurant) .restaurantInner')
  const map = new Map()

  for (var element of restaurants) {
    let url = element.querySelector('h2 a').getAttribute('href')
    let slug = extractText(url, SLUG_REGEX)
    map.set(slug, element)
  }
  return map
}

function lookupRestaurantListing () {
  let el
  const slug = extractText(window.location.pathname, SLUG_REGEX)
  const selectors = [
    '.restaurantOverview .details',
    '.restaurant-info-detail',
    '.restInfoExtras .restInfoCuisines'
  ]
  for (var sel of selectors) {
    el = document.querySelector(sel)
    if (el != null) break
  }
  return new Map([
    [slug, el]
  ])
}
