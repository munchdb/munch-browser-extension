import {log} from './log'

export function extractText (str, regex_str) {
  let regex = new RegExp(regex_str)
  let extract
  try {
    extract = regex.exec(str)[1]
  } catch(err) {
    log(`Failed to extract text from: ${str}`)
    extract = null
  }
  return extract
}

export function slugify (text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')      // Replace spaces with -
    .replace(/[^\w\-]+/g, '')  // Remove all non-word chars
    .replace(/\-\-+/g, '-')    // Replace multiple - with single -
    .replace(/^-+/, '')        // Trim - from start of text
    .replace(/-+$/, '')        // Trim - from end of text
}
