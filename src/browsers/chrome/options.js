function save_options() {
  var disableAffiliate = document.getElementById('disable_affiliate').checked;
  chrome.storage.sync.set({
    disableAffiliate: disableAffiliate
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1500);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    disableAffiliate: false
  }, function(items) {
    document.getElementById('disable_affiliate').checked = items.disableAffiliate;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
