import * as sites from './sites'
import {doLookup, trackVisit} from './munchClient'
import {log} from './utils/log'
import {renderResults} from './render'
import {getSettings, injectBodyClass} from './utils/dom'
import {partial} from './utils/functional'

export function ready () {
  log('Script loaded')

  let settingsElement = document.getElementById('munchdb-script')
  let settings = getSettings(settingsElement)

  let site = sites.selectSite(window.location.hostname)
  if (site === null) {
    log('Site not supported')
    return
  }
  let siteModule = sites.loadSiteModule(site)
  log(`Directory ID => ${site} (${siteModule.SLUG})`)
  injectBodyClass(window.document, siteModule.SLUG)
  let pathLookupFunc = sites.getPathLookupFunc(window.location.pathname, siteModule.PATH_TO_FUNC_MAP)
  if (pathLookupFunc === null) {
    log('Lookup is not supported for this type of page')
    return
  }
  log(`Path Lookup Function => ${pathLookupFunc.name}`)
  let lookupMap = pathLookupFunc()
  if (lookupMap.size > 0) {
    log('Looking up: ', [...lookupMap.keys()])
  } else {
    log('No eateries were found on this page')
    return
  }
  doLookup(site, lookupMap, renderResults)

  if (pathLookupFunc && !settings.disableAffiliate && siteModule.AFFILIATE_SUPPORT) {
    // Do affiliate code in future.
  }
  return
}

ready()
