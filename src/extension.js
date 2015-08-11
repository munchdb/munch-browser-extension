import * as sites from './sites'
import {doLookup} from './munchClient'
import {log} from './log'
import {renderResults} from './render'
import {injectBodyClass} from './utils/dom'

export function ready () {
  let site = sites.selectSite(window.location.hostname)
  if (site === null) {
    log('Site not supported.')
    return
  }
  let siteModule = sites.loadSiteModule(site)
  log(`Directory ID => ${site} (${siteModule.SLUG})`)
  injectBodyClass(siteModule.SLUG)
  let pathLookupFunc = sites.getPathLookupFunc(window.location.pathname, siteModule.PATH_TO_FUNC_MAP)
  if (pathLookupFunc === null) {
    log('Lookup is not supported on this page.')
    return
  }
  log(`Path Lookup Function => ${pathLookupFunc.name}`)
  let lookupMap = pathLookupFunc()
  if (lookupMap.size === 0) {
    log('No eateries were found on this page.')
    return
  }
  return doLookup(siteModule.DIRECTORY_ID, lookupMap, renderResults)
}

document.addEventListener('DOMContentLoaded', function (event) {
  ready()
})
