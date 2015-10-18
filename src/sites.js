import {SITES} from './constants'
import * as justEat from './sites/justEat'
import * as hungryHouse from './sites/hungryHouse'
import * as deliveroo from './sites/deliveroo'

export function selectSite (domain) {
  switch (domain) {
    case 'www.just-eat.co.uk':
      return SITES.JUST_EAT
    case 'hungryhouse.co.uk':
      return SITES.HUNGRY_HOUSE
    case 'deliveroo.co.uk':
      return SITES.DELIVEROO
  }
  return null
}

export function loadSiteModule (site) {
  switch (site) {
    case SITES.JUST_EAT:
      return justEat
    case SITES.HUNGRY_HOUSE:
      return hungryHouse
    case SITES.DELIVEROO:
      return deliveroo
  }
  return null
}

export function getPathLookupFunc (path, pathToFuncMap) {
  for (let key of pathToFuncMap.keys()) {
    let regex = new RegExp(key)
    if (regex.test(path) === true) return pathToFuncMap.get(key)
  }
  return null
}
