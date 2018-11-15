if (typeof window.CustomEvent !== 'function') {
  window.CustomEvent = function CustomEvent(event, p) {
    p = p || { bubbles: false, cancelable: false, detail: undefined }
    var evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(event, p.bubbles, p.cancelable, p.detail)
    return evt
  }
  CustomEvent.prototype = window.Event.prototype
}

export function listen(event, callback) {
  if (event && typeof event === 'object') {
    Object.keys(event).forEach(function(n) { document.addEventListener(n, event[n]) })
    return function() {Object.keys(event).forEach(function(n) { document.removeEventListener(n, event[n]) })}
  } else if (event && typeof callback === 'function' && typeof event === 'string') {
    document.addEventListener(event, callback);
    return function() {document.removeEventListener(event, callback)}
  }
}

export function emit(event, payload) {
  if (event && typeof event === 'object') {
    Object.keys(event).forEach(function(n) {document.dispatchEvent(new CustomEvent(n, {detail: event[n]}))})
  } else if (event && typeof event === 'string') {
    document.dispatchEvent(new CustomEvent(event, {detail: payload}))
  }
}
