export const DIRECTORY_ID = 2

export const SLUG = 'hungry-house'

export const PATH_TO_FUNC_MAP = new Map([
  ['^/takeaways', lookupAreaListings],
  ['^/', lookupRestaurantListing]

])

function lookupAreaListings () {
  let restaurants = document.querySelectorAll('.restaurantBlock .restsSearchItemRes')
  //console.log(restaurants)
  let map = new Map()

  for (var element of restaurants) {
    let url = element.querySelector('a').getAttribute('name').replace('anchor-','')
    console.log(url)
    map.set(url, element)
  }
  console.log(map)
  return map
}

function lookupRestaurantListing () {
  let restaurant = document.querySelector('.restDetailsBox')
  let slug = window.location.pathname 
  return new Map([
    [slug, restaurant]
  ])
}
