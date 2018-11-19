# browser-sub-pub
sub &amp; pub utils for browser(IE9+), based on `CustomEvent` and `dispatchEvent`

## install
```bash
npm install browser-sub-pub --save-dev
```

## usage
```html
  <script src="browser-sub-pub/browser.js"></script>
  <!-- export global namespace: SP, eg: SP.listen, SP.emit -->
```
or
```javascript
import { listen, emit } from 'node_modules/browser-sub-pub/index.js'
const unlisten = listen('event-a', e => e.detail) // 'aaa'
emit('event-a', 'aaa')
unlisten() // remove listener of 'event-a'

listen({
  eventA(e) { e.detail === 'event-aaa' },
  eventB(e) { e.detail === 'event-bbb' }
})
emit({
  eventA: 'event-aaa',
  eventB: 'event-bbb'
})
```
