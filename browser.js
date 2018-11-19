;(function() {
  var win = window, a = 'addEventListener', r = 'removeEventListener', d = 'dispatchEvent'
  if (typeof win.CustomEvent !== 'function') {
    win.CustomEvent = function CustomEvent(e, p) {
      p = p || { bubbles: false, cancelable: false, detail: undefined }
      var evt = document.createEvent('CustomEvent')
      evt.initCustomEvent(e, p.bubbles, p.cancelable, p.detail)
      return evt
    }
    CustomEvent.prototype = win.Event.prototype
  }

  win.SP = {
    listen: listen,
    emit: emit
  };

  function listen(e, cb) {
    if (e && typeof e === 'object') {
      Object.keys(e).forEach(function(n) { win[a](n, e[n]) })
      return function() {Object.keys(e).forEach(function(n) { win[r](n, e[n]) })}
    } else if (e && typeof cb === 'function' && typeof e === 'string') {
      win[a](e, cb)
      return function() {win[r](event, cb)}
    }
  }

  function emit(e, pl) {
    if (e && typeof e === 'object') {
      Object.keys(e).forEach(function(n) {win[d](new CustomEvent(n, {detail: e[n]}))})
    } else if (e && typeof e === 'string') {
      win[d](new CustomEvent(e, {detail: pl}))
    }
  }
})();
