import {API_LOOKUP_ENDPOINT} from './constants'
import {log} from './log'
import {partial} from './utils/functional'

export function doLookup (directoryID, lookupMap, callback) {
  let url = getLookupURL(directoryID, lookupMap)
  callback = partial(callback, lookupMap)
  sendRequest(url, callback)
}

function getLookupURL (directoryID, lookupMap) {
  let url = API_LOOKUP_ENDPOINT.replace('{directoryID}', directoryID) + '?'
  let count = 0
  for (let key of lookupMap.keys()) {
    if (count === 60) return url
    url += '&s[]=' + key
    count += 1
  }
  return url
}

function sendRequest (url, callback) {
  let xhr = new XMLHttpRequest() // eslint-disable-line no-undef
  xhr.open('GET', url)
  xhr.responseType = 'json'
  xhr.onload = callback
  xhr.onerror = () => log('Lookup API call failed')
  xhr.send()
}
