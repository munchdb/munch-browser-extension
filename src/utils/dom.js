export function injectBodyClass (doc, slug) {
  doc.body.className += ` munchdb-${slug}`
}
