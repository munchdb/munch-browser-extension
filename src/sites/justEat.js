import {extractText} from './../utils/text'

export const DIRECTORY_ID = 1

export const SLUG = 'just-eat'

export const PATH_TO_FUNC_MAP = new Map([
  ['^/$', lookupHomepageListings],
  ['^/area', lookupAreaListings],
  ['^/restaurants', lookupRestaurantListing]

])

const SLUG_REGEX = '/restaurants-([a-zA-Z0-9-\.]+)/'

function lookupAreaListings () {
  let restaurants = document.querySelectorAll('.restaurant:not(.offlineRestaurant) .restaurantInner')
  let map = new Map()

  for (var element of restaurants) {
    let url = element.querySelector('h2 a').getAttribute('href')
    let slug = extractText(url, SLUG_REGEX)

    map.set(slug, element)
  }
  return map
}

function lookupRestaurantListing () {
  let restaurant = document.querySelector('.restaurant-info-detail')
  let slug = window.location.pathname  
  return new Map([
    [slug, restaurant]
  ])
}

function lookupHomepageListings () {
  let restaurants = document.querySelectorAll('.media')
  let map = new Map()

  for (var element of restaurants) {
    let url = element.querySelector('.img a').getAttribute('href')
    let slug = extractText(url, SLUG_REGEX)
    map.set(slug, element)
  }
  return map

}
