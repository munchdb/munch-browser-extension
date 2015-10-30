export function injectBodyClass (doc, slug) {
  doc.body.className += ` munchdb-${slug}`
}

export function stringToDOM (str) {
  let parser = new DOMParser()
  let doc = parser.parseFromString(str, 'text/html')
  return doc.firstChild
}
