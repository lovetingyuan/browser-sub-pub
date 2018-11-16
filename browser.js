;(function() {
  var doc = document
  if (typeof window.CustomEvent !== 'function') {
    window.CustomEvent = function CustomEvent(e, p) {
      p = p || { bubbles: false, cancelable: false, detail: undefined }
      var evt = doc.createEvent('CustomEvent')
      evt.initCustomEvent(e, p.bubbles, p.cancelable, p.detail)
      return evt
    }
    CustomEvent.prototype = window.Event.prototype
  }

  window.listen = function listen(e, cb) {
    if (e && typeof e === 'object') {
      Object.keys(e).forEach(function(n) { doc.addEventListener(n, e[n]) })
      return function() {Object.keys(e).forEach(function(n) { doc.removeEventListener(n, e[n]) })}
    } else if (e && typeof cb === 'function' && typeof e === 'string') {
      doc.addEventListener(e, cb)
      return function() {doc.removeEventListener(event, cb)}
    }
  }

  window.emit = function emit(e, pl) {
    if (e && typeof e === 'object') {
      Object.keys(e).forEach(function(n) {doc.dispatchEvent(new CustomEvent(n, {detail: e[n]}))})
    } else if (e && typeof e === 'string') {
      doc.dispatchEvent(new CustomEvent(e, {detail: pl}))
    }
  }
})();
