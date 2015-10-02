console.log('Loading MunchDB content script.')
var s = document.createElement('script')
s.src = chrome.extension.getURL('munchdb.js')
s.onload = function () {
  this.parentNode.removeChild(this)
};
(document.head || document.documentElement).appendChild(s)
