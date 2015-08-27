export const DIRECTORY_ID = 2

export const SLUG = 'hungry-house'

export const PATH_TO_FUNC_MAP = new Map([
  ['^/takeaways', lookupAreaListings],
  ['^/.+', lookupRestaurantListing]
])

function lookupAreaListings () {
  const restaurants = document.querySelectorAll('.restaurantBlock .restsSearchItemResBoxWrapper')
  const map = new Map()

  for (var element of restaurants) {
    let url = element.querySelector('.restPageLink').getAttribute('href').replace('/', '')
    map.set(url, element)
  }
  return map
}

function lookupRestaurantListing () {
  const restaurant = document.querySelector('.restBoxContent h1')
  const slug = window.location.pathname.replace('/', '')
  return new Map([
    [slug, restaurant]
  ])
}
