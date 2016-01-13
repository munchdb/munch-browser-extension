var options = {
  disableAffiliate: false
}

function loadMunchDB(settings) {
  console.log('munchdb: Loading script')
  var settingsJSON = JSON.stringify(settings)
  var script = document.createElement('script')
  script.src = chrome.extension.getURL('munchdb.js')
  script.id = 'munchdb-script'
  script.dataset.settings = settingsJSON
  script.onload = function () {
    console.log('munchdb: Removing script')
    this.parentNode.removeChild(this)
  };
  (document.head || document.documentElement).appendChild(script)
}

chrome.storage.sync.get(options, loadMunchDB)
