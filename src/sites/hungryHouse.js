export const DIRECTORY_ID = 2

export const SLUG = 'hungry-house'

export const PATH_TO_FUNC_MAP = new Map([
  ['^/takeaways', lookupAreaListings],
  ['^/.+', lookupRestaurantListing]
])

export const AFFILIATE_SUPPORT = true
export const AFFILIATE_URL = 'https://www.awin1.com/awclick.php?mid=3898&id=251923&clickref=munchdb-extension'
export const REPLACE_LINKS = [
  '.restPageLink'
]

function lookupAreaListings () {
  const restaurants = document.querySelectorAll('.restaurantBlock .restsSearchItemResBoxWrapper')
  const map = new Map()

  for (var element of restaurants) {
    let url = element.querySelector('.restPageLink').getAttribute('href').replace('/', '').toLowerCase()
    map.set(url, element)
  }
  return map
}

function lookupRestaurantListing () {
  const slug = window.location.pathname.replace('/', '').toLowerCase()
  const restaurant = document.querySelector('.restBoxContent h1')
  return new Map([
    [slug, restaurant]
  ])
}
