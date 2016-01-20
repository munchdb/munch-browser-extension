import {API_LOOKUP_ENDPOINT} from './constants'
import {log} from './utils/log'
import {partial} from './utils/functional'
import {chunkMap} from './utils/chunk'

export function doLookup (directoryID, lookupMap, callback) {
  const chunkedMaps = chunkMap(lookupMap, 60)
  for (let chunkMap of chunkedMaps) {
    let url = getLookupURL(directoryID, chunkMap.keys())
    let partialCallback = partial(callback, chunkMap)
    sendLookupRequest(url, partialCallback)
  }
}

function getLookupURL (directoryID, lookupKeys) {
  let url = API_LOOKUP_ENDPOINT.replace('{directoryID}', directoryID) + '?'
  for (let key of lookupKeys) {
    url += '&s[]=' + key
  }
  return url
}

function sendLookupRequest (url, callback) {
  let xhr = new XMLHttpRequest() // eslint-disable-line no-undef
  xhr.open('GET', url)
  xhr.responseType = 'json'
  xhr.onload = callback
  xhr.onerror = () => log('Lookup API call failed')
  xhr.send()
}
