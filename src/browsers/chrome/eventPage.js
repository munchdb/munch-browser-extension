chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status !== 'loading') return

  chrome.tabs.executeScript(tabId, {
    code  : 'var injected = window.munchdbInjected; window.munchdbInjected = true; injected;',
    runAt : 'document_start'
  }, function(res) {
    if (chrome.runtime.lastError || // don't continue if error (i.e. page isn't in permission list)
        res[0]) // value of `injected` above: don't inject twice
      return

    var cssFiles = [
      'munchdb.css'
    ]

    var jsFiles = [
      'munchdb.js'
    ]

    cssFiles.forEach(function (el, i, array) {
        chrome.tabs.insertCSS(tabId, { file: el, runAt: 'document_start' })
    })

    jsFiles.forEach(function (el, i, array) {
        chrome.tabs.executeScript(tabId, { file: el, runAt: 'document_start' })
    })
  })
})
