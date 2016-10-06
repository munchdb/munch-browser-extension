import {extractText} from './../utils/text'

export const SLUG = 'just-eat'

export const PATH_TO_FUNC_MAP = new Map([
  ['^/area', lookupAreaListings],
  ['^/restaurants', lookupRestaurantListing]
])

export const SLUG_REGEX = '/restaurants-([a-zA-Z0-9-\.]+)'

export const AFFILIATE_SUPPORT = true
export const AFFILIATE_URL = 'https://www.awin1.com/awclick.php?mid=2005&id=251923&clickref=munchdb-extension'

function lookupAreaListings () {
  const restaurants = document.querySelectorAll('.c-restaurant a')

  const map = new Map()

  for (var anchor of restaurants) {
    let url = anchor.getAttribute('href')
    let slug = extractText(url, SLUG_REGEX).toLowerCase()
    let element = anchor.querySelector('.o-tile__details')
    map.set(slug, element)
  }
  return map
}

function lookupRestaurantListing () {
  let el
  const slug = extractText(window.location.pathname, SLUG_REGEX).toLowerCase()
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
