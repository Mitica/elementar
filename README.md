# elementar

**Elementar** is a content-oriented HTML simplifier.

## Usage

```js
import { fromHtml } from 'elementar';

const elementar = fromHtml('<p><strong>Here</strong> is the <i>answer</i>!<span></span></p>');
console.log(elementar.html()) // <p>Here is the answer!</p>
console.log(elementar.xml()) // <p><text>Here is the answer!</text></p>
console.log(elementar.text()) // Here is the answer!

```
